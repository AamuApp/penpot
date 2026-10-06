import { createPluginManager } from './plugin-manager';
/**
 * Checks if an error originated from plugin code.
 */
export declare function isPluginError(error: unknown): boolean;
/**
 * Marks an error as originating from plugin code.
 * Uses a WeakMap so it works even if the error object is frozen.
 */
export declare function markPluginError(error: unknown): void;
export declare function createSandbox(plugin: Awaited<ReturnType<typeof createPluginManager>>, apiExtensions?: object): {
    evaluate: () => void;
    cleanGlobalThis: () => void;
    compartment: Compartment;
};
