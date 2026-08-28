# Review: New Case-Study Entries Drafted from Graph/Timeline Data

Three entries were added to `src/data/work.js` for career-timeline entities that existed in
`src/data/graph.js` but had no `/work/:slug` page: **spark**, **garmin**, and **alarm**.

All copy below was derived strictly from the labels, subtitles, descriptions, and date ranges
in `src/data/graph.js` and `src/data/timeline.js`. No metrics, outcomes, or technologies were
invented. Please review and edit any claims before considering these final.

The nine Alarm.com entries in `src/data/graph.js` also received `slug: 'alarm'` so the career
graph rows now link to the new `/work/alarm` page (they previously linked nowhere).

---

## 1. `/work/alarm` — Alarm.com

- **slug:** `alarm`
- **title:** Alarm.com
- **role:** Software Engineer Intern → Software Engineer II
- **subtitle:** Internal tools, SQL CI, Stripe subscriptions, and LLM-powered developer tooling
- **dateRange:** Summer 2020 · August 2021 – March 2026
- **icon:** Shield · **colors:** orange (matches the `#bf4600` alarm branch color in graph.js)

**cardDescription:**

> From intern to Software Engineer II — internationalized email reaching 100K+ users/yr, an automated SQL validation pipeline, an LLM-powered refactoring bot with 8x maintenance productivity, Stripe subscriptions, and a provisional patent.

**content:**

> I interned at Alarm.com in the summer of 2020, architecting a dynamic, auto-translated email system sent to hundreds of thousands of users per year. I returned full-time in August 2021 and was promoted to Software Engineer II in April 2024.

> Along the way I shipped developer-experience tooling — Chrome extensions, a Login-with-Two-Factor microservice, and gamification features — and drove a SQL CI initiative that added an automated SQL validation pipeline. That work led to an LLM-powered, self-validating SQL refactoring bot that delivered 8x maintenance productivity.

> I also led engineering for Stripe customer-managed subscriptions with cross-team coordination, built Handoff Bot — a GitHub App and Claude skill that generates PR review docs for QEs — and filed a provisional patent in the IoT / smart-security space.

**techStack:** SQL, Stripe, LLMs, Chrome Extensions, GitHub Apps
**links:** none

Sources: graph.js alarm/alarm-* entries (intern, hire, DevEx tooling, SQL CI, refactoring bot,
patent, promotion, Stripe subscriptions, Handoff Bot) and timeline.js `adc-intern`/`adc-swe1`/`adc-swe2`.
Note: "That work led to" (SQL CI → refactoring bot) is an inferred connection from the branch
parentage in graph.js (`alarm-refactor` forks from `alarm-sql-ci`) — verify the framing.
End date March 2026 comes from graph.js (`end: '2026-03-06'`, "Ended employment with Alarm.com").

---

## 2. `/work/garmin` — Garmin

- **slug:** `garmin`
- **title:** Garmin
- **role:** Software Engineer Intern
- **subtitle:** Avionics — GI 275 Attitude Indicator
- **dateRange:** May 2019 – August 2019
- **icon:** Plane · **colors:** fuchsia (matches the `#a21caf` garmin branch color in graph.js)

**cardDescription:**

> Avionics software engineering internship — wrote 80+ tests in C for the GI 275 Attitude Indicator following FAA standards.

**content:**

> I spent the summer of 2019 as a software engineering intern on an avionics team at Garmin.

> My work centered on the GI 275 Attitude Indicator, where I wrote 80+ tests in C following FAA standards.

**techStack:** C
**links:** none

Sources: graph.js garmin entry ("SWE Intern · Avionics · 80+ tests for GI 275 (FAA)") and
timeline.js garmin entry ("80+ tests in C for the GI 275 Attitude Indicator following FAA standards").

---

## 3. `/work/spark` — Spark Technology Solutions

- **slug:** `spark`
- **title:** Spark Technology Solutions
- **role:** High School Tech Incubator
- **subtitle:** Websites for companies + an app for the St. Louis Zoo
- **dateRange:** January 2015 – May 2017
- **icon:** Lightbulb · **colors:** teal (matches the `#14b8a6` spark branch color in graph.js)

**cardDescription:**

> A high school technology incubator where I built websites for companies and an app for the St. Louis Zoo.

**content:**

> Spark Technology Solutions was a high school technology incubator I was part of from 2015 to 2017.

> Through Spark, I built websites for companies and an app for the St. Louis Zoo — my first taste of shipping software for real clients.

**techStack:** none listed (no technologies appear in the source data — add if you want)
**links:** none

Sources: graph.js spark entry ("High School TechIncubator · Websites + St. Louis Zoo App") and
timeline.js spark entry ("Built websites for companies and an app for the St. Louis Zoo.").
Note: "my first taste of shipping software for real clients" and "I was part of" are framing
phrases not literally present in the data — verify or reword.
