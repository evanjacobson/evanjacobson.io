import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Prototype toggles (flip to compare) ──────────────────────
const PROTO = {
    collapseTags: false,
    compactMerges: false,
    yearDividers: 'default',   // 'default' | 'divider' | 'axis'
    groupByBranch: false,
    mobileTags: false,
};

const COMMIT_ROW_HEIGHT = 56;
const MERGE_ROW_HEIGHT = PROTO.compactMerges ? 36 : COMMIT_ROW_HEIGHT;
const LANE_GAP = 28;
const GRAPH_LEFT = 20;

// ── Branch config ─────────────────────────────────────────────
// Order determines lane position (main is always first).
// parent – branch this one forks from (defaults to 'main')
const BRANCHES = [
    { id: 'main', color: '#94a3b8', label: 'main' },
    { id: 'alarm', color: '#10b981', label: 'Alarm.com' },
    { id: 'alarm-email',    color: '#34d399', label: 'Intl. Email', parent: 'alarm' },
    { id: 'alarm-stripe',   color: '#34d399', label: 'Stripe Subscriptions', parent: 'alarm' },
    { id: 'alarm-refactor', color: '#34d399', label: 'SQL Refactoring Bot', parent: 'alarm' },
    { id: 'alarm-handoff',  color: '#34d399', label: 'Handoff Bot', parent: 'alarm' },
    { id: 'onedeal', color: '#a855f7', label: 'OneDeal' },
    { id: 'orai', color: '#3b82f6', label: 'OrAI' },
    { id: 'trade', color: '#ef4444', label: 'Trade Intel' },
    { id: 'beads', color: '#22c55e', label: 'Open Source Contributions' },
    { id: 'minecraft',  color: '#f59e0b', label: 'Minecraft Server Plugin' },           // amber-500
    { id: 'spark',      color: '#10b981', label: 'Spark Technology Solutions' },        // emerald-500
    { id: 'university', color: '#2563eb', label: 'University of Miami' },               // blue-600
    { id: 'garmin',     color: '#a21caf', label: 'Garmin', parent: 'university' },      // purple-800
    { id: 'projects',   color: '#e11d48', label: 'Personal Projects (no AI involved)' },// rose-600
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
    { branch: 'minecraft', label: 'Minecraft Server Plugin', subtitle: 'First Project — Spacesuits Plugin', slug: 'minecraft', start: '2013-04', end: '2013-04', endLabel: 'Shipped' },
    { branch: 'spark', label: 'Spark Technology Solutions', subtitle: 'HS Incubator · Websites + St. Louis Zoo App', slug: 'spark', start: '2015-01', end: '2017-05' },
    { branch: 'university', label: 'University of Miami', subtitle: 'B.S. Computer Science, Minor in Mathematics · GPA 3.96', slug: 'university', start: '2017-08', end: '2021-05', endLabel: 'Graduated' },
    { branch: 'garmin', label: 'Garmin', subtitle: 'SWE Intern · Avionics · 80+ tests for GI 275 (FAA)', slug: 'garmin', start: '2019-05', end: '2019-08' },

    // ── Alarm.com ─────────────────────────────────────────────
    { branch: 'alarm', label: 'SWE Intern', subtitle: 'Alarm.com', start: '2020-06', dateLabel: 'Summer 2020', end: '2021-08' },
    { branch: 'alarm-email', label: 'Internationalized Email System', subtitle: 'Dynamic auto-translated · 100K+ users/yr', start: '2020-07', end: '2020-08', endLabel: 'Shipped' },
    { branch: 'alarm', label: 'Software Engineer', start: '2021-08', end: '2024-04' },
    { branch: 'alarm-stripe', label: 'Stripe Customer-Managed Subscriptions', subtitle: 'Led engineering · cross-team coordination', start: '2025-03', end: '2025-10', endLabel: 'Shipped' },
    { branch: 'alarm', label: 'DevEx Tooling Ships', subtitle: 'Chrome extensions, 2FA microservice, gamification', start: '2022-06' },
    { branch: 'alarm-refactor', label: 'SQL Refactoring Bot', subtitle: 'LLM-powered · self-validating · 8x maintenance productivity', start: '2023-09', end: '2023-12', endLabel: 'Shipped' },
    { branch: 'alarm', label: 'Provisional Patent Filed', subtitle: 'IoT / smart-security', start: '2023-06' },
    { branch: 'alarm', label: 'Software Engineer II', start: '2024-04', end: null },
    { branch: 'alarm-handoff', label: 'Handoff Bot', subtitle: 'GitHub App → Claude skill · PR review docs for QEs', start: '2025-12', end: '2025-12', endLabel: 'Shipped' },

    // ── Post-Alarm ventures ───────────────────────────────────
    { branch: 'onedeal', label: 'OneDeal', subtitle: 'Founding Engineer', slug: 'onedeal', start: '2024-10', end: '2025-10' },
    { branch: 'orai', label: 'OrAI', subtitle: 'Technical Cofounder', slug: 'orai', start: '2025-08' },
    { branch: 'trade', label: 'Trade Intel', subtitle: 'Personal Project', slug: 'trade-intel', start: '2025-08' },
    { branch: 'beads', label: 'Open Source Contributions', subtitle: 'Gastown, Beads, Kilo Code', slug: 'beads', start: '2026-01' },
];

// ── Graph builder ─────────────────────────────────────────────

function parseDate(str) {
    const [y, m] = str.split('-').map(Number);
    return new Date(y, (m || 1) - 1);
}

function formatDate(str) {
    return parseDate(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function buildGraph(entries, branchConfigs) {
    const usedIds = new Set(['main']);
    for (const entry of entries) usedIds.add(entry.branch);

    const branchMap = {};
    let lane = 0;
    for (const b of branchConfigs) {
        if (usedIds.has(b.id)) {
            branchMap[b.id] = { lane: lane++, color: b.color, label: b.label, parent: b.parent || 'main' };
        }
    }

    const byBranch = {};
    for (const entry of entries) {
        (byBranch[entry.branch] ??= []).push(entry);
    }
    for (const arr of Object.values(byBranch)) {
        arr.sort((a, b) => parseDate(a.start) - parseDate(b.start));
    }

    const rows = [];
    rows.push({ branch: 'main', label: 'Present', type: 'commit', _sort: Infinity });

    for (const [branchId, branchEntries] of Object.entries(byBranch)) {
        branchEntries.forEach((entry, i) => {
            rows.push({
                branch: branchId,
                label: entry.label,
                subtitle: entry.subtitle,
                slug: entry.slug,
                date: entry.dateLabel || formatDate(entry.start),
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

    rows.sort((a, b) => b._sort - a._sort);

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
const SVG_WIDTH = GRAPH_LEFT + Object.keys(branchMap).length * LANE_GAP + 10;
const LABEL_LEFT = SVG_WIDTH + 16;

// ── Component ─────────────────────────────────────────────────

export default function ResumeGitGraph() {
    const [hoveredBranch, setHoveredBranch] = useState(null);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    // Highlight hovered branch + its parent chain
    const isBranchHit = (branchId) => {
        if (!hoveredBranch) return true;
        if (branchId === hoveredBranch || branchId === 'main') return true;
        let cur = hoveredBranch;
        while (cur && cur !== 'main') {
            if (branchMap[cur]?.parent === branchId) return true;
            cur = branchMap[cur]?.parent;
        }
        return false;
    };

    const lineOp = (branchId) => {
        const base = branchMap[branchId]?._isEnded ? 0.35 : 0.6;
        return hoveredBranch ? (isBranchHit(branchId) ? Math.min(base + 0.3, 0.9) : 0.08) : base;
    };

    const dotOp = (branchId) =>
        hoveredBranch ? (isBranchHit(branchId) ? 1 : 0.12) : 1;

    return (
        <div ref={containerRef} className="max-w-3xl mx-auto px-4">

            {/* ── Desktop ──────────────────────────────────── */}
            <div className="hidden sm:block relative" style={{ height: TOTAL_HEIGHT }}>

                {/* Row dividers */}
                {rows.map((_, i) => i > 0 && (
                    <div
                        key={`div-${i}`}
                        className="absolute left-0 right-0 border-t border-slate-800/30"
                        style={{ top: rowY(i) - rowHeight(i) / 2 }}
                    />
                ))}

                {/* SVG graph */}
                <svg
                    className="absolute top-0 left-0 pointer-events-none"
                    width={SVG_WIDTH}
                    height={TOTAL_HEIGHT}
                    style={{ overflow: 'visible' }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Year markers */}
                    {yearMarkers.map(({ row: ri, year }) => {
                        const x = laneX(0);
                        const y = rowY(ri) - rowHeight(ri) / 2 + 6;
                        return (
                            <text
                                key={`yr-${year}`}
                                x={x}
                                y={y}
                                fill="#475569"
                                fontSize={8}
                                textAnchor="middle"
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

                    {/* Vertical branch lines */}
                    {Object.entries(branchSpans).map(([branchId, [startRow, endRow]]) => {
                        const b = branchMap[branchId];
                        const x = laneX(b.lane);
                        return (
                            <line
                                key={branchId}
                                x1={x} y1={rowY(startRow)}
                                x2={x} y2={rowY(endRow)}
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
                        const y = rowY(i);
                        const curve = 20;
                        const isWt = row._isWorktree;
                        const op = mounted ? lineOp(row.branch) : 0;

                        if (row.type === 'fork') {
                            if (isWt) {
                                // Worktree: horizontal dashed line
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
                            // Regular: bezier curve
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
                        const y = rowY(i);
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
                                {row.type === 'merge' && (
                                    <circle
                                        cx={laneX(branchMap[b.parent].lane)} cy={y}
                                        r={4} fill="#0f172a" stroke={b.color} strokeWidth={2}
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Row labels */}
                {rows.map((row, i) => {
                    const b = branchMap[row.branch];
                    const y = rowY(i);
                    const rh = rowHeight(i);
                    const isMerge = row.type === 'merge';
                    const isHit = isBranchHit(row.branch);

                    const rowOpacity = mounted
                        ? hoveredBranch ? (isHit ? 1 : 0.1) : (isMerge ? 0.45 : 1)
                        : 0;

                    const labelContent = (
                        <div className="flex items-center gap-2.5" style={{ height: rh }}>
                            {/* Branch tag */}
                            <div
                                className={`shrink-0 px-2 py-0.5 rounded font-mono font-medium text-slate-950 ${isMerge ? 'text-[8px]' : 'text-[10px]'}`}
                                style={{ backgroundColor: b.color, opacity: isMerge ? 0.6 : 1 }}
                            >
                                {b.label}
                            </div>
                            {/* Label text */}
                            <div className="min-w-0">
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-slate-200 font-medium truncate ${isMerge ? 'text-xs text-slate-400' : 'text-sm'}`}>
                                        {row.label}
                                    </span>
                                    {row.date && <span className="text-[10px] text-slate-600 shrink-0">{row.date}</span>}
                                </div>
                                {row.subtitle && !isMerge && (
                                    <div className="text-[11px] text-slate-500 truncate">{row.subtitle}</div>
                                )}
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
                                    <Link
                                        to={`/work/${row.slug}`}
                                        className="block px-2 rounded-lg hover:bg-slate-800/40 transition-colors"
                                    >
                                        {labelContent}
                                    </Link>
                                ) : (
                                    <div className="px-2">{labelContent}</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Mobile ───────────────────────────────────── */}
            <div className="sm:hidden space-y-0.5">
                {rows.filter(r => r.type !== 'merge').map((row, i) => {
                    const b = branchMap[row.branch];
                    const inner = (
                        <div className="py-3 pl-4 pr-3">
                            <div className="flex items-baseline justify-between gap-2">
                                <span className="text-sm text-slate-200 font-medium">{row.label}</span>
                                {row.date && <span className="text-[10px] text-slate-600 shrink-0">{row.date}</span>}
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
