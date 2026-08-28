# Google Search Console & Bing Webmaster Tools Setup

> Step-by-step: verify `evanjacobson.io`, submit the sitemap, and what to monitor while the programmatic SEO pages get indexed.

## 1. Verify evanjacobson.io in Google Search Console

Use a **Domain property** (covers `https`, `http`, `www`, and all subdomains) with the **DNS TXT record** method — recommended here because DNS for `evanjacobson.io` is already managed in Cloudflare, so adding a record takes seconds.

1. Go to [Google Search Console](https://search.google.com/search-console) and sign in.
2. Click the property dropdown (top left) → **Add property**.
3. Choose the **Domain** option (left card) and enter `evanjacobson.io` (no `https://`, no `www`).
4. Google shows a TXT record like:

   ```
   google-site-verification=AbCdEfGh1234...
   ```

   Copy it.
5. In a separate tab, open the [Cloudflare dashboard](https://dash.cloudflare.com/) → select the `evanjacobson.io` zone → **DNS → Records** → **Add record**:
   - **Type:** `TXT`
   - **Name:** `@` (the root domain)
   - **Content:** the full `google-site-verification=...` string
   - **TTL:** Auto
6. Save, return to Search Console, and click **Verify**. Cloudflare DNS propagates almost immediately; if verification fails, wait a few minutes and retry.

Leave the TXT record in place permanently — Google re-checks it periodically and the property un-verifies if the record is removed.

## 2. Submit the sitemap

1. In Search Console, select the `evanjacobson.io` property.
2. Left sidebar → **Sitemaps** (under "Indexing").
3. Enter `https://evanjacobson.io/sitemap.xml` and click **Submit**.
4. Status should change to **Success** within a day, with a discovered-URL count matching the sitemap.

The sitemap is served from `public/sitemap.xml` (currently hand-written; a later phase generates it from route data). If the URL count in Search Console ever looks stale after adding pages, re-submit the same sitemap URL to nudge a re-crawl.

## 3. Bing Webmaster Tools (import from Google)

Bing can import a verified Search Console property directly — no separate verification needed.

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) and sign in (Microsoft, Google, or Facebook account).
2. On the "Add your site" screen, choose **Import your sites from GSC** (the left option).
3. Authorize with the same Google account used for Search Console.
4. Select the `evanjacobson.io` property and import. Verification status and the sitemap carry over.
5. Confirm under **Sitemaps** that `https://evanjacobson.io/sitemap.xml` is listed; add it manually if the import did not bring it in.

This also feeds DuckDuckGo and other engines that use Bing's index.

## 4. What to monitor in the first weeks

Check Search Console every few days at first, then weekly.

### Indexing → Pages (coverage)

- **Indexed page count trending up.** The site prerenders per-route HTML at build time (`scripts/generate-static-routes.mjs`), so Google should index pages without needing JS rendering. Expect the count to climb toward the sitemap's URL total over 1–4 weeks.
- **Per-section progress.** Use the URL filter (or the `Indexing → Pages` table) to watch the three programmatic sections specifically:
  - `/work/` — project case-study pages
  - `/toolbox/` — toolbox pages
  - `/apps/` — app pages
- **"Crawled – currently not indexed" / "Discovered – currently not indexed".** Normal early on for a new small site; a problem only if pages sit there for a month-plus. Thin or near-duplicate content is the usual cause.
- **"Page with redirect" / "Duplicate without user-selected canonical".** Watch for these on SPA routes — they usually mean the canonical tag or `_redirects` rules disagree with the sitemap URLs.
- **Soft 404s.** If a `/work/:slug` URL for a removed project stays in the sitemap, Google flags it; keep the sitemap in sync with `src/data/work.js`.

### URL Inspection (spot checks)

Inspect a handful of representative URLs (`/`, `/work`, one `/work/:slug`, one `/toolbox/` page, one `/apps/` page):

- **"URL is on Google"** with the correct canonical.
- **View crawled page → HTML** should show the prerendered content (real `<title>`, meta description, and the `structured-data` JSON-LD), not an empty `#root`.
- Use **Request indexing** on key pages to speed up the first crawl.

### Performance report

- Impressions typically show up before clicks — rising impressions in weeks 1–3 mean indexing is working.
- Watch which queries surface `/work/` pages; that validates the programmatic SEO targeting.

### Other

- **Sitemaps report:** discovered vs. indexed counts per submission.
- **Enhancements / Structured data:** the JSON-LD (`ProfilePage` / `Person`) should register without errors.
- **Bing Webmaster Tools:** mirror-check Site Explorer and the sitemap status weekly; Bing usually indexes slower.
- **Cloudflare Web Analytics** (see `docs/analytics-setup.md`): referrer data will show when organic traffic from Google/Bing starts arriving.
