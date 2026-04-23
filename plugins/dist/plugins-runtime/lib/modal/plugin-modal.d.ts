import { Theme } from '../../../../plugin-types/index.d.ts';
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
