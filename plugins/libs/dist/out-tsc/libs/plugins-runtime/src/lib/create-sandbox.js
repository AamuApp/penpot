import { createApi } from './api';
import { ses } from './ses.js';
export function createSandbox(plugin) {
    ses.hardenIntrinsics();
    const pluginApi = createApi(plugin);
    const safeHandler = {
        get(target, prop, receiver) {
            const originalValue = Reflect.get(target, prop, receiver);
            if (typeof originalValue === 'function') {
                return function (...args) {
                    const result = originalValue.apply(target, args);
                    return ses.safeReturn(result);
                };
            }
            return ses.safeReturn(originalValue);
        },
    };
    const proxyApi = new Proxy(pluginApi.penpot, safeHandler);
    const safeFetch = (url, options) => {
        const sanitizedOptions = Object.assign(Object.assign({}, options), { credentials: 'omit', headers: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.headers), { Authorization: '' }) });
        return fetch(url, sanitizedOptions).then((response) => {
            const safeResponse = {
                ok: response.ok,
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                text: response.text.bind(response),
                json: response.json.bind(response),
            };
            return ses.safeReturn(safeResponse);
        });
    };
    const publicPluginApi = {
        penpot: proxyApi,
        fetch: ses.harden(safeFetch),
        setTimeout: ses.harden((...[handler, timeout]) => {
            const timeoutId = setTimeout(() => {
                handler();
            }, timeout);
            plugin.timeouts.add(timeoutId);
            return ses.safeReturn(timeoutId);
        }),
        clearTimeout: ses.harden((id) => {
            clearTimeout(id);
            plugin.timeouts.delete(id);
        }),
        /**
         * GLOBAL FUNCTIONS ACCESIBLE TO PLUGINS
         **/
        isFinite: ses.harden(isFinite),
        isNaN: ses.harden(isNaN),
        parseFloat: ses.harden(parseFloat),
        parseInt: ses.harden(parseInt),
        decodeURI: ses.harden(decodeURI),
        decodeURIComponent: ses.harden(decodeURIComponent),
        encodeURI: ses.harden(encodeURI),
        encodeURIComponent: ses.harden(encodeURIComponent),
        Object: ses.harden(Object),
        Boolean: ses.harden(Boolean),
        Symbol: ses.harden(Symbol),
        Number: ses.harden(Number),
        BigInt: ses.harden(BigInt),
        Math: ses.harden(Math),
        Date: ses.harden(Date),
        String: ses.harden(String),
        RegExp: ses.harden(RegExp),
        Array: ses.harden(Array),
        Int8Array: ses.harden(Int8Array),
        Uint8Array: ses.harden(Uint8Array),
        Uint8ClampedArray: ses.harden(Uint8ClampedArray),
        Int16Array: ses.harden(Int16Array),
        Uint16Array: ses.harden(Uint16Array),
        Int32Array: ses.harden(Int32Array),
        Uint32Array: ses.harden(Uint32Array),
        BigInt64Array: ses.harden(BigInt64Array),
        BigUint64Array: ses.harden(BigUint64Array),
        Float32Array: ses.harden(Float32Array),
        Float64Array: ses.harden(Float64Array),
        Map: ses.harden(Map),
        Set: ses.harden(Set),
        WeakMap: ses.harden(WeakMap),
        WeakSet: ses.harden(WeakSet),
        ArrayBuffer: ses.harden(ArrayBuffer),
        DataView: ses.harden(DataView),
        Atomics: ses.harden(Atomics),
        JSON: ses.harden(JSON),
        Promise: ses.harden(Promise),
        Proxy: ses.harden(Proxy),
        Intl: ses.harden(Intl),
        // Window properties
        console: ses.harden(window.console),
        devicePixelRatio: window.devicePixelRatio,
        atob: ses.harden(window.atob.bind(null)),
        btoa: ses.harden(window.btoa.bind(null)),
        structuredClone: ses.harden(window.structuredClone),
    };
    const compartment = ses.createCompartment(publicPluginApi);
    return {
        evaluate: () => {
            compartment.evaluate(plugin.code);
        },
        cleanGlobalThis: () => {
            Object.keys(publicPluginApi).forEach((key) => {
                delete compartment.globalThis[key];
            });
        },
        compartment,
    };
}
//# sourceMappingURL=create-sandbox.js.map