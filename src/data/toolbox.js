export const categories = {
    agents: {
        title: 'AI Agents & Copilots',
        subtitle: 'The team that writes most of the code',
    },
    cloud: {
        title: 'Cloud & Infrastructure',
        subtitle: 'Where the code actually runs',
    },
    automation: {
        title: 'Automation & Workflows',
        subtitle: 'The robots behind the robots',
    },
    devtools: {
        title: 'Dev Experience',
        subtitle: 'The supporting cast',
    },
};

const tools = [
    {
        slug: 'kilo',
        name: 'Kilo',
        category: 'agents',
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://kilo.ai/',
        description:
            'The most popular open-source agentic engineering platform. The CLI replaced Claude Code, the VS Code extension replaced Cursor, and Gas Town by Kilo replaced Gas Town. I work there.',
        seoTitle: 'Kilo — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Kilo, the open-source agentic engineering platform whose CLI and VS Code extension replaced Claude Code and Cursor in his stack.',
        body: [
            'Kilo is an open-source agentic engineering platform — a suite of AI coding tools that includes a terminal CLI, a VS Code extension, and Gas Town by Kilo for multi-agent orchestration.',
            "It sits at the center of my workflow. The Kilo CLI replaced Claude Code as my terminal coding agent, the VS Code extension replaced Cursor as my editor-integrated assistant, and Gas Town by Kilo replaced the original Gas Town for multi-agent work.",
            'I also work at Kilo, so the tool and the day job overlap: the platform I use to ship code is the same one I help build.',
        ],
    },
    {
        slug: 'kiloclaw',
        name: 'KiloClaw',
        category: 'agents',
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://kilo.ai/kiloclaw',
        description:
            "Kilo's managed OpenClaw service. Drives countless daily workflows to keep me streamlined and on task.",
        seoTitle: 'KiloClaw — How Evan Jacobson Uses It',
        metaDescription:
            "How Evan Jacobson uses KiloClaw, Kilo's managed OpenClaw service, to drive countless daily agent workflows that keep him streamlined and on task.",
        body: [
            "KiloClaw is Kilo's managed OpenClaw service — a hosted way to run OpenClaw agents without operating the underlying infrastructure yourself.",
            'It drives countless daily workflows for me, keeping recurring tasks streamlined and keeping me on task without having to babysit the automation behind them.',
        ],
    },
    {
        slug: 'beads',
        name: 'Beads',
        category: 'agents',
        status: 'contributor',
        statusLabel: 'Contributor',
        url: 'https://github.com/cyanheads/beads',
        description:
            "Issue tracking designed for AI agents. Solves the context reset problem. I'm a core contributor.",
        seoTitle: 'Beads — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Beads, the issue tracker designed for AI agents that solves the context reset problem — and why he became a core contributor.',
        body: [
            'Beads is issue tracking designed for AI agents rather than humans. It exists to solve the context reset problem: agents lose their working memory between sessions, and Beads gives them durable, structured task state to pick back up from.',
            "I'm a core contributor to the project. It fits naturally into an agent-heavy workflow where most of the code is written by AI teammates that need reliable memory across sessions.",
        ],
    },
    {
        slug: 'claude-code',
        name: 'Claude Code',
        category: 'agents',
        status: 'semi-retired',
        statusLabel: 'Semi-Retired',
        url: 'https://claude.com/claude-code',
        description:
            "Anthropic's terminal-based coding agent. Retired in favor of Kilo CLI.",
        seoTitle: 'Claude Code — How Evan Jacobson Uses It',
        metaDescription:
            "How Evan Jacobson used Claude Code, Anthropic's terminal-based coding agent, and why it's now semi-retired in his stack in favor of the Kilo CLI.",
        body: [
            "Claude Code is Anthropic's terminal-based coding agent: you describe a task in natural language and it reads, edits, and runs code directly from the command line.",
            "It filled the terminal-agent slot in my stack until the Kilo CLI took over the same role. It's semi-retired now, but it defined the terminal-first agentic coding workflow that the rest of my setup grew around.",
        ],
    },
    {
        slug: 'gas-town',
        name: 'Gas Town',
        category: 'agents',
        status: 'semi-retired',
        statusLabel: 'Semi-Retired',
        url: 'https://github.com/steveyegge/gastown',
        description:
            "Steve Yegge's multi-agent swarm manager. Semi-retired in favor of Gas Town by Kilo.",
        seoTitle: 'Gas Town — How Evan Jacobson Uses It',
        metaDescription:
            "How Evan Jacobson used Gas Town, Steve Yegge's multi-agent swarm manager, and why it's now semi-retired in favor of Gas Town by Kilo in his stack.",
        body: [
            "Gas Town is Steve Yegge's multi-agent swarm manager — a tool for orchestrating multiple AI coding agents working in parallel instead of driving one agent at a time.",
            "It's semi-retired in my stack: Gas Town by Kilo now fills the same multi-agent orchestration role, so the original mostly stays on the bench.",
        ],
    },
    {
        slug: 'cursor',
        name: 'Cursor',
        category: 'agents',
        status: 'semi-retired',
        statusLabel: 'Semi-Retired',
        url: 'https://cursor.com/',
        description:
            "My first AI editor love. Retired in favor of Kilo's VS Code extension.",
        seoTitle: 'Cursor — How Evan Jacobson Uses It',
        metaDescription:
            "How Evan Jacobson used Cursor, his first AI editor love, and why the AI-native code editor is now semi-retired in favor of Kilo's VS Code extension.",
        body: [
            'Cursor is an AI-native code editor built on VS Code, with chat, autocomplete, and agentic editing woven directly into the editor experience.',
            "It was my first AI editor love — the tool that got me hooked on AI-assisted editing. It's semi-retired now in favor of Kilo's VS Code extension, which covers the same ground inside my current setup.",
        ],
    },
    {
        slug: 'supabase',
        name: 'Supabase',
        category: 'cloud',
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://supabase.com/',
        description:
            'Postgres, auth, storage, and realtime in one platform. The backend for OrAI. Row-level security means tenant data stays isolated.',
        seoTitle: 'Supabase — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Supabase — Postgres, auth, storage, and realtime in one platform — as the backend for OrAI, with row-level security isolating tenants.',
        body: [
            'Supabase is an open-source backend platform that bundles a Postgres database, authentication, file storage, and realtime subscriptions into a single service.',
            "It's the backend for OrAI. Postgres row-level security enforces tenant isolation at the database layer, so each tenant's data stays walled off by policy rather than by application code alone.",
        ],
    },
    {
        slug: 'cloudflare-workers',
        name: 'Cloudflare Workers',
        category: 'cloud',
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://workers.cloudflare.com/',
        description:
            'Edge-first serverless compute. OrAI runs entirely on Workers -- no cold starts, no origin servers, just code at the edge in 300+ cities.',
        seoTitle: 'Cloudflare Workers — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Cloudflare Workers, edge-first serverless compute, to run OrAI entirely at the edge in 300+ cities — no cold starts, no origin servers.',
        body: [
            "Cloudflare Workers is edge-first serverless compute: code runs on Cloudflare's global network in 300+ cities, close to users, without the cold starts that plague traditional serverless platforms.",
            "OrAI runs entirely on Workers — no origin servers to maintain, just code deployed at the edge. That makes Workers the compute layer for my daily-driver cloud stack.",
        ],
    },
    {
        slug: 'cloudflare-ai',
        name: 'Cloudflare AI',
        category: 'cloud',
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://ai.cloudflare.com/',
        description:
            'AI Search (AutoRAG) for document retrieval and AI Gateway for routing, caching, and observability across AI providers.',
        seoTitle: 'Cloudflare AI — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Cloudflare AI — AI Search (AutoRAG) for document retrieval, and AI Gateway for routing, caching, and observability across providers.',
        body: [
            "Cloudflare AI is Cloudflare's suite of AI infrastructure services. The two pieces that matter most in my stack are AI Search (AutoRAG), which handles retrieval over documents, and AI Gateway, a proxy layer that sits in front of AI provider APIs.",
            'AI Search powers document retrieval, while AI Gateway handles routing, caching, and observability across AI providers — one place to watch and control every model request.',
        ],
    },
    {
        slug: 'aws',
        name: 'AWS',
        category: 'cloud',
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://aws.amazon.com/',
        description:
            "Lambda, API Gateway, S3, CloudFront, EC2. Trade Intel's entire backend runs on AWS.",
        seoTitle: 'AWS — How Evan Jacobson Uses It',
        metaDescription:
            "How Evan Jacobson uses AWS — Lambda, API Gateway, S3, CloudFront, and EC2 — to run Trade Intel's entire backend and his self-hosted automation on EC2.",
        body: [
            'Amazon Web Services is the industry-standard cloud platform. The services I lean on are Lambda for serverless functions, API Gateway for APIs, S3 for storage, CloudFront for CDN delivery, and EC2 for long-running compute.',
            "Trade Intel's entire backend runs on AWS. EC2 also hosts my self-hosted n8n instance, so AWS carries both the product workloads and the automation behind them.",
        ],
    },
    {
        slug: 'terraform',
        name: 'Terraform',
        category: 'cloud',
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://www.terraform.io/',
        description:
            'Infrastructure as code. Three environments (dev, stage, prod) from a single codebase.',
        seoTitle: 'Terraform — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Terraform to manage infrastructure as code, running three environments — dev, stage, and prod — from a single declarative codebase.',
        body: [
            "Terraform is HashiCorp's infrastructure-as-code tool: cloud resources are declared in configuration files, and Terraform plans and applies changes reproducibly instead of relying on hand-built consoles.",
            'I use it to run three environments — dev, stage, and prod — from a single codebase, so infrastructure changes are versioned and promoted like any other code.',
        ],
    },
    {
        slug: 'n8n',
        name: 'n8n',
        category: 'automation',
        status: 'self-hosted',
        statusLabel: 'Self-Hosted',
        url: 'https://n8n.io/',
        description:
            'Self-hosted workflow automation running on EC2. Ingests financial newsletters via Gmail and routes them through multi-agent extraction pipelines.',
        seoTitle: 'n8n — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses self-hosted n8n on EC2 to ingest financial newsletters via Gmail and route them through multi-agent AI extraction pipelines.',
        body: [
            'n8n is an open-source workflow automation platform — a node-based tool in the vein of Zapier, but one you can self-host and extend with custom logic.',
            'My instance is self-hosted on EC2. Its main job is ingesting financial newsletters via Gmail and routing them through multi-agent extraction pipelines that pull structure out of the incoming email.',
        ],
    },
    {
        slug: 'github-actions',
        name: 'GitHub Actions',
        category: 'automation',
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://github.com/features/actions',
        description:
            'CI/CD that runs tests, lints code, deploys infrastructure, and pushes to production. OIDC auth with AWS means no stored credentials.',
        seoTitle: 'GitHub Actions — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses GitHub Actions for CI/CD — running tests, linting code, deploying infrastructure, and shipping to production with OIDC auth to AWS.',
        body: [
            "GitHub Actions is GitHub's built-in CI/CD platform, running workflows directly from the repository on every push, pull request, or schedule.",
            'In my projects it runs tests, lints code, deploys infrastructure, and pushes to production. OIDC authentication with AWS means workflows assume short-lived roles instead of storing long-lived credentials.',
        ],
    },
    {
        slug: 'stripe',
        name: 'Stripe',
        category: 'automation',
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://stripe.com/',
        description:
            'Payment processing for OrAI subscriptions. Free, Basic, and Premium tiers with usage-based quotas and referral rewards.',
        seoTitle: 'Stripe — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Stripe to process payments for OrAI subscriptions — Free, Basic, and Premium tiers with usage-based quotas and referral rewards.',
        body: [
            'Stripe is the de facto standard for developer-first payment processing, handling subscriptions, billing, and payment infrastructure behind an API.',
            'It handles payment processing for OrAI subscriptions: Free, Basic, and Premium tiers with usage-based quotas, plus referral rewards.',
        ],
    },
    {
        slug: 'playwright',
        name: 'Playwright',
        category: 'devtools',
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://playwright.dev/',
        description:
            'End-to-end browser testing for OrAI. Three test personas, mobile viewport testing, and auth state persistence.',
        seoTitle: 'Playwright — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Playwright for end-to-end browser testing on OrAI — three test personas, mobile viewport testing, and auth state persistence.',
        body: [
            "Playwright is Microsoft's end-to-end browser testing framework, driving real Chromium, Firefox, and WebKit browsers from test code.",
            "It's how OrAI gets end-to-end coverage: three test personas, mobile viewport testing, and auth state persistence so test runs skip repeated logins.",
        ],
    },
    {
        slug: 'posthog',
        name: 'PostHog',
        category: 'devtools',
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://posthog.com/',
        description:
            'Product analytics and LLM tracing. The @posthog/ai middleware traces every LLM call.',
        seoTitle: 'PostHog — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses PostHog for product analytics and LLM observability, with the @posthog/ai middleware tracing every LLM call alongside product metrics.',
        body: [
            'PostHog is an open-source product analytics platform that has grown into a broader product toolkit, including LLM observability for AI applications.',
            'I use it for product analytics and LLM tracing. The @posthog/ai middleware traces every LLM call, so model behavior is visible right next to the product metrics.',
        ],
    },
    {
        slug: 'streamlit',
        name: 'Streamlit',
        category: 'devtools',
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://streamlit.io/',
        description:
            'Python dashboards for when I need answers fast. Spin up a dashboard in 20 minutes, get insights that would take days in React.',
        seoTitle: 'Streamlit — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Streamlit to build Python dashboards fast — spinning up a dashboard in 20 minutes to get insights that would take days in React.',
        body: [
            'Streamlit is a Python framework for turning scripts into interactive data apps and dashboards with almost no frontend code.',
            "It's my tool for when I need answers fast: spin up a dashboard in 20 minutes and get insights that would take days to build as a React app.",
        ],
    },
    {
        slug: 'graphite',
        name: 'Graphite',
        category: 'devtools',
        status: 'daily-driver',
        statusLabel: 'Daily Driver',
        url: 'https://graphite.dev/',
        description:
            'Git stacking done right. Stack PRs, review them independently, and merge in order.',
        seoTitle: 'Graphite — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Graphite for stacked pull requests — stacking PRs, reviewing them independently, and merging in order for a faster review flow.',
        body: [
            'Graphite is a code review and Git workflow tool built around stacked pull requests — breaking large changes into a stack of small, dependent PRs.',
            "It's git stacking done right: I stack PRs on top of each other, get them reviewed independently, and merge them in order.",
        ],
    },
    {
        slug: 'docker',
        name: 'Docker',
        category: 'devtools',
        status: 'essential',
        statusLabel: 'Essential',
        url: 'https://www.docker.com/',
        description:
            'Containers for local dev and production deploys. PostgreSQL, n8n, all running in isolated containers.',
        seoTitle: 'Docker — How Evan Jacobson Uses It',
        metaDescription:
            'How Evan Jacobson uses Docker containers for local development and production deploys, running PostgreSQL, n8n, and more in isolated environments.',
        body: [
            'Docker packages applications into containers — isolated, reproducible environments that run the same on a laptop as they do in production.',
            'I use it for local development and production deploys alike. PostgreSQL, n8n, and other services all run in isolated containers, which keeps environments consistent and easy to rebuild.',
        ],
    },
];

export default tools;
