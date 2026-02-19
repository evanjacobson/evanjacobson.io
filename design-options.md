# Site Redesign — Design Options

## Option A: Case Study Architecture

```
Home         → Hero + personal statement + "What I'm Building" highlights
Work         → Grid of project cards, each linking to a dedicated page
  /work/orai       → Full case study: problem, solution, tech deep-dive, screenshots
  /work/trade-intel → Same
  /work/onedeal    → Same
  /work/beads      → Same (contributor story)
  /work/kilo-code  → Same
Toolbox      → Stays as-is (unique content, no overlap)
Resume       → Slim: PDF download + timeline (titles, companies, dates only)
               Each role links to its case study. No bullet points duplicating Work pages.
```

**Pros:** Each project gets the depth it deserves. Zero redundancy. Resume exists for traditionalists but doesn't compete with case studies. Toolbox stays for personality.

**Cons:** More pages to maintain. Need real content for each case study (screenshots, architecture diagrams, learnings).

### Key differences from Option C
- Home page has a proper hero section with personal statement and "What I'm Building" highlights (cards/featured section)
- More visual, more "portfolio-like" home page
- Resume is even slimmer — just titles, companies, dates, and links to case studies

---

## Option B: Narrative Architecture (Lee Robinson inspired)

```
Home         → Hero + featured writing/work
/orai        → Top-level page (not nested under /work)
/trade-intel → Same
/onedeal     → Same
Toolbox      → Stays
Resume       → PDF link only (in sidebar/footer, no dedicated page)
```

**Pros:** Cleanest possible structure. Every page is a first-class citizen. Dropping the resume page is a bold statement that says "my work speaks for itself."

**Cons:** Losing the resume page might turn off traditional recruiters. Top-level routes get crowded as you add more work.

### Key differences from Option C
- No /work grid page — each project is a top-level route
- No dedicated resume page at all — PDF link lives in footer only
- Boldest, most minimal approach
- Home page focuses on featured writing/work rather than narrative storytelling

---

## Option C: Hybrid (built on branch, see redesign-notes.md)

```
Home         → Narrative one-screen (leerob-inspired, no scroll)
               Name, tagline, storytelling paragraphs, "See my work" / "Browse my toolbox" links
Work         → Grid of project cards → /work/[slug]
  /work/orai, /work/trade-intel, /work/onedeal, /work/beads, /work/kilo-code
Toolbox      → Stays as-is
Resume       → Timeline with colored dots, one-line descriptions, "Read case study" links
               Skills grid, education, PDF download button
Footer       → Book a Call, Email, LinkedIn, GitHub, Resume PDF
Layout       → No sidebar, minimal top nav (hidden on home)
```

**Status:** Built and saved on a separate branch. See `redesign-notes.md` for full details.
