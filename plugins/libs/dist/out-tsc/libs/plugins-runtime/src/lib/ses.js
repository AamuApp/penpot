let isLockedDown = false;
export const ses = {
    hardenIntrinsics: () => {
        if (!isLockedDown) {
            isLockedDown = true;
            hardenIntrinsics();
        }
    },
    createCompartment: (globals) => {
        return new Compartment(globals);
    },
    harden: (obj) => {
        return harden(obj);
    },
    safeReturn(value) {
        if (value === null || value === undefined) {
            return value;
        }
        return harden(value);
    },
};
//# sourceMappingURL=ses.js.map