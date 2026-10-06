import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import './plugin-modal.js';
function createPointerEvent(type, init = {}) {
    var _a, _b, _c, _d;
    const event = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: (_a = init.clientX) !== null && _a !== void 0 ? _a : 0,
        clientY: (_b = init.clientY) !== null && _b !== void 0 ? _b : 0,
        button: (_c = init.button) !== null && _c !== void 0 ? _c : 0,
    });
    Object.defineProperty(event, 'pointerId', {
        configurable: true,
        value: (_d = init.pointerId) !== null && _d !== void 0 ? _d : 1,
    });
    return event;
}
describe('PluginModalElement', () => {
    let setPointerCaptureSpy;
    let releasePointerCaptureSpy;
    let hasPointerCaptureSpy;
    let originalSetPointerCapture;
    let originalReleasePointerCapture;
    let originalHasPointerCapture;
    beforeEach(() => {
        originalSetPointerCapture = HTMLElement.prototype.setPointerCapture;
        originalReleasePointerCapture = HTMLElement.prototype.releasePointerCapture;
        originalHasPointerCapture = HTMLElement.prototype.hasPointerCapture;
        setPointerCaptureSpy = vi.fn();
        releasePointerCaptureSpy = vi.fn();
        hasPointerCaptureSpy = vi.fn().mockReturnValue(true);
        Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
            configurable: true,
            value: setPointerCaptureSpy,
        });
        Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
            configurable: true,
            value: releasePointerCaptureSpy,
        });
        Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
            configurable: true,
            value: hasPointerCaptureSpy,
        });
    });
    afterEach(() => {
        document.body.innerHTML = '';
        Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
            configurable: true,
            value: originalSetPointerCapture,
        });
        Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
            configurable: true,
            value: originalReleasePointerCapture,
        });
        Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
            configurable: true,
            value: originalHasPointerCapture,
        });
        vi.restoreAllMocks();
    });
    it('should not start dragging on close button pointerdown', () => {
        const modal = document.createElement('plugin-modal');
        modal.setAttribute('title', 'Test modal');
        modal.setAttribute('iframe-src', 'about:blank');
        document.body.appendChild(modal);
        const shadow = modal.shadowRoot;
        expect(shadow).toBeTruthy();
        const wrapper = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('.wrapper');
        const closeButton = shadow === null || shadow === void 0 ? void 0 : shadow.querySelector('button');
        expect(wrapper).toBeTruthy();
        expect(closeButton).toBeTruthy();
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.dispatchEvent(createPointerEvent('pointerdown', {
            pointerId: 11,
            button: 0,
        }));
        expect(wrapper === null || wrapper === void 0 ? void 0 : wrapper.classList.contains('is-dragging')).toBe(false);
        expect(setPointerCaptureSpy).not.toHaveBeenCalled();
        modal.remove();
    });
    it('should set iframe allow attribute for clipboard permissions', () => {
        var _a;
        const modal = document.createElement('plugin-modal');
        modal.setAttribute('title', 'Test modal');
        modal.setAttribute('iframe-src', 'about:blank');
        modal.setAttribute('allow-clipboard-read', 'true');
        modal.setAttribute('allow-clipboard-write', 'true');
        document.body.appendChild(modal);
        const iframe = (_a = modal.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('iframe');
        expect(iframe).toBeTruthy();
        expect(iframe === null || iframe === void 0 ? void 0 : iframe.allow).toContain('clipboard-read');
        expect(iframe === null || iframe === void 0 ? void 0 : iframe.allow).toContain('clipboard-write');
        modal.remove();
    });
    it('should not set clipboard allow attributes when permissions are absent', () => {
        var _a;
        const modal = document.createElement('plugin-modal');
        modal.setAttribute('title', 'Test modal');
        modal.setAttribute('iframe-src', 'about:blank');
        document.body.appendChild(modal);
        const iframe = (_a = modal.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('iframe');
        expect(iframe).toBeTruthy();
        expect(iframe === null || iframe === void 0 ? void 0 : iframe.allow).toBe('');
        modal.remove();
    });
    it('should dispatch close event when close button is clicked', () => {
        var _a;
        const modal = document.createElement('plugin-modal');
        modal.setAttribute('title', 'Test modal');
        modal.setAttribute('iframe-src', 'about:blank');
        const onClose = vi.fn();
        modal.addEventListener('close', onClose);
        document.body.appendChild(modal);
        const closeButton = (_a = modal.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('button');
        expect(closeButton).toBeTruthy();
        closeButton === null || closeButton === void 0 ? void 0 : closeButton.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));
        expect(onClose).toHaveBeenCalledTimes(1);
        modal.remove();
    });
});
//# sourceMappingURL=plugin-modal.spec.js.map