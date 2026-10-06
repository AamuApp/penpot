import { Manifest } from './models/manifest.model.js';
export declare function getValidUrl(host: string, path: string): URL;
export declare function prepareUrl(manifest: Manifest, url: string, params: object): string;
export declare function loadManifest(url: string): Promise<Manifest>;
export declare function loadManifestCode(manifest: Manifest): Promise<string>;
