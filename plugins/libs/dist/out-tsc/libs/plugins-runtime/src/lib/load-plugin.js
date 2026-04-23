import { __awaiter } from "tslib";
import { loadManifest } from './parse-manifest.js';
import { createPlugin } from './create-plugin.js';
import { ses } from './ses.js';
let plugins = [];
let contextBuilder = null;
export function setContextBuilder(builder) {
    contextBuilder = builder;
}
export const getPlugins = () => plugins;
const closeAllPlugins = () => {
    plugins.forEach((pluginApi) => {
        pluginApi.plugin.close();
    });
    plugins = [];
};
window.addEventListener('message', (event) => {
    try {
        for (const it of plugins) {
            it.plugin.sendMessage(event.data);
        }
    }
    catch (err) {
        console.error(err);
    }
});
export const loadPlugin = function (manifest, closeCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const context = contextBuilder && contextBuilder(manifest.pluginId);
            if (!context) {
                return;
            }
            closeAllPlugins();
            const plugin = yield createPlugin(ses.harden(context), manifest, () => {
                plugins = plugins.filter((api) => api !== plugin);
                if (closeCallback) {
                    closeCallback();
                }
            });
            plugins.push(plugin);
        }
        catch (error) {
            closeAllPlugins();
            console.error(error);
        }
    });
};
export const ɵloadPlugin = function (manifest, closeCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        loadPlugin(manifest, closeCallback);
    });
};
export const ɵloadPluginByUrl = function (manifestUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const manifest = yield loadManifest(manifestUrl);
        ɵloadPlugin(manifest);
    });
};
export const ɵunloadPlugin = function (id) {
    const plugin = plugins.find((plugin) => plugin.manifest.pluginId === id);
    if (plugin) {
        plugin.plugin.close();
    }
};
//# sourceMappingURL=load-plugin.js.map