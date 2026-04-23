import { Manifest } from './models/manifest.model.js';
export declare function getValidUrl(host: string, path: string): string;
export declare function loadManifest(url: string): Promise<Manifest>;
export declare function loadManifestCode(manifest: Manifest): Promise<string>;
