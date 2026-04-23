import { z } from 'zod';
export declare const manifestSchema: z.ZodObject<{
    pluginId: z.ZodString;
    name: z.ZodString;
    host: z.ZodString;
    code: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    permissions: z.ZodArray<z.ZodEnum<["content:read", "content:write", "library:read", "library:write", "user:read", "comment:read", "comment:write", "allow:downloads", "allow:localstorage"]>, "many">;
}, "strip", z.ZodTypeAny, {
    code: string;
    pluginId: string;
    name: string;
    host: string;
    permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage")[];
    icon?: string | undefined;
    description?: string | undefined;
}, {
    code: string;
    pluginId: string;
    name: string;
    host: string;
    permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage")[];
    icon?: string | undefined;
    description?: string | undefined;
}>;
