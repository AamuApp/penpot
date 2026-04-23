import { Penpot } from '../../../../plugin-types/index.d.ts';
import { createPluginManager } from '../plugin-manager.js';
export declare const validEvents: readonly ["finish", "pagechange", "filechange", "selectionchange", "themechange", "shapechange", "contentsave"];
export declare function createApi(plugin: Awaited<ReturnType<typeof createPluginManager>>): {
    penpot: Penpot;
};
