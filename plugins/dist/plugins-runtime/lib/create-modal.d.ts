import { OpenUIOptions } from './models/open-ui-options.model.js';
import { Theme } from '../../../plugin-types/index.d.ts';
import { PluginModalElement } from './modal/plugin-modal.js';
export declare function createModal(name: string, url: string, theme: Theme, options?: OpenUIOptions, allowDownloads?: boolean): PluginModalElement;
export declare function resizeModal(modal: PluginModalElement, width?: number, height?: number): {
    width: number;
    height: number;
};
