# Cloudflare Web Analytics Setup

> How to get a real Web Analytics token and replace the `CF_ANALYTICS_TOKEN_PLACEHOLDER` in `index.html`.

## What's already in place

`index.html` includes the standard Cloudflare Web Analytics beacon at the end of `<head>`:

```html
<!-- Cloudflare Web Analytics — get the real token from the Cloudflare dashboard → Web Analytics (see docs/analytics-setup.md) -->
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "CF_ANALYTICS_TOKEN_PLACEHOLDER"}'
></script>
```

It does nothing until the placeholder token is replaced with a real one.

## Get the token

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. In the left sidebar, go to **Analytics & Logs → Web Analytics** (on some accounts it appears as a top-level **Web Analytics** item).
3. Click **Add a site**.
4. Enter the hostname: `evanjacobson.io`.
5. Cloudflare shows a JS snippet like:

   ```html
   <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "abc123def456..."}'></script>
   ```

6. Copy only the token value (the string inside `"token": "..."`).

Note: because the site is deployed to Cloudflare Pages, Cloudflare may also offer to enable Web Analytics automatically from the Pages project settings (**Workers & Pages → your project → Metrics → Enable Web Analytics**). If you enable it that way, Cloudflare injects the beacon itself and the manual snippet in `index.html` should be removed to avoid double-counting. Prefer one approach only — the manual snippet is the one this repo assumes.

## Replace the placeholder

In `index.html`, replace `CF_ANALYTICS_TOKEN_PLACEHOLDER` with the real token:

```html
data-cf-beacon='{"token": "your-real-token-here"}'
```

That is the only change needed — the script tag itself is already correct.

## Verify it works

1. Deploy (push to the branch Cloudflare Pages builds from).
2. Visit https://evanjacobson.io and check the Network tab in DevTools for a request to `cloudflareinsights.com` (the beacon POST). Ad blockers commonly block this request, so test with blockers disabled.
3. Within a few minutes, page views appear in the dashboard under **Web Analytics → evanjacobson.io**.

## What you get

- Page views, visits, and top pages (watch `/work/*`, `/toolbox/*`, `/apps/*` once programmatic SEO pages are indexed)
- Referrers, countries, device types, and Core Web Vitals
- No cookies, no user tracking — free and privacy-friendly, no impact on the site's cookie/consent posture
