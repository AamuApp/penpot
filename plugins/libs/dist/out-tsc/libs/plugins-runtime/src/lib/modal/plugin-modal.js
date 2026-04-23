var _PluginModalElement_inner, _PluginModalElement_dragEvents;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
const closeSvg = `
<svg width="16"  height="16"xmlns="http://www.w3.org/2000/svg" fill="none"><g class="fills"><rect rx="0" ry="0" width="16" height="16" class="frame-background"/></g><g class="frame-children"><path d="M11.997 3.997 8 8l-3.997 4.003m-.006-8L8 8l4.003 3.997" class="fills"/><g class="strokes"><path d="M11.997 3.997 8 8l-3.997 4.003m-.006-8L8 8l4.003 3.997" style="fill: none; stroke-width: 1; stroke: rgb(143, 157, 163); stroke-opacity: 1; stroke-linecap: round;" class="stroke-shape"/></g></g></svg>`;
import { dragHandler } from '../drag-handler.js';
import modalCss from './plugin.modal.css?inline';
import { resizeModal } from '../create-modal.js';
const MIN_Z_INDEX = 3;
export class PluginModalElement extends HTMLElement {
    constructor() {
        super();
        this.wrapper = document.createElement('div');
        _PluginModalElement_inner.set(this, document.createElement('div'));
        _PluginModalElement_dragEvents.set(this, null);
        this.attachShadow({ mode: 'open' });
    }
    setTheme(theme) {
        if (this.wrapper) {
            this.wrapper.setAttribute('data-theme', theme);
        }
    }
    resize(width, height) {
        if (this.wrapper) {
            resizeModal(this, width, height);
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = __classPrivateFieldGet(this, _PluginModalElement_dragEvents, "f")) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    calculateZIndex() {
        const modals = document.querySelectorAll('plugin-modal');
        const zIndexModals = Array.from(modals)
            .filter((modal) => modal !== this)
            .map((modal) => {
            return Number(modal.style.zIndex);
        });
        const maxZIndex = Math.max(...zIndexModals, MIN_Z_INDEX);
        this.style.zIndex = (maxZIndex + 1).toString();
    }
    connectedCallback() {
        const title = this.getAttribute('title');
        const iframeSrc = this.getAttribute('iframe-src');
        const allowDownloads = this.getAttribute('allow-downloads') || false;
        if (!title || !iframeSrc) {
            throw new Error('title and iframe-src attributes are required');
        }
        if (!this.shadowRoot) {
            throw new Error('Error creating shadow root');
        }
        __classPrivateFieldGet(this, _PluginModalElement_inner, "f").classList.add('inner');
        this.wrapper.classList.add('wrapper');
        this.wrapper.style.maxInlineSize = '90vw';
        this.wrapper.style.maxBlockSize = '90vh';
        // move modal to the top
        __classPrivateFieldSet(this, _PluginModalElement_dragEvents, dragHandler(__classPrivateFieldGet(this, _PluginModalElement_inner, "f"), this.wrapper, () => {
            this.calculateZIndex();
        }), "f");
        const header = document.createElement('div');
        header.classList.add('header');
        const h1 = document.createElement('h1');
        h1.textContent = title;
        header.appendChild(h1);
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.innerHTML = `<div class="close">${closeSvg}</div>`;
        closeButton.addEventListener('click', () => {
            if (!this.shadowRoot) {
                return;
            }
            this.shadowRoot.dispatchEvent(new CustomEvent('close', {
                composed: true,
                bubbles: true,
            }));
        });
        header.appendChild(closeButton);
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.allow = '';
        iframe.sandbox.add('allow-scripts', 'allow-forms', 'allow-modals', 'allow-popups', 'allow-popups-to-escape-sandbox', 'allow-storage-access-by-user-activation', 'allow-same-origin');
        if (allowDownloads) {
            iframe.sandbox.add('allow-downloads');
        }
        iframe.addEventListener('load', () => {
            var _a;
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('load', {
                composed: true,
                bubbles: true,
            }));
        });
        this.addEventListener('message', (e) => {
            if (!iframe.contentWindow) {
                return;
            }
            try {
                iframe.contentWindow.postMessage(e.detail, '*');
            }
            catch (err) {
                console.error('plugin modal: failed to send message to iframe via postMessage.', err);
            }
        });
        this.shadowRoot.appendChild(this.wrapper);
        this.wrapper.appendChild(__classPrivateFieldGet(this, _PluginModalElement_inner, "f"));
        __classPrivateFieldGet(this, _PluginModalElement_inner, "f").appendChild(header);
        __classPrivateFieldGet(this, _PluginModalElement_inner, "f").appendChild(iframe);
        const style = document.createElement('style');
        style.textContent = modalCss;
        this.shadowRoot.appendChild(style);
        this.calculateZIndex();
    }
    size() {
        const width = Number(this.wrapper.style.width.replace('px', '') || '300');
        const height = Number(this.wrapper.style.height.replace('px', '') || '400');
        return { width, height };
    }
}
_PluginModalElement_inner = new WeakMap(), _PluginModalElement_dragEvents = new WeakMap();
customElements.define('plugin-modal', PluginModalElement);
//# sourceMappingURL=plugin-modal.js.map