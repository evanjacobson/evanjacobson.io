# Log Page (Git Graph) — Architecture Reference

> For agents making changes to the career timeline at `/log`.

## File Map

| File | Role |
|---|---|
| `src/Pages/ResumeGitGraph.jsx` | All graph logic, data, layout, and rendering (~758 lines, single file) |
| `src/Pages/Resume.jsx` | Thin wrapper: page header ("Log") + PDF download link + `<ResumeGitGraph />` |
| `src/data/work.js` | Project detail data for `/work/:slug` pages (separate from graph data) |
| `src/Pages/WorkDetail.jsx` | Renders `/work/:slug` detail pages from `work.js` data |

Routes: `/log` → `Resume` → `ResumeGitGraph`. Rows with a `slug` link to `/work/:slug`.

## Data Model

Everything lives in two arrays at the top of `ResumeGitGraph.jsx`:

### BRANCHES

```js
{ id: 'alarm', color: '#bf4600', label: 'Alarm.com', parent: 'alarm' }
```

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique key. Entries reference this. |
| `color` | yes | Hex color for lines, dots, and pills. |
| `label` | yes | Display name in branch pill. Multiple branches can share a label (e.g. all Alarm sub-branches show "Alarm.com"). |
| `parent` | no | Branch this forks from. Defaults to `'main'`. |

**Order matters for the sweep-line algorithm.** Parent branches must appear before children so depth computation works. If you add a child branch, place it after its parent in the array.

### ENTRIES

```js
{ branch: 'alarm', label: 'Hired as Full-Time SWE', subtitle: '...', slug: 'orai', start: '2021-08', end: '2024-04', endLabel: 'Shipped', dateLabel: 'Summer 2020' }
```

| Field | Required | Notes |
|---|---|---|
| `branch` | yes | Must match a BRANCHES `id`. |
| `label` | yes | Commit message text shown next to the dot. |
| `subtitle` | no | Smaller text below the label. |
| `slug` | no | Makes the row clickable, linking to `/work/:slug`. The slug must have a matching entry in `src/data/work.js` or the user gets redirected to `/log`. |
| `start` | yes | `'YYYY-MM'` or `'YYYY-MM-DD'` for day precision. |
| `end` | no | Same format. Omit for ongoing branches. Set to `null` explicitly if you want a "promoted" style entry with no end. |
| `endLabel` | no | Text for the auto-generated merge row. Defaults to `"{label} complete"`. |
| `dateLabel` | no | Overrides the auto-formatted date display (e.g. `'Summer 2020'`). |

**Entry order in the array does not matter.** The graph sorts everything chronologically internally. However, entries are grouped into comment sections for human readability.

## How to Add a New Item

### Simple: new commit on existing branch

Add an entry to ENTRIES with an existing `branch` id:

```js
{ branch: 'alarm', label: 'New Thing Shipped', subtitle: 'Details', start: '2024-01' }
```

That's it. The graph handles positioning automatically.

### New branch (new company/project)

1. Add to BRANCHES (after its parent):
   ```js
   { id: 'newco', color: '#hex', label: 'NewCo' }
   ```
2. Add entry/entries to ENTRIES:
   ```js
   { branch: 'newco', label: 'NewCo', subtitle: 'Role', slug: 'newco', start: '2026-03' }
   ```
3. If `slug` is set, add a matching project to `src/data/work.js`.

### New sub-branch (project within a company)

1. Add to BRANCHES with `parent` set (place it after the parent):
   ```js
   { id: 'alarm-newproject', color: '#aabbcc', label: 'Alarm.com', parent: 'alarm' }
   ```
2. Add entries referencing the new branch id.

## Build Pipeline (how data becomes pixels)

The entire graph is computed at **module load time** (not inside the React component). The component only handles hover state and mount animation.

### Step 1: buildGraph() — data → rows

```
ENTRIES + BRANCHES
    ↓
Group entries by branch, sort chronologically
    ↓
Compute time ranges per branch [startTime, endTime]
    ↓
Extend parent ranges to cover child branch lifetimes
    ↓
Sweep-line lane assignment (see below)
    ↓
Detect bump branches (single entry, same start/end month)
    ↓
Generate rows: fork + commit + merge per branch
    ↓
Sort rows descending by date (newest at top)
    ↓
Compute branch spans (first row index → last row index)
    ↓
Extend parent spans to cover children
    ↓
Mark worktree forks (concurrent with another non-main branch)
    ↓
Mark bump branches and tag fork/merge pairs
    ↓
Track ended vs ongoing branches
    ↓
Compute year markers
    ↓
Return { rows, branchMap, branchSpans, yearMarkers }
```

### Step 2: Layout computation (module-level)

After `buildGraph()` returns, these are computed once:

- `rowYPositions[]` — cumulative Y positions (variable height: 56px commit, 36px merge)
- `TOTAL_HEIGHT` — sum of all row heights + 20px padding
- `SVG_WIDTH` — computed from max lane number: `GRAPH_LEFT + (maxLane + 1) * LANE_GAP + 10`
- `LABEL_LEFT` — `SVG_WIDTH + 8` (where text column starts)
- `activeBranchLatest` — Set of row indices that get pulse animation

### Step 3: React component — render only

The `ResumeGitGraph` component is stateless aside from:
- `hoveredBranch` — which branch the user is hovering (highlights parent chain)
- `mounted` — triggers staggered entrance animation

## Key Algorithms

### Sweep-Line Lane Assignment

Prevents lane crossovers. Processes start/end events in chronological order:

1. Build events: each branch gets a `start` event and (if ended) an `end` event.
2. Sort: chronological → ends before starts at same time → shallower depth first.
3. Walk forward: on start, assign closest free lane > parent's lane. On end, release lane.
4. `main` is always lane 0. All other branches get lane ≥ 1.

**Why it matters:** A naive "assign lanes by BRANCHES order" causes visual crossovers where lines pass through each other. The sweep-line ensures non-overlapping branches can reuse lanes.

**Constraint:** Parent must be processed before child. This is guaranteed because parents start earlier (their time range is extended to cover children in the range-extension step).

### Bump Branch Detection

A "bump" branch has exactly one entry where start and end are in the same month (compared via `slice(0, 7)`). These are visually small — think one-off shipped projects.

Bump branches use day-level dates (e.g. `'2013-04-01'` / `'2013-04-02'`) to ensure correct sort ordering: the merge row appears above the fork row. The `typeOrder` tiebreaker (`merge: 0, commit: 1, fork: 2`) handles this.

### Row Sort Order

Rows are sorted descending by date (newest at top). Tiebreakers:
1. Same date, same branch → merge above commit above fork (`typeOrder`)
2. Same date, different branch → alphabetical by branch id (groups branch rows together)

### Worktree Detection

A fork/merge is marked `_isWorktree` if another non-main branch is active (has a span covering that row index). Worktree forks render as horizontal dashed lines with a "wt" label instead of bezier curves.

### Branch Span Extension

Parent branch vertical lines extend to cover all child branches. This is computed iteratively until stable (fixed-point).

## SVG Rendering Layers (z-order)

Inside the `<svg>`, elements render in this order (painter's algorithm — later = on top):

1. Year markers (divider lines + labels)
2. Vertical branch lines (dashed if ended)
3. Fork/merge curves (bezier or worktree dashed lines)
4. Commit dots (with glow/pulse for active branches)

## Row Label Rendering

Labels are HTML `<div>`s absolutely positioned to the right of the SVG. They are NOT inside the SVG.

- `LABEL_LEFT` margin pushes them past the graph
- Rows with `slug` wrap in a `<Link>` with hover arrow + "View case study" tooltip
- Branch pills use the branch's own color (`PROTO.labelGroupStyle: 'pill'`)
- Merge rows render at reduced opacity (0.45) with smaller text

## PROTO Toggles

```js
const PROTO = {
    collapseTags: false,      // Only show branch pill on first consecutive row
    compactMerges: true,      // Merge rows at 36px instead of 56px
    yearDividers: 'divider',  // 'default' | 'divider' | 'axis'
    groupByBranch: true,      // Group same-branch rows together in sort
    mobileTags: true,         // Show branch pills on mobile cards
    labelGroupStyle: 'pill',  // 'pill' | 'dot' | 'accent' | 'groupDot'
};
```

These are prototype toggles from the design phase. The current production values are shown above. Changing them still works but some combinations haven't been visually polished.

## Mobile View

Below `sm` breakpoint, the SVG graph is hidden entirely. Mobile renders a flat list of cards with:
- Colored left border (branch color)
- Branch pill (if `mobileTags` enabled)
- Label + subtitle + date range
- Merge rows filtered out
- Date ranges shown inline: `"Jan 2020 – Aug 2020"`

## Common Pitfalls

### Adding a branch in wrong position
BRANCHES order determines depth for the sweep-line. If a child appears before its parent, depth computation breaks and the branch gets depth 99, landing in a far-right lane.

**Fix:** Always place child branches after their parent in BRANCHES.

### Same-month start/end dates
If an entry has `start: '2024-09'` and `end: '2024-09'`, bump detection compares at month level (`slice(0, 7)`). But the sort will put fork and merge at the same position. Use day-level dates (e.g. `'2024-09-01'` / `'2024-09-02'`) to ensure correct ordering.

### Slug without work.js entry
If an entry has `slug: 'foo'` but `work.js` has no project with that slug, clicking the row redirects to `/log` (via `Navigate` in WorkDetail.jsx). Always add the corresponding project data.

### SVG width changes unexpectedly
SVG width is computed from the actual max lane number, not from BRANCHES.length. Adding a branch that reuses a freed lane won't widen the graph. Adding one that needs a new lane will.

### Hover highlighting
Hovering a row highlights the hovered branch AND its entire parent chain up to main. All other branches dim to 0.08-0.12 opacity. This is computed by `isBranchHit()` which walks up the parent chain.

### Entrance animation
Rows stagger in with 35ms delay per row index (`${i * 35}ms`). This only applies on initial mount — after `mounted` becomes true, transitions are instant (0ms delay).

## Date Formats

`parseDate()` handles three formats:
- `'YYYY-MM'` → first day of month
- `'YYYY-MM-DD'` → exact day
- Displayed via `formatDate()` → `"Mon YYYY"` (e.g. "Apr 2013")

`dateLabel` overrides display entirely (e.g. `'Summer 2020'`).
