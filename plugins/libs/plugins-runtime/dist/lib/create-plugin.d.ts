import { Context } from '../../libs/plugin-types/index.d.ts';
import { Manifest } from './models/manifest.model.js';
export declare function createPlugin(context: Context, manifest: Manifest, onCloseCallback: () => void, apiExtensions?: object): Promise<{
    plugin: {
        close: () => void;
        destroyListener: (listenerId: symbol) => void;
        openModal: (name: string, url: string, options?: import('./models/open-ui-options.model.js').OpenUIOptions) => void;
        resizeModal: (width: number, height: number) => void;
        getModal: () => import('./modal/plugin-modal.js').PluginModalElement | null;
        registerListener: import('./models/plugin.model.js').RegisterListener;
        registerMessageCallback: (callback: (message: unknown) => void) => void;
        sendMessage: (message: unknown) => void;
        readonly manifest: {
            code: string;
            pluginId: string;
            name: string;
            host: string;
            permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage" | "clipboard:read" | "clipboard:write")[];
            icon?: string | undefined;
            version?: number | undefined;
            description?: string | undefined;
        };
        readonly context: Context;
        readonly timeouts: Set<NodeJS.Timeout>;
        readonly intervals: Set<NodeJS.Timeout>;
        readonly code: string;
    };
    manifest: {
        code: string;
        pluginId: string;
        name: string;
        host: string;
        permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage" | "clipboard:read" | "clipboard:write")[];
        icon?: string | undefined;
        version?: number | undefined;
        description?: string | undefined;
    };
    compartment: {
        evaluate: () => void;
        cleanGlobalThis: () => void;
        compartment: Compartment;
    };
}>;
