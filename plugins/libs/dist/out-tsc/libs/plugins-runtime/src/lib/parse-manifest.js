import { manifestSchema } from './models/manifest.schema.js';
export function getValidUrl(host, path) {
    return new URL(path, host).toString();
}
export function loadManifest(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((manifest) => {
        const parseResult = manifestSchema.safeParse(manifest);
        if (!parseResult.success) {
            throw new Error('Invalid plugin manifest');
        }
        return manifest;
    })
        .catch((error) => {
        console.error(error);
        throw error;
    });
}
export function loadManifestCode(manifest) {
    if (!manifest.host && !manifest.code.startsWith('http')) {
        return Promise.resolve(manifest.code);
    }
    return fetch(getValidUrl(manifest.host, manifest.code)).then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Failed to load plugin code');
    });
}
//# sourceMappingURL=parse-manifest.js.map