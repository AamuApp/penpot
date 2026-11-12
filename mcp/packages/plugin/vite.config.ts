import { defineConfig } from "vite";
import livePreview from "vite-live-preview";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const rootPkg = require("../../package.json");
const wsUrl = process.env.PENPOT_MCP_WEBSOCKET_URL ?? "";
const mcpVersion = JSON.stringify(rootPkg.version);

export default defineConfig({
    base: "./",
    plugins: [
        livePreview({
            reload: true,
            config: {
                build: {
                    sourcemap: true,
                },
            },
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                plugin: "src/plugin.ts",
                index: "./index.html",
            },
            output: {
                entryFileNames: "[name].js",
            },
        },
    },
    preview: {
        host: "0.0.0.0",
        port: 4400,
        cors: true,
        allowedHosts: [],
    },
    define: {
        IS_MULTI_USER_MODE: JSON.stringify(process.env.MULTI_USER_MODE === "true"),
        PENPOT_MCP_WEBSOCKET_URL: JSON.stringify(wsUrl),
        PENPOT_MCP_VERSION: mcpVersion,
    },
});
