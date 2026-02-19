# Site Redesign — Design Philosophy & Choices

## Design Philosophy

**Inspired by leerob.com and alexnaraghi.com** — minimal, content-first, no visual noise. The goal was to reduce redundancy across pages (Resume, Projects, Toolbox all repeated the same project info) and let each page have a single clear purpose.

## Architecture

**One canonical home for each project.** All 5 projects (OrAI, Trade Intel, OneDeal, Beads, Kilo Code) live in `/src/data/work.js` with full case study narratives, tech stacks, colors, and links. Other pages reference these via links rather than duplicating content.

**Page structure:**

- **`/` (Home)** — Single-screen, no-scroll narrative page. Name, tagline, three paragraphs of storytelling with inline colored links to case studies. Two simple nav links at the bottom ("See my work", "Browse my toolbox") with arrow icons. No photo, no cards, no gradients — just text.

- **`/work` (Work)** — Vertical list of project cards. Each card shows icon, title, role, date range, one-liner description, and a "Read more" link. Cards link to `/work/:slug`.

- **`/work/:slug` (WorkDetail)** — Case study template. Back link, project icon + title + role + dates, narrative paragraphs from the data file, tech stack badges, and external links. Handles unknown slugs with redirect to `/work`.

- **`/resume` (Resume)** — Timeline view with colored dots (blue=OrAI, green=Beads, red=Trade Intel, purple=OneDeal, emerald=Alarm.com). Each entry has a one-line description and a "Read case study" link to the relevant `/work/:slug` page. Skills grid (6 categories, neutral gray badges). PDF download button in the header, not a big CTA.

- **`/toolbox`** — Content unchanged, just adjusted the wrapper (removed `bg-slate-900`, widened to `max-w-4xl`).

## Layout Choices

- **No sidebar.** Replaced with a minimal top nav bar (`Nav` component) showing "Evan Jacobson" on the left, "Work" and "Toolbox" on the right. Nav is hidden on the home page.
- **Nav max-width: `max-w-4xl`** to accommodate the wider Toolbox page.
- **Footer on every page:** Book a Call (Cal.com), Email, LinkedIn, GitHub, Resume PDF download. Minimal, centered, `max-w-2xl`, `border-t border-slate-800`.
- **Background: `bg-slate-950`** — solid dark, no gradients.
- **Cal.com initialization** stays in Layout.
- **Scroll-to-top on route change** stays in Layout.

## Key Design Decisions

1. **No Resume link in the nav** — only Work and Toolbox. Resume is accessible from the footer (PDF download) and could be linked from the home page narrative if desired.
2. **Content pages use `max-w-2xl`** (Home, Work, WorkDetail, Resume) for readable line lengths. Toolbox uses `max-w-4xl` for its 3-column grid.
3. **Colors are consistent** — each project has a fixed color identity throughout all pages (OrAI=blue, Trade Intel=red, OneDeal=purple, Beads=green, Alarm.com=emerald).
4. **No shared UI components** for the new pages (Card, ExperienceItem, etc. are unused) — everything is plain HTML/Tailwind for simplicity.
5. **Placeholder-friendly** — the narrative paragraphs on Home and the case study content in `work.js` are filled in but meant to be tuned.

## Files Created/Modified

| File | Status |
|---|---|
| `src/data/work.js` | New — central project data |
| `src/Layout.jsx` | Rewritten — no sidebar, minimal Nav |
| `src/Components/Shared/Footer.jsx` | Rewritten — minimal footer |
| `src/Pages/Home.jsx` | Rewritten — narrative one-screen |
| `src/Pages/Work.jsx` | New — project grid |
| `src/Pages/WorkDetail.jsx` | New — case study template |
| `src/Pages/Resume.jsx` | Rewritten — timeline + skills |
| `src/Pages/Toolbox.jsx` | Adjusted — removed wrapper, simplified header |
| `src/main.jsx` | Updated — new routes (`/work`, `/work/:slug`), removed `/projects` |
