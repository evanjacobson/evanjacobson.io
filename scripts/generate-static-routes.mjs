import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import projects from '../src/data/work.js';

const DIST_DIR = path.resolve('dist');
const SITE_URL = 'https://evanjacobson.io';
const PERSON_ID = `${SITE_URL}/#evan-jacobson`;
const baseHtml = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8');

const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Evan Jacobson',
    url: `${SITE_URL}/`,
    jobTitle: ['AI Engineer', 'Software Engineer'],
    homeLocation: {
        '@type': 'Place',
        name: 'Denver, Colorado, United States',
    },
    sameAs: [
        'https://github.com/evanjacobson',
        'https://linkedin.com/in/evanjacobson3',
    ],
};

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function jsonLd(value) {
    return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function pageSchema({ canonicalUrl, title, description, project }) {
    if (project) {
        return {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'WebPage',
                    '@id': `${canonicalUrl}#page`,
                    url: canonicalUrl,
                    name: title,
                    description,
                    author: { '@id': PERSON_ID },
                    breadcrumb: { '@id': `${canonicalUrl}#breadcrumbs` },
                    mainEntity: {
                        '@type': 'CreativeWork',
                        name: project.title,
                        description: project.cardDescription,
                        creator: person,
                        keywords: project.techStack,
                    },
                },
                {
                    '@type': 'BreadcrumbList',
                    '@id': `${canonicalUrl}#breadcrumbs`,
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                        { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
                        { '@type': 'ListItem', position: 3, name: project.title, item: canonicalUrl },
                    ],
                },
            ],
        };
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: canonicalUrl,
        name: title,
        description,
        author: person,
    };
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

function replaceMeta(html, selector, replacement) {
    return html.replace(selector, replacement);
}

function renderHtml({ title, description, pathname, body, schema, robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', type = 'website', canonicalPath = pathname }) {
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
    let html = baseHtml;
    html = replaceMeta(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
    html = replaceMeta(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`);
    html = replaceMeta(html, /<meta name="robots"[^>]*>/, `<meta name="robots" content="${escapeHtml(robots)}" />`);
    html = replaceMeta(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = replaceMeta(html, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`);
    html = replaceMeta(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
    html = replaceMeta(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
    html = replaceMeta(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = replaceMeta(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
    html = replaceMeta(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
    html = replaceMeta(html, /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="structured-data" type="application/ld+json">${jsonLd(schema)}</script>`);
    html = replaceMeta(html, /<div id="root">[\s\S]*?<\/div>/, `<div id="root">${body}</div>`);
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
    schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        url: `${SITE_URL}/work`,
        name: workTitle,
        description: workDescription,
        author: person,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: projects.map((project, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: project.title,
                url: `${SITE_URL}/work/${project.slug}`,
            })),
        },
    },
});

for (const project of projects) {
    const pathname = `/work/${project.slug}`;
    const title = `${project.title} AI Engineering Case Study | Evan Jacobson`;
    await writeRoute(pathname, {
        title,
        description: project.cardDescription,
        body: renderProject(project),
        schema: pageSchema({
            canonicalUrl: `${SITE_URL}${pathname}`,
            title,
            description: project.cardDescription,
            project,
        }),
    });
}

const simplePages = [
    {
        pathname: '/toolbox',
        title: 'AI Engineering Toolbox | Evan Jacobson',
        description: 'The AI agents, cloud platforms, automation tools, and developer infrastructure Evan Jacobson uses to build production AI systems.',
        body: '<main><h1>AI engineering toolbox</h1><p>Agents, cloud platforms, automation tools, and developer infrastructure used to build production AI systems.</p></main>',
    },
    {
        pathname: '/apps',
        title: 'Small Apps and Experiments | Evan Jacobson',
        description: 'Small software tools, generators, and engineering experiments built by Evan Jacobson.',
        body: '<main><h1>Small apps and experiments</h1><p>Software tools, generators, and engineering experiments hosted on evanjacobson.io.</p></main>',
    },
];

for (const page of simplePages) {
    const canonicalUrl = `${SITE_URL}${page.pathname}`;
    await writeRoute(page.pathname, {
        ...page,
        schema: pageSchema({ canonicalUrl, title: page.title, description: page.description }),
    });
}

await writeRoute('/book-a-call', {
    title: 'Book a Call with Evan Jacobson',
    description: 'Schedule a call with Evan Jacobson.',
    canonicalPath: '/',
    robots: 'noindex, follow',
    body: '<main><h1>Book a call with Evan Jacobson</h1><p>Use the scheduling interface to find a time.</p></main>',
    schema: pageSchema({ canonicalUrl: `${SITE_URL}/`, title: 'Evan Jacobson | Agentic AI Engineer in Denver', description: 'Denver-based agentic AI engineer building reliable LLM applications, multi-agent workflows, coding-agent infrastructure, and AI systems for remote teams.' }),
});

const notFoundHtml = renderHtml({
    pathname: '/404',
    canonicalPath: '/404',
    title: 'Page Not Found | Evan Jacobson',
    description: 'The requested page could not be found.',
    robots: 'noindex, follow',
    body: '<main><h1>Page not found</h1><p>The requested page does not exist. <a href="/">Return to Evan Jacobson\'s homepage</a>.</p></main>',
    schema: pageSchema({ canonicalUrl: `${SITE_URL}/404`, title: 'Page Not Found | Evan Jacobson', description: 'The requested page could not be found.' }),
});
await writeFile(path.join(DIST_DIR, '404.html'), notFoundHtml);
