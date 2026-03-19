import { WebSocket, WebSocketServer } from "ws";
import * as http from "http";
import { PluginTask } from "./PluginTask";
import { PluginTaskResponse, PluginTaskResult } from "@penpot/mcp-common";
import { createLogger } from "./logger";
import type { PenpotMcpServer } from "./PenpotMcpServer";

const KEEP_ALIVE_TIME = 30000; // 30 seconds

interface ClientConnection {
    socket: WebSocket;
    userToken: string | null;
    pingInterval: NodeJS.Timeout;
}

export class PluginBridge {
    private readonly logger = createLogger("PluginBridge");
    private readonly wsServer: WebSocketServer;
    private readonly connectedClients: Map<WebSocket, ClientConnection> = new Map();
    private readonly clientsByToken: Map<string, ClientConnection> = new Map();
    private readonly pendingTasks: Map<string, PluginTask<any, any>> = new Map();
    private readonly taskTimeouts: Map<string, NodeJS.Timeout> = new Map();

    constructor(
        public readonly mcpServer: PenpotMcpServer,
        private port: number,
        private taskTimeoutSecs: number = 30
    ) {
        this.wsServer = new WebSocketServer({ port: port });
        this.setupWebSocketHandlers();
    }

    private setupWebSocketHandlers(): void {
        this.wsServer.on("connection", async (ws: WebSocket, request: http.IncomingMessage) => {
            const url = new URL(request.url!, `ws://${request.headers.host}`);
            const legacyUserToken = url.searchParams.get("userToken");
            const token = url.searchParams.get("token");
            let userToken = legacyUserToken;

            if (this.mcpServer.isMultiUserMode() && token) {
                try {
                    const verified = await this.mcpServer.authenticatePluginConnection(token, request.headers.host);
                    userToken = verified.sessionId;
                } catch (error) {
                    this.logger.warn(error, "Rejected plugin websocket due to invalid auth token");
                    ws.close(1008, "Invalid MCP session token");
                    return;
                }
            }

            if (this.mcpServer.isMultiUserMode() && !userToken) {
                this.logger.warn("Connection attempt without userToken in multi-user mode - rejecting");
                ws.close(1008, "Missing userToken parameter");
                return;
            }

            if (userToken) {
                this.logger.info("New WebSocket connection established (token provided)");
            } else {
                this.logger.info("New WebSocket connection established");
            }

            const pingInterval = setInterval(() => {
                ws.ping();
            }, KEEP_ALIVE_TIME);

            const connection: ClientConnection = { socket: ws, userToken, pingInterval };
            this.connectedClients.set(ws, connection);
            if (userToken) {
                const previousConnection = this.clientsByToken.get(userToken);
                if (previousConnection && previousConnection.socket !== ws) {
                    this.logger.warn("Replacing previous WebSocket connection for existing user token");
                    this.removeConnection(previousConnection.socket);
                    try {
                        previousConnection.socket.close(1000, "Replaced by a newer plugin connection");
                    } catch (error) {
                        this.logger.warn(error, "Failed to close previous plugin websocket cleanly");
                    }
                }

                this.clientsByToken.set(userToken, connection);
            }

            this.logger.info(
                `Connected plugin clients: total=${this.connectedClients.size}, tokenScoped=${this.clientsByToken.size}`
            );

            ws.on("message", (data: Buffer) => {
                this.logger.info(`Received WebSocket message (${data.length} bytes)`);
                this.logger.debug("Received WebSocket payload: %s", data.toString());
                try {
                    const response: PluginTaskResponse<any> = JSON.parse(data.toString());
                    this.handlePluginTaskResponse(response);
                } catch (error) {
                    this.logger.error(error, "Failure while processing WebSocket message");
                }
            });

            ws.on("close", () => {
                this.logger.info("WebSocket connection closed");
                this.removeConnection(ws);
                this.logger.info(
                    `Connected plugin clients after close: total=${this.connectedClients.size}, tokenScoped=${this.clientsByToken.size}`
                );
            });

            ws.on("error", (error) => {
                this.logger.error(error, "WebSocket connection error");
                this.removeConnection(ws);
            });
        });

        this.logger.info("WebSocket mcpServer started on port %d", this.port);
    }

    private removeConnection(ws: WebSocket): void {
        const connection = this.connectedClients.get(ws);
        if (!connection) {
            return;
        }
        clearInterval(connection.pingInterval);
        this.connectedClients.delete(ws);
        if (connection.userToken) {
            const currentConnection = this.clientsByToken.get(connection.userToken);
            if (currentConnection?.socket === ws) {
                this.clientsByToken.delete(connection.userToken);
            }
        }
    }

    private handlePluginTaskResponse(response: PluginTaskResponse<any>): void {
        const task = this.pendingTasks.get(response.id);
        if (!task) {
            this.logger.info(`Received response for unknown task ID: ${response.id}`);
            return;
        }

        const timeoutHandle = this.taskTimeouts.get(response.id);
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
            this.taskTimeouts.delete(response.id);
        }
        this.pendingTasks.delete(response.id);

        if (response.success) {
            task.resolveWithResult({ data: response.data });
        } else {
            const error = new Error(response.error || "Task execution failed (details not provided)");
            task.rejectWithError(error);
        }

        this.logger.info(`Task ${response.id} (${task.task}) completed: success=${response.success}`);
        this.logger.debug(`Task ${response.id} response payload: ${JSON.stringify(response)}`);
    }

    private getClientConnection(): ClientConnection {
        if (this.mcpServer.isMultiUserMode()) {
            const sessionContext = this.mcpServer.getSessionContext();
            if (!sessionContext?.userToken) {
                throw new Error("No userToken found in session context. Multi-user mode requires authentication.");
            }

            const connection = this.clientsByToken.get(sessionContext.userToken);
            if (!connection) {
                throw new Error("No plugin WebSocket connection found for this MCP session.");
            }
            return connection;
        }

        if (this.connectedClients.size !== 1) {
            throw new Error(`Expected exactly one plugin WebSocket connection, found ${this.connectedClients.size}.`);
        }

        const connection = this.connectedClients.values().next().value;
        if (!connection) {
            throw new Error("No plugin WebSocket connection found.");
        }
        return connection;
    }

    public async executePluginTask<TParams, TResult>(
        task: string,
        params: TParams,
        timeoutSecs: number = this.taskTimeoutSecs
    ): Promise<PluginTaskResult<TResult>> {
        const connection = this.getClientConnection();
        const pluginTask = new PluginTask<TParams, TResult>(task, params);

        this.pendingTasks.set(pluginTask.id, pluginTask);
        this.taskTimeouts.set(
            pluginTask.id,
            setTimeout(() => {
                this.pendingTasks.delete(pluginTask.id);
                this.taskTimeouts.delete(pluginTask.id);
                pluginTask.rejectWithError(new Error(`Plugin task timed out after ${timeoutSecs} seconds`));
            }, timeoutSecs * 1000)
        );

        this.logger.info(`Sending task ${pluginTask.id} (${task}) to plugin`);
        connection.socket.send(JSON.stringify(pluginTask.toRequest()));
        return pluginTask.getResult();
    }

    public close(): void {
        this.wsServer.close();
        for (const connection of this.connectedClients.values()) {
            clearInterval(connection.pingInterval);
            connection.socket.close();
        }
        this.connectedClients.clear();
        this.clientsByToken.clear();
    }
}
