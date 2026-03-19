import { ExecuteCodeTaskHandler } from "./task-handlers/ExecuteCodeTaskHandler";
import { Task, TaskHandler } from "./TaskHandler";

function extractVersionPrefix(version: string): string {
    const match = version.match(/^(\d+\.\d+\.\d+)/);
    return match ? match[1] : version;
}

mcp?.setMcpStatus("connecting");

const taskHandlers: TaskHandler[] = [new ExecuteCodeTaskHandler()];

declare const IS_MULTI_USER_MODE: boolean;
const isMultiUserMode = typeof IS_MULTI_USER_MODE !== "undefined" ? IS_MULTI_USER_MODE : false;
const currentFileId = penpot.currentFile?.id ?? "";
const currentPageId = penpot.currentPage?.id ?? "";
const penpotBaseUrl =
    globalThis.location?.origin && globalThis.location?.pathname
        ? new URL(globalThis.location.pathname, globalThis.location.origin).toString().replace(/\/$/, "")
        : "";
const pluginUiUrl =
    `/designs/penpot/mcp-plugin/?theme=${encodeURIComponent(penpot.theme)}` +
    `&multiUser=${encodeURIComponent(String(isMultiUserMode))}` +
    `&penpotBaseUrl=${encodeURIComponent(penpotBaseUrl)}` +
    `&fileId=${encodeURIComponent(currentFileId)}` +
    `&pageId=${encodeURIComponent(currentPageId)}`;

penpot.ui.open("Penpot MCP Plugin", pluginUiUrl, {
    width: isMultiUserMode ? 320 : 236,
    height: isMultiUserMode ? 520 : 210,
    hidden: !isMultiUserMode && !!mcp,
} as any);

penpot.ui.onMessage<string | { id: string; type?: string; status?: string; task: string; params: any }>((message) => {
    if (typeof message === "object" && message.type === "ui-initialized") {
        const penpotVersionPrefix = penpot.version ? extractVersionPrefix(penpot.version) : "<2.15";
        const mcpVersionPrefix = extractVersionPrefix(PENPOT_MCP_VERSION);
        console.log(`Penpot version: ${penpotVersionPrefix}, MCP version: ${mcpVersionPrefix}`);
        const isLocalPenpotVersion = penpotVersionPrefix == "0.0.0";
        if (penpotVersionPrefix !== mcpVersionPrefix && !isLocalPenpotVersion) {
            penpot.ui.sendMessage({
                type: "version-mismatch",
                mcpVersion: mcpVersionPrefix,
                penpotVersion: penpotVersionPrefix,
            });
        }
        if (mcp) {
            penpot.ui.sendMessage({
                type: "start-server",
                url: mcp?.getServerUrl(),
                token: mcp?.getToken(),
            });
        }
    } else if (typeof message === "object" && message.type === "update-connection-status") {
        mcp?.setMcpStatus(message.status || "unknown");
    } else if (typeof message === "object" && message.task && message.id) {
        handlePluginTaskRequest(message).catch((error) => {
            console.error("Error in handlePluginTaskRequest:", error);
        });
    }
});

async function handlePluginTaskRequest(request: { id: string; task: string; params: any }): Promise<void> {
    console.log("Executing plugin task:", request.task, request.params);
    const task = new Task(request.id, request.task, request.params);

    const handler = taskHandlers.find((h) => h.isApplicableTo(task));

    if (handler) {
        try {
            console.log("Processing task with handler:", handler);
            await handler.handle(task);

            if (!task.isResponseSent) {
                console.warn("Handler did not send a response, sending generic success.");
                task.sendSuccess("Task completed without a specific response.");
            }

            console.log("Task handled successfully:", task);
        } catch (error) {
            console.error("Error handling task:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            task.sendError(`Error handling task: ${errorMessage}`);
        }
    } else {
        console.error("Unknown plugin task:", request.task);
        task.sendError(`Unknown task type: ${request.task}`);
    }
}

if (mcp) {
    mcp.on("disconnect", async () => {
        penpot.ui.sendMessage({
            type: "stop-server",
        });
    });
    mcp.on("connect", async () => {
        penpot.ui.sendMessage({
            type: "start-server",
            url: mcp?.getServerUrl(),
            token: mcp?.getToken(),
        });
    });
}

penpot.on("themechange", (theme) => {
    penpot.ui.sendMessage({
        source: "penpot",
        type: "themechange",
        theme,
    });
});
