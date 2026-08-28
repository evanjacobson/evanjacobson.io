import projects from './work.js';
import tools, { categories } from './toolbox.js';
import apps from './apps.js';

// Browser-safe JSON-LD builders shared by the client Seo component and the
// build-time prerender script (generate-static-routes.mjs) so the hydrated
// structured data is identical to the prerendered structured data.

const SITE_URL = 'https://evanjacobson.io';
const PERSON_ID = `${SITE_URL}/#evan-jacobson`;

export const person = {
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

export function jsonLd(value) {
    return JSON.stringify(value).replaceAll('<', '\\u003c');
}

export function pageSchema({ canonicalUrl, title, description, project, tool, app }) {
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

    if (tool) {
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
                        '@type': 'SoftwareApplication',
                        name: tool.name,
                        url: tool.url,
                        description: tool.description,
                        applicationCategory: categories[tool.category].title,
                    },
                },
                {
                    '@type': 'BreadcrumbList',
                    '@id': `${canonicalUrl}#breadcrumbs`,
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                        { '@type': 'ListItem', position: 2, name: 'Toolbox', item: `${SITE_URL}/toolbox` },
                        { '@type': 'ListItem', position: 3, name: tool.name, item: canonicalUrl },
                    ],
                },
            ],
        };
    }

    if (app) {
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
                        '@type': 'SoftwareApplication',
                        name: app.name,
                        url: canonicalUrl,
                        description: app.description,
                        applicationCategory: 'WebApplication',
                        operatingSystem: 'Any',
                        keywords: app.keywords,
                        author: person,
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                    },
                },
                {
                    '@type': 'BreadcrumbList',
                    '@id': `${canonicalUrl}#breadcrumbs`,
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                        { '@type': 'ListItem', position: 2, name: 'Apps', item: `${SITE_URL}/apps` },
                        { '@type': 'ListItem', position: 3, name: app.name, item: canonicalUrl },
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

const collectionItems = {
    work: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: `${SITE_URL}/work/${project.slug}`,
    })),
    toolbox: tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: `${SITE_URL}/toolbox/${tool.slug}`,
    })),
    apps: apps.map((app, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: app.name,
        url: `${SITE_URL}/apps/${app.id}`,
    })),
};

export function collectionSchema({ collection, canonicalUrl, title, description }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        url: canonicalUrl,
        name: title,
        description,
        author: person,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: collectionItems[collection],
        },
    };
}

// Mirrors the prerendered structured data shipped in index.html so SPA
// hydration on '/' does not degrade the homepage JSON-LD.
export function homeSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: 'Evan Jacobson | Agentic AI Engineer in Denver',
        description: 'Profile and AI engineering portfolio for Evan Jacobson, a Denver-based engineer specializing in reliable agentic systems and LLM applications for remote teams.',
        mainEntity: {
            ...person,
            image: `${SITE_URL}/images/Evan%20Jacobson.jpg`,
            email: 'mailto:contact@evanjacobson.io',
            description: 'Denver-based AI engineer specializing in agentic systems, multi-agent workflows, reliable LLM applications, and AI developer tools.',
            worksFor: {
                '@type': 'Organization',
                name: 'Kilo',
                url: 'https://kilo.ai/',
            },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'University of Miami',
            },
            knowsAbout: [
                'Agentic AI',
                'AI agents',
                'Large language model applications',
                'Multi-agent systems',
                'AI agent reliability',
                'AI coding agents',
                'Retrieval-augmented generation',
                'TypeScript',
                'OpenAI API',
                'Cloudflare Workers',
                'AWS',
            ],
        },
    };
}
