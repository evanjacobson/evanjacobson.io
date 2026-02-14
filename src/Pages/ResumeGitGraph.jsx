import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── Prototype toggles (flip to compare) ──────────────────────
const PROTO = {
    collapseTags: false,
    compactMerges: true,
    yearDividers: 'divider',   // 'default' | 'divider' | 'axis'
    groupByBranch: true,
    mobileTags: true,
    labelGroupStyle: 'pill', // 'pill' | 'dot' | 'accent' | 'groupDot'
};

const COMMIT_ROW_HEIGHT = 56;
const MERGE_ROW_HEIGHT = PROTO.compactMerges ? 36 : COMMIT_ROW_HEIGHT;
const LANE_GAP = 28;
const GRAPH_LEFT = 48;

// ── Branch config ─────────────────────────────────────────────
// Order determines lane position (main is always first).
// parent – branch this one forks from (defaults to 'main')
const BRANCHES = [
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
const ENTRIES = [
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
    { branch: 'alarm', label: 'Promoted to Software Engineer II', start: '2024-04', end: null },
    { branch: 'alarm-handoff', label: 'Handoff Bot', subtitle: 'GitHub App → Claude skill · PR review docs for QEs', start: '2025-12-15', end: '2025-12-19', endLabel: 'Shipped' },

    // ── Post-Alarm ventures ───────────────────────────────────
    { branch: 'onedeal', label: 'OneDeal', subtitle: 'Founding Engineer', slug: 'onedeal', start: '2024-10', end: '2025-10' },
    { branch: 'orai', label: 'OrAI', subtitle: 'Technical Cofounder', slug: 'orai', start: '2025-08' },
    { branch: 'trade', label: 'Trade Intel', subtitle: 'Personal Project', slug: 'trade-intel', start: '2025-08' },
    { branch: 'beads', label: 'Open Source Contributions', subtitle: 'Gastown, Beads, Kilo Code', slug: 'beads', start: '2026-01' },
];

// ── Graph builder ─────────────────────────────────────────────

function parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
}

function formatDate(str) {
    return parseDate(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function buildGraph(entries, branchConfigs) {
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
    // Walk forward in time: when a branch starts, grab the closest
    // free lane to its parent; when it ends, release the lane.
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
    // Chronological; ends before starts at same time; shallower depth first among starts
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
    rows.push({ branch: 'main', label: 'Present', type: 'commit', slug: 'about', _sort: Infinity });

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
    if (PROTO.groupByBranch) {
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

const { rows, branchMap, branchSpans, yearMarkers } = buildGraph(ENTRIES, BRANCHES);

// Identify the latest (topmost) row for each active branch for pulse animation
const activeBranchLatest = new Set();
for (const [branchId, b] of Object.entries(branchMap)) {
    if (b._isEnded || branchId === 'main') continue;
    const topRow = rows.findIndex(r => r.branch === branchId);
    if (topRow >= 0) activeBranchLatest.add(topRow);
}

// ── Layout ────────────────────────────────────────────────────

function laneX(lane) {
    return GRAPH_LEFT + lane * LANE_GAP;
}

// Pre-compute cumulative Y positions for variable-height rows
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
const maxLane = Math.max(...Object.values(branchMap).map(b => b.lane));
const SVG_WIDTH = GRAPH_LEFT + (maxLane + 1) * LANE_GAP + 10;
const LABEL_LEFT = SVG_WIDTH + 8;

// ── Component ─────────────────────────────────────────────────

export default function ResumeGitGraph({ activeProject = null, onSelectProject = null, detailContent = null, drawerContent = null }) {
    const [hoveredBranch, setHoveredBranch] = useState(null);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const [drawerHeight, setDrawerHeight] = useState(0);
    const drawerMeasureRef = useRef(null);

    // Measure drawer height when content changes
    useEffect(() => {
        if (!drawerContent || !drawerMeasureRef.current) {
            setDrawerHeight(0);
            return;
        }
        const measure = () => setDrawerHeight(drawerMeasureRef.current?.scrollHeight || 0);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(drawerMeasureRef.current);
        return () => observer.disconnect();
    }, [drawerContent, activeProject]);

    // Compute which row the drawer attaches to, and a Y-offset function
    const activeRowIdx = drawerContent && activeProject
        ? rows.findIndex(r => r.slug === activeProject)
        : -1;
    const totalHeight = TOTAL_HEIGHT + (activeRowIdx >= 0 ? drawerHeight : 0);
    const getY = (i) => {
        if (activeRowIdx < 0 || i <= activeRowIdx) return rowY(i);
        return rowY(i) + drawerHeight;
    };

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    // Highlight hovered or active branch + its parent chain
    const activeBranch = activeProject
        ? rows.find(r => r.slug === activeProject)?.branch ?? null
        : null;
    const highlightBranch = hoveredBranch || activeBranch;

    const isBranchHit = (branchId) => {
        if (!highlightBranch) return true;
        if (branchId === highlightBranch || branchId === 'main') return true;
        let cur = highlightBranch;
        while (cur && cur !== 'main') {
            if (branchMap[cur]?.parent === branchId) return true;
            cur = branchMap[cur]?.parent;
        }
        return false;
    };

    const lineOp = (branchId) => {
        const base = branchMap[branchId]?._isEnded ? 0.35 : 0.6;
        return highlightBranch ? (isBranchHit(branchId) ? Math.min(base + 0.3, 0.9) : 0.08) : base;
    };

    const dotOp = (branchId) =>
        highlightBranch ? (isBranchHit(branchId) ? 1 : 0.12) : 1;

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto px-4">

            {/* ── Desktop ──────────────────────────────────── */}
            <div className="hidden sm:block relative" style={{ height: totalHeight }}>

                {/* Row dividers (hidden when year dividers are active) */}
                {PROTO.yearDividers !== 'divider' && rows.map((_, i) => i > 0 && (
                    <div
                        key={`div-${i}`}
                        className="absolute left-0 right-0 border-t border-slate-800/30"
                        style={{ top: getY(i) - rowHeight(i) / 2 }}
                    />
                ))}

                {/* Year axis (left margin) */}
                {PROTO.yearDividers === 'axis' && yearMarkers.map(({ row: ri, year }) => (
                    <div
                        key={`yraxis-${year}`}
                        className="absolute font-mono text-[9px] text-slate-600"
                        style={{
                            top: getY(ri) - rowHeight(ri) / 2 - 2,
                            left: 0,
                            opacity: mounted ? (highlightBranch ? 0.3 : 0.7) : 0,
                            transition: 'opacity 0.3s ease-out',
                        }}
                    >
                        {year}
                    </div>
                ))}

                {/* SVG graph */}
                <svg
                    className="absolute top-0 left-0 pointer-events-none"
                    width={SVG_WIDTH}
                    height={totalHeight}
                    style={{ overflow: 'visible' }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Year markers */}
                    {PROTO.yearDividers === 'default' && yearMarkers.map(({ row: ri, year }) => {
                        const x = laneX(0);
                        const y = getY(ri) - rowHeight(ri) / 2 + 6;
                        return (
                            <text
                                key={`yr-${year}`}
                                x={x} y={y}
                                fill="#475569" fontSize={8} textAnchor="middle"
                                fontFamily="ui-monospace, monospace"
                                style={{
                                    opacity: mounted ? (highlightBranch ? 0.3 : 0.7) : 0,
                                    transition: 'opacity 0.3s ease-out',
                                }}
                            >
                                {year}
                            </text>
                        );
                    })}

                    {/* Year divider lines (full-width) */}
                    {PROTO.yearDividers === 'divider' && yearMarkers.map(({ row: ri, year }) => {
                        const y = getY(ri) - rowHeight(ri) / 2;
                        return (
                            <g key={`yrdiv-${year}`}
                                style={{
                                    opacity: mounted ? (highlightBranch ? 0.2 : 0.5) : 0,
                                    transition: 'opacity 0.3s ease-out',
                                }}
                            >
                                <line x1={-40} y1={y} x2={SVG_WIDTH + 800} y2={y}
                                    stroke="#334155" strokeWidth={1} strokeDasharray="4 4" />
                                <text x={GRAPH_LEFT - 10} y={y - 4}
                                    fill="#475569" fontSize={9}
                                    fontFamily="ui-monospace, monospace"
                                    textAnchor="end"
                                >
                                    {year}
                                </text>
                            </g>
                        );
                    })}

                    {/* Vertical branch lines */}
                    {Object.entries(branchSpans).map(([branchId, [startRow, endRow]]) => {
                        const b = branchMap[branchId];
                        if (!b) return null;
                        const x = laneX(b.lane);
                        const y2 = getY(endRow);
                        return (
                            <line
                                key={branchId}
                                x1={x} y1={getY(startRow)}
                                x2={x} y2={y2}
                                stroke={b.color}
                                strokeWidth={2.5}
                                strokeDasharray={b._isEnded ? '6 4' : 'none'}
                                style={{
                                    opacity: mounted ? lineOp(branchId) : 0,
                                    transition: 'opacity 0.4s ease-out',
                                }}
                            />
                        );
                    })}

                    {/* Fork / merge curves */}
                    {rows.map((row, i) => {
                        const b = branchMap[row.branch];
                        if (!b || row.branch === 'main') return null;

                        const parentId = b.parent;
                        const parentX = laneX(branchMap[parentId].lane);
                        const branchX = laneX(b.lane);
                        const y = getY(i);
                        const curve = 20;
                        const isWt = row._isWorktree;
                        const op = mounted ? lineOp(row.branch) : 0;

                        if (row.type === 'fork') {
                            if (isWt) {
                                const midX = (parentX + branchX) / 2;
                                return (
                                    <g key={`wt-fork-${i}`} style={{ opacity: op, transition: 'opacity 0.3s ease-out' }}>
                                        <line
                                            x1={parentX} y1={y} x2={branchX} y2={y}
                                            stroke={b.color} strokeWidth={2} strokeDasharray="4 3"
                                        />
                                        <text
                                            x={midX} y={y - 5}
                                            fill={b.color} fontSize={7} textAnchor="middle"
                                            fontFamily="ui-monospace, monospace"
                                            opacity={0.7}
                                        >
                                            wt
                                        </text>
                                    </g>
                                );
                            }
                            return (
                                <path
                                    key={`fork-${i}`}
                                    d={`M ${parentX} ${y} C ${parentX} ${y + curve}, ${branchX} ${y - curve}, ${branchX} ${y}`}
                                    fill="none" stroke={b.color} strokeWidth={2.5}
                                    style={{ opacity: op, transition: 'opacity 0.3s ease-out' }}
                                />
                            );
                        }

                        if (row.type === 'merge') {
                            if (isWt) {
                                return (
                                    <line
                                        key={`wt-merge-${i}`}
                                        x1={branchX} y1={y} x2={parentX} y2={y}
                                        stroke={b.color} strokeWidth={2} strokeDasharray="4 3"
                                        style={{ opacity: op, transition: 'opacity 0.3s ease-out' }}
                                    />
                                );
                            }
                            return (
                                <path
                                    key={`merge-${i}`}
                                    d={`M ${branchX} ${y} C ${branchX} ${y - curve}, ${parentX} ${y + curve}, ${parentX} ${y}`}
                                    fill="none" stroke={b.color} strokeWidth={2.5}
                                    style={{ opacity: op, transition: 'opacity 0.3s ease-out' }}
                                />
                            );
                        }

                        return null;
                    })}

                    {/* Commit dots */}
                    {rows.map((row, i) => {
                        const b = branchMap[row.branch];
                        const x = laneX(b.lane);
                        const y = getY(i);
                        const isPresent = i === 0;
                        const op = mounted ? dotOp(row.branch) : 0;

                        return (
                            <g key={`dot-${i}`} style={{ opacity: op, transition: 'opacity 0.3s ease-out' }}>
                                {/* Glow for active branches */}
                                {!branchMap[row.branch]._isEnded && row.type === 'fork' && (
                                    <circle cx={x} cy={y} r={8} fill={b.color} opacity={0.1} />
                                )}
                                <circle
                                    cx={x} cy={y}
                                    r={isPresent ? 6 : row.type === 'merge' ? 4 : 5}
                                    fill={row.type === 'merge' ? '#0f172a' : b.color}
                                    stroke={b.color}
                                    strokeWidth={row.type === 'merge' ? 2 : 2}
                                />
                                {isPresent && (
                                    <circle cx={x} cy={y} r={6} fill={b.color} opacity={0.3}>
                                        <animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                )}
                                {/* Breathing pulse for active branch latest commit */}
                                {!isPresent && activeBranchLatest.has(i) && (
                                    <circle cx={x} cy={y} r={5} fill={b.color} opacity={0.2}>
                                        <animate attributeName="r" from="5" to="12" dur="3s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from="0.2" to="0" dur="3s" repeatCount="indefinite" />
                                    </circle>
                                )}
                                {row.type === 'merge' && (
                                    <circle
                                        cx={laneX(branchMap[b.parent].lane)} cy={y}
                                        r={4} fill="#0f172a" stroke={b.color} strokeWidth={2}
                                    />
                                )}
                            </g>
                        );
                    })}

                    {/* Clickable dot targets when labels are replaced by detail content */}
                    {detailContent && onSelectProject && rows.map((row, i) => {
                        if (!row.slug) return null;
                        const b = branchMap[row.branch];
                        const x = laneX(b.lane);
                        const y = getY(i);
                        return (
                            <circle
                                key={`click-${i}`}
                                cx={x} cy={y} r={14}
                                fill="transparent"
                                style={{ pointerEvents: 'all', cursor: 'pointer' }}
                                onClick={() => onSelectProject(row.slug)}
                            />
                        );
                    })}
                </svg>

                {/* Row labels */}
                {detailContent ? (
                    <div
                        className="absolute"
                        style={{
                            top: 0,
                            left: LABEL_LEFT,
                            right: 0,
                            height: totalHeight,
                        }}
                    >
                        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto px-2 py-4">
                            {detailContent}
                        </div>
                    </div>
                ) : (() => {
                    const seenLabels = new Set();
                    // Precompute group colors: first branch with each label determines group color
                    const groupColors = {};
                    for (const b of BRANCHES) {
                        if (!groupColors[b.label] && branchMap[b.id]) {
                            groupColors[b.label] = b.color;
                        }
                    }
                    return rows.map((row, i) => {
                    const b = branchMap[row.branch];
                    const y = getY(i);
                    const rh = rowHeight(i);
                    const isMerge = row.type === 'merge';
                    const isHit = isBranchHit(row.branch);
                    const showTag = !PROTO.collapseTags || i === 0 || rows[i - 1].branch !== row.branch;
                    const isFirstOfGroup = !seenLabels.has(b.label);
                    if (!isMerge) seenLabels.add(b.label);
                    const gColor = groupColors[b.label] || b.color;
                    const branchColor = b.color;
                    const isGroupDot = PROTO.labelGroupStyle === 'groupDot';

                    const rowOpacity = mounted
                        ? highlightBranch ? (isHit ? 1 : 0.1) : (isMerge ? 0.45 : 1)
                        : 0;

                    // Label group style logic
                    const showFullPill = PROTO.labelGroupStyle === 'pill'
                        ? showTag
                        : isGroupDot
                            ? showTag
                            : (PROTO.labelGroupStyle === 'dot' || PROTO.labelGroupStyle === 'accent')
                                ? isFirstOfGroup && showTag
                                : showTag;
                    const showDot = PROTO.labelGroupStyle === 'dot' && !isFirstOfGroup && !isMerge;
                    const showAccent = PROTO.labelGroupStyle === 'accent' && !isFirstOfGroup;

                    const labelContent = (
                        <div className={`flex items-center gap-2.5 ${showAccent ? 'border-l-2 pl-2' : ''}`} style={{ height: rh, ...(showAccent ? { borderColor: b.color } : {}) }}>
                            {/* Branch tag */}
                            {showFullPill && (
                                <div className="shrink-0 flex items-center gap-0">
                                    {/* Group-colored pill + branch-colored dot */}
                                    {isGroupDot && !isMerge && (
                                        <div className="shrink-0 w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: branchColor }} />
                                    )}
                                    <div
                                        className={`shrink-0 px-2 py-0.5 rounded font-mono font-medium text-slate-950 ${isMerge ? 'text-[8px]' : 'text-[10px]'}`}
                                        style={{ backgroundColor: isGroupDot ? gColor : branchColor, opacity: isMerge ? 0.6 : 1 }}
                                    >
                                        {b.label}
                                    </div>
                                </div>
                            )}
                            {showDot && (
                                <div className="shrink-0 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                            )}
                            {/* Label text + date */}
                            <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
                                <div className="min-w-0">
                                    <span className={`text-slate-200 font-medium ${isMerge ? 'text-xs text-slate-400' : 'text-sm'}`}>
                                        {row.label}
                                    </span>
                                    {row.subtitle && !isMerge && (
                                        <div className="text-[11px] text-slate-500">{row.subtitle}</div>
                                    )}
                                </div>
                                {row.date && <span className="text-[10px] text-slate-600 shrink-0">{row.date}</span>}
                            </div>
                        </div>
                    );

                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                top: y - rh / 2,
                                left: 0,
                                right: 0,
                                height: rh,
                                opacity: rowOpacity,
                                transform: mounted ? 'translateY(0)' : 'translateY(6px)',
                                transition: `opacity 0.35s ease-out ${mounted ? '0ms' : `${i * 35}ms`}, transform 0.35s ease-out ${mounted ? '0ms' : `${i * 35}ms`}`,
                            }}
                            onMouseEnter={() => setHoveredBranch(row.branch)}
                            onMouseLeave={() => setHoveredBranch(null)}
                        >
                            <div style={{ marginLeft: LABEL_LEFT }}>
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
                            </div>
                        </div>
                    );
                });
                })()}

                {/* Inline drawer content below active row */}
                {drawerContent && activeRowIdx >= 0 && (
                    <div
                        ref={drawerMeasureRef}
                        className="absolute"
                        style={{
                            top: rowY(activeRowIdx) + rowHeight(activeRowIdx) / 2,
                            left: LABEL_LEFT,
                            right: 0,
                        }}
                    >
                        {drawerContent}
                    </div>
                )}
            </div>

            {/* ── Mobile ───────────────────────────────────── */}
            <div className="sm:hidden space-y-0.5">
                {rows.filter(r => r.type !== 'merge').map((row, i) => {
                    const b = branchMap[row.branch];
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
                                <span className="text-sm text-slate-200 font-medium">{row.label}</span>
                                {row.date && <span className="text-[10px] text-slate-600 shrink-0">{row.endDate ? `${row.date} – ${row.endDate}` : row.date}</span>}
                            </div>
                            {row.subtitle && (
                                <div className="text-[11px] text-slate-500 mt-0.5">{row.subtitle}</div>
                            )}
                        </div>
                    );
                    return (
                        <div
                            key={i}
                            className="border-l-[3px] rounded-r-lg hover:bg-slate-800/30 transition-colors"
                            style={{ borderColor: b.color }}
                        >
                            {row.slug ? (
                                <Link to={`/work/${row.slug}`}>{inner}</Link>
                            ) : (
                                inner
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
