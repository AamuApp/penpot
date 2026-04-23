import type { Context } from '@penpot/plugin-types';
import type { Manifest } from './models/manifest.model.js';
export declare function createPlugin(context: Context, manifest: Manifest, onCloseCallback: () => void): Promise<{
    plugin: {
        close: () => void;
        destroyListener: (listenerId: symbol) => void;
        openModal: (name: string, url: string, options?: import("./models/open-ui-options.model.js").OpenUIOptions) => void;
        resizeModal: (width: number, height: number) => void;
        getModal: () => import("./modal/plugin-modal.js").PluginModalElement | null;
        registerListener: import("./models/plugin.model.js").RegisterListener;
        registerMessageCallback: (callback: (message: unknown) => void) => void;
        sendMessage: (message: unknown) => void;
        readonly manifest: {
            code: string;
            pluginId: string;
            name: string;
            host: string;
            permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage")[];
            icon?: string | undefined;
            description?: string | undefined;
        };
        readonly context: Context;
        readonly timeouts: Set<NodeJS.Timeout>;
        readonly code: string;
    };
    manifest: {
        code: string;
        pluginId: string;
        name: string;
        host: string;
        permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage")[];
        icon?: string | undefined;
        description?: string | undefined;
    };
    compartment: {
        evaluate: () => void;
        cleanGlobalThis: () => void;
        compartment: Compartment;
    };
}>;
