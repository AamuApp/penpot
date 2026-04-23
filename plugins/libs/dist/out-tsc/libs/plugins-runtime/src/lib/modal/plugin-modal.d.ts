import type { Theme } from '@penpot/plugin-types';
export declare class PluginModalElement extends HTMLElement {
    #private;
    constructor();
    wrapper: HTMLDivElement;
    setTheme(theme: Theme): void;
    resize(width: number, height: number): void;
    disconnectedCallback(): void;
    calculateZIndex(): void;
    connectedCallback(): void;
    size(): {
        width: number;
        height: number;
    };
}
