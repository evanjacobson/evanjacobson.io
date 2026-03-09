# Graph as Home Page + Inline Detail Panel — Design

## Goal

Promote the git graph to the front page and add inline detail panels so users can explore projects without leaving the timeline.

## Audience

YC-stage startup CTOs evaluating talent. They scan fast, they're technical, and they respect builders. The graph is the pitch — show it immediately.

## Home Layout (toggle: `HOME_LAYOUT`)

### `graphHome`

- Header: h1 "Evan Jacobson" + tagline ("I build tools that automate the tedious so people can focus on what humans do best: think.") + PDF download link
- Full interactive git graph immediately below
- No bio paragraphs

### `graphDrawer`

- Header: h1 "Evan Jacobson" + PDF download link
- No tagline. Instead, a truncated preview of the first bio paragraph: "Right now I'm co-founding OrAI, where we're giving early childhood educators their time back..." with a visible fade/truncation and "more ▾" expand affordance
- Clicking expand reveals all four current bio paragraphs with a smooth height transition
- Full interactive git graph below the header (whether drawer is open or closed)

## Detail Panel (toggle: `DETAIL_MODE`)

Clicking a row with a `slug` opens the project detail inline on desktop. Mobile always falls back to full-page `/work/:slug` navigation.

### `spine`

- Graph compresses to SVG-only column (branch lines + dots, no label text)
- Detail content panel fills the remaining width to the right
- Click different dots on the compressed graph to switch between projects
- The graph acts as a navigation minimap
- Clicking outside the detail panel or a close/back affordance restores full graph + labels

### `alongside`

- Full graph (SVG + labels) slides left
- Detail panel appears to the right of the labels
- Container widens beyond max-w-4xl to accommodate both
- Labels remain visible and clickable to switch projects
- More horizontal space required — may need full-width or max-w-6xl

### `replace`

- Graph SVG stays in place (no movement)
- Detail content replaces the label column
- Minimal layout shift — the graph lines still provide visual context
- The active row is highlighted; other labels disappear
- Clicking a different dot in the SVG switches the detail content

## Shared Changes

### Navigation

- Nav shows on all pages (remove `!isHome` conditional in Layout.jsx)
- "Log" link removed from nav (home IS the log)
- Nav becomes: `Evan Jacobson [mr-auto] Toolbox`
- Clicking "Evan Jacobson" returns to `/`

### Routing

- `/log` redirects to `/`
- `/work/:slug` still works for direct links, sharing, and mobile
- When detail panel is open on desktop, URL updates to `/?project=slug` for shareability
- Direct navigation to `/?project=orai` opens the page with that detail panel already visible
- `/book-a-call` preserved (auto-opens Cal.com booking)

### Present Row

- Gets slug `about` — clicking it in `graphDrawer` mode expands the bio drawer; in `graphHome` mode links to `/work/about` or similar

### Mobile

- No detail panel — clicking an entry navigates to `/work/:slug` (current behavior)
- Home layout changes apply (compact header + graph)

## Files Affected

| File | Changes |
|---|---|
| `src/Pages/Home.jsx` | Major rewrite — merges with Resume.jsx, adds detail panel logic |
| `src/Pages/Resume.jsx` | Likely absorbed into Home.jsx or becomes a redirect |
| `src/Pages/ResumeGitGraph.jsx` | Add detail panel integration: compressed mode, click handlers, active row state |
| `src/Pages/WorkDetail.jsx` | Extract content rendering into a shared component usable both as full page and inline panel |
| `src/Layout.jsx` | Remove `!isHome` nav gate, remove "Log" from nav |
| `src/main.jsx` | Add `/log` redirect to `/`, update route structure |

## Rejected

- Separate `/log` page — redundant when graph is the home page
- Bio text as permanent fixture above graph — adds a speed bump for the target audience
- Main branch click as only bio access — not discoverable enough
