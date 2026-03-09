# Git Graph Aesthetic Pass — Design

## Confirmed Changes

### 1. Dynamic LABEL_LEFT
Compute `LABEL_LEFT` once from `SVG_WIDTH + padding` so the entire text column shifts right uniformly, eliminating overlap between graph lines and row labels.

### 2. Differentiate branch colors
- Give each Alarm sub-branch a distinct shade within the green family (currently all `#34d399`)
- Change Spark's color away from `#10b981` (currently identical to Alarm)

### 3. Rounded line caps
Add `strokeLinecap="round"` and `strokeLinejoin="round"` to all SVG lines and paths for a softer, more polished feel.

### 4. Right-aligned dates
Pin date labels to the right edge of each row instead of floating inline after the label text. Creates consistent columnar alignment.

### 5. Active branch pulse
Add a subtle breathing glow animation to the latest commit dots on non-ended branches (OrAI, Trade Intel, Beads). Similar to the existing Present dot pulse but gentler.

### 6. Linked row tooltips
For rows with a `/work/:slug` link, show a "View case study" hint on hover.

### 7. Clickable row cues
- Pre-hover: subtle visual indicator that the row is clickable (faint icon or slightly different text treatment)
- On hover: more obvious cue (arrow slides in, brighter colors)

### 8. Animation direction
Keep current top-to-bottom stagger (present to past).

## Prototype & Compare (implement, then judge visually)

### A. Collapse repeated branch tags
Only show the colored branch pill on the first row of a consecutive run on the same branch. Subsequent rows show label text only, aligned to match.

### B. Compact merge rows
Render merge rows at ~32-36px height instead of the standard 56px. Reduces page length without losing information.

### C. Year markers (two options to compare)
- **Option 1**: Full-width horizontal divider with year label spanning the page width
- **Option 2**: Left-margin timeline axis with year labels pinned outside the graph area

### D. Branch grouping within eras
Cluster same-branch entries together within each chronological era instead of strict date ordering. Reduces visual zigzag of graph lines.

### E. Mobile branch tags
Add small colored branch name pill to mobile card view (in addition to existing colored left border).

## Rejected
- No legend/intro text — let the metaphor speak for itself
- No scroll navigation — year markers are sufficient
