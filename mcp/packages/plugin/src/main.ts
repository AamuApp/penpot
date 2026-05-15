import "./style.css";

function getPluginSearchParams(): URLSearchParams {
    const params = new URLSearchParams(window.location.search);
    const hashQueryIndex = window.location.hash.indexOf("?");

    if (hashQueryIndex >= 0) {
        const hashParams = new URLSearchParams(window.location.hash.slice(hashQueryIndex + 1));
        hashParams.forEach((value, key) => {
            params.set(key, value);
        });
    }

    return params;
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
 * Updates the connection status display element.
 *
 * @param status - the base status text to display
 * @param isConnectedState - whether the connection is in a connected state (affects color)
 * @param message - optional additional message to append to the status
 */
function updateConnectionStatus(status: string, isConnectedState: boolean, message?: string): void {
    if (statusElement) {
        const displayText = message ? `${status}: ${message}` : status;
        statusElement.textContent = displayText;
        statusElement.style.color = isConnectedState ? "var(--accent-primary)" : "var(--error-700)";
    }
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
 * Sends a task response back to the MCP server via WebSocket.
 *
 * @param response - The response containing task ID and result
 */
function sendTaskResponse(response: any): void {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(response));
        console.log("Sent response to MCP server:", response);
    } else {
        console.error("WebSocket not connected, cannot send response");
    }
}

async function copyFieldValue(targetId: string): Promise<void> {
    const element = document.getElementById(targetId) as HTMLInputElement | HTMLTextAreaElement | null;
    const value = element?.value?.trim();

    if (!value) {
        updateConnectionStatus("Copy failed", false, "Nothing to copy");
        return;
    }

    try {
        await navigator.clipboard.writeText(value);
        updateConnectionStatus("Copied", true, targetId === "mcp-url" ? "MCP URL copied" : "Client token copied");
    } catch (error) {
        console.error("Failed to copy field value:", error);
        updateConnectionStatus("Copy failed", false, "Clipboard access failed");
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
 */
async function connectToMcpServer(): Promise<void> {
    if (ws?.readyState === WebSocket.OPEN) {
        updateConnectionStatus("Already connected", true);
        return;
    }

    try {
        const session = isMultiUserMode ? await createMcpSession() : null;
        renderSessionDetails(session);
        const configuredUrl = session?.wsUrl || PENPOT_MCP_WEBSOCKET_URL || getDefaultWebSocketUrl();
        let wsUrl = normalizeWebSocketUrl(configuredUrl);
        if (isMultiUserMode && session?.wsToken) {
            const url = new URL(wsUrl);
            url.searchParams.set("token", session.wsToken);
            wsUrl = url.toString();
        }
        ws = new WebSocket(wsUrl);
        updateConnectionStatus("Connecting...", false);

        ws.onopen = () => {
            console.log("Connected to MCP server");
            updateConnectionStatus("Connected to MCP server", true);
            renderSessionDetails(currentSession);
        };

        ws.onmessage = (event) => {
            console.log("Received from MCP server:", event.data);
            try {
                const request = JSON.parse(event.data);
                // Forward the task request to the plugin for execution
                parent.postMessage(request, "*");
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        };

        ws.onclose = (event: CloseEvent) => {
            console.log("Disconnected from MCP server");
            const message = event.reason || undefined;
            updateConnectionStatus("Disconnected", false, message);
            ws = null;
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            // note: WebSocket error events typically don't contain detailed error messages
            updateConnectionStatus("Connection error", false);
        };
    } catch (error) {
        console.error("Failed to connect to MCP server:", error);
        const message = error instanceof Error ? error.message : undefined;
        updateConnectionStatus("Connection failed", false, message);
    }
}

document.querySelector("[data-handler='connect-mcp']")?.addEventListener("click", () => {
    connectToMcpServer();
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
    if (event.data.source === "penpot") {
        document.body.dataset.theme = event.data.theme;
    } else if (event.data.type === "task-response") {
        // Forward task response back to MCP server
        sendTaskResponse(event.data.response);
    }
});
