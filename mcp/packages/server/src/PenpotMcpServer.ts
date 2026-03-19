import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AsyncLocalStorage } from "async_hooks";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { ExecuteCodeTool } from "./tools/ExecuteCodeTool";
import { PluginBridge } from "./PluginBridge";
import { ConfigurationLoader } from "./ConfigurationLoader";
import { createLogger } from "./logger";
import { Tool } from "./Tool";
import { HighLevelOverviewTool } from "./tools/HighLevelOverviewTool";
import { PenpotApiInfoTool } from "./tools/PenpotApiInfoTool";
import { ExportShapeTool } from "./tools/ExportShapeTool";
import { ImportImageTool } from "./tools/ImportImageTool";
import { ReplServer } from "./ReplServer";
import { ApiDocs } from "./ApiDocs";
import { McpAuth, type VerifiedMcpSession } from "./McpAuth";

export interface SessionContext {
    userToken?: string;
    sessionId?: string;
    profileId?: string;
    tenant?: string;
    fileId?: string;
    pageId?: string;
}

class StreamableSession {
    constructor(
        public readonly transport: StreamableHTTPServerTransport,
        public readonly context: SessionContext,
        public lastActiveTime: number
    ) {}
}

class ToolInfo {
    constructor(
        public readonly instance: Tool<any>,
        public readonly name: string,
        public readonly config: { description: string; inputSchema: any }
    ) {}
}

export class PenpotMcpServer {
    private static readonly SESSION_TIMEOUT_MINUTES = 60;

    private static tokenFingerprint(token: string | undefined): string {
        if (!token) {
            return "<none>";
        }
        const segments = token.split(".");
        const source = segments.length === 5 ? segments[1] : token;
        return source.slice(0, 8);
    }

    private readonly logger = createLogger("PenpotMcpServer");
    private readonly tools: ToolInfo[];
    public readonly configLoader: ConfigurationLoader;
    private app: any;
    public readonly pluginBridge: PluginBridge;
    private readonly replServer: ReplServer;
    private apiDocs: ApiDocs;
    private readonly penpotHighLevelOverview: string;
    private readonly connectionInstructions: string;
    private readonly auth: McpAuth;

    private readonly sessionContext = new AsyncLocalStorage<SessionContext>();

    private readonly streamableTransports: Record<string, StreamableSession> = {};
    private readonly sseTransports: Record<string, { transport: SSEServerTransport; context: SessionContext }> = {};

    public readonly host: string;
    private readonly port: number;
    private readonly webSocketPort: number;
    private readonly replPort: number;
    private readonly listenAddress: string;
    /**
     * the address (domain name or IP address) via which clients can reach the MCP server
     */
    public readonly serverAddress: string;
    private readonly publicUrl: string | undefined;
    private sessionTimeoutInterval: ReturnType<typeof setInterval> | undefined;

    constructor(private isMultiUser: boolean = false) {
        this.host = process.env.PENPOT_MCP_SERVER_HOST ?? "0.0.0.0";
        this.port = parseInt(process.env.PENPOT_MCP_SERVER_PORT ?? "4401", 10);
        this.webSocketPort = parseInt(process.env.PENPOT_MCP_WEBSOCKET_PORT ?? "4402", 10);
        this.replPort = parseInt(process.env.PENPOT_MCP_REPL_PORT ?? "4403", 10);
        this.listenAddress = process.env.PENPOT_MCP_SERVER_LISTEN_ADDRESS ?? this.host;
        this.serverAddress = process.env.PENPOT_MCP_SERVER_ADDRESS ?? this.host;
        this.publicUrl = process.env.PENPOT_MCP_PUBLIC_URL;

        this.configLoader = new ConfigurationLoader(process.cwd());
        this.apiDocs = new ApiDocs();

        let instructions = this.configLoader.getInitialInstructions();
        instructions = instructions.replace("$api_types", this.apiDocs.getTypeNames().join(", "));
        this.penpotHighLevelOverview = instructions;
        this.connectionInstructions = this.configLoader.getBaseInstructions();

        this.tools = this.initTools();
        this.auth = new McpAuth();
        this.pluginBridge = new PluginBridge(this, this.webSocketPort);
        this.replServer = new ReplServer(this.pluginBridge, this.replPort, this.listenAddress);
    }

    public isMultiUserMode(): boolean {
        return this.isMultiUser;
    }

    public isRemoteMode(): boolean {
        const isRemoteModeRequested: boolean = process.env.PENPOT_MCP_REMOTE_MODE === "true";
        return this.isMultiUserMode() || isRemoteModeRequested;
    }

    public isFileSystemAccessEnabled(): boolean {
        return !this.isRemoteMode();
    }

    public getHighLevelOverviewInstructions(): string {
        return this.penpotHighLevelOverview;
    }

    public getSessionContext(): SessionContext | undefined {
        return this.sessionContext.getStore();
    }

    public async authenticatePluginConnection(token: string, requestHost?: string): Promise<VerifiedMcpSession> {
        return await this.auth.verifySessionToken(token, "plugin", requestHost);
    }

    private async resolveHttpSessionContext(req: any): Promise<SessionContext> {
        const legacyUserToken = req.query.userToken as string | undefined;
        if (!this.isMultiUserMode()) {
            return { userToken: legacyUserToken };
        }

        const queryToken = req.query.token as string | undefined;
        const bearerToken = this.auth.extractBearerToken(req.headers.authorization as string | undefined);
        const token = queryToken ?? bearerToken;

        if (token) {
            const verified = await this.auth.verifySessionToken(
                token,
                "client",
                (req.headers["x-forwarded-host"] as string | undefined) ?? (req.headers.host as string | undefined)
            );

            return {
                userToken: verified.sessionId,
                sessionId: verified.sessionId,
                profileId: verified.profileId,
                tenant: verified.tenant,
                fileId: verified.fileId,
                pageId: verified.pageId,
            };
        }

        if (legacyUserToken) {
            return { userToken: legacyUserToken };
        }

        throw new Error("Multi-user mode requires an MCP authentication token.");
    }

    private initTools(): ToolInfo[] {
        const toolInstances: Tool<any>[] = [
            new ExecuteCodeTool(this),
            new HighLevelOverviewTool(this),
            new PenpotApiInfoTool(this, this.apiDocs),
            new ExportShapeTool(this),
        ];
        if (this.isFileSystemAccessEnabled()) {
            toolInstances.push(new ImportImageTool(this));
        }

        return toolInstances.map((instance) => {
            this.logger.info(`Registering tool: ${instance.getToolName()}`);
            return new ToolInfo(instance, instance.getToolName(), {
                description: instance.getToolDescription(),
                inputSchema: instance.getInputSchema(),
            });
        });
    }

    private createMcpServer(): McpServer {
        const server = new McpServer(
            { name: "penpot", version: "1.0.0" },
            { instructions: this.connectionInstructions }
        );

        for (const tool of this.tools) {
            server.registerTool(tool.name, tool.config, async (args: any) => tool.instance.execute(args));
        }

        return server;
    }

    private startSessionTimeoutChecker(): void {
        const timeoutMs = PenpotMcpServer.SESSION_TIMEOUT_MINUTES * 60 * 1000;
        const checkIntervalMs = timeoutMs / 2;
        this.sessionTimeoutInterval = setInterval(() => {
            this.logger.info("Checking for stale sessions...");
            const now = Date.now();
            let removed = 0;
            for (const session of Object.values(this.streamableTransports)) {
                if (now - session.lastActiveTime > timeoutMs) {
                    session.transport.close();
                    removed++;
                }
            }
            this.logger.info(
                `Removed ${removed} stale session(s); total sessions remaining: ${Object.keys(this.streamableTransports).length}`
            );
        }, checkIntervalMs);
    }

    private setupHttpEndpoints(): void {
        const handleStreamableMcpRequest = async (req: any, res: any) => {
            const sessionId = req.headers["mcp-session-id"] as string | undefined;
            let sessionContext: SessionContext;
            let transport: StreamableHTTPServerTransport;

            if (sessionId && this.streamableTransports[sessionId]) {
                const session = this.streamableTransports[sessionId];
                transport = session.transport;
                sessionContext = session.context;
                session.lastActiveTime = Date.now();
                this.logger.info(
                    `Received request for existing session with id=${sessionId}; userTokenFp=${PenpotMcpServer.tokenFingerprint(sessionContext.userToken)}`
                );
            } else {
                try {
                    sessionContext = await this.resolveHttpSessionContext(req);
                } catch (error) {
                    this.logger.warn(error);
                    res.status(401).json({ error: "Unauthorized MCP request" });
                    return;
                }

                this.logger.info(
                    `Received new session request; userTokenFp=${PenpotMcpServer.tokenFingerprint(sessionContext.userToken)}`
                );
                const { randomUUID } = await import("node:crypto");
                const server = this.createMcpServer();
                transport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: () => randomUUID(),
                    onsessioninitialized: (id) => {
                        this.streamableTransports[id] = new StreamableSession(transport, sessionContext, Date.now());
                        this.logger.info(
                            `Session initialized with id=${id} for userTokenFp=${PenpotMcpServer.tokenFingerprint(sessionContext.userToken)}; total sessions: ${Object.keys(this.streamableTransports).length}`
                        );
                    },
                });
                transport.onclose = () => {
                    if (transport.sessionId) {
                        this.logger.info(
                            `Closing session with id=${transport.sessionId} for userTokenFp=${PenpotMcpServer.tokenFingerprint(sessionContext.userToken)}`
                        );
                        delete this.streamableTransports[transport.sessionId];
                    }
                };
                await server.connect(transport);
            }

            await this.sessionContext.run(sessionContext, async () => {
                await transport.handleRequest(req, res, req.body);
            });
        };

        this.app.all("/", handleStreamableMcpRequest);
        this.app.all("/mcp", handleStreamableMcpRequest);

        this.app.get("/sse", async (req: any, res: any) => {
            let sessionContext: SessionContext;
            try {
                sessionContext = await this.resolveHttpSessionContext(req);
            } catch (error) {
                this.logger.warn(error);
                res.status(401).json({ error: "Unauthorized SSE request" });
                return;
            }
            this.logger.info(`Incoming /sse request: userTokenFp=${PenpotMcpServer.tokenFingerprint(sessionContext.userToken)}`);

            await this.sessionContext.run(sessionContext, async () => {
                const transport = new SSEServerTransport("/messages", res);
                this.sseTransports[transport.sessionId] = { transport, context: sessionContext };

                const server = this.createMcpServer();
                await server.connect(transport);
                res.on("close", () => {
                    delete this.sseTransports[transport.sessionId];
                    server.close();
                });
            });
        });

        this.app.post("/messages", async (req: any, res: any) => {
            const sessionId = req.query.sessionId as string;
            const session = this.sseTransports[sessionId];

            if (session) {
                await this.sessionContext.run(session.context, async () => {
                    await session.transport.handlePostMessage(req, res, req.body);
                });
            } else {
                res.status(400).send("No transport found for sessionId");
            }
        });
    }

    private buildAdvertisedUrl(path: string, fallbackProtocol: "http" | "ws"): string {
        if (this.publicUrl) {
            const base = new URL(this.publicUrl);
            const normalizedPath = path.startsWith("/") ? path : `/${path}`;
            const url = new URL(normalizedPath, base);

            if (fallbackProtocol === "ws") {
                if (url.protocol === "https:") {
                    url.protocol = "wss:";
                } else if (url.protocol === "http:") {
                    url.protocol = "ws:";
                }
            }

            return url.toString();
        }

        const port = fallbackProtocol === "ws" ? this.webSocketPort : this.port;
        return `${fallbackProtocol}://${this.serverAddress}:${port}${path}`;
    }

    async start(): Promise<void> {
        const { default: express } = await import("express");
        this.app = express();
        this.app.use(express.json());

        this.setupHttpEndpoints();

        return new Promise((resolve) => {
            this.app.listen(this.port, this.listenAddress, async () => {
                this.logger.info(`Multi-user mode: ${this.isMultiUserMode()}`);
                this.logger.info(`Remote mode: ${this.isRemoteMode()}`);
                this.logger.info(`Modern Streamable HTTP endpoint: ${this.buildAdvertisedUrl("/mcp", "http")}`);
                this.logger.info(`Legacy SSE endpoint: ${this.buildAdvertisedUrl("/sse", "http")}`);
                this.logger.info(`WebSocket server URL: ${this.buildAdvertisedUrl("/", "ws")}`);

                await this.replServer.start();
                this.startSessionTimeoutChecker();

                resolve();
            });
        });
    }

    public async stop(): Promise<void> {
        this.logger.info("Stopping Penpot MCP Server...");
        clearInterval(this.sessionTimeoutInterval);
        await this.replServer.stop();
        this.pluginBridge.close();
        this.logger.info("Penpot MCP Server stopped");
    }
}
