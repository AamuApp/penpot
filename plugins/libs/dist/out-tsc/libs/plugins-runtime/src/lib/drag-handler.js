import { parseTranslate } from './parse-translate';
export const dragHandler = (el, target = el, move) => {
    let initialTranslate = { x: 0, y: 0 };
    let initialClientPosition = { x: 0, y: 0 };
    const handleMouseMove = (moveEvent) => {
        const { clientX: moveX, clientY: moveY } = moveEvent;
        const deltaX = moveX - initialClientPosition.x + initialTranslate.x;
        const deltaY = moveY - initialClientPosition.y + initialTranslate.y;
        target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        move === null || move === void 0 ? void 0 : move();
    };
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    const handleMouseDown = (e) => {
        initialClientPosition = { x: e.clientX, y: e.clientY };
        initialTranslate = parseTranslate(target);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    el.addEventListener('mousedown', handleMouseDown);
    return handleMouseUp;
};
//# sourceMappingURL=drag-handler.js.map