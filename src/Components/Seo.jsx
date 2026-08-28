import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import projects from '@/data/work';

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
    },
    '/toolbox': {
        title: 'AI Engineering Toolbox | Evan Jacobson',
        description: 'The AI agents, cloud platforms, automation tools, and developer infrastructure Evan Jacobson uses to build production AI systems.',
    },
    '/apps': {
        title: 'Small Apps and Experiments | Evan Jacobson',
        description: 'Small software tools, generators, and engineering experiments built by Evan Jacobson.',
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
        return { ...staticPages['/'], canonicalPath: '/', robots: 'noindex, follow' };
    }

    if (pathname.startsWith('/work/')) {
        const slug = pathname.slice('/work/'.length);
        const project = projects.find((item) => item.slug === slug);
        if (project) {
            return {
                title: `${project.title} AI Engineering Case Study | Evan Jacobson`,
                description: project.cardDescription,
                project,
            };
        }
    }

    if (staticPages[pathname]) return staticPages[pathname];

    return {
        title: 'Page Not Found | Evan Jacobson',
        description: 'The requested page could not be found.',
        robots: 'noindex, follow',
    };
}

function structuredData(page, canonicalUrl) {
    const person = {
        '@type': 'Person',
        '@id': `${SITE_URL}/#evan-jacobson`,
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

    if (page.project) {
        return {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: canonicalUrl,
            name: page.title,
            description: page.description,
            author: { '@id': person['@id'] },
            mainEntity: {
                '@type': 'CreativeWork',
                name: page.project.title,
                description: page.project.cardDescription,
                creator: person,
                keywords: page.project.techStack,
            },
        };
    }

    if (canonicalUrl === `${SITE_URL}/`) {
        return {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profile`,
            url: canonicalUrl,
            name: page.title,
            description: page.description,
            mainEntity: {
                ...person,
                image: `${SITE_URL}/images/Evan%20Jacobson.jpg`,
                email: 'mailto:contact@evanjacobson.io',
                description: DEFAULT_DESCRIPTION,
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
                ],
            },
        };
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        author: person,
    };
}

export default function Seo() {
    const { pathname } = useLocation();

    useEffect(() => {
        const page = pageFor(pathname);
        const canonicalPath = page.canonicalPath ?? pathname;
        const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
        const robots = page.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

        document.title = page.title;
        upsertMeta('meta[name="description"]', { name: 'description', content: page.description });
        upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
        upsertMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
        upsertMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
        upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
        upsertMeta('meta[property="og:type"]', { property: 'og:type', content: page.type ?? 'website' });
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;

        const schema = document.getElementById('structured-data');
        if (schema) schema.textContent = JSON.stringify(structuredData(page, canonicalUrl));
    }, [pathname]);

    return null;
}
