type DragHandlerLifecycle = {
    start?: () => void;
    end?: () => void;
};
export declare const dragHandler: (el: HTMLElement, target?: HTMLElement, move?: () => void, lifecycle?: DragHandlerLifecycle) => () => void;
export {};
