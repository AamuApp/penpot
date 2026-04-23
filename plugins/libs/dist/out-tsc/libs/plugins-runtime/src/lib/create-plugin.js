import { __awaiter } from "tslib";
import { createPluginManager } from './plugin-manager.js';
import { createSandbox } from './create-sandbox.js';
export function createPlugin(context, manifest, onCloseCallback) {
    return __awaiter(this, void 0, void 0, function* () {
        const evaluateSandbox = () => __awaiter(this, void 0, void 0, function* () {
            try {
                sandbox.evaluate();
            }
            catch (error) {
                console.error(error);
                plugin.close();
            }
        });
        const plugin = yield createPluginManager(context, manifest, function onClose() {
            sandbox.cleanGlobalThis();
            onCloseCallback();
        }, function onReloadModal() {
            evaluateSandbox();
        });
        const sandbox = createSandbox(plugin);
        evaluateSandbox();
        return {
            plugin,
            manifest,
            compartment: sandbox,
        };
    });
}
//# sourceMappingURL=create-plugin.js.map