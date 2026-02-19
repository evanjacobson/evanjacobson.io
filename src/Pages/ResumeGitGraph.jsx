import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRANCHES, ENTRIES, buildGraph } from '@/data/graph';

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

const { rows, branchMap, branchSpans, yearMarkers } = buildGraph(ENTRIES, BRANCHES, { groupByBranch: PROTO.groupByBranch });

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

export default function ResumeGitGraph({ activeProject = null, onSelectProject = null, detailContent = null, drawerContent = null, mobileDrawerContent = null }) {
    const [hoveredBranch, setHoveredBranch] = useState(null);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);
    const [drawerHeight, setDrawerHeight] = useState(0);
    const drawerMeasureRef = useRef(null);
    const mobileGraphRef = useRef(null);
    const [mobileGraphH, setMobileGraphH] = useState(0);

    // Measure mobile graph height for sticky row offset
    useEffect(() => {
        if (!mobileGraphRef.current) return;
        const measure = () => setMobileGraphH(mobileGraphRef.current?.offsetHeight || 0);
        measure();
        const obs = new ResizeObserver(measure);
        obs.observe(mobileGraphRef.current);
        return () => obs.disconnect();
    }, []);

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

                    {/* Branch line hit areas for hover + click */}
                    {Object.entries(branchSpans).map(([branchId, [startRow, endRow]]) => {
                        const b = branchMap[branchId];
                        if (!b) return null;
                        const x = laneX(b.lane);
                        const slugRow = rows.find(r => r.branch === branchId && r.slug);
                        return (
                            <line
                                key={`hit-${branchId}`}
                                x1={x} y1={getY(startRow)}
                                x2={x} y2={getY(endRow)}
                                stroke="transparent"
                                strokeWidth={16}
                                style={{ pointerEvents: 'all', cursor: slugRow ? 'pointer' : 'default' }}
                                onMouseEnter={() => setHoveredBranch(branchId)}
                                onMouseLeave={() => setHoveredBranch(null)}
                                onClick={() => slugRow && onSelectProject?.(slugRow.slug)}
                            />
                        );
                    })}

                    {/* Fork/merge curve hit areas */}
                    {rows.map((row, i) => {
                        const b = branchMap[row.branch];
                        if (!b || row.branch === 'main' || (row.type !== 'fork' && row.type !== 'merge')) return null;
                        const parentX = laneX(branchMap[b.parent].lane);
                        const branchX = laneX(b.lane);
                        const y = getY(i);
                        const curve = 20;
                        const isWt = row._isWorktree;
                        const slugRow = rows.find(r => r.branch === row.branch && r.slug);
                        const d = row.type === 'fork'
                            ? (isWt ? `M ${parentX} ${y} L ${branchX} ${y}` : `M ${parentX} ${y} C ${parentX} ${y + curve}, ${branchX} ${y - curve}, ${branchX} ${y}`)
                            : (isWt ? `M ${branchX} ${y} L ${parentX} ${y}` : `M ${branchX} ${y} C ${branchX} ${y - curve}, ${parentX} ${y + curve}, ${parentX} ${y}`);
                        return (
                            <path
                                key={`hit-${row.type}-${i}`}
                                d={d}
                                fill="none" stroke="transparent" strokeWidth={16}
                                style={{ pointerEvents: 'all', cursor: slugRow ? 'pointer' : 'default' }}
                                onMouseEnter={() => setHoveredBranch(row.branch)}
                                onMouseLeave={() => setHoveredBranch(null)}
                                onClick={() => slugRow && onSelectProject?.(slugRow.slug)}
                            />
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
                                left: LABEL_LEFT - 8,
                                right: 0,
                                height: rh,
                                opacity: rowOpacity,
                                transform: mounted ? 'translateY(0)' : 'translateY(6px)',
                                transition: `opacity 0.35s ease-out ${mounted ? '0ms' : `${i * 35}ms`}, transform 0.35s ease-out ${mounted ? '0ms' : `${i * 35}ms`}`,
                            }}
                            onMouseEnter={() => setHoveredBranch(row.branch)}
                            onMouseLeave={() => setHoveredBranch(null)}
                        >
                            <div style={{ marginLeft: 8 }}>
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
            <div className="sm:hidden">
                {/* Sticky horizontal mini-graph */}
                {(() => {
                    const MG_W = 400;
                    const MG_LANE_GAP = 10;
                    const MG_PAD_X = 8;
                    const MG_PAD_Y = 8;
                    const MG_H = MG_PAD_Y * 2 + (maxLane + 1) * MG_LANE_GAP;
                    const colW = (MG_W - 2 * MG_PAD_X) / Math.max(rows.length - 1, 1);
                    const mgX = (i) => MG_PAD_X + (rows.length - 1 - i) * colW;
                    const mgY = (lane) => MG_PAD_Y + lane * MG_LANE_GAP;

                    return (
                        <div ref={mobileGraphRef} className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/30 -mx-4 px-4 py-2">
                            <svg
                                viewBox={`0 0 ${MG_W} ${MG_H}`}
                                className="w-full h-auto"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {/* Horizontal branch lines */}
                                {Object.entries(branchSpans).map(([branchId, [startRow, endRow]]) => {
                                    const b = branchMap[branchId];
                                    if (!b) return null;
                                    const y = mgY(b.lane);
                                    return (
                                        <line
                                            key={branchId}
                                            x1={mgX(endRow)} y1={y}
                                            x2={mgX(startRow)} y2={y}
                                            stroke={b.color}
                                            strokeWidth={1.5}
                                            strokeDasharray={b._isEnded ? '3 2' : 'none'}
                                            style={{
                                                opacity: mounted ? lineOp(branchId) : 0,
                                                transition: 'opacity 0.3s ease-out',
                                            }}
                                        />
                                    );
                                })}

                                {/* Fork/merge connections (simple vertical lines) */}
                                {rows.map((row, i) => {
                                    const b = branchMap[row.branch];
                                    if (!b || row.branch === 'main') return null;
                                    if (row.type !== 'fork' && row.type !== 'merge') return null;
                                    const parentY = mgY(branchMap[b.parent].lane);
                                    const branchY = mgY(b.lane);
                                    const x = mgX(i);
                                    return (
                                        <line
                                            key={`mg-conn-${i}`}
                                            x1={x} y1={parentY} x2={x} y2={branchY}
                                            stroke={b.color} strokeWidth={1}
                                            style={{
                                                opacity: mounted ? lineOp(row.branch) * 0.6 : 0,
                                                transition: 'opacity 0.3s ease-out',
                                            }}
                                        />
                                    );
                                })}

                                {/* Dots */}
                                {rows.map((row, i) => {
                                    const b = branchMap[row.branch];
                                    const x = mgX(i);
                                    const y = mgY(b.lane);
                                    const isActive = row.slug === activeProject;
                                    return (
                                        <circle
                                            key={`mg-dot-${i}`}
                                            cx={x} cy={y}
                                            r={isActive ? 3 : row.type === 'merge' ? 1 : 1.5}
                                            fill={row.type === 'merge' ? '#0f172a' : b.color}
                                            stroke={row.type === 'merge' ? b.color : 'none'}
                                            strokeWidth={row.type === 'merge' ? 0.5 : 0}
                                            style={{
                                                opacity: mounted ? dotOp(row.branch) : 0,
                                                transition: 'opacity 0.3s ease-out',
                                            }}
                                        />
                                    );
                                })}

                                {/* Active branch line pulse */}
                                {Object.entries(branchSpans).map(([branchId, [startRow, endRow]]) => {
                                    const b = branchMap[branchId];
                                    if (!b || b._isEnded || branchId === 'main') return null;
                                    const y = mgY(b.lane);
                                    return (
                                        <line
                                            key={`mg-pulse-${branchId}`}
                                            x1={mgX(endRow)} y1={y} x2={mgX(startRow)} y2={y}
                                            stroke={b.color} strokeWidth={3}
                                        >
                                            <animate attributeName="opacity" values="0.25;0.08;0.25" dur="3s" repeatCount="indefinite" />
                                        </line>
                                    );
                                })}

                                {/* Active dot glow */}
                                {activeProject && rows.map((row, i) => {
                                    if (row.slug !== activeProject) return null;
                                    const b = branchMap[row.branch];
                                    return (
                                        <circle key={`mg-glow-${i}`} cx={mgX(i)} cy={mgY(b.lane)} r={3} fill={b.color} opacity={0.3}>
                                            <animate attributeName="r" from="3" to="8" dur="2s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                                        </circle>
                                    );
                                })}
                            </svg>
                        </div>
                    );
                })()}

                {/* Log entries */}
                <div className="space-y-0.5 pt-2">
                    {rows.filter(r => r.type !== 'merge').map((row, i) => {
                        const b = branchMap[row.branch];
                        const isActive = row.slug === activeProject;
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
                                className={`border-l-[3px] rounded-r-lg transition-colors ${row.slug ? 'cursor-pointer' : ''}`}
                                style={{ borderColor: b.color }}
                            >
                                <div
                                    className={`rounded-r-lg transition-colors ${isActive ? 'bg-slate-800/40 sticky z-[5] bg-slate-950' : 'hover:bg-slate-800/30'}`}
                                    style={isActive ? { top: mobileGraphH } : undefined}
                                    onClick={() => row.slug && onSelectProject?.(row.slug)}
                                >
                                    {inner}
                                </div>
                                {isActive && mobileDrawerContent && (
                                    <div className="mx-4 my-3 pt-3 pb-4 border-t border-slate-800/50">
                                        {mobileDrawerContent}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
