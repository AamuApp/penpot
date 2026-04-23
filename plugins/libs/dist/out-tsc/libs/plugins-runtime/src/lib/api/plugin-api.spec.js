import { expect, describe, vi } from 'vitest';
import { createApi } from './index.js';
const mockUrl = 'http://fake.fake/';
describe('Plugin api', () => {
    function generateMockPluginManager() {
        return {
            manifest: {
                pluginId: 'test',
                name: 'test',
                code: '',
                host: mockUrl,
                permissions: [
                    'content:read',
                    'content:write',
                    'library:read',
                    'library:write',
                    'user:read',
                    'comment:read',
                    'comment:write',
                    'allow:downloads',
                    'allow:localstorage',
                ],
            },
            openModal: vi.fn(),
            getModal: vi.fn(),
            registerMessageCallback: vi.fn(),
            close: vi.fn(),
            registerListener: vi.fn(),
            destroyListener: vi.fn(),
            context: {
                currentFile: null,
                currentPage: null,
                selection: [],
                theme: 'dark',
                addListener: vi.fn().mockReturnValueOnce(Symbol()),
                removeListener: vi.fn(),
            },
        };
    }
    let api;
    let pluginManager;
    beforeEach(() => {
        pluginManager = generateMockPluginManager();
        api = createApi(pluginManager);
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    describe('ui', () => {
        describe.concurrent('permissions', () => {
            const api = createApi(Object.assign(Object.assign({}, pluginManager), { permissions: [] }));
            it('on', () => {
                const callback = vi.fn();
                expect(() => {
                    api.penpot.on('filechange', callback);
                }).toThrow();
                expect(() => {
                    api.penpot.on('pagechange', callback);
                }).toThrow();
                expect(() => {
                    api.penpot.on('selectionchange', callback);
                }).toThrow();
            });
        });
        it('get file state', () => {
            const examplePage = {
                name: 'test',
                id: '123',
            };
            pluginManager.context.currentPage = examplePage;
            const pageState = api.penpot.currentPage;
            expect(pageState).toEqual(examplePage);
        });
        it('get page state', () => {
            const exampleFile = {
                name: 'test',
                id: '123',
                revn: 0,
            };
            pluginManager.context.currentFile = exampleFile;
            const fileState = api.penpot.currentFile;
            expect(fileState).toEqual(exampleFile);
        });
        it('get selection', () => {
            const selection = [
                { id: '123', name: 'test' },
                { id: 'abc', name: 'test2' },
            ];
            pluginManager.context.selection = selection;
            const currentSelection = api.penpot.selection;
            expect(currentSelection).toEqual(selection);
        });
    });
});
//# sourceMappingURL=plugin-api.spec.js.map