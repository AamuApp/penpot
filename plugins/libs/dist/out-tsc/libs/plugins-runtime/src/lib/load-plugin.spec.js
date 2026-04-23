import { __awaiter } from "tslib";
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { loadPlugin, ɵloadPlugin, ɵloadPluginByUrl, setContextBuilder, getPlugins, } from './load-plugin';
import { loadManifest } from './parse-manifest';
import { createPlugin } from './create-plugin';
vi.mock('./parse-manifest', () => ({
    loadManifest: vi.fn(),
}));
vi.mock('./create-plugin', () => ({
    createPlugin: vi.fn(),
}));
vi.mock('./ses.js', () => ({
    ses: {
        harden: vi.fn().mockImplementation((obj) => obj),
    },
}));
describe('plugin-loader', () => {
    let mockContext;
    let manifest;
    let mockPluginApi;
    let mockClose;
    beforeEach(() => {
        manifest = {
            pluginId: 'test-plugin',
            name: 'Test Plugin',
            host: '',
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
        mockClose = vi.fn();
        mockPluginApi = {
            plugin: {
                close: mockClose,
                sendMessage: vi.fn(),
            },
        };
        mockContext = {
            addListener: vi.fn(),
            removeListener: vi.fn(),
        };
        vi.mocked(createPlugin).mockResolvedValue(mockPluginApi);
        setContextBuilder(() => mockContext);
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('should load and initialize a plugin', () => __awaiter(void 0, void 0, void 0, function* () {
        yield loadPlugin(manifest);
        expect(createPlugin).toHaveBeenCalledWith(mockContext, manifest, expect.any(Function));
        expect(mockPluginApi.plugin.close).not.toHaveBeenCalled();
        expect(getPlugins()).toHaveLength(1);
    }));
    it('should close all plugins before loading a new one', () => __awaiter(void 0, void 0, void 0, function* () {
        yield loadPlugin(manifest);
        yield loadPlugin(manifest);
        expect(mockClose).toHaveBeenCalledTimes(1);
        expect(createPlugin).toHaveBeenCalledTimes(2);
    }));
    it('should remove the plugin from the list on close', () => __awaiter(void 0, void 0, void 0, function* () {
        yield loadPlugin(manifest);
        const closeCallback = vi.mocked(createPlugin).mock.calls[0][2];
        closeCallback();
        expect(getPlugins()).toHaveLength(0);
    }));
    it('should handle errors and close all plugins', () => __awaiter(void 0, void 0, void 0, function* () {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        vi.mocked(createPlugin).mockRejectedValue(new Error('Plugin creation failed'));
        yield loadPlugin(manifest);
        expect(getPlugins()).toHaveLength(0);
        expect(consoleSpy).toHaveBeenCalled();
    }));
    it('should handle messages sent to plugins', () => __awaiter(void 0, void 0, void 0, function* () {
        yield loadPlugin(manifest);
        window.dispatchEvent(new MessageEvent('message', { data: 'test-message' }));
        expect(mockPluginApi.plugin.sendMessage).toHaveBeenCalledWith('test-message');
    }));
    it('should load plugin using ɵloadPlugin', () => __awaiter(void 0, void 0, void 0, function* () {
        yield ɵloadPlugin(manifest);
        expect(createPlugin).toHaveBeenCalledWith(mockContext, manifest, expect.any(Function));
    }));
    it('should load plugin by URL using ɵloadPluginByUrl', () => __awaiter(void 0, void 0, void 0, function* () {
        const manifestUrl = 'https://example.com/manifest.json';
        vi.mocked(loadManifest).mockResolvedValue(manifest);
        yield ɵloadPluginByUrl(manifestUrl);
        expect(loadManifest).toHaveBeenCalledWith(manifestUrl);
        expect(createPlugin).toHaveBeenCalledWith(mockContext, manifest, expect.any(Function));
    }));
});
//# sourceMappingURL=load-plugin.spec.js.map