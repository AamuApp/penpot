import type { Context } from '@penpot/plugin-types';
import { Manifest } from './models/manifest.model.js';
import { PluginModalElement } from './modal/plugin-modal.js';
import { OpenUIOptions } from './models/open-ui-options.model.js';
import { RegisterListener } from './models/plugin.model.js';
export declare function createPluginManager(context: Context, manifest: Manifest, onCloseCallback: () => void, onReloadModal: (code: string) => void): Promise<{
    close: () => void;
    destroyListener: (listenerId: symbol) => void;
    openModal: (name: string, url: string, options?: OpenUIOptions) => void;
    resizeModal: (width: number, height: number) => void;
    getModal: () => PluginModalElement | null;
    registerListener: RegisterListener;
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
}>;
