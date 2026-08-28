// Browser-safe route-key helper shared by the client Seo component and the
// build-time OG scripts (og-pages.mjs, generate-og-images.mjs) so every
// consumer derives the same /og/<route-key>.png filename for a pathname.
export function ogRouteKey(pathname) {
    return pathname === '/' ? 'home' : pathname.slice(1).replaceAll('/', '-');
}
