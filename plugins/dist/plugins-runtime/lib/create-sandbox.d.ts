import { createPluginManager } from './plugin-manager';
export declare function createSandbox(plugin: Awaited<ReturnType<typeof createPluginManager>>): {
    evaluate: () => void;
    cleanGlobalThis: () => void;
    compartment: Compartment;
};
