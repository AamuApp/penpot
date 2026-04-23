import { __awaiter } from "tslib";
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { createPluginManager } from './plugin-manager';
import { loadManifestCode, getValidUrl } from './parse-manifest.js';
import { openUIApi } from './api/openUI.api.js';
vi.mock('./parse-manifest.js', () => ({
    loadManifestCode: vi.fn(),
    getValidUrl: vi.fn(),
}));
vi.mock('./api/openUI.api.js', () => ({
    openUIApi: vi.fn(),
}));
describe('createPluginManager', () => {
    let mockContext;
    let manifest;
    let onCloseCallback;
    let onReloadModal;
    let mockModal;
    beforeEach(() => {
        manifest = {
            pluginId: 'test-plugin',
            name: 'Test Plugin',
            host: 'https://example.com',
            code: '',
            permissions: [
                'content:read',
                'content:write',
                'library:read',
                'library:write',
                'user:read',
                'comment:read',
                'comment:write',
                'allow:downloads',
                'allow:localstorage',
            ],
        };
        mockModal = {
            setTheme: vi.fn(),
            remove: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            getAttribute: vi.fn(),
        };
        vi.mocked(openUIApi).mockReturnValue(mockModal);
        mockContext = {
            theme: 'light',
            addListener: vi.fn().mockReturnValue(Symbol()),
            removeListener: vi.fn(),
        };
        onCloseCallback = vi.fn();
        onReloadModal = vi.fn();
        vi.mocked(loadManifestCode).mockResolvedValue('console.log("Plugin loaded");');
        vi.mocked(getValidUrl).mockReturnValue('https://example.com/plugin');
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('should load the plugin and set up listeners', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        expect(loadManifestCode).toHaveBeenCalledWith(manifest);
        expect(mockContext.addListener).toHaveBeenCalledWith('themechange', expect.any(Function));
        expect(mockContext.addListener).toHaveBeenCalledWith('finish', expect.any(Function));
    }));
    it('should open a modal with the correct URL and theme', () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        pluginManager.openModal('Test Modal', '/test-url', {
            width: 400,
            height: 300,
        });
        expect(getValidUrl).toHaveBeenCalledWith(manifest.host, '/test-url');
        expect(openUIApi).toHaveBeenCalledWith('Test Modal', 'https://example.com/plugin', 'light', { width: 400, height: 300 }, true);
        expect(mockModal.setTheme).toHaveBeenCalledWith('light');
        expect(mockModal.addEventListener).toHaveBeenCalledWith('close', expect.any(Function), { once: true });
        expect(mockModal.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
    }));
    it('should not open a new modal if the URL has not changed', () => __awaiter(void 0, void 0, void 0, function* () {
        mockModal.getAttribute.mockReturnValue('https://example.com/plugin');
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        pluginManager.openModal('Test Modal', '/test-url');
        pluginManager.openModal('Test Modal', '/test-url');
        expect(openUIApi).toHaveBeenCalledTimes(1);
    }));
    it('should handle theme changes and update the modal theme', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        pluginManager.openModal('Test Modal', '/test-url');
        const themeChangeCallback = (_a = vi
            .mocked(mockContext.addListener)
            .mock.calls.find((call) => call[0] === 'themechange')) === null || _a === void 0 ? void 0 : _a[1];
        if (!themeChangeCallback) {
            throw new Error('Theme change callback not found');
        }
        themeChangeCallback('dark');
        expect(mockModal.setTheme).toHaveBeenCalledWith('dark');
    }));
    it('should remove all event listeners and close the plugin', () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        pluginManager.openModal('Test Modal', '/test-url');
        pluginManager.close();
        expect(mockContext.removeListener).toHaveBeenCalled();
        expect(mockModal.removeEventListener).toHaveBeenCalledWith('close', expect.any(Function));
        expect(mockModal.remove).toHaveBeenCalled();
        expect(onCloseCallback).toHaveBeenCalled();
    }));
    it('shoud clean setTimeout when plugin is closed', () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        pluginManager.timeouts.add(setTimeout(() => { }, 1000));
        pluginManager.timeouts.add(setTimeout(() => { }, 1000));
        expect(pluginManager.timeouts.size).toBe(2);
        pluginManager.close();
        expect(pluginManager.timeouts.size).toBe(0);
    }));
    it('should reload the modal when reloaded', () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        yield pluginManager.openModal('Test Modal', '/test-url');
        const loadCallback = mockModal.addEventListener.mock.calls.find((call) => {
            return call[0] === 'load';
        });
        if (loadCallback) {
            // initial load
            yield loadCallback[1]();
            // reload
            yield loadCallback[1]();
            expect(onReloadModal).toHaveBeenCalledWith('console.log("Plugin loaded");');
        }
    }));
    it('should register and trigger message callbacks', () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        const callback = vi.fn();
        pluginManager.registerMessageCallback(callback);
        pluginManager.sendMessage('Test Message');
        expect(callback).toHaveBeenCalledWith('Test Message');
    }));
    it('should register and remove listeners', () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        const callback = vi.fn();
        const listenerId = pluginManager.registerListener('themechange', callback);
        expect(mockContext.addListener).toHaveBeenCalledWith('themechange', expect.any(Function), undefined);
        pluginManager.destroyListener(listenerId);
        expect(mockContext.removeListener).toHaveBeenCalledWith(listenerId);
    }));
    it('should clean up all event listeners on close', () => __awaiter(void 0, void 0, void 0, function* () {
        const pluginManager = yield createPluginManager(mockContext, manifest, onCloseCallback, onReloadModal);
        pluginManager.close();
        expect(mockContext.removeListener).toHaveBeenCalled();
        expect(onCloseCallback).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=plugin-manager.spec.js.map