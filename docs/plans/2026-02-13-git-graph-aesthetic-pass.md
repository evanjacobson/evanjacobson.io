# Git Graph Aesthetic Pass — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Polish the career git graph with better spacing, colors, interactions, and prototype several structural changes for visual comparison.

**Architecture:** All changes are in `src/Pages/ResumeGitGraph.jsx`. Confirmed changes are implemented directly. Prototype items use a `PROTO` config object at the top of the file with boolean toggles so the user can flip them on/off and compare in the browser.

**Tech Stack:** React 18, SVG, Tailwind CSS, Vite dev server

---

### Task 1: Add prototype config + dynamic LABEL_LEFT + rounded line caps

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx:3-7` (constants), `:251-256` (SVG element), `:284-297` (vertical lines), `:336-342` (fork paths), `:356-363` (merge paths)

**Step 1: Add PROTO config and fix LABEL_LEFT**

Replace lines 3-7:

```jsx
const ROW_HEIGHT = 56;
const LANE_GAP = 28;
const GRAPH_LEFT = 20;
const LABEL_LEFT = 220;
```

With:

```jsx
// ── Prototype toggles (flip to compare) ──────────────────────
const PROTO = {
    collapseTags: false,       // Task 5: only show branch pill on first row of consecutive run
    compactMerges: false,      // Task 4: shorter merge rows (36px vs 56px)
    yearDividers: 'default',   // Task 6: 'default' | 'divider' | 'axis'
    groupByBranch: false,      // Task 7: cluster same-branch entries within eras
    mobileTags: false,         // Task 8: show branch name pill on mobile cards
};

const COMMIT_ROW_HEIGHT = 56;
const MERGE_ROW_HEIGHT = PROTO.compactMerges ? 36 : COMMIT_ROW_HEIGHT;
const LANE_GAP = 28;
const GRAPH_LEFT = 20;
```

**Step 2: Refactor rowY to support variable row heights**

Replace the layout section (lines 190-201) with:

```jsx
// ── Layout ────────────────────────────────────────────────────

function laneX(lane) {
    return GRAPH_LEFT + lane * LANE_GAP;
}

// Pre-compute cumulative Y positions (needed for variable-height merge rows)
const rowYPositions = [];
let cumulativeY = 0;
for (let i = 0; i < rows.length; i++) {
    const h = rows[i].type === 'merge' ? MERGE_ROW_HEIGHT : COMMIT_ROW_HEIGHT;
    rowYPositions.push(cumulativeY + h / 2);
    cumulativeY += h;
}

function rowY(i) {
    return rowYPositions[i];
}

function rowHeight(i) {
    return rows[i].type === 'merge' ? MERGE_ROW_HEIGHT : COMMIT_ROW_HEIGHT;
}

const TOTAL_HEIGHT = cumulativeY + 20;
const SVG_WIDTH = GRAPH_LEFT + Object.keys(branchMap).length * LANE_GAP + 10;
const LABEL_LEFT = SVG_WIDTH + 16;
```

**Step 3: Add rounded line caps to the SVG element**

On the `<svg>` tag (around line 251), add a default style. Change:

```jsx
<svg
    className="absolute top-0 left-0 pointer-events-none"
    width={SVG_WIDTH}
    height={TOTAL_HEIGHT}
    style={{ overflow: 'visible' }}
>
```

To:

```jsx
<svg
    className="absolute top-0 left-0 pointer-events-none"
    width={SVG_WIDTH}
    height={TOTAL_HEIGHT}
    style={{ overflow: 'visible' }}
    strokeLinecap="round"
    strokeLinejoin="round"
>
```

**Step 4: Update row dividers to use variable heights**

The row dividers (around line 242) use `rowY(i) - ROW_HEIGHT / 2`. Change:

```jsx
style={{ top: rowY(i) - ROW_HEIGHT / 2 }}
```

To:

```jsx
style={{ top: rowY(i) - rowHeight(i) / 2 }}
```

**Step 5: Update row label positioning to use variable heights**

In the row labels section (around line 446-453), change:

```jsx
style={{
    top: y - ROW_HEIGHT / 2,
    left: 0,
    right: 0,
    height: ROW_HEIGHT,
```

To:

```jsx
style={{
    top: y - rowHeight(i) / 2,
    left: 0,
    right: 0,
    height: rowHeight(i),
```

**Step 6: Update the label height in the flex container**

In `labelContent` (around line 419), change:

```jsx
<div className="flex items-center gap-2.5" style={{ height: ROW_HEIGHT }}>
```

To:

```jsx
<div className="flex items-center gap-2.5" style={{ height: rowHeight(i) }}>
```

Note: `i` is available from the `.map()` callback. You'll need to move the `labelContent` definition inside the `.map()` — or pass `rowHeight(i)` as a variable. The simplest approach: define `const rh = rowHeight(i);` at the top of the `.map()` callback and use `rh` in the style.

**Step 7: Verify in browser**

Run: `npm run dev`
- Graph lines should now have rounded ends
- Text column should sit clearly to the right of all graph lanes with no overlap
- All rows render at the same height (PROTO.compactMerges is false)
- Nothing else should have changed visually

**Step 8: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: dynamic LABEL_LEFT, rounded line caps, variable row height support"
```

---

### Task 2: Differentiate branch colors

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx:12-28` (BRANCHES config)

**Step 1: Update BRANCHES colors**

Replace the alarm sub-branch and spark colors:

```jsx
const BRANCHES = [
    { id: 'main', color: '#94a3b8', label: 'main' },
    { id: 'alarm', color: '#10b981', label: 'Alarm.com' },
    { id: 'alarm-email',    color: '#6ee7b7', label: 'Intl. Email', parent: 'alarm' },           // emerald-300
    { id: 'alarm-stripe',   color: '#34d399', label: 'Stripe Subscriptions', parent: 'alarm' },  // emerald-400
    { id: 'alarm-refactor', color: '#a7f3d0', label: 'SQL Refactoring Bot', parent: 'alarm' },   // emerald-200
    { id: 'alarm-handoff',  color: '#2dd4bf', label: 'Handoff Bot', parent: 'alarm' },            // teal-400
    { id: 'onedeal', color: '#a855f7', label: 'OneDeal' },
    { id: 'orai', color: '#3b82f6', label: 'OrAI' },
    { id: 'trade', color: '#ef4444', label: 'Trade Intel' },
    { id: 'beads', color: '#22c55e', label: 'Open Source Contributions' },
    { id: 'minecraft',  color: '#f59e0b', label: 'Minecraft Server Plugin' },
    { id: 'spark',      color: '#14b8a6', label: 'Spark Technology Solutions' },  // teal-500 (was emerald-500, same as alarm)
    { id: 'university', color: '#2563eb', label: 'University of Miami' },
    { id: 'garmin',     color: '#a21caf', label: 'Garmin', parent: 'university' },
    { id: 'projects',   color: '#e11d48', label: 'Personal Projects (no AI involved)' },
];
```

Key changes:
- `alarm-email`: `#34d399` → `#6ee7b7` (lighter emerald)
- `alarm-refactor`: `#34d399` → `#a7f3d0` (lightest emerald)
- `alarm-handoff`: `#34d399` → `#2dd4bf` (teal)
- `spark`: `#10b981` → `#14b8a6` (teal-500, distinct from alarm's emerald-500)

**Step 2: Check branch tag readability**

Verify in browser that the lighter colors (`#a7f3d0`, `#6ee7b7`) still have enough contrast with the dark text (`text-slate-950`) on the branch tag pills. If not, adjust to slightly darker shades.

**Step 3: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: differentiate alarm sub-branch and spark colors"
```

---

### Task 3: Right-aligned dates

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — the `labelContent` JSX block (around line 418-439)

**Step 1: Restructure the label layout**

Change the label content from inline flex to a structure that pushes dates right. Replace the `labelContent` block:

```jsx
<div className="flex items-center gap-2.5" style={{ height: rh }}>
    {/* Branch tag */}
    <div
        className={`shrink-0 px-2 py-0.5 rounded font-mono font-medium text-slate-950 ${isMerge ? 'text-[8px]' : 'text-[10px]'}`}
        style={{ backgroundColor: b.color, opacity: isMerge ? 0.6 : 1 }}
    >
        {b.label}
    </div>
    {/* Label text + date */}
    <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
        <div className="min-w-0">
            <span className={`text-slate-200 font-medium truncate block ${isMerge ? 'text-xs text-slate-400' : 'text-sm'}`}>
                {row.label}
            </span>
            {row.subtitle && !isMerge && (
                <div className="text-[11px] text-slate-500 truncate">{row.subtitle}</div>
            )}
        </div>
        {row.date && <span className="text-[10px] text-slate-600 shrink-0">{row.date}</span>}
    </div>
</div>
```

The key change: `flex-1` on the middle section with `justify-between` pushes the date to the right edge. The label text gets `min-w-0` so it truncates rather than pushing the date off-screen.

**Step 2: Verify in browser**

- Dates should align vertically along the right edge
- Long labels should truncate with ellipsis rather than wrapping
- Merge row dates should still appear

**Step 3: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: right-align date column"
```

---

### Task 4: Active branch pulse

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — commit dots section (around line 370-404)

**Step 1: Identify the "latest" row per active branch**

After `buildGraph`, compute a set of row indices that are the topmost (most recent) row for each active branch:

```jsx
const activeBranchLatest = new Set();
for (const [branchId, b] of Object.entries(branchMap)) {
    if (b._isEnded || branchId === 'main') continue;
    // Find topmost row for this branch
    const topRow = rows.findIndex(r => r.branch === branchId);
    if (topRow >= 0) activeBranchLatest.add(topRow);
}
```

Add this right after the `buildGraph` call (line 188).

**Step 2: Add pulse animation to active branch dots**

In the commit dots section, after the existing `isPresent` pulse (the `<circle>` with `<animate>` elements), add a conditional pulse for active branch latest dots. Inside the `<g key={`dot-${i}`}>` group, after the existing glow circle:

```jsx
{/* Breathing pulse for active branch latest commit */}
{!isPresent && activeBranchLatest.has(i) && (
    <circle cx={x} cy={y} r={5} fill={b.color} opacity={0.2}>
        <animate attributeName="r" from="5" to="12" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.2" to="0" dur="3s" repeatCount="indefinite" />
    </circle>
)}
```

Note: 3s duration (slower than the Present dot's 2s) for a gentler feel.

**Step 3: Verify in browser**

- Present dot on main should still have its fast pulse
- OrAI, Trade Intel, Beads dots should have a slower, subtler pulse
- Ended branches (Alarm, OneDeal, etc.) should NOT pulse

**Step 4: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: add breathing pulse to active branch latest dots"
```

---

### Task 5: Clickable row cues + linked row tooltips

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — row labels section (around line 442-472)

**Step 1: Add ArrowRight import**

At line 2, change:

```jsx
import { Link } from 'react-router-dom';
```

To:

```jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
```

**Step 2: Update clickable row rendering**

Replace the slug conditional rendering block (around line 459-468):

```jsx
{row.slug ? (
    <Link
        to={`/work/${row.slug}`}
        className="block px-2 rounded-lg hover:bg-slate-800/40 transition-colors"
    >
        {labelContent}
    </Link>
) : (
    <div className="px-2">{labelContent}</div>
)}
```

With:

```jsx
{row.slug ? (
    <Link
        to={`/work/${row.slug}`}
        className="group/link block px-2 rounded-lg hover:bg-slate-800/40 transition-colors relative"
    >
        {labelContent}
        {/* Arrow cue: faint at rest, slides in on hover */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-all duration-200 opacity-20 group-hover/link:opacity-70 translate-x-0 group-hover/link:translate-x-1">
            <span className="text-[10px] text-slate-400 hidden group-hover/link:inline">View case study</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
    </Link>
) : (
    <div className="px-2">{labelContent}</div>
)}
```

This gives:
- **Pre-hover:** faint arrow at 20% opacity (subtle "this is clickable" cue)
- **On hover:** arrow slides right, brightens to 70%, "View case study" text appears

**Step 3: Verify in browser**

- Rows with slugs (Minecraft, Spark, University, Garmin, OneDeal, OrAI, Trade Intel, Beads) show faint arrow
- On hover: arrow brightens, "View case study" text fades in, arrow slides right
- Rows without slugs (SWE Intern, Software Engineer, etc.) show no arrow

**Step 4: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: add clickable row cues with arrow and tooltip"
```

---

### Task 6: Prototype — compact merge rows

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — only the PROTO config

**Step 1: Toggle compactMerges on**

Change in the PROTO config:

```jsx
compactMerges: false,
```

To:

```jsx
compactMerges: true,
```

**Step 2: Verify in browser**

- Merge rows ("Shipped", "Graduated", etc.) should be visibly shorter than regular rows
- Graph lines and curves should still connect correctly
- The overall page should be noticeably shorter

**Step 3: Show user, get feedback, then either keep true or revert to false**

**Step 4: Commit (with whatever value user picks)**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: prototype compact merge rows"
```

---

### Task 7: Prototype — collapse repeated branch tags

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — row labels section

**Step 1: Add consecutive-run detection logic**

Inside the row labels `.map()` callback, before `labelContent`, add:

```jsx
const showTag = !PROTO.collapseTags || i === 0 || rows[i - 1].branch !== row.branch;
```

**Step 2: Conditionally render branch tag**

Wrap the branch tag `<div>` with the condition:

```jsx
{showTag && (
    <div
        className={`shrink-0 px-2 py-0.5 rounded font-mono font-medium text-slate-950 ${isMerge ? 'text-[8px]' : 'text-[10px]'}`}
        style={{ backgroundColor: b.color, opacity: isMerge ? 0.6 : 1 }}
    >
        {b.label}
    </div>
)}
```

When `showTag` is false, the label text should still align where the tag would be. Add a spacer:

```jsx
{!showTag && <div className="shrink-0" style={{ width: 0 }} />}
```

Actually, since the tag is `shrink-0` with natural width, removing it will shift the text left. This is intentional — the text aligns closer to the graph lines, and the missing tag signals "same branch as above."

**Step 3: Toggle on and verify**

Set `collapseTags: true` in PROTO. Verify:
- First Alarm.com row shows the green pill
- Subsequent Alarm.com rows (Software Engineer, DevEx Tooling, etc.) show NO pill
- Text shifts left slightly for rows without pills

**Step 4: Show user, get feedback**

**Step 5: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: prototype collapsible branch tags"
```

---

### Task 8: Prototype — year marker options

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — year markers SVG section (around line 257-278)

**Step 1: Replace the year markers SVG block**

Replace the existing year markers section with:

```jsx
{/* Year markers */}
{PROTO.yearDividers === 'default' && yearMarkers.map(({ row: ri, year }) => {
    const x = laneX(0);
    const y = rowY(ri) - rowHeight(ri) / 2 + 6;
    return (
        <text
            key={`yr-${year}`}
            x={x} y={y}
            fill="#475569" fontSize={8} textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            style={{
                opacity: mounted ? (hoveredBranch ? 0.3 : 0.7) : 0,
                transition: 'opacity 0.3s ease-out',
            }}
        >
            {year}
        </text>
    );
})}

{/* Year divider lines (full-width) */}
{PROTO.yearDividers === 'divider' && yearMarkers.map(({ row: ri, year }) => {
    const y = rowY(ri) - rowHeight(ri) / 2;
    return (
        <g key={`yrdiv-${year}`}
            style={{
                opacity: mounted ? (hoveredBranch ? 0.2 : 0.5) : 0,
                transition: 'opacity 0.3s ease-out',
            }}
        >
            <line x1={0} y1={y} x2={SVG_WIDTH + 600} y2={y}
                stroke="#334155" strokeWidth={1} strokeDasharray="4 4" />
            <text x={4} y={y - 4}
                fill="#475569" fontSize={9}
                fontFamily="ui-monospace, monospace"
            >
                {year}
            </text>
        </g>
    );
})}
```

**Step 2: Add left-margin axis option (HTML overlay, not SVG)**

For the 'axis' option, add a column of year labels positioned to the left of the graph. Add this right before the SVG element inside the desktop `<div>`:

```jsx
{/* Year axis (left margin) */}
{PROTO.yearDividers === 'axis' && yearMarkers.map(({ row: ri, year }) => (
    <div
        key={`yraxis-${year}`}
        className="absolute font-mono text-[9px] text-slate-600"
        style={{
            top: rowY(ri) - rowHeight(ri) / 2 - 2,
            left: 0,
            opacity: mounted ? (hoveredBranch ? 0.3 : 0.7) : 0,
            transition: 'opacity 0.3s ease-out',
        }}
    >
        {year}
    </div>
))}
```

Note: If using the axis option, `GRAPH_LEFT` may need to increase to make room. For this prototype, the axis labels will overlap the graph slightly — that's fine for evaluation.

**Step 3: Test each option**

Set `yearDividers` to `'default'`, `'divider'`, and `'axis'` one at a time. Verify each renders correctly.

**Step 4: Show user all three, get feedback**

**Step 5: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: prototype year marker display options"
```

---

### Task 9: Prototype — branch grouping

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — inside `buildGraph()` function, the sort logic (around line 124)

**Step 1: Add grouped sort option**

Replace the simple sort:

```jsx
rows.sort((a, b) => b._sort - a._sort);
```

With:

```jsx
if (PROTO.groupByBranch) {
    // Group by branch within each era, but maintain overall chronological order
    // Era = the time span of a top-level branch (alarm, onedeal, orai, etc.)
    // Within an era, cluster all rows for the same branch together
    rows.sort((a, b) => {
        if (b._sort !== a._sort) return b._sort - a._sort;
        // Same timestamp: group by branch
        return (a.branch > b.branch ? 1 : -1);
    });
} else {
    rows.sort((a, b) => b._sort - a._sort);
}
```

Note: This is a simple first pass — grouping by branch at equal timestamps. A more sophisticated approach would group all rows of a sub-branch contiguously even if they have different timestamps. But this is enough for the prototype to show the visual difference.

**Step 2: Toggle on and verify**

Set `groupByBranch: true`. Check that:
- Rows with the same start date cluster by branch
- The graph still renders correctly
- The vertical branch lines don't become more tangled

**Step 3: Show user, get feedback**

**Step 4: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: prototype branch grouping sort"
```

---

### Task 10: Prototype — mobile branch tags

**Files:**
- Modify: `src/Pages/ResumeGitGraph.jsx` — mobile section (around line 476-504)

**Step 1: Add branch tag to mobile cards**

Inside the mobile card's `inner` JSX, add the branch tag pill. Change:

```jsx
const inner = (
    <div className="py-3 pl-4 pr-3">
        <div className="flex items-baseline justify-between gap-2">
```

To:

```jsx
const inner = (
    <div className="py-3 pl-4 pr-3">
        {PROTO.mobileTags && (
            <div
                className="inline-block px-1.5 py-0.5 rounded font-mono text-[8px] font-medium text-slate-950 mb-1"
                style={{ backgroundColor: b.color }}
            >
                {b.label}
            </div>
        )}
        <div className="flex items-baseline justify-between gap-2">
```

**Step 2: Toggle on and verify**

Set `mobileTags: true`. Check on mobile viewport:
- Each card shows a small colored branch name pill above the label
- The pill color matches the left border color

**Step 3: Show user, get feedback**

**Step 4: Commit**

```bash
git add src/Pages/ResumeGitGraph.jsx
git commit -m "feat: prototype mobile branch name tags"
```

---

## Execution Order

Tasks 1-5 are confirmed changes — implement in order.
Tasks 6-10 are prototypes — implement, then toggle each on for user review.

After all tasks are done, do a final pass with the user to:
1. Set each PROTO toggle to its final value
2. Remove the PROTO config if all decisions are made (inline the chosen values)
3. Final commit
