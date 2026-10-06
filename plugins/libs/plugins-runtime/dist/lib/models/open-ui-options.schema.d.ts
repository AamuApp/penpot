import { z } from 'zod';
export declare const openUISchema: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodNumber;
    hidden: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    width: number;
    height: number;
    hidden?: boolean | undefined;
}, {
    width: number;
    height: number;
    hidden?: boolean | undefined;
}>;
