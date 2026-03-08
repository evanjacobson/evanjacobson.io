// ── Branch config ─────────────────────────────────────────────
// Order determines lane position (main is always first).
// parent – branch this one forks from (defaults to 'main')
export const BRANCHES = [
    { id: 'main', color: '#94a3b8', label: 'main' },
    { id: 'alarm',          color: '#bf4600', label: 'Alarm.com' },
    { id: 'alarm-sql-ci',   color: '#fe8c2f', label: 'Alarm.com', parent: 'alarm' }, // strong orange
    { id: 'alarm-refactor', color: '#ffb877', label: 'Alarm.com', parent: 'alarm-sql-ci' }, // pale orange
    { id: 'alarm-stripe',   color: '#ff5b1e', label: 'Alarm.com', parent: 'alarm' },  // vivid orange-red
    { id: 'alarm-handoff',  color: '#ff9100', label: 'Alarm.com', parent: 'alarm' },  // bold amber-orange
    { id: 'onedeal', color: '#a855f7', label: 'OneDeal' },
    { id: 'orai', color: '#3b82f6', label: 'OrAI' },
    { id: 'trade', color: '#ef4444', label: 'Trade Intel' },
    { id: 'beads', color: '#22c55e', label: 'Open Source Contributions' },
    { id: 'kilo-code', color: '#f97316', label: 'Open Source Contributions' },
    { id: 'minecraft',  color: '#f59e0b', label: 'Minecraft Server Plugin' },           // amber-500
    { id: 'mounts',     color: '#d97706', label: 'Minecraft Server Plugin' },           // amber-600
    { id: 'spark',      color: '#14b8a6', label: 'Incubator' },        // teal-500
    { id: 'university', color: '#2563eb', label: 'University' },               // blue-600
    { id: 'garmin',     color: '#a21caf', label: 'Garmin', parent: 'university' },      // purple-800
    { id: 'alarm-intern',   color: '#bf4600', label: 'Alarm.com', parent: 'university' },
    { id: 'projects',   color: '#e11d48', label: 'No AI Involved' },// rose-600
];

// ── Entries ───────────────────────────────────────────────────
// Add jobs/projects here — the graph computes everything else.
//   branch    – must match a BRANCHES id
//   label     – commit message shown next to the dot
//   subtitle  – smaller text below the label (optional)
//   slug      – links to /work/:slug when clicked (optional)
//   start     – "YYYY-MM" date string
//   end       – "YYYY-MM" if the role/project ended (optional)
//   endLabel  – label for the auto-generated merge row (defaults to "{label} complete")
//   dateLabel – override the auto-formatted date (optional)
export const ENTRIES = [
    // ── Early career ──────────────────────────────────────────
    { branch: 'minecraft', label: 'Spacesuits Plugin', subtitle: 'First Project — Minecraft Server Plugin', slug: 'minecraft', start: '2013-04-01', end: '2013-04-02', endLabel: 'Shipped' },
    { branch: 'mounts', label: 'Mounts Plugin', subtitle: 'Custom Horse Mounts · Spigot/Paper', slug: 'mounts', start: '2024-09-01', end: '2024-09-02', endLabel: 'Shipped' },
    { branch: 'spark', label: 'Spark Technology Solutions', subtitle: 'High School TechIncubator · Websites + St. Louis Zoo App', slug: 'spark', start: '2015-01', end: '2017-05' },
    { branch: 'university', label: 'University of Miami', subtitle: 'B.S. Computer Science, Minor in Mathematics · GPA 3.96', slug: 'university', start: '2017-08', end: '2021-05', endLabel: 'Graduated' },
    { branch: 'garmin', label: 'Garmin', subtitle: 'SWE Intern · Avionics · 80+ tests for GI 275 (FAA)', slug: 'garmin', start: '2019-05', end: '2019-08' },

    // ── Alarm.com ─────────────────────────────────────────────
    { branch: 'alarm-intern', label: 'SWE Intern', subtitle: 'Internationalized Email System · 100K+ users/yr', start: '2020-06', end: '2020-08', dateLabel: 'Summer 2020' },
    { branch: 'alarm', label: 'Hired as Full-Time Software Engineer', start: '2021-08', end: '2024-04' },
    { branch: 'alarm-stripe', label: 'Stripe Customer-Managed Subscriptions', subtitle: 'Led engineering · cross-team coordination', start: '2025-03', end: '2025-10', endLabel: 'Shipped' },
    { branch: 'alarm', label: 'DevEx Tooling Ships', subtitle: 'Chrome extensions, 2FA microservice, gamification', start: '2022-06' },
    { branch: 'alarm-sql-ci', label: 'SQL CI Initiative', subtitle: 'Automated SQL validation pipeline', start: '2022-01', end: '2023-10' },
    { branch: 'alarm-refactor', label: 'SQL Refactoring Bot', subtitle: 'LLM-powered · self-validating · 8x maintenance productivity', start: '2023-09-01', end: '2023-09-30', endLabel: 'Shipped' },
    { branch: 'alarm', label: 'Provisional Patent Filed', subtitle: 'IoT / smart-security', start: '2023-06' },
    { branch: 'alarm', label: 'Promoted to Software Engineer II', start: '2024-04', end: '2026-03', endLabel: 'Ended employment with Alarm.com' },
    { branch: 'alarm-handoff', label: 'Handoff Bot', subtitle: 'GitHub App → Claude skill · PR review docs for QEs', start: '2025-12-15', end: '2025-12-19', endLabel: 'Shipped' },

    // ── Post-Alarm ventures ───────────────────────────────────
    { branch: 'onedeal', label: 'OneDeal', subtitle: 'Founding Engineer', slug: 'onedeal', start: '2024-10', end: '2025-10' },
    { branch: 'orai', label: 'OrAI', subtitle: 'Technical Cofounder', slug: 'orai', start: '2025-08' },
    { branch: 'trade', label: 'Trade Intel', subtitle: 'Personal Project', slug: 'trade-intel', start: '2025-08' },
    { branch: 'beads', label: 'Beads & Gastown', subtitle: 'Contributor · Agent Memory Framework · Dolt Integration', slug: 'beads', start: '2026-01' },
    { branch: 'kilo-code', label: 'Kilo Code', subtitle: 'Software Engineer · Open Source AI Coding Agent', slug: 'kilo-code', start: '2026-03' },
];

// ── Graph builder ─────────────────────────────────────────────

export function parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
}

export function formatDate(str) {
    return parseDate(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function buildGraph(entries, branchConfigs, { groupByBranch = true } = {}) {
    const usedIds = new Set(['main']);
    for (const entry of entries) usedIds.add(entry.branch);

    // Group entries by branch and sort chronologically
    const byBranch = {};
    for (const entry of entries) {
        (byBranch[entry.branch] ??= []).push(entry);
    }
    for (const arr of Object.values(byBranch)) {
        arr.sort((a, b) => parseDate(a.start) - parseDate(b.start));
    }

    // Compute time ranges for each branch
    const timeRanges = {};
    for (const b of branchConfigs) {
        if (!usedIds.has(b.id)) continue;
        if (b.id === 'main') { timeRanges.main = [-Infinity, Infinity]; continue; }
        const be = byBranch[b.id];
        if (!be) continue;
        const start = parseDate(be[0].start).getTime();
        const last = be[be.length - 1];
        const end = last.end ? parseDate(last.end).getTime() : Infinity;
        timeRanges[b.id] = [start, end];
    }

    // Extend parent ranges to cover children
    let rangeChanged = true;
    while (rangeChanged) {
        rangeChanged = false;
        for (const b of branchConfigs) {
            if (!usedIds.has(b.id) || b.id === 'main') continue;
            const parentId = b.parent || 'main';
            if (!timeRanges[b.id] || !timeRanges[parentId]) continue;
            if (timeRanges[parentId][0] > timeRanges[b.id][0]) {
                timeRanges[parentId][0] = timeRanges[b.id][0]; rangeChanged = true;
            }
            if (timeRanges[parentId][1] < timeRanges[b.id][1]) {
                timeRanges[parentId][1] = timeRanges[b.id][1]; rangeChanged = true;
            }
        }
    }

    // ── Sweep-line lane assignment ──────────────────────────────
    const branchMap = {};
    const branchLookup = {};
    for (const b of branchConfigs) {
        if (usedIds.has(b.id)) branchLookup[b.id] = b;
    }

    // Compute branch depth (distance from main) for tiebreaking
    const branchDepth = { main: 0 };
    for (let d = true; d;) {
        d = false;
        for (const b of branchConfigs) {
            if (branchDepth[b.id] !== undefined || !usedIds.has(b.id)) continue;
            const pid = b.parent || 'main';
            if (branchDepth[pid] !== undefined) { branchDepth[b.id] = branchDepth[pid] + 1; d = true; }
        }
    }

    // Build start/end events
    const events = [];
    for (const id of Object.keys(branchLookup)) {
        if (id === 'main') continue;
        const r = timeRanges[id];
        if (!r) continue;
        events.push({ time: r[0], type: 'start', id, depth: branchDepth[id] ?? 99 });
        if (r[1] !== Infinity) {
            events.push({ time: r[1], type: 'end', id, depth: branchDepth[id] ?? 99 });
        }
    }
    events.sort((a, b) =>
        a.time - b.time
        || (a.type === 'end' ? 0 : 1) - (b.type === 'end' ? 0 : 1)
        || a.depth - b.depth
    );

    // Main always lane 0
    branchMap['main'] = { lane: 0, color: branchLookup.main.color, label: branchLookup.main.label, parent: 'main' };
    const occupiedLanes = new Set([0]);

    for (const ev of events) {
        const bc = branchLookup[ev.id];
        const parentId = bc.parent || 'main';

        if (ev.type === 'start') {
            const parentLane = branchMap[parentId]?.lane ?? 0;
            let lane = parentLane + 1;
            while (occupiedLanes.has(lane)) lane++;
            occupiedLanes.add(lane);
            branchMap[ev.id] = { lane, color: bc.color, label: bc.label, parent: parentId };
        } else {
            const lane = branchMap[ev.id]?.lane;
            if (lane !== undefined) occupiedLanes.delete(lane);
        }
    }

    // Detect bump branches early (single entry, same start/end month)
    const bumpBranches = new Set();
    for (const [branchId, be] of Object.entries(byBranch)) {
        if (be.length === 1 && be[0].end) {
            const startMonth = be[0].start.slice(0, 7);
            const endMonth = be[0].end.slice(0, 7);
            if (startMonth === endMonth) bumpBranches.add(branchId);
        }
    }

    const rows = [];
    rows.push({ branch: 'main', label: 'About Me', type: 'commit', slug: 'about', _sort: Infinity });

    for (const [branchId, branchEntries] of Object.entries(byBranch)) {
        branchEntries.forEach((entry, i) => {
            rows.push({
                branch: branchId,
                label: entry.label,
                subtitle: entry.subtitle,
                slug: entry.slug,
                date: entry.dateLabel || formatDate(entry.start),
                endDate: entry.end && entry.end !== entry.start ? formatDate(entry.end) : null,
                type: i === 0 ? 'fork' : 'commit',
                _sort: parseDate(entry.start).getTime(),
            });
        });

        const last = branchEntries[branchEntries.length - 1];
        if (last.end) {
            rows.push({
                branch: branchId,
                label: last.endLabel || `${last.label} complete`,
                type: 'merge',
                date: formatDate(last.end),
                _sort: parseDate(last.end).getTime(),
            });
        }
    }

    // Sort descending (newest at top). Same branch + date: merge above fork.
    const typeOrder = { merge: 0, commit: 1, fork: 2 };
    if (groupByBranch) {
        rows.sort((a, b) => {
            if (b._sort !== a._sort) return b._sort - a._sort;
            if (a.branch !== b.branch) return a.branch < b.branch ? -1 : 1;
            return (typeOrder[a.type] ?? 1) - (typeOrder[b.type] ?? 1);
        });
    } else {
        rows.sort((a, b) => b._sort - a._sort || (typeOrder[a.type] ?? 1) - (typeOrder[b.type] ?? 1));
    }

    // Compute branch spans
    const spans = {};
    rows.forEach((row, i) => {
        if (!spans[row.branch]) {
            spans[row.branch] = [i, i];
        } else {
            spans[row.branch][0] = Math.min(spans[row.branch][0], i);
            spans[row.branch][1] = Math.max(spans[row.branch][1], i);
        }
    });

    spans.main = [0, rows.length - 1];

    for (const [branchId, branchEntries] of Object.entries(byBranch)) {
        if (!branchEntries[branchEntries.length - 1].end && spans[branchId]) {
            spans[branchId][0] = 0;
        }
    }

    let changed = true;
    while (changed) {
        changed = false;
        for (const [branchId, b] of Object.entries(branchMap)) {
            const parentId = b.parent;
            if (parentId === branchId || !spans[branchId] || !spans[parentId]) continue;
            if (spans[parentId][0] > spans[branchId][0]) { spans[parentId][0] = spans[branchId][0]; changed = true; }
            if (spans[parentId][1] < spans[branchId][1]) { spans[parentId][1] = spans[branchId][1]; changed = true; }
        }
    }

    // Mark worktree forks: concurrent with another non-main branch
    rows.forEach((row, i) => {
        if ((row.type === 'fork' || row.type === 'merge') && row.branch !== 'main') {
            row._isWorktree = Object.entries(spans).some(([id, [s, e]]) =>
                id !== 'main' && id !== row.branch && s <= i && e >= i
            );
        }
    });

    // Mark bump branches + tag fork rows with their merge row index
    for (const branchId of bumpBranches) {
        if (branchMap[branchId]) branchMap[branchId]._isBump = true;
    }
    rows.forEach((row, i) => {
        if (row.type === 'fork' && branchMap[row.branch]?._isBump) {
            row._isBump = true;
            const mergeIdx = rows.findIndex((r, j) => j > i && r.branch === row.branch && r.type === 'merge');
            if (mergeIdx >= 0) {
                row._bumpMergeIdx = mergeIdx;
                rows[mergeIdx]._isBump = true;
            }
        }
    });

    // Track ended branches
    for (const [branchId, branchEntries] of Object.entries(byBranch)) {
        if (branchMap[branchId]) {
            branchMap[branchId]._isEnded = !!branchEntries[branchEntries.length - 1].end;
        }
    }
    if (branchMap.main) branchMap.main._isEnded = false;

    // Year markers
    const yearMarkers = [];
    const seenYears = new Set();
    rows.forEach((row, i) => {
        if (row._sort === Infinity) return;
        const year = new Date(row._sort).getFullYear();
        if (!seenYears.has(year)) {
            seenYears.add(year);
            yearMarkers.push({ row: i, year });
        }
    });

    return { rows, branchMap, branchSpans: spans, yearMarkers };
}
