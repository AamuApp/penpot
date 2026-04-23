export declare const ses: {
    hardenIntrinsics: () => void;
    createCompartment: (globals?: object) => Compartment;
    harden: (obj: object) => object;
    safeReturn<T>(value: T): T;
};
