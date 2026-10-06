import { z } from 'zod';
export declare const manifestSchema: z.ZodObject<{
    pluginId: z.ZodString;
    name: z.ZodString;
    host: z.ZodString;
    code: z.ZodString;
    icon: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    permissions: z.ZodArray<z.ZodEnum<["content:read", "content:write", "library:read", "library:write", "user:read", "comment:read", "comment:write", "allow:downloads", "allow:localstorage", "clipboard:read", "clipboard:write"]>, "many">;
}, "strip", z.ZodTypeAny, {
    code: string;
    pluginId: string;
    name: string;
    host: string;
    permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage" | "clipboard:read" | "clipboard:write")[];
    icon?: string | undefined;
    version?: number | undefined;
    description?: string | undefined;
}, {
    code: string;
    pluginId: string;
    name: string;
    host: string;
    permissions: ("content:read" | "content:write" | "library:read" | "library:write" | "user:read" | "comment:read" | "comment:write" | "allow:downloads" | "allow:localstorage" | "clipboard:read" | "clipboard:write")[];
    icon?: string | undefined;
    version?: number | undefined;
    description?: string | undefined;
}>;
