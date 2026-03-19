export interface VerifiedMcpSession {
    valid: boolean;
    subject: "client" | "plugin";
    sessionId: string;
    profileId: string;
    tenant: string;
    fileId?: string;
    pageId?: string;
    expiresAt?: string;
}

const DEFAULT_VERIFY_URL = "http://penpot-backend:6060/api/rpc/command/verify-mcp-session";

function normalizeHost(value: string | undefined): string | undefined {
    if (!value) {
        return undefined;
    }

    const host = value.split(",")[0]?.trim();
    if (!host) {
        return undefined;
    }

    return host.split(":")[0]?.toLowerCase();
}

export class McpAuth {
    constructor(private readonly verifyUrl: string | undefined = process.env.PENPOT_MCP_AUTH_VERIFY_URL) {}

    public async verifySessionToken(
        token: string,
        expectedSubject: "client" | "plugin",
        expectedHost?: string
    ): Promise<VerifiedMcpSession> {
        const endpoint = this.verifyUrl || DEFAULT_VERIFY_URL;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
                "x-client": "penpot-mcp-server/1.0",
            },
            body: JSON.stringify({ token }),
        });

        let payload: any = null;
        const text = await response.text();
        if (text.length > 0) {
            try {
                payload = JSON.parse(text);
            } catch {
                payload = null;
            }
        }

        if (!response.ok || !payload) {
            throw new Error("MCP session verification failed.");
        }

        const subject = payload.subject as VerifiedMcpSession["subject"];
        if (subject !== expectedSubject) {
            throw new Error(`Invalid MCP token subject: expected ${expectedSubject}, got ${subject}`);
        }

        const tokenTenant = normalizeHost(payload.tenant);
        const requestHost = normalizeHost(expectedHost);
        if (tokenTenant && requestHost && tokenTenant !== requestHost) {
            throw new Error(`MCP token tenant mismatch: expected ${requestHost}, got ${tokenTenant}`);
        }

        return payload as VerifiedMcpSession;
    }

    public extractBearerToken(value: string | undefined): string | undefined {
        if (!value) {
            return undefined;
        }

        const [scheme, token] = value.split(/\s+/, 2);
        if (scheme?.toLowerCase() !== "bearer" || !token) {
            return undefined;
        }

        return token;
    }
}
