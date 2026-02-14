import { Link } from 'react-router-dom';

const ROW_HEIGHT = 56;
const LANE_GAP = 28;
const GRAPH_LEFT = 20;
const LABEL_LEFT = 220;

const BRANCHES = {
    main: { lane: 0, color: '#94a3b8', label: 'main' },
    alarm: { lane: 1, color: '#10b981', label: 'alarm.com' },
    onedeal: { lane: 2, color: '#a855f7', label: 'onedeal' },
    orai: { lane: 3, color: '#3b82f6', label: 'orai' },
    trade: { lane: 4, color: '#ef4444', label: 'trade-intel' },
    beads: { lane: 5, color: '#22c55e', label: 'beads' },
};

// Newest first (top to bottom = present to past)
const rows = [
    { branch: 'main', label: 'Present', type: 'commit' },
    { branch: 'beads', label: 'Beads & Kilo Code', subtitle: 'Open Source Contributor', type: 'fork', slug: 'beads', date: 'Jan 2026' },
    { branch: 'onedeal', label: 'OneDeal complete', type: 'merge', date: 'Oct 2025' },
    { branch: 'orai', label: 'OrAI', subtitle: 'Technical Cofounder', type: 'fork', slug: 'orai', date: 'Aug 2025' },
    { branch: 'trade', label: 'Trade Intel', subtitle: 'Personal Project', type: 'fork', slug: 'trade-intel', date: 'Aug 2025' },
    { branch: 'onedeal', label: 'OneDeal', subtitle: 'Founding Engineer', type: 'fork', slug: 'onedeal', date: 'Oct 2024' },
    { branch: 'alarm', label: 'Software Engineer II', type: 'commit', date: 'Apr 2024' },
    { branch: 'alarm', label: 'Software Engineer', type: 'commit', date: 'Aug 2021' },
    { branch: 'alarm', label: 'SWE Intern', subtitle: 'Alarm.com', type: 'fork', date: 'Summer 2020' },
];

// Which rows each branch is active (has a vertical line)
const branchSpans = {
    main: [0, rows.length - 1],
    alarm: [0, 8],
    onedeal: [2, 5],
    orai: [0, 3],
    trade: [0, 4],
    beads: [0, 1],
};

function laneX(lane) {
    return GRAPH_LEFT + lane * LANE_GAP;
}

function rowY(row) {
    return row * ROW_HEIGHT + ROW_HEIGHT / 2;
}

const TOTAL_HEIGHT = rows.length * ROW_HEIGHT + 20;
const SVG_WIDTH = GRAPH_LEFT + Object.keys(BRANCHES).length * LANE_GAP + 10;

export default function ResumeGitGraph() {
    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="relative" style={{ height: TOTAL_HEIGHT }}>

                {/* SVG graph lines */}
                <svg
                    className="absolute top-0 left-0"
                    width={SVG_WIDTH}
                    height={TOTAL_HEIGHT}
                    style={{ overflow: 'visible' }}
                >
                    {/* Vertical branch lines */}
                    {Object.entries(branchSpans).map(([branchId, [startRow, endRow]]) => {
                        const b = BRANCHES[branchId];
                        const x = laneX(b.lane);
                        return (
                            <line
                                key={branchId}
                                x1={x} y1={rowY(startRow)}
                                x2={x} y2={rowY(endRow)}
                                stroke={b.color}
                                strokeWidth={2.5}
                                opacity={0.6}
                            />
                        );
                    })}

                    {/* Fork/merge curves */}
                    {rows.map((row, i) => {
                        const b = BRANCHES[row.branch];
                        const mainX = laneX(BRANCHES.main.lane);
                        const branchX = laneX(b.lane);
                        const y = rowY(i);
                        const curve = 20;

                        if (row.type === 'fork' && row.branch !== 'main') {
                            // Fork: curve from main down to branch (going back in time)
                            // Visually: at this row, the branch starts. Above this row it exists, below it doesn't.
                            // The curve connects main to the branch at this row.
                            const path = `M ${mainX} ${y} C ${mainX} ${y + curve}, ${branchX} ${y - curve}, ${branchX} ${y}`;
                            return (
                                <path
                                    key={`fork-${i}`}
                                    d={path}
                                    fill="none"
                                    stroke={b.color}
                                    strokeWidth={2.5}
                                    opacity={0.6}
                                />
                            );
                        }

                        if (row.type === 'merge') {
                            // Merge: curve from branch back to main
                            const path = `M ${branchX} ${y} C ${branchX} ${y - curve}, ${mainX} ${y + curve}, ${mainX} ${y}`;
                            return (
                                <path
                                    key={`merge-${i}`}
                                    d={path}
                                    fill="none"
                                    stroke={b.color}
                                    strokeWidth={2.5}
                                    opacity={0.6}
                                />
                            );
                        }

                        return null;
                    })}

                    {/* Commit dots */}
                    {rows.map((row, i) => {
                        const b = BRANCHES[row.branch];
                        const x = laneX(b.lane);
                        const y = rowY(i);
                        const isPresent = i === 0;

                        return (
                            <g key={`dot-${i}`}>
                                <circle
                                    cx={x} cy={y} r={isPresent ? 6 : 5}
                                    fill={b.color}
                                    stroke="#0f172a"
                                    strokeWidth={2}
                                />
                                {isPresent && (
                                    <circle cx={x} cy={y} r={6} fill={b.color} opacity={0.3}>
                                        <animate attributeName="r" from="6" to="14" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                )}
                                {/* Merge also gets a dot on main */}
                                {row.type === 'merge' && (
                                    <circle
                                        cx={laneX(BRANCHES.main.lane)}
                                        cy={y} r={5}
                                        fill={b.color}
                                        stroke="#0f172a"
                                        strokeWidth={2}
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Row labels */}
                {rows.map((row, i) => {
                    const b = BRANCHES[row.branch];
                    const y = rowY(i);

                    const labelContent = (
                        <div className="flex items-center gap-2.5" style={{ height: ROW_HEIGHT }}>
                            {/* Colored branch tag */}
                            <div
                                className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-slate-950"
                                style={{ backgroundColor: b.color }}
                            >
                                {b.label}
                            </div>
                            {/* Commit message */}
                            <div className="min-w-0">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm text-slate-200 font-medium truncate">{row.label}</span>
                                    {row.date && <span className="text-[10px] text-slate-600 shrink-0">{row.date}</span>}
                                </div>
                                {row.subtitle && (
                                    <div className="text-[11px] text-slate-500 truncate">{row.subtitle}</div>
                                )}
                            </div>
                        </div>
                    );

                    return (
                        <div
                            key={i}
                            className={`absolute ${row.slug ? 'hover:bg-slate-800/30 rounded-lg transition-colors cursor-pointer' : ''}`}
                            style={{
                                top: y - ROW_HEIGHT / 2,
                                left: LABEL_LEFT,
                                right: 0,
                                height: ROW_HEIGHT,
                            }}
                        >
                            {row.slug ? (
                                <Link to={`/work/${row.slug}`} className="block px-2">
                                    {labelContent}
                                </Link>
                            ) : (
                                <div className="px-2">{labelContent}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
