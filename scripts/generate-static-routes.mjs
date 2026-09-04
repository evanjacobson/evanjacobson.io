import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import projects from '../src/data/work.js';
import tools, { categories } from '../src/data/toolbox.js';
import apps from '../src/data/apps.js';
import { ogRouteKey } from './og-pages.mjs';
import { collectionSchema, jsonLd, pageSchema } from '../src/data/pageSchema.js';

const DIST_DIR = path.resolve('dist');
const SITE_URL = 'https://evanjacobson.io';
const baseHtml = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8');

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function renderProject(project) {
    const paragraphs = project.content.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
    const technologies = project.techStack.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    const links = project.links.map((item) => `<li><a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a></li>`).join('');

    return `<main>
      <article>
        <p><a href="/work">AI engineering case studies</a></p>
        <h1>${escapeHtml(project.title)}</h1>
        <p>${escapeHtml(project.role)} · ${escapeHtml(project.dateRange)}</p>
        <p>${escapeHtml(project.subtitle)}</p>
        <p>${escapeHtml(project.cardDescription)}</p>
        <section aria-label="Project details">${paragraphs}</section>
        ${technologies ? `<section><h2>Technologies</h2><ul>${technologies}</ul></section>` : ''}
        ${links ? `<section><h2>Primary links</h2><ul>${links}</ul></section>` : ''}
      </article>
    </main>`;
}

function renderWorkIndex() {
    const items = projects.map((project) => `
      <article>
        <h2><a href="/work/${escapeHtml(project.slug)}">${escapeHtml(project.title)}</a></h2>
        <p>${escapeHtml(project.subtitle)}</p>
        <p>${escapeHtml(project.cardDescription)}</p>
      </article>`).join('');

    return `<main>
      <h1>Production AI systems and engineering work</h1>
      <p>Case studies across agentic AI, multi-agent workflows, LLM applications, coding-agent infrastructure, and full-stack AI product engineering.</p>
      ${items}
    </main>`;
}

function renderTool(tool) {
    const paragraphs = tool.body.map((item) => `<p>${escapeHtml(item)}</p>`).join('');

    return `<main>
      <article>
        <p><a href="/toolbox">AI engineering toolbox</a></p>
        <h1>${escapeHtml(tool.name)}</h1>
        <p>${escapeHtml(categories[tool.category].title)} · ${escapeHtml(tool.statusLabel)}</p>
        <p>${escapeHtml(tool.description)}</p>
        <section aria-label="How I use it">${paragraphs}</section>
        <section><h2>Official site</h2><p><a href="${escapeHtml(tool.url)}">Visit ${escapeHtml(tool.name)}</a></p></section>
      </article>
    </main>`;
}

function renderApp(app) {
    const paragraphs = app.body.map((item) => `<p>${escapeHtml(item)}</p>`).join('');

    return `<main>
      <article>
        <p><a href="/apps">Small apps and experiments</a></p>
        <h1>${escapeHtml(app.name)}</h1>
        <p>${escapeHtml(app.status)}</p>
        <p>${escapeHtml(app.description)}</p>
        <section><h2>About ${escapeHtml(app.name)}</h2>${paragraphs}</section>
      </article>
    </main>`;
}

function renderToolboxIndex() {
    const sections = Object.entries(categories).map(([key, category]) => {
        const items = tools.filter((tool) => tool.category === key).map((tool) => `
        <article>
          <h3><a href="/toolbox/${escapeHtml(tool.slug)}">${escapeHtml(tool.name)}</a></h3>
          <p>${escapeHtml(tool.statusLabel)}</p>
          <p>${escapeHtml(tool.description)}</p>
        </article>`).join('');

        return `<section>
        <h2>${escapeHtml(category.title)}</h2>
        <p>${escapeHtml(category.subtitle)}</p>
        ${items}
      </section>`;
    }).join('');

    return `<main>
      <h1>AI engineering toolbox</h1>
      <p>Agents, cloud platforms, automation tools, and developer infrastructure used to build production AI systems.</p>
      ${sections}
    </main>`;
}

function renderAppsIndex() {
    const items = apps.map((app) => `
      <article>
        <h2><a href="/apps/${escapeHtml(app.id)}">${escapeHtml(app.name)}</a></h2>
        <p>${escapeHtml(app.status)}</p>
        <p>${escapeHtml(app.description)}</p>
      </article>`).join('');

    return `<main>
      <h1>Small apps and experiments</h1>
      <p>Software tools, generators, and engineering experiments hosted on evanjacobson.io.</p>
      ${items}
    </main>`;
}

function replaceMeta(html, selector, replacement) {
    // Function replacement so `$&`/`$'`/`$$` patterns in data-derived content
    // are taken literally instead of being treated as replacement patterns.
    return html.replace(selector, () => replacement);
}

function renderHtml({ title, description, pathname, body, schema, robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', type = 'website', canonicalPath = pathname }) {
    const canonicalUrl = `${SITE_URL}${(canonicalPath ?? pathname) === '/' ? '/' : canonicalPath ?? pathname}`;
    const ogImageUrl = `${SITE_URL}/og/${ogRouteKey(pathname)}.png`;
    let html = baseHtml;
    html = replaceMeta(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
    html = replaceMeta(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`);
    html = replaceMeta(html, /<meta name="robots"[^>]*>/, `<meta name="robots" content="${escapeHtml(robots)}" />`);
    html = canonicalPath === null
        ? replaceMeta(html, /\n?\s*<link rel="canonical"[^>]*>/, '')
        : replaceMeta(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = replaceMeta(html, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`);
    html = replaceMeta(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
    html = replaceMeta(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
    html = replaceMeta(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = replaceMeta(html, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${ogImageUrl}" />`);
    html = replaceMeta(html, /<meta property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="${escapeHtml(title)}" />`);
    html = replaceMeta(html, /<meta name="twitter:card"[^>]*>/, '<meta name="twitter:card" content="summary_large_image" />');
    html = replaceMeta(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
    html = replaceMeta(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
    html = replaceMeta(html, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${ogImageUrl}" />`);
    html = replaceMeta(html, /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="structured-data" type="application/ld+json">${jsonLd(schema)}</script>`);
    // Anchored to the closing </body> tag (Vite hoists the module script into
    // <head> at build time) so nested divs inside #root cannot truncate the
    // replacement at the first inner </div>.
    html = replaceMeta(html, /<div id="root">[\s\S]*?<\/div>(?=\s*<\/body>)/, `<div id="root">${body}</div>`);
    return html;
}

async function writeRoute(pathname, options) {
    const relativePath = pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
    const destination = path.join(DIST_DIR, relativePath);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, renderHtml({ pathname, ...options }));
}

const workTitle = 'AI Engineering Case Studies | Evan Jacobson';
const workDescription = 'Production AI agents, LLM applications, multi-agent pipelines, coding-agent infrastructure, and full-stack AI systems built by Evan Jacobson.';
await writeRoute('/work', {
    title: workTitle,
    description: workDescription,
    body: renderWorkIndex(),
    schema: collectionSchema({
        collection: 'work',
        canonicalUrl: `${SITE_URL}/work`,
        title: workTitle,
        description: workDescription,
    }),
});

for (const project of projects) {
    const pathname = `/work/${project.slug}`;
    const title = `${project.title} AI Engineering Case Study | Evan Jacobson`;
    const description = project.metaDescription || project.cardDescription;
    await writeRoute(pathname, {
        title,
        description,
        body: renderProject(project),
        schema: pageSchema({
            canonicalUrl: `${SITE_URL}${pathname}`,
            title,
            description,
            project,
        }),
    });
}

const toolboxTitle = 'AI Engineering Toolbox | Evan Jacobson';
const toolboxDescription = 'The AI agents, cloud platforms, automation tools, and developer infrastructure Evan Jacobson uses to build production AI systems.';
await writeRoute('/toolbox', {
    title: toolboxTitle,
    description: toolboxDescription,
    body: renderToolboxIndex(),
    schema: collectionSchema({
        collection: 'toolbox',
        canonicalUrl: `${SITE_URL}/toolbox`,
        title: toolboxTitle,
        description: toolboxDescription,
    }),
});

for (const tool of tools) {
    const pathname = `/toolbox/${tool.slug}`;
    await writeRoute(pathname, {
        title: tool.seoTitle,
        description: tool.metaDescription,
        body: renderTool(tool),
        schema: pageSchema({
            canonicalUrl: `${SITE_URL}${pathname}`,
            title: tool.seoTitle,
            description: tool.metaDescription,
            tool,
        }),
    });
}

const appsTitle = 'Small Apps and Experiments | Evan Jacobson';
const appsDescription = 'Small software tools, generators, and engineering experiments built by Evan Jacobson.';
await writeRoute('/apps', {
    title: appsTitle,
    description: appsDescription,
    body: renderAppsIndex(),
    schema: collectionSchema({
        collection: 'apps',
        canonicalUrl: `${SITE_URL}/apps`,
        title: appsTitle,
        description: appsDescription,
    }),
});

for (const app of apps) {
    const pathname = `/apps/${app.id}`;
    await writeRoute(pathname, {
        title: app.seoTitle,
        description: app.metaDescription,
        body: renderApp(app),
        schema: pageSchema({
            canonicalUrl: `${SITE_URL}${pathname}`,
            title: app.seoTitle,
            description: app.metaDescription,
            app,
        }),
    });
}

await writeRoute('/book-a-call', {
    title: 'Book a Call with Evan Jacobson',
    description: 'Schedule a call with Evan Jacobson.',
    robots: 'noindex, follow',
    body: '<main><h1>Book a call with Evan Jacobson</h1><p>Use the scheduling interface to find a time.</p></main>',
    schema: pageSchema({ canonicalUrl: `${SITE_URL}/book-a-call`, title: 'Evan Jacobson | Agentic AI Engineer in Denver', description: 'Denver-based agentic AI engineer building reliable LLM applications, multi-agent workflows, coding-agent infrastructure, and AI systems for remote teams.' }),
});

const notFoundHtml = renderHtml({
    pathname: '/404',
    canonicalPath: null,
    title: 'Page Not Found | Evan Jacobson',
    description: 'The requested page could not be found.',
    robots: 'noindex, follow',
    body: '<main><h1>Page not found</h1><p>The requested page does not exist. <a href="/">Return to Evan Jacobson\'s homepage</a>.</p></main>',
    schema: pageSchema({ canonicalUrl: `${SITE_URL}/404`, title: 'Page Not Found | Evan Jacobson', description: 'The requested page could not be found.' }),
});
await writeFile(path.join(DIST_DIR, '404.html'), notFoundHtml);

const indexedRoutes = [
    '/',
    '/work',
    ...projects.map((project) => `/work/${project.slug}`),
    '/toolbox',
    ...tools.map((tool) => `/toolbox/${tool.slug}`),
    '/apps',
    ...apps.map((app) => `/apps/${app.id}`),
];
const sitemapEntries = indexedRoutes
    .map((route) => `  <url><loc>${SITE_URL}${route === '/' ? '/' : route}</loc></url>`)
    .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;
await writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemap);

const redirectRoutes = [
    '/work',
    '/toolbox',
    '/apps',
    '/book-a-call',
    ...projects.map((project) => `/work/${project.slug}`),
    ...tools.map((tool) => `/toolbox/${tool.slug}`),
    ...apps.map((app) => `/apps/${app.id}`),
];
const redirects = [
    '/log / 301',
    ...redirectRoutes.map((route) => `${route}/ ${route} 301`),
].join('\n');
await writeFile(path.join(DIST_DIR, '_redirects'), `${redirects}\n`);
