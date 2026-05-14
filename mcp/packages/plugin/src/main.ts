import "./style.css";

/**
 * the maximum allowed size for task responses sent back to the MCP server in the integrated remote MCP mode.
 * This bounds the JSON response size.
 * Note that in the remote MCP case, responses are transferred to LLMs (not the file system) and LLMs have
 * size limitations. This serves to bound the size of returned images in particular.
 * Too many overly large simultaneous responses can cause OOM issues in the MCP server, so this contributes
 * to bounding memory usage in the centrally provided MCP server.
 */
const MAX_TASK_RESPONSE_SIZE_REMOTE_MCP = 15_000_000;

function getPluginSearchParams(): URLSearchParams {
    const hashQuery = window.location.hash.split("?")[1];
    return new URLSearchParams(hashQuery || window.location.search);
}

// get the current theme from the URL
const searchParams = getPluginSearchParams();
document.body.dataset.theme = searchParams.get("theme") ?? "light";

// Determine whether multi-user mode is enabled based on URL parameters
const isMultiUserMode = searchParams.get("multiUser") === "true";
console.log("Penpot MCP multi-user mode:", isMultiUserMode);
const penpotBaseUrl =
    searchParams.get("penpotBaseUrl") ||
    (document.referrer ? new URL(document.referrer).origin + "/designs/penpot" : "");
const fileId = searchParams.get("fileId");
const pageId = searchParams.get("pageId");

// WebSocket connection management
let ws: WebSocket | null = null;
const statusElement = document.getElementById("connection-status");
const sessionDetailsElement = document.getElementById("session-details");
const mcpUrlElement = document.getElementById("mcp-url") as HTMLInputElement | null;
const clientTokenElement = document.getElementById("client-token") as HTMLTextAreaElement | null;
const tenantElement = document.getElementById("tenant");
const expiresAtElement = document.getElementById("expires-at");
const fileIdElement = document.getElementById("file-id");
const pageIdElement = document.getElementById("page-id");
const ttlDaysElement = document.getElementById("ttl-days") as HTMLInputElement | null;
const ttlDaysLabelElement = document.getElementById("ttl-days-label");
let currentSession: McpSessionResponse | null = null;
const TTL_OPTIONS: Array<number | "never"> = [1, 7, 30, 60, 90, 120, 150, 180, 270, 365, "never"];

/**
 * indicates whether the plugin is running with the Penpot-integrated remote MCP server enabled
 * (as opposed to a local server used with the explicitly loaded plugin);
 * set via the "mcp-mode" message sent by plugin.ts on initialization
 */
let isIntegratedRemoteMcp = false;

const statusPill = document.getElementById("connection-status") as HTMLElement;
const statusText = document.getElementById("status-text") as HTMLElement | null;
const currentTaskEl = document.getElementById("current-task") as HTMLElement | null;
const executedCodeEl = document.getElementById("executed-code") as HTMLTextAreaElement | null;
const copyCodeBtn = document.getElementById("copy-code-btn") as HTMLButtonElement | null;
const connectBtn = document.getElementById("connect-btn") as HTMLButtonElement | null;
const disconnectBtn = document.getElementById("disconnect-btn") as HTMLButtonElement | null;
const versionWarningEl = document.getElementById("version-warning") as HTMLElement | null;
const versionWarningTextEl = document.getElementById("version-warning-text") as HTMLElement | null;

interface McpSessionResponse {
    sessionId: string;
    tenant: string;
    mcpUrl: string;
    wsUrl: string;
    clientToken: string;
    wsToken: string;
    expiresAt?: string;
}

function getDefaultWebSocketUrl(): string {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    // return `${protocol}//${window.location.hostname}:4402`;
    return `${protocol}//${window.location.hostname}/designs/penpot/mcp-plugin/ws`;
}

function normalizeWebSocketUrl(rawUrl: string): string {
    const url = new URL(rawUrl, window.location.href);
    const secureContext = window.location.protocol === "https:" || penpotBaseUrl.startsWith("https://");

    if (url.protocol === "https:") {
        url.protocol = "wss:";
    } else if (url.protocol === "http:") {
        url.protocol = secureContext ? "wss:" : "ws:";
    } else if (url.protocol === "ws:" && secureContext) {
        url.protocol = "wss:";
    }

    return url.toString();
}

function normalizeHttpUrl(rawUrl: string): string {
    const url = new URL(rawUrl, window.location.href);
    const secureContext = window.location.protocol === "https:" || penpotBaseUrl.startsWith("https://");

    if (secureContext && url.protocol === "http:") {
        url.protocol = "https:";
    }

    return url.toString();
}

/**
 * Updates the status pill and button visibility based on connection state.
 *
 * @param code - the connection state code ("idle" | "connecting" | "connected" | "disconnected" | "error")
 * @param label - human-readable label to display
 */
function updateConnectionStatus(code: string, label: string): void {
    if (statusPill) {
        statusPill.dataset.status = code;
    }
    if (statusText) {
        statusText.textContent = label;
    } else if (statusElement) {
        statusElement.textContent = label;
        statusElement.style.color = code === "connected" ? "var(--accent-primary)" : "var(--error-700)";
    }

    const isConnected = code === "connected";
    if (connectBtn) connectBtn.hidden = isConnected;
    if (disconnectBtn) disconnectBtn.hidden = !isConnected;

    parent.postMessage(
        {
            type: "update-connection-status",
            status: code,
        },
        "*"
    );
}

function renderSessionDetails(session: McpSessionResponse | null): void {
    currentSession = session;

    if (!sessionDetailsElement) {
        return;
    }

    sessionDetailsElement.hidden = !session;
    if (!session) {
        return;
    }

    if (mcpUrlElement) {
        mcpUrlElement.value = normalizeHttpUrl(session.mcpUrl);
    }
    if (clientTokenElement) {
        clientTokenElement.value = session.clientToken;
    }
    if (tenantElement) {
        tenantElement.textContent = session.tenant;
    }
    if (expiresAtElement) {
        expiresAtElement.textContent = session.expiresAt ? new Date(session.expiresAt).toLocaleString() : "Never";
    }
    if (fileIdElement) {
        fileIdElement.textContent = fileId || "-";
    }
    if (pageIdElement) {
        pageIdElement.textContent = pageId || "-";
    }
}

/**
 * Updates the "Current task" display with the currently executing task name.
 *
 * @param taskName - the task name to display, or null to reset to "---"
 */
function updateCurrentTask(taskName: string | null): void {
    if (currentTaskEl) {
        currentTaskEl.textContent = taskName ?? "---";
    }
    if (taskName === null) {
        updateExecutedCode(null);
    }
}

/**
 * Updates the executed code textarea with the last code run during task execution.
 *
 * @param code - the code string to display, or null to clear
 */
function updateExecutedCode(code: string | null): void {
    if (executedCodeEl) {
        executedCodeEl.value = code ?? "";
    }
    if (copyCodeBtn) {
        copyCodeBtn.disabled = !code;
    }
}

/**
 * Sends a task response back to the MCP server via WebSocket.
 *
 * @param response - The response containing task ID and result
 */
function sendTaskResponse(response: any): void {
    if (ws && ws.readyState === WebSocket.OPEN) {
        let responseString = JSON.stringify(response);
        if (isIntegratedRemoteMcp && responseString.length > MAX_TASK_RESPONSE_SIZE_REMOTE_MCP) {
            const errorMessage = `Serialised response size (${responseString.length}) exceeds maximum of ${MAX_TASK_RESPONSE_SIZE_REMOTE_MCP}.`;
            console.warn(
                errorMessage +
                    " [integrated remote MCP mode restriction]; sending error response instead; original response:",
                response
            );
            response = {
                id: response.id,
                success: false,
                error: errorMessage,
            };
            responseString = JSON.stringify(response);
        }
        ws.send(responseString);
        console.log("Sent response to MCP server:", response);
    } else {
        console.error("WebSocket not connected, cannot send response");
    }
}

async function copyFieldValue(targetId: string): Promise<void> {
    const element = document.getElementById(targetId) as HTMLInputElement | HTMLTextAreaElement | null;
    const value = element?.value?.trim();

    if (!value) {
        updateConnectionStatus("error", "Copy failed: Nothing to copy");
        return;
    }

    try {
        await navigator.clipboard.writeText(value);
        updateConnectionStatus("connected", targetId === "mcp-url" ? "MCP URL copied" : "Client token copied");
    } catch (error) {
        console.error("Failed to copy field value:", error);
        updateConnectionStatus("error", "Copy failed: Clipboard access failed");
    }
}

async function createMcpSession(): Promise<McpSessionResponse> {
    if (!penpotBaseUrl) {
        throw new Error("Penpot base URL is not available for MCP session creation");
    }

    const sliderIndex = ttlDaysElement?.value ? Number.parseInt(ttlDaysElement.value, 10) : 2;
    const selectedOption = TTL_OPTIONS[Math.min(Math.max(sliderIndex, 0), TTL_OPTIONS.length - 1)] ?? 30;
    const nonExpiring = selectedOption === "never";
    const ttlDays = typeof selectedOption === "number" ? selectedOption : 365;

    const response = await fetch(`${penpotBaseUrl}/api/rpc/command/create-mcp-session`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json",
            accept: "application/json",
            "x-client": "penpot-mcp-plugin/1.0",
            "x-frontend-version": "penpot-mcp-plugin",
        },
        body: JSON.stringify({
            ...(fileId ? { fileId } : {}),
            ...(pageId ? { pageId } : {}),
            ...(nonExpiring ? { nonExpiring: true } : { ttlDays }),
        }),
    });

    let payload: any = null;
    const text = await response.text();
    if (text.length > 0) {
        payload = JSON.parse(text);
    }

    if (!response.ok || !payload?.wsToken || !payload?.wsUrl) {
        const message = payload?.error?.message || payload?.error || "Unable to create MCP session";
        throw new Error(message);
    }

    return payload as McpSessionResponse;
}

/**
 * Establishes a WebSocket connection to the MCP server.
 *
 * @param baseUrl - optional WebSocket URL provided by Penpot's integrated MCP API
 * @param token - optional integrated MCP token
 */
async function connectToMcpServer(baseUrl?: string, token?: string): Promise<void> {
    if (ws?.readyState === WebSocket.OPEN) {
        updateConnectionStatus("connected", "Connected");
        return;
    }

    try {
        const session = !baseUrl && !token && isMultiUserMode ? await createMcpSession() : null;
        renderSessionDetails(session);
        const configuredUrl = session?.wsUrl || baseUrl || PENPOT_MCP_WEBSOCKET_URL || getDefaultWebSocketUrl();
        let wsUrl = normalizeWebSocketUrl(configuredUrl);
        if (token) {
            const url = new URL(wsUrl);
            url.searchParams.set("userToken", token);
            wsUrl = url.toString();
        } else if (isMultiUserMode && session?.wsToken) {
            const url = new URL(wsUrl);
            url.searchParams.set("token", session.wsToken);
            wsUrl = url.toString();
        }
        let wsError: unknown | undefined;

        ws = new WebSocket(wsUrl);
        updateConnectionStatus("connecting", "Connecting...");

        ws.onopen = () => {
            setTimeout(() => {
                if (ws) {
                    console.log("Connected to MCP server");
                    updateConnectionStatus("connected", "Connected");
                    renderSessionDetails(currentSession);
                }
            }, 100);
        };

        ws.onmessage = (event) => {
            try {
                console.log("Received from MCP server:", event.data);
                const request = JSON.parse(event.data);
                // Track the current task received from the MCP server
                if (request.task) {
                    updateCurrentTask(request.task);
                    updateExecutedCode(request.params?.code ?? null);
                }
                // Forward the task request to the plugin for execution
                parent.postMessage(request, "*");
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        };

        ws.onclose = (event: CloseEvent) => {
            // If we've send the error update we don't send the disconnect as well
            if (!wsError) {
                console.log("Disconnected from MCP server");
                const label = event.reason ? `Disconnected: ${event.reason}` : "Disconnected";
                updateConnectionStatus("disconnected", label);
                updateCurrentTask(null);
            }
            ws = null;
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            wsError = error;
            // note: WebSocket error events typically don't contain detailed error messages
            updateConnectionStatus("error", "Connection error");
        };
    } catch (error) {
        console.error("Failed to connect to MCP server:", error);
        const reason = error instanceof Error ? error.message : undefined;
        const label = reason ? `Connection failed: ${reason}` : "Connection failed";
        updateConnectionStatus("error", label);
    }
}

copyCodeBtn?.addEventListener("click", () => {
    const code = executedCodeEl?.value;
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
        copyCodeBtn.classList.add("copied");
        setTimeout(() => copyCodeBtn.classList.remove("copied"), 1500);
    });
});

connectBtn?.addEventListener("click", () => {
    void connectToMcpServer();
});

document.querySelector("[data-handler='connect-mcp']")?.addEventListener("click", () => {
    void connectToMcpServer();
});

disconnectBtn?.addEventListener("click", () => {
    ws?.close();
});

document.querySelector("[data-handler='disconnect-mcp']")?.addEventListener("click", () => {
    ws?.close();
});

function renderTtlDaysLabel(): void {
    if (!ttlDaysElement || !ttlDaysLabelElement) {
        return;
    }

    const sliderIndex = Number.parseInt(ttlDaysElement.value, 10);
    const selectedOption = TTL_OPTIONS[Math.min(Math.max(sliderIndex, 0), TTL_OPTIONS.length - 1)] ?? 30;
    ttlDaysLabelElement.textContent =
        selectedOption === "never" ? "Never" : `${selectedOption} day${selectedOption === 1 ? "" : "s"}`;
}

ttlDaysElement?.addEventListener("input", renderTtlDaysLabel);
renderTtlDaysLabel();

document.querySelectorAll<HTMLButtonElement>("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.copyTarget;
        if (targetId) {
            void copyFieldValue(targetId);
        }
    });
});

// Listen plugin.ts messages
window.addEventListener("message", (event) => {
    if (event.data.type === "mcp-mode") {
        isIntegratedRemoteMcp = event.data.integratedRemoteMcp;
    }
    if (event.data.type === "start-server") {
        void connectToMcpServer(event.data.url, event.data.token);
    }
    if (event.data.type === "version-mismatch") {
        if (versionWarningEl && versionWarningTextEl) {
            versionWarningTextEl.innerHTML =
                `<b>Version mismatch detected</b>: This version of the MCP server is intended for Penpot ` +
                `${event.data.mcpVersion} while the current version is ${event.data.penpotVersion}. ` +
                `Executions may not work or produce suboptimal results.`;
            versionWarningEl.hidden = false;
        }
    }
    if (event.data.type === "stop-server") {
        ws?.close();
    } else if (event.data.source === "penpot") {
        document.body.dataset.theme = event.data.theme;
    } else if (event.data.type === "task-response") {
        // Forward task response back to MCP server
        sendTaskResponse(event.data.response);
    }
});

parent.postMessage({ type: "ui-initialized" }, "*");
