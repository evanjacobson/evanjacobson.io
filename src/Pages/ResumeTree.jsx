import { Link } from 'react-router-dom';

// Non-proportional layout: each event gets intentional spacing
const events = [
    { id: 'intern', y: 50, label: '2020', trunk: { title: 'SWE Intern', date: 'Summer 2020' } },
    { id: 'swe1', y: 130, label: '2021', trunk: { title: 'Software Engineer', date: 'Aug 2021' } },
    { id: 'swe2', y: 260, label: '2024', trunk: { title: 'Software Engineer II', date: 'Apr 2024' } },
    { id: 'onedeal-start', y: 340 },
    { id: 'onedeal-end', y: 520, label: '2025' },
    { id: 'orai-start', y: 560 },
    { id: 'beads-start', y: 720, label: '2026' },
    { id: 'now', y: 820 },
];

const branches = [
    {
        id: 'onedeal',
        name: 'OneDeal',
        title: 'Founding Engineer',
        dateRange: 'Oct 2024 \u2013 Oct 2025',
        color: 'purple',
        status: 'completed',
        slug: 'onedeal',
        side: 'right',
        startY: 340,
        endY: 520,
    },
    {
        id: 'orai',
        name: 'OrAI',
        title: 'Technical Cofounder',
        dateRange: 'Aug 2025 \u2013 Present',
        color: 'blue',
        status: 'active',
        slug: 'orai',
        side: 'left',
        startY: 560,
        endY: 820,
    },
    {
        id: 'trade-intel',
        name: 'Trade Intel',
        title: 'Personal Project',
        dateRange: 'Aug 2025 \u2013 Present',
        color: 'red',
        status: 'active',
        slug: 'trade-intel',
        side: 'right',
        startY: 560,
        endY: 820,
    },
    {
        id: 'beads',
        name: 'Beads & Kilo Code',
        title: 'Open Source',
        dateRange: 'Jan 2026 \u2013 Present',
        color: 'green',
        status: 'active',
        slug: 'beads',
        side: 'left',
        startY: 720,
        endY: 820,
    },
];

const COLORS = {
    purple: { hex: '#a855f7', text: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500' },
    blue: { hex: '#3b82f6', text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500' },
    red: { hex: '#ef4444', text: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500' },
    green: { hex: '#22c55e', text: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500' },
};

const TOTAL_HEIGHT = 870;
const TRUNK_START = events[0].y;
const TRUNK_END = events[events.length - 1].y;

function BranchCard({ branch }) {
    const c = COLORS[branch.color];
    const midY = branch.startY + (branch.endY - branch.startY) / 2;
    const barOffset = 22;

    const card = (
        <div className={`w-48 border ${c.border} bg-slate-900/90 rounded-lg p-2.5 transition-all ${branch.slug ? 'hover:bg-slate-800/90 cursor-pointer' : ''}`}>
            <div className="flex items-center justify-between mb-0.5">
                <span className={`font-semibold text-sm ${c.text}`}>{branch.name}</span>
                <span className={`text-[10px] ${branch.status === 'active' ? 'text-green-400' : 'text-slate-600'}`}>
                    {branch.status}
                </span>
            </div>
            <div className="text-[11px] text-slate-400">{branch.title}</div>
            <div className="text-[10px] text-slate-600">{branch.dateRange}</div>
        </div>
    );

    return (
        <>
            {/* Horizontal connector from trunk to branch bar */}
            <div
                className={`absolute h-[2px] ${c.bg} opacity-40`}
                style={{
                    top: branch.startY,
                    ...(branch.side === 'left'
                        ? { right: 'calc(50% + 3px)', width: barOffset }
                        : { left: 'calc(50% + 3px)', width: barOffset }),
                }}
            />

            {/* Vertical branch bar */}
            <div
                className={`absolute w-[3px] ${c.bg} opacity-50 rounded-full`}
                style={{
                    top: branch.startY,
                    height: branch.endY - branch.startY,
                    ...(branch.side === 'left'
                        ? { right: `calc(50% + ${barOffset + 1}px)` }
                        : { left: `calc(50% + ${barOffset + 1}px)` }),
                }}
            />

            {/* Terminal square (completed) */}
            {branch.status === 'completed' && (
                <div
                    className={`absolute w-[7px] h-[7px] ${c.bg} opacity-70`}
                    style={{
                        top: branch.endY - 3,
                        ...(branch.side === 'left'
                            ? { right: `calc(50% + ${barOffset - 1}px)` }
                            : { left: `calc(50% + ${barOffset - 1}px)` }),
                    }}
                />
            )}

            {/* Card */}
            <div
                className="absolute"
                style={{
                    top: midY - 32,
                    ...(branch.side === 'left'
                        ? { right: `calc(50% + ${barOffset + 14}px)` }
                        : { left: `calc(50% + ${barOffset + 14}px)` }),
                }}
            >
                {branch.slug ? <Link to={`/work/${branch.slug}`}>{card}</Link> : card}
            </div>
        </>
    );
}

export default function ResumeTree() {
    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="relative" style={{ height: TOTAL_HEIGHT }}>

                {/* Year labels */}
                {events.filter(e => e.label).map(e => (
                    <div
                        key={e.id}
                        className="absolute text-xs font-mono text-slate-700"
                        style={{ top: e.y - 8, left: 8 }}
                    >
                        {e.label}
                    </div>
                ))}

                {/* Trunk line */}
                <div
                    className="absolute left-1/2 -translate-x-[3px] w-[6px] rounded-full"
                    style={{
                        top: TRUNK_START,
                        height: TRUNK_END - TRUNK_START,
                        background: 'linear-gradient(180deg, #059669, #10b981, #34d399)',
                    }}
                />

                {/* Trunk glow */}
                <div
                    className="absolute left-1/2 -translate-x-[8px] w-[16px] rounded-full bg-emerald-500/10 blur-sm"
                    style={{ top: TRUNK_START, height: TRUNK_END - TRUNK_START }}
                />

                {/* Trunk milestone dots + labels */}
                {events.filter(e => e.trunk).map(e => (
                    <div key={e.id}>
                        <div
                            className="absolute left-1/2 -translate-x-[5px] w-[10px] h-[10px] rounded-full bg-emerald-500 border-2 border-slate-950 z-10"
                            style={{ top: e.y - 5 }}
                        />
                        <div
                            className="absolute hidden sm:block"
                            style={{ top: e.y - 8, left: 'calc(50% + 14px)' }}
                        >
                            <div className="text-xs text-emerald-400/80 font-medium">{e.trunk.title}</div>
                            <div className="text-[10px] text-slate-600">{e.trunk.date}</div>
                        </div>
                    </div>
                ))}

                {/* Present marker */}
                <div
                    className="absolute left-1/2 -translate-x-[7px] w-[14px] h-[14px] rounded-full bg-emerald-400 border-2 border-slate-950 z-10"
                    style={{ top: TRUNK_END - 7 }}
                />
                <div
                    className="absolute left-1/2 -translate-x-[7px] w-[14px] h-[14px] rounded-full bg-emerald-400/40 animate-ping"
                    style={{ top: TRUNK_END - 7 }}
                />

                {/* Branches */}
                {branches.map(b => (
                    <BranchCard key={b.id} branch={b} />
                ))}
            </div>
        </div>
    );
}
