import { __awaiter } from "tslib";
import { getValidUrl, loadManifestCode } from './parse-manifest.js';
import { openUIApi } from './api/openUI.api.js';
import { openUISchema } from './models/open-ui-options.schema.js';
export function createPluginManager(context, manifest, onCloseCallback, onReloadModal) {
    return __awaiter(this, void 0, void 0, function* () {
        let code = yield loadManifestCode(manifest);
        let loaded = false;
        let destroyed = false;
        let modal = null;
        let uiMessagesCallbacks = [];
        const timeouts = new Set();
        const allowDownloads = !!manifest.permissions.find((s) => s === 'allow:downloads');
        const themeChangeId = context.addListener('themechange', (theme) => {
            modal === null || modal === void 0 ? void 0 : modal.setTheme(theme);
        });
        const listenerId = context.addListener('finish', () => {
            closePlugin();
            context === null || context === void 0 ? void 0 : context.removeListener(listenerId);
        });
        let listeners = [];
        const removeAllEventListeners = () => {
            destroyListener(themeChangeId);
            listeners.forEach((id) => {
                destroyListener(id);
            });
            uiMessagesCallbacks = [];
            listeners = [];
        };
        const closePlugin = () => {
            removeAllEventListeners();
            timeouts.forEach(clearTimeout);
            timeouts.clear();
            if (modal) {
                modal.removeEventListener('close', closePlugin);
                modal.remove();
                modal = null;
            }
            destroyed = true;
            onCloseCallback();
        };
        const onLoadModal = () => __awaiter(this, void 0, void 0, function* () {
            if (!loaded) {
                loaded = true;
                return;
            }
            removeAllEventListeners();
            code = yield loadManifestCode(manifest);
            onReloadModal(code);
        });
        const openModal = (name, url, options) => {
            const theme = context.theme;
            const modalUrl = getValidUrl(manifest.host, url);
            if ((modal === null || modal === void 0 ? void 0 : modal.getAttribute('iframe-src')) === modalUrl) {
                return;
            }
            modal = openUIApi(name, modalUrl, theme, options, allowDownloads);
            modal.setTheme(theme);
            modal.addEventListener('close', closePlugin, {
                once: true,
            });
            modal.addEventListener('load', onLoadModal);
        };
        const registerMessageCallback = (callback) => {
            uiMessagesCallbacks.push(callback);
        };
        const registerListener = (type, callback, props) => {
            const id = context.addListener(type, (...params) => {
                // penpot has a debounce to run the events, so some events can be triggered after the plugin is closed
                if (destroyed) {
                    return;
                }
                callback(...params);
            }, props);
            listeners.push(id);
            return id;
        };
        const destroyListener = (listenerId) => {
            context.removeListener(listenerId);
        };
        return {
            close: closePlugin,
            destroyListener,
            openModal,
            resizeModal: (width, height) => {
                openUISchema.parse({ width, height });
                if (modal) {
                    modal.resize(width, height);
                }
            },
            getModal: () => modal,
            registerListener,
            registerMessageCallback,
            sendMessage: (message) => {
                uiMessagesCallbacks.forEach((callback) => callback(message));
            },
            get manifest() {
                return manifest;
            },
            get context() {
                return context;
            },
            get timeouts() {
                return timeouts;
            },
            get code() {
                return code;
            },
        };
    });
}
//# sourceMappingURL=plugin-manager.js.map