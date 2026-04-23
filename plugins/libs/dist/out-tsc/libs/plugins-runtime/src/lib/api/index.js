import { z } from 'zod';
export const validEvents = [
    'finish',
    'pagechange',
    'filechange',
    'selectionchange',
    'themechange',
    'shapechange',
    'contentsave',
];
export function createApi(plugin) {
    const checkPermission = (permission) => {
        if (!plugin.manifest.permissions.includes(permission)) {
            throw new Error(`Permission ${permission} is not granted`);
        }
    };
    const penpot = {
        ui: {
            open: (name, url, options) => {
                plugin.openModal(name, url, options);
            },
            get size() {
                var _a;
                return ((_a = plugin.getModal()) === null || _a === void 0 ? void 0 : _a.size()) || null;
            },
            resize: (width, height) => {
                return plugin.resizeModal(width, height);
            },
            sendMessage(message) {
                var _a;
                let cloneableMessage;
                try {
                    cloneableMessage = structuredClone(message);
                }
                catch (err) {
                    console.error('plugin sendMessage: the message could not be cloned. ' +
                        'Ensure the message does not contain functions, DOM nodes, or other non-serializable values.', err);
                    return;
                }
                const event = new CustomEvent('message', {
                    detail: cloneableMessage,
                });
                (_a = plugin.getModal()) === null || _a === void 0 ? void 0 : _a.dispatchEvent(event);
            },
            onMessage: (callback) => {
                z.function().parse(callback);
                plugin.registerMessageCallback(callback);
            },
        },
        utils: {
            geometry: {
                center(shapes) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    return window.app.plugins.public_utils.centerShapes(shapes);
                },
            },
            types: {
                isBoard(shape) {
                    return shape.type === 'board';
                },
                isGroup(shape) {
                    return shape.type === 'group';
                },
                isMask(shape) {
                    return shape.type === 'group' && shape.isMask();
                },
                isBool(shape) {
                    return shape.type === 'boolean';
                },
                isRectangle(shape) {
                    return shape.type === 'rectangle';
                },
                isPath(shape) {
                    return shape.type === 'path';
                },
                isText(shape) {
                    return shape.type === 'text';
                },
                isEllipse(shape) {
                    return shape.type === 'ellipse';
                },
                isSVG(shape) {
                    return shape.type === 'svg-raw';
                },
                isVariantContainer(shape) {
                    return shape.type === 'board' && shape.isVariantContainer();
                },
                isVariantComponent(component) {
                    return component.isVariant();
                },
            },
        },
        closePlugin: () => {
            plugin.close();
        },
        on(type, callback, props) {
            // z.function alter fn, so can't use it here
            z.enum(validEvents).parse(type);
            z.function().parse(callback);
            // To suscribe to events needs the read permission
            checkPermission('content:read');
            return plugin.registerListener(type, callback, props);
        },
        off(eventId) {
            plugin.destroyListener(eventId);
        },
        // Penpot State API
        get root() {
            checkPermission('content:read');
            return plugin.context.root;
        },
        get currentFile() {
            checkPermission('content:read');
            return plugin.context.currentFile;
        },
        get currentPage() {
            checkPermission('content:read');
            return plugin.context.currentPage;
        },
        get selection() {
            checkPermission('content:read');
            return plugin.context.selection;
        },
        set selection(value) {
            checkPermission('content:read');
            plugin.context.selection = value;
        },
        get viewport() {
            return plugin.context.viewport;
        },
        get history() {
            return plugin.context.history;
        },
        get library() {
            checkPermission('library:read');
            return plugin.context.library;
        },
        get fonts() {
            checkPermission('content:read');
            return plugin.context.fonts;
        },
        get flags() {
            return plugin.context.flags;
        },
        get currentUser() {
            checkPermission('user:read');
            return plugin.context.currentUser;
        },
        get activeUsers() {
            checkPermission('user:read');
            return plugin.context.activeUsers;
        },
        shapesColors(shapes) {
            checkPermission('content:read');
            return plugin.context.shapesColors(shapes);
        },
        replaceColor(shapes, oldColor, newColor) {
            checkPermission('content:write');
            return plugin.context.replaceColor(shapes, oldColor, newColor);
        },
        get theme() {
            return plugin.context.theme;
        },
        get localStorage() {
            checkPermission('allow:localstorage');
            return plugin.context.localStorage;
        },
        createBoard() {
            checkPermission('content:write');
            return plugin.context.createBoard();
        },
        createRectangle() {
            checkPermission('content:write');
            return plugin.context.createRectangle();
        },
        createEllipse() {
            checkPermission('content:write');
            return plugin.context.createEllipse();
        },
        createText(text) {
            checkPermission('content:write');
            return plugin.context.createText(text);
        },
        createPath() {
            checkPermission('content:write');
            return plugin.context.createPath();
        },
        createBoolean(boolType, shapes) {
            checkPermission('content:write');
            return plugin.context.createBoolean(boolType, shapes);
        },
        createShapeFromSvg(svgString) {
            checkPermission('content:write');
            return plugin.context.createShapeFromSvg(svgString);
        },
        createShapeFromSvgWithImages(svgString) {
            checkPermission('content:write');
            return plugin.context.createShapeFromSvgWithImages(svgString);
        },
        group(shapes) {
            checkPermission('content:write');
            return plugin.context.group(shapes);
        },
        ungroup(group, ...other) {
            checkPermission('content:write');
            plugin.context.ungroup(group, ...other);
        },
        uploadMediaUrl(name, url) {
            checkPermission('content:write');
            return plugin.context.uploadMediaUrl(name, url);
        },
        uploadMediaData(name, data, mimeType) {
            checkPermission('content:write');
            return plugin.context.uploadMediaData(name, data, mimeType);
        },
        generateMarkup(shapes, options) {
            checkPermission('content:read');
            return plugin.context.generateMarkup(shapes, options);
        },
        generateStyle(shapes, options) {
            checkPermission('content:read');
            return plugin.context.generateStyle(shapes, options);
        },
        generateFontFaces(shapes) {
            checkPermission('content:read');
            return plugin.context.generateFontFaces(shapes);
        },
        openViewer() {
            checkPermission('content:read');
            plugin.context.openViewer();
        },
        createPage() {
            checkPermission('content:write');
            return plugin.context.createPage();
        },
        openPage(page, newWindow) {
            checkPermission('content:read');
            plugin.context.openPage(page, newWindow !== null && newWindow !== void 0 ? newWindow : false);
        },
        alignHorizontal(shapes, direction) {
            checkPermission('content:write');
            plugin.context.alignHorizontal(shapes, direction);
        },
        alignVertical(shapes, direction) {
            checkPermission('content:write');
            plugin.context.alignVertical(shapes, direction);
        },
        distributeHorizontal(shapes) {
            checkPermission('content:write');
            plugin.context.distributeHorizontal(shapes);
        },
        distributeVertical(shapes) {
            checkPermission('content:write');
            plugin.context.distributeVertical(shapes);
        },
        flatten(shapes) {
            checkPermission('content:write');
            return plugin.context.flatten(shapes);
        },
    };
    return {
        penpot,
    };
}
//# sourceMappingURL=index.js.map