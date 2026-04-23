import 'ses';
import './lib/modal/plugin-modal';
import { ɵloadPlugin, setContextBuilder, ɵloadPluginByUrl, ɵunloadPlugin, } from './lib/load-plugin.js';
console.log('%c[PLUGINS] Loading plugin system', 'color: #008d7c');
repairIntrinsics({
    evalTaming: 'unsafeEval',
    stackFiltering: 'verbose',
    errorTaming: 'unsafe',
    consoleTaming: 'unsafe',
    errorTrapping: 'none',
    unhandledRejectionTrapping: 'none',
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalThisAny$ = globalThis;
export const initPluginsRuntime = (contextBuilder) => {
    try {
        console.log('%c[PLUGINS] Initialize runtime', 'color: #008d7c');
        setContextBuilder(contextBuilder);
        globalThisAny$.ɵcontext = contextBuilder('00000000-0000-0000-0000-000000000000');
        globalThis.ɵloadPlugin = ɵloadPlugin;
        globalThis.ɵloadPluginByUrl = ɵloadPluginByUrl;
        globalThis.ɵunloadPlugin = ɵunloadPlugin;
    }
    catch (err) {
        console.error(err);
    }
};
//# sourceMappingURL=index.js.map