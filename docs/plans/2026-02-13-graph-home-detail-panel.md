# Graph as Home Page + Inline Detail Panel — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Promote the git graph to the front page and add inline detail panels with three toggle-able display modes.

**Architecture:** The new Home.jsx merges Resume.jsx and Home.jsx, owns the `activeProject` state (synced to `?project=` URL param), and wraps ResumeGitGraph with layout logic. ResumeGitGraph gains props (`compressed`, `activeRow`, `onRowClick`, `showLabels`) to support detail panel modes without owning the state itself. A shared ProjectContent component extracts the rendering logic from WorkDetail.jsx so it can be used both inline and as a full page.

**Tech Stack:** React 18, React Router 6 (useSearchParams), Tailwind CSS 3, Vite 5

**Key reference:** Read `docs/log-page-architecture.md` before starting any task — it documents the graph's data model, algorithms, and common pitfalls.

---

### Task 1: Nav + Routing Changes

**Files:**
- Modify: `src/Layout.jsx:6-28` (Nav component) and `src/Layout.jsx:32` (isHome conditional)
- Modify: `src/main.jsx:11-25` (routes)
- Delete: `src/Pages/Resume.jsx`

**Step 1: Update Layout.jsx**

Remove the `!isHome` gate so Nav shows on all pages. Remove the "Log" link from Nav. Update `isHome` to only cover `/book-a-call` (for the Cal.com auto-open).

In `src/Layout.jsx`, replace the Nav function (lines 6-28) with:

```jsx
function Nav() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `transition-colors ${isActive(path) ? 'text-slate-200' : 'text-slate-500 hover:text-slate-300'}`;

    return (
        <nav className="max-w-4xl mx-auto px-6 pt-8 pb-4 flex items-center gap-8 text-sm">
            <Link to="/" className="text-slate-500 hover:text-slate-200 transition-colors font-medium mr-auto">
                Evan Jacobson
            </Link>
            <Link to="/toolbox" className={linkClass('/toolbox')}>Toolbox</Link>
        </nav>
    );
}
```

And change line 32 from:
```jsx
const isHome = location.pathname === '/' || location.pathname === '/book-a-call';
```
to:
```jsx
const isHome = location.pathname === '/book-a-call';
```

Remove `{!isHome && <Nav />}` and replace with just `<Nav />`.

**Step 2: Update routes in main.jsx**

Replace routes with:

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import WorkDetail from './Pages/WorkDetail.jsx'
import Toolbox from './Pages/Toolbox.jsx'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-a-call" element={<Home autoOpenBooking={true} />} />
          <Route path="/log" element={<Navigate to="/" replace />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/toolbox" element={<Toolbox />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
```

Note: `Resume` import removed, `Navigate` import added, `/log` redirects to `/`.

**Step 3: Update WorkDetail.jsx redirect**

In `src/Pages/WorkDetail.jsx` line 10, change `<Navigate to="/log" replace />` to `<Navigate to="/" replace />`.

**Step 4: Delete Resume.jsx**

```bash
rm src/Pages/Resume.jsx
```

**Step 5: Verify**

```bash
npm run build
```

Expected: clean build, no errors. The existing Home.jsx still renders at `/` (unchanged so far). `/log` redirects to `/`. `/work/:slug` still works.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: nav/routing — show nav on all pages, /log redirects to /"
```

---

### Task 2: Extract ProjectContent Component

**Files:**
- Create: `src/Components/ProjectContent.jsx`
- Modify: `src/Pages/WorkDetail.jsx`

**Step 1: Create shared ProjectContent component**

Create `src/Components/ProjectContent.jsx` — this renders the project detail body (everything EXCEPT the page wrapper, back button, and max-width container). It accepts a `project` object from `work.js`.

```jsx
import { ExternalLink } from 'lucide-react';

export default function ProjectContent({ project }) {
    const IconComponent = project.icon;

    return (
        <>
            <div className="flex items-start gap-4 mb-2">
                <div className={`w-12 h-12 ${project.colors.accent} rounded-xl flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-50">{project.title}</h2>
                    <p className="text-slate-400 mt-1 text-sm">
                        {project.role} &middot; {project.dateRange}
                    </p>
                    {project.badge && (
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-2 ${project.colors.badge}`}>
                            {project.badge}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-8 space-y-4 text-slate-300 leading-relaxed text-sm">
                {project.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))}
            </div>

            {project.techStack.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className={`text-xs px-2.5 py-1 rounded-full ${project.colors.badge}`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {project.links.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-4">
                    {project.links.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-sm ${project.colors.text} hover:underline`}
                        >
                            {link.label}
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    ))}
                </div>
            )}
        </>
    );
}
```

Note: heading is `h2` (not `h1`) and text is `text-sm` for inline panel use. Margins are `mt-8` instead of `mt-10`.

**Step 2: Update WorkDetail.jsx to use ProjectContent**

Replace `src/Pages/WorkDetail.jsx` with:

```jsx
import { useParams, Link, Navigate } from 'react-router-dom';
import projects from '@/data/work';
import { ArrowLeft } from 'lucide-react';
import ProjectContent from '@/Components/ProjectContent';

function WorkDetail() {
    const { slug } = useParams();
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-10"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to log
            </Link>

            <ProjectContent project={project} />
        </div>
    );
}

export default WorkDetail;
```

**Step 3: Verify**

```bash
npm run build
```

Open dev server, navigate to `/work/orai`. Verify the page looks identical to before (icon, title, role, paragraphs, tech stack, links). The only visual difference: heading is slightly smaller (h2 vs h1) — acceptable for now. Verify back button goes to `/` not `/log`.

**Step 4: Commit**

```bash
git add -A && git commit -m "refactor: extract ProjectContent for reuse in inline panels"
```

---

### Task 3: New Home.jsx with HOME_LAYOUT Toggles

**Files:**
- Rewrite: `src/Pages/Home.jsx`

This task creates the new Home page that shows the graph directly. Two header variants controlled by `HOME_LAYOUT`.

**Step 1: Rewrite Home.jsx**

Replace `src/Pages/Home.jsx` entirely:

```jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ChevronDown } from 'lucide-react';
import ResumeGitGraph from './ResumeGitGraph';

const HOME_LAYOUT = 'graphHome'; // 'graphHome' | 'graphDrawer'

const BIO_PARAGRAPHS = [
    <>Right now I'm co-founding <Link to="/work/orai" className="text-blue-400 hover:text-blue-300 transition-colors">OrAI</Link>, where we're giving early childhood educators their time back — automating lesson plans, parent communications, document tracking, and compliant scheduling so they can spend less time on paperwork and more time with kids. I own everything from architecture to compliance to investor strategy, because I believe engineers should be owners, not ticket-takers.</>,
    <>Before that I was the founding engineer at <Link to="/work/onedeal" className="text-purple-400 hover:text-purple-300 transition-colors">OneDeal</Link> (Techstars '23), where I built agentic web search from scratch — months before MCP or AI web search existed. I'm obsessed with agentic AI systems: multi-agent pipelines, autonomous search, AI tooling. I've been building these before the frameworks existed, and I <Link to="/work/beads" className="text-green-400 hover:text-green-300 transition-colors">keep building them</Link> because it's what I care about most.</>,
    <>By day I'm a Software Engineer II at Alarm.com, where I shipped one of the company's first LLM-powered internal tools and led engineering for Stripe-managed subscriptions. I also contribute to open source AI tooling like <Link to="/work/beads" className="text-green-400 hover:text-green-300 transition-colors">Beads</Link> and <Link to="/work/kilo-code" className="text-orange-400 hover:text-orange-300 transition-colors">Kilo Code</Link>.</>,
    <>I'm looking for a team where shipping fast and talking to users is the culture, not the exception — where engineers own problems end-to-end and velocity is the default.</>,
];

function GraphHomeHeader() {
    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 mb-1">Evan Jacobson</h1>
                    <p className="text-slate-400 text-sm">
                        I build tools that automate the tedious so people can focus on what humans do best: think.
                    </p>
                </div>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    PDF
                </a>
            </div>
        </div>
    );
}

function GraphDrawerHeader() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-slate-50">Evan Jacobson</h1>
                <a
                    href="/files/Evan Jacobson Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-lg transition-colors shrink-0"
                >
                    <Download className="w-4 h-4" />
                    PDF
                </a>
            </div>

            {/* Bio preview / drawer */}
            <div className="relative">
                <div
                    className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                    style={{ maxHeight: expanded ? '600px' : '3.2em' }}
                >
                    <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                        {BIO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>

                {/* Fade overlay when collapsed */}
                {!expanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                )}

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors mt-1"
                >
                    {expanded ? 'Less' : 'More'}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </div>
    );
}

function Home({ autoOpenBooking = false }) {
    useEffect(() => {
        if (autoOpenBooking) {
            setTimeout(() => {
                const calButton = document.querySelector('[data-cal-link="evanjacobson"]');
                if (calButton) calButton.click();
            }, 1000);
        }
    }, [autoOpenBooking]);

    return (
        <div className="py-12">
            {HOME_LAYOUT === 'graphHome' && <GraphHomeHeader />}
            {HOME_LAYOUT === 'graphDrawer' && <GraphDrawerHeader />}
            <ResumeGitGraph />
        </div>
    );
}

export default Home;
```

**Step 2: Verify**

```bash
npm run build
```

Open dev server at `/`. Verify:
- With `HOME_LAYOUT = 'graphHome'`: name + tagline + PDF + graph, no bio text
- With `HOME_LAYOUT = 'graphDrawer'`: name + truncated bio preview + "More" button + graph. Click "More" to expand all four paragraphs. Click "Less" to collapse.
- Nav appears at top of page
- `/log` redirects to `/`
- `/work/orai` still works with back button returning to `/`

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: graph as home page with HOME_LAYOUT toggle"
```

---

### Task 4: ResumeGitGraph Props for Detail Panel Integration

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx:359-390` (component signature and state)
- Modify: `src/Pages/ResumeGitGraph.jsx:693-710` (row click handlers)

This task adds props to ResumeGitGraph so the parent can control detail panel behavior. No visual changes yet — just plumbing.

**Step 1: Add props to component signature**

Change line 359 from:
```jsx
export default function ResumeGitGraph() {
```
to:
```jsx
export default function ResumeGitGraph({ activeProject = null, onSelectProject = null, detailMode = 'none' }) {
```

**Step 2: Add activeRow computation**

After the `containerRef` declaration (line 362), add:

```jsx
const activeRowIndex = activeProject
    ? rows.findIndex(r => r.slug === activeProject)
    : -1;
```

**Step 3: Modify desktop row click behavior**

Currently rows with slugs render as `<Link to={/work/${row.slug}}>`. On desktop, when `onSelectProject` is provided, they should call the handler instead. On mobile, they should still navigate via Link.

In the desktop row labels section (around line 696-709), replace the slug Link block:

```jsx
{row.slug ? (
    <Link
        to={`/work/${row.slug}`}
        className="group/link block px-2 rounded-lg hover:bg-slate-800/40 transition-colors relative"
    >
        {labelContent}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-all duration-200 opacity-20 group-hover/link:opacity-70 translate-x-0 group-hover/link:translate-x-1">
            <span className="text-[10px] text-slate-400 hidden group-hover/link:inline">View case study</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
    </Link>
) : (
    <div className="px-2">{labelContent}</div>
)}
```

With:

```jsx
{row.slug ? (
    onSelectProject ? (
        <button
            onClick={() => onSelectProject(row.slug)}
            className={`group/link block w-full text-left px-2 rounded-lg hover:bg-slate-800/40 transition-colors relative ${activeProject === row.slug ? 'bg-slate-800/60' : ''}`}
        >
            {labelContent}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-all duration-200 opacity-20 group-hover/link:opacity-70 translate-x-0 group-hover/link:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
        </button>
    ) : (
        <Link
            to={`/work/${row.slug}`}
            className="group/link block px-2 rounded-lg hover:bg-slate-800/40 transition-colors relative"
        >
            {labelContent}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-all duration-200 opacity-20 group-hover/link:opacity-70 translate-x-0 group-hover/link:translate-x-1">
                <span className="text-[10px] text-slate-400 hidden group-hover/link:inline">View case study</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
        </Link>
    )
) : (
    <div className="px-2">{labelContent}</div>
)}
```

**Step 4: Make SVG dots clickable in compressed mode**

In the commit dots section (around line 562-603), the SVG has `pointer-events-none` on the parent. When `detailMode !== 'none'` and `activeProject` is set, dots with slugs should be clickable.

Change the `<svg>` tag (line 421-428) — add `pointer-events-none` only when NOT in compressed mode. For now, we'll handle this in the individual detail mode tasks. No change needed here yet.

**Step 5: Verify**

```bash
npm run build
```

Open dev server. With no props passed (current state), behavior is identical to before — rows with slugs still render as Links. No visual change.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add detail panel props to ResumeGitGraph"
```

---

### Task 5: DETAIL_MODE spine

**Files:**
- Modify: `src/Pages/Home.jsx` (add detail panel layout + URL sync)
- Modify: `src/Pages/ResumeGitGraph.jsx` (compressed mode rendering)

This is the most complex mode. The graph compresses to SVG-only (no labels), and a detail panel fills the right side.

**Step 1: Add DETAIL_MODE toggle and URL sync to Home.jsx**

Add to the top of Home.jsx (after imports):

```jsx
import { useSearchParams } from 'react-router-dom';
import ProjectContent from '@/Components/ProjectContent';
import projects from '@/data/work';
import { X } from 'lucide-react';

const DETAIL_MODE = 'spine'; // 'none' | 'spine' | 'alongside' | 'replace'
```

Update the Home function to manage state:

```jsx
function Home({ autoOpenBooking = false }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeProject = DETAIL_MODE !== 'none' ? searchParams.get('project') : null;
    const project = activeProject ? projects.find(p => p.slug === activeProject) : null;

    const handleSelectProject = (slug) => {
        setSearchParams({ project: slug });
    };

    const handleCloseProject = () => {
        setSearchParams({});
    };

    useEffect(() => {
        if (autoOpenBooking) {
            setTimeout(() => {
                const calButton = document.querySelector('[data-cal-link="evanjacobson"]');
                if (calButton) calButton.click();
            }, 1000);
        }
    }, [autoOpenBooking]);

    const isCompressed = DETAIL_MODE === 'spine' && !!activeProject;

    return (
        <div className="py-12">
            {HOME_LAYOUT === 'graphHome' && <GraphHomeHeader />}
            {HOME_LAYOUT === 'graphDrawer' && <GraphDrawerHeader />}

            <div className="max-w-6xl mx-auto px-4">
                <div className={`flex gap-0 transition-all duration-500 ease-in-out`}>
                    {/* Graph column */}
                    <div className={`transition-all duration-500 ease-in-out ${isCompressed ? 'w-[200px] shrink-0' : 'flex-1 max-w-4xl mx-auto'}`}>
                        <ResumeGitGraph
                            activeProject={activeProject}
                            onSelectProject={DETAIL_MODE !== 'none' ? handleSelectProject : null}
                            detailMode={DETAIL_MODE}
                        />
                    </div>

                    {/* Detail panel (spine mode) */}
                    {DETAIL_MODE === 'spine' && (
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${activeProject ? 'flex-1 opacity-100 ml-6' : 'w-0 opacity-0'}`}
                        >
                            {project && (
                                <div className="sticky top-8">
                                    <button
                                        onClick={handleCloseProject}
                                        className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Close
                                    </button>
                                    <ProjectContent project={project} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
```

**Step 2: Add compressed mode to ResumeGitGraph**

In ResumeGitGraph, when `detailMode === 'spine'` and `activeProject` is set, hide the label column. The graph container should shrink to just the SVG width.

In the desktop section, wrap the row labels block (lines 606-714) with a visibility check:

After `</svg>` (line 604), change the row labels section to:

```jsx
{/* Row labels — hidden in spine compressed mode */}
{!(detailMode === 'spine' && activeProject) && (() => {
    // ... existing label rendering code unchanged ...
})()}
```

Also update the container div (line 390):
```jsx
<div ref={containerRef} className={detailMode === 'spine' && activeProject ? '' : 'max-w-4xl mx-auto px-4'}>
```

When compressed, the parent Home.jsx controls the width, so the graph shouldn't apply its own max-width.

**Step 3: Make dots clickable in spine mode**

When the graph is compressed (labels hidden), users need to click dots to switch projects. Add click handlers to the SVG dots.

In the commit dots section, wrap each dot group with a clickable area when in spine mode:

After the `<g key={dot-${i}}>` opening tag, before the circles, add:

```jsx
{detailMode === 'spine' && activeProject && row.slug && (
    <circle
        cx={x} cy={y} r={12}
        fill="transparent"
        style={{ cursor: 'pointer', pointerEvents: 'all' }}
        onClick={() => onSelectProject(row.slug)}
    />
)}
```

This adds an invisible larger click target over each dot that has a slug.

**Step 4: Verify**

```bash
npm run build
```

Open dev server at `/`. Verify:
- Default state: graph shows normally with labels
- Click a row with a slug (e.g. OrAI): graph slides to a narrow column on the left, labels disappear, detail panel slides in from the right showing OrAI project content
- URL updates to `/?project=orai`
- Click "Close" button: detail panel closes, graph restores to full width
- Navigate directly to `/?project=orai`: page loads with panel already open
- Click a different dot in compressed mode: detail panel switches content
- On mobile (< sm breakpoint): clicking a row still navigates to `/work/:slug`

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: DETAIL_MODE spine — compressed graph + detail panel"
```

---

### Task 6: DETAIL_MODE alongside

**Files:**
- Modify: `src/Pages/Home.jsx` (add alongside layout branch)

This mode keeps the full graph + labels visible and opens the detail panel to the right. The container widens to accommodate both.

**Step 1: Add alongside layout to Home.jsx**

In the Home function's return JSX, add the alongside panel after the spine panel code:

```jsx
{/* Detail panel (alongside mode) */}
{DETAIL_MODE === 'alongside' && activeProject && project && (
    <div className="flex-1 opacity-100 ml-6 min-w-[400px] max-w-xl transition-all duration-500 ease-in-out overflow-y-auto">
        <div className="sticky top-8">
            <button
                onClick={handleCloseProject}
                className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
                <X className="w-4 h-4" />
                Close
            </button>
            <ProjectContent project={project} />
        </div>
    </div>
)}
```

Update the graph column width for alongside mode:

```jsx
const isCompressed = DETAIL_MODE === 'spine' && !!activeProject;
const isAlongside = DETAIL_MODE === 'alongside' && !!activeProject;
```

And update the graph column class:

```jsx
<div className={`transition-all duration-500 ease-in-out ${
    isCompressed ? 'w-[200px] shrink-0' :
    isAlongside ? 'shrink-0' :
    'flex-1 max-w-4xl mx-auto'
}`}>
```

For alongside, the graph keeps its natural width (shrink-0 prevents it from compressing) and the detail panel takes the remaining space.

Update the outer container to go wider:

```jsx
<div className={`${activeProject && DETAIL_MODE === 'alongside' ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-4`}>
```

**Step 2: Verify**

```bash
npm run build
```

Set `DETAIL_MODE = 'alongside'` and open dev server. Verify:
- Click a slug row: container widens, graph + labels stay visible on the left, detail panel appears on the right
- Graph labels remain clickable to switch projects
- Close button works
- URL sync works

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: DETAIL_MODE alongside — graph + detail side by side"
```

---

### Task 7: DETAIL_MODE replace

**Files:**
- Modify: `src/Pages/Home.jsx` (add replace layout branch)
- Modify: `src/Pages/ResumeGitGraph.jsx` (replace labels with detail content)

This mode replaces the label column with the detail content. The graph SVG stays in place.

**Step 1: Pass detail content to ResumeGitGraph**

In Home.jsx, pass the project content as a render prop or child:

Add a new prop to ResumeGitGraph:

```jsx
<ResumeGitGraph
    activeProject={activeProject}
    onSelectProject={DETAIL_MODE !== 'none' ? handleSelectProject : null}
    detailMode={DETAIL_MODE}
    detailContent={DETAIL_MODE === 'replace' && project ? (
        <div>
            <button
                onClick={handleCloseProject}
                className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
                <X className="w-4 h-4" />
                Close
            </button>
            <ProjectContent project={project} />
        </div>
    ) : null}
/>
```

**Step 2: Update ResumeGitGraph to accept detailContent prop**

Update the component signature:

```jsx
export default function ResumeGitGraph({ activeProject = null, onSelectProject = null, detailMode = 'none', detailContent = null }) {
```

In the desktop row labels section, when `detailMode === 'replace'` and `activeProject` is set, render the detail content instead of the labels:

Replace the label visibility check from Task 5:

```jsx
{detailMode === 'spine' && activeProject ? null : detailMode === 'replace' && detailContent ? (
    <div
        className="absolute overflow-y-auto"
        style={{
            top: 0,
            left: LABEL_LEFT,
            right: 0,
            maxHeight: TOTAL_HEIGHT,
        }}
    >
        <div className="px-2 py-4">
            {detailContent}
        </div>
    </div>
) : (() => {
    // ... existing label rendering code ...
})()}
```

**Step 3: Verify**

```bash
npm run build
```

Set `DETAIL_MODE = 'replace'` and open dev server. Verify:
- Click a slug row: labels disappear, detail content appears in the same column space
- Graph SVG lines and dots remain visible on the left (unchanged position)
- Active row's dot is highlighted
- Click a different dot: content switches
- Close button restores labels

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: DETAIL_MODE replace — detail content replaces labels"
```

---

## Toggle Reference

After all tasks are complete, these toggles control behavior:

```jsx
// In src/Pages/Home.jsx
const HOME_LAYOUT = 'graphHome';  // 'graphHome' | 'graphDrawer'
const DETAIL_MODE = 'spine';      // 'none' | 'spine' | 'alongside' | 'replace'
```

All 6 combinations (2 × 3) should work independently. `DETAIL_MODE = 'none'` disables inline panels entirely and falls back to the current full-page `/work/:slug` navigation on desktop too.
