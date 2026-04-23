export const parseTranslate = (el) => {
    let x = 0;
    let y = 0;
    if (el && window['DOMMatrixReadOnly']) {
        const cs = window.getComputedStyle(el);
        const matrix = new DOMMatrixReadOnly(cs.transform);
        x = matrix.m41;
        y = matrix.m42;
    }
    return { x, y };
};
//# sourceMappingURL=parse-translate.js.map