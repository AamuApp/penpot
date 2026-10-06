export declare function getPenpotOrigin(): string;
/**
 * Whether the given URL is served from Penpot's own origin. Unparseable URLs
 * are considered external.
 */
export declare function isPenpotOrigin(url: string): boolean;
/**
 * Rejects UI URLs that resolve to Penpot's own origin, which would let the
 * plugin iframe escape its sandbox isolation.
 *
 * Plugins whose manifest is itself served from Penpot's origin are part of the
 * instance and are exempt from the check.
 */
export declare function validateUIUrl(url: string, manifestHost: string): void;
