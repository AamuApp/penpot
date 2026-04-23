import type { Penpot } from '@penpot/plugin-types';
import { createPluginManager } from '../plugin-manager.js';
export declare const validEvents: readonly ["finish", "pagechange", "filechange", "selectionchange", "themechange", "shapechange", "contentsave"];
export declare function createApi(plugin: Awaited<ReturnType<typeof createPluginManager>>): {
    penpot: Penpot;
};
