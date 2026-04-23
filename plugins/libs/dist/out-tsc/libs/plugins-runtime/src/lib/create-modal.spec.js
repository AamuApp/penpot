import { describe, it, expect, vi } from 'vitest';
import { createModal } from './create-modal.js';
describe('createModal', () => {
    const modalMock = {
        setTheme: vi.fn(),
        style: {
            setProperty: vi.fn(),
            getPropertyValue: vi.fn(),
        },
        wrapper: {
            style: {},
        },
        setAttribute: vi.fn(),
    };
    const appendChildSpy = vi
        .spyOn(document.body, 'appendChild')
        .mockReturnValue(modalMock);
    const createElementSpy = vi
        .spyOn(document, 'createElement')
        .mockReturnValue(modalMock);
    afterEach(() => {
        document.body.innerHTML = '';
        vi.clearAllMocks();
    });
    it('should create and configure a modal element', () => {
        const theme = 'light';
        const options = { width: 400, height: 600 };
        const modal = createModal('Test Modal', 'https://example.com', theme, options);
        expect(createElementSpy).toHaveBeenCalledWith('plugin-modal');
        expect(modal.setTheme).toHaveBeenCalledWith(theme);
        expect(modal.style.setProperty).toHaveBeenCalledWith('--modal-block-start', '40px');
        expect(modal.setAttribute).toHaveBeenCalledWith('title', 'Test Modal');
        expect(modal.setAttribute).toHaveBeenCalledWith('iframe-src', 'https://example.com');
        expect(modal.wrapper.style.width).toEqual('400px');
        expect(modal.wrapper.style.height).toEqual('600px');
        expect(appendChildSpy).toHaveBeenCalledWith(modal);
    });
    it('should apply default dimensions if options are not provided', () => {
        const theme = 'light';
        const modal = createModal('Test Modal', 'https://example.com', theme);
        expect(modal.wrapper.style.width).toEqual('335px');
        expect(modal.wrapper.style.height).toEqual('590px');
    });
    it('should limit modal dimensions to the window size', () => {
        const theme = 'light';
        const options = { width: 2000, height: 2000 };
        window.innerWidth = 1000;
        window.innerHeight = 800;
        const modal = createModal('Test Modal', 'https://example.com', theme, options);
        const expectedWidth = 960;
        const expectedHeight = 760;
        expect(modal.wrapper.style.width).toEqual(`${expectedWidth}px`);
        expect(modal.wrapper.style.height).toEqual(`${expectedHeight}px`);
    });
    it('should apply minimum dimensions to the modal', () => {
        const theme = 'light';
        const options = { width: 100, height: 100 };
        const modal = createModal('Test Modal', 'https://example.com', theme, options);
        expect(modal.wrapper.style.width).toEqual('200px');
        expect(modal.wrapper.style.height).toEqual('200px');
    });
});
//# sourceMappingURL=create-modal.spec.js.map