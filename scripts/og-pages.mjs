import projects from '../src/data/work.js';
import tools, { categories } from '../src/data/toolbox.js';
import apps from '../src/data/apps.js';

// Shared source of truth for build-time Open Graph images.
// generate-static-routes.mjs uses ogRouteKey() to point each emitted page's
// og:image at /og/<route-key>.png, and generate-og-images.mjs iterates
// ogPages to render the matching PNGs — both driven by the same data modules.
// ogRouteKey lives in src/data so the client Seo component shares it too.

export { ogRouteKey } from '../src/data/ogRouteKey.js';

export const ogPages = [
    {
        pathname: '/',
        eyebrow: 'Agentic AI Engineer · Denver',
        title: 'Evan Jacobson',
        subtitle: 'Reliable LLM applications, multi-agent workflows, and coding-agent infrastructure for remote teams.',
    },
    {
        pathname: '/work',
        eyebrow: 'Case Studies',
        title: 'AI Engineering Case Studies',
        subtitle: 'Production AI agents, LLM applications, multi-agent pipelines, and full-stack AI systems.',
    },
    ...projects.map((project) => ({
        pathname: `/work/${project.slug}`,
        eyebrow: 'Case Study',
        title: project.title,
        subtitle: project.subtitle,
    })),
    {
        pathname: '/toolbox',
        eyebrow: 'Toolbox',
        title: 'AI Engineering Toolbox',
        subtitle: 'Agents, cloud platforms, automation tools, and developer infrastructure for production AI systems.',
    },
    ...tools.map((tool) => ({
        pathname: `/toolbox/${tool.slug}`,
        eyebrow: `Toolbox · ${categories[tool.category].title}`,
        title: tool.name,
        subtitle: tool.description,
    })),
    {
        pathname: '/apps',
        eyebrow: 'Apps',
        title: 'Small Apps and Experiments',
        subtitle: 'Software tools, generators, and engineering experiments hosted on evanjacobson.io.',
    },
    ...apps.map((app) => ({
        pathname: `/apps/${app.id}`,
        eyebrow: 'App',
        title: app.name,
        subtitle: app.description,
    })),
    {
        pathname: '/book-a-call',
        eyebrow: 'Contact',
        title: 'Book a Call',
        subtitle: 'Schedule time to talk with Evan Jacobson.',
    },
    {
        pathname: '/404',
        eyebrow: 'evanjacobson.io',
        title: 'Page Not Found',
        subtitle: 'The requested page does not exist.',
    },
];
