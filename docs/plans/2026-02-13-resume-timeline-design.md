# Resume Timeline Redesign

## Approach A: Tree Timeline (Alarm.com = Trunk)

Timeline reads top-to-bottom chronologically (2013 at top, 2026 at bottom).
Alarm.com is the trunk. Projects are branches/leaves.

### Visual Structure
- **Roots** (2013-2018): Muted earthy treatment below a "ground line"
  - Minecraft Server Plugin (2013) — first project
  - Spark Technology Solutions (2015-2017) — HS incubator, websites + St. Louis Zoo app
- **Ground line** ~2019: transition from education to professional
- **Trunk** (Alarm.com, emerald): thick vertical line running 2020-2026
  - Intern (Summer 2020)
  - SWE I (08/2021 - 04/2024)
  - SWE II (04/2024 - Present)
- **Milestone markers** on trunk: University of Miami graduation (05/2021)
- **Pre-trunk branch**: Garmin internship (Summer 2019) — branches off roots
- **Branches** sprout from trunk at their start dates:
  - OneDeal (10/2024 - 10/2025) — completed, square terminal
  - OrAI (08/2025 - Present) — active, open end
  - Trade Intel (08/2025 - Present) — active, open end
  - Beads & Kilo Code (01/2026 - Present) — active, open end

### Cards
- Name (colored), title, date range
- Active/completed status
- Clickable → /work/:slug for roles with case studies
- No badges, minimal info, less is more

### Mobile
- Single column, parallel bars preserved with proportional heights

---

## Approach C: Git Graph (Experience = Main)

"Experience" is the main branch. All roles (including Alarm.com) are branches off main.

### Visual Structure
- **Main line** (white/gray): vertical, represents career/Experience
- **Commit dots** on main at key moments (first project, graduations, present)
- **Branches** fork off main with colored lines:
  - Alarm.com — longest branch (2020-present), still open
  - Garmin — short branch (summer 2019), merges back
  - OneDeal — medium branch (10/2024-10/2025), merges back
  - OrAI — open branch (08/2025-present)
  - Trade Intel — open branch (08/2025-present)
  - Beads & Kilo Code — open branch (01/2026-present)
- **Completed branches** merge back to main (return line + merge commit dot)
- **Active branches** have open ends (no terminal)
- **Early entries** (Minecraft, Spark Tech) are commits directly on main
- **Education** is a tag/annotation on main at graduation year

### Cards
- Same card style as Approach A
- Positioned alongside their branch
- Clickable for case studies

### Mobile
- Single column git graph, branches shown linearly
