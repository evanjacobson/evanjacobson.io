import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import projects from '@/data/work';
import tools from '@/data/toolbox';
import apps from '@/data/apps';
import { ogRouteKey } from '@/data/ogRouteKey';
import { collectionSchema, homeSchema, jsonLd, pageSchema } from '@/data/pageSchema';

const SITE_URL = 'https://evanjacobson.io';
const DEFAULT_DESCRIPTION = 'Denver-based agentic AI engineer building reliable LLM applications, multi-agent workflows, coding-agent infrastructure, and AI systems for remote teams.';

const staticPages = {
    '/': {
        title: 'Evan Jacobson | Agentic AI Engineer in Denver',
        description: DEFAULT_DESCRIPTION,
        type: 'profile',
    },
    '/work': {
        title: 'AI Engineering Case Studies | Evan Jacobson',
        description: 'Production AI agents, LLM applications, multi-agent pipelines, coding-agent infrastructure, and full-stack AI systems built by Evan Jacobson.',
        collection: 'work',
    },
    '/toolbox': {
        title: 'AI Engineering Toolbox | Evan Jacobson',
        description: 'The AI agents, cloud platforms, automation tools, and developer infrastructure Evan Jacobson uses to build production AI systems.',
        collection: 'toolbox',
    },
    '/apps': {
        title: 'Small Apps and Experiments | Evan Jacobson',
        description: 'Small software tools, generators, and engineering experiments built by Evan Jacobson.',
        collection: 'apps',
    },
};

function upsertMeta(selector, attributes) {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

function pageFor(pathname) {
    if (pathname === '/book-a-call') {
        return { ...staticPages['/'], robots: 'noindex, follow' };
    }

    if (pathname.startsWith('/work/')) {
        const slug = pathname.slice('/work/'.length);
        const project = projects.find((item) => item.slug === slug);
        if (project) {
            return {
                title: `${project.title} AI Engineering Case Study | Evan Jacobson`,
                description: project.metaDescription || project.cardDescription,
                project,
            };
        }
    }

    if (pathname.startsWith('/toolbox/')) {
        const slug = pathname.slice('/toolbox/'.length);
        const tool = tools.find((item) => item.slug === slug);
        if (tool) {
            return {
                title: tool.seoTitle,
                description: tool.metaDescription,
                tool,
            };
        }
    }

    if (pathname.startsWith('/apps/')) {
        const id = pathname.slice('/apps/'.length);
        const app = apps.find((item) => item.id === id);
        if (app) {
            return {
                title: app.seoTitle,
                description: app.metaDescription,
                app,
            };
        }
    }

    if (staticPages[pathname]) return staticPages[pathname];

    return {
        title: 'Page Not Found | Evan Jacobson',
        description: 'The requested page could not be found.',
        robots: 'noindex, follow',
        notFound: true,
    };
}

function structuredData(page, canonicalUrl) {
    if (canonicalUrl === `${SITE_URL}/`) return homeSchema();

    if (page.collection) {
        return collectionSchema({
            collection: page.collection,
            canonicalUrl,
            title: page.title,
            description: page.description,
        });
    }

    return pageSchema({
        canonicalUrl,
        title: page.title,
        description: page.description,
        project: page.project,
        tool: page.tool,
        app: page.app,
    });
}

export default function Seo() {
    const { pathname } = useLocation();

    useEffect(() => {
        const page = pageFor(pathname);
        const canonicalPath = page.canonicalPath ?? pathname;
        const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
        const robots = page.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
        const ogImageUrl = `${SITE_URL}/og/${ogRouteKey(page.notFound ? '/404' : pathname)}.png`;

        document.title = page.title;
        upsertMeta('meta[name="description"]', { name: 'description', content: page.description });
        upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
        upsertMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
        upsertMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
        upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
        upsertMeta('meta[property="og:type"]', { property: 'og:type', content: page.type ?? 'website' });
        upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImageUrl });
        upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: page.title });
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
        upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImageUrl });

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (page.notFound) {
            if (canonical) canonical.remove();
        } else {
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
            }
            canonical.href = canonicalUrl;
        }

        const schema = document.getElementById('structured-data');
        if (schema) schema.textContent = jsonLd(structuredData(page, canonicalUrl));
    }, [pathname]);

    return null;
}
