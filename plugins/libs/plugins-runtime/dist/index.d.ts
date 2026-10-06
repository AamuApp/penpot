import { Context } from '../libs/plugin-types/index.d.ts';
export { isPluginError } from './lib/create-sandbox.js';
export declare const initPluginsRuntime: (contextBuilder: (id: string) => Context) => void;
