#!/usr/bin/env node
/**
 * Generates profile.svg for the GitHub profile README.
 * Imports graph data + logic from the website source — single source of truth.
 *
 * Usage: node generate-svg.mjs [--about] [--out path/to/profile.svg]
 *
 *   --about        Expand the "About Me" section with bio paragraphs
 *   --out <path>   Output path (default: ../evanjacobson/profile.svg)
 */
import { writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BRANCHES, ENTRIES, buildGraph } from './src/data/graph.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const EXPAND_ABOUT = args.includes('--about');
const outIdx = args.indexOf('--out');
const OUT_PATH = outIdx >= 0 && args[outIdx + 1]
    ? resolve(args[outIdx + 1])
    : join(__dirname, '..', 'evanjacobson', 'profile.svg');

// ═══════════════════════════════════════════════════════════════
// BIO (plain-text version of the JSX paragraphs in Home.jsx)
// ═══════════════════════════════════════════════════════════════

const BIO_PARAGRAPHS = [
    "Right now I'm co-founding OrAI, where we're giving early childhood educators their time back — automating lesson plans, parent communications, document tracking, and compliant scheduling so they can spend less time on paperwork and more time with kids. I own everything from architecture to compliance to investor strategy, because I believe engineers should be owners, not ticket-takers.",
    "Before that I was the founding engineer at OneDeal (Techstars '23), where I built agentic web search from scratch — months before MCP or AI web search existed. I'm obsessed with agentic AI systems: multi-agent pipelines, autonomous search, AI tooling. I've been building these before the frameworks existed, and I keep building them because it's what I care about most.",
    "By day I'm a Software Engineer II at Alarm.com, where I shipped one of the company's first LLM-powered internal tools and led engineering for Stripe-managed subscriptions. I also contribute to open source AI tooling like Beads and Kilo Code.",
    "I'm looking for a team where shipping fast and talking to users is the culture, not the exception — where engineers own problems end-to-end and velocity is the default.",
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function wrapText(text, maxWidthPx, fontSize) {
    const charW = fontSize * 0.555;
    const maxChars = Math.floor(maxWidthPx / charW);
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (test.length > maxChars && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    }
    if (line) lines.push(line);
    return lines;
}

function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ═══════════════════════════════════════════════════════════════
// SVG GENERATOR
// ═══════════════════════════════════════════════════════════════

function generateSVG() {
    const { rows, branchMap, branchSpans, yearMarkers } = buildGraph(ENTRIES, BRANCHES);

    const COMMIT_H = 56;
    const MERGE_H = 36;
    const LANE_GAP = 28;
    const GRAPH_LEFT = 48;
    const PAD = 32;
    const HEADER_H = 46;
    const CURVE = 20;

    const maxLane = Math.max(...Object.values(branchMap).map(b => b.lane));
    const graphW = GRAPH_LEFT + (maxLane + 1) * LANE_GAP + 10;
    const labelLeft = PAD + graphW + 16;
    const SVG_W = Math.max(900, labelLeft + 540);

    // ── About section layout ──
    const aboutRowIdx = rows.findIndex(r => r.slug === 'about');
    const ABOUT_GAP = 8;
    const ABOUT_PAD = 24;
    const BIO_FONT = 12;
    const BIO_LINE_H = 18;
    const BIO_PARA_GAP = 12;
    let aboutSectionH = 0;
    let bioWrapped = [];

    if (EXPAND_ABOUT && aboutRowIdx >= 0) {
        const cardInnerW = SVG_W - PAD - labelLeft - ABOUT_PAD * 2;
        bioWrapped = BIO_PARAGRAPHS.map(p => wrapText(p, cardInnerW, BIO_FONT));
        const totalLines = bioWrapped.reduce((s, ls) => s + ls.length, 0);
        const textH = totalLines * BIO_LINE_H + (BIO_PARAGRAPHS.length - 1) * BIO_PARA_GAP;
        aboutSectionH = ABOUT_GAP + ABOUT_PAD + textH + ABOUT_PAD + ABOUT_GAP;
    }

    const graphTop = PAD + HEADER_H;
    const rowYs = [];
    let cumY = 0;
    for (let i = 0; i < rows.length; i++) {
        const h = rows[i].type === 'merge' ? MERGE_H : COMMIT_H;
        rowYs.push(graphTop + cumY + h / 2);
        cumY += h;
        if (i === aboutRowIdx && EXPAND_ABOUT) cumY += aboutSectionH;
    }
    const SVG_H = graphTop + cumY + PAD;

    const lX = (lane) => PAD + GRAPH_LEFT + lane * LANE_GAP;
    const rY = (i) => rowYs[i];
    const rH = (i) => rows[i].type === 'merge' ? MERGE_H : COMMIT_H;

    // Active branch latest rows (for glow)
    const activeBranchLatest = new Set();
    for (const [branchId, b] of Object.entries(branchMap)) {
        if (b._isEnded || branchId === 'main') continue;
        const topRow = rows.findIndex(r => r.branch === branchId);
        if (topRow >= 0) activeBranchLatest.add(topRow);
    }

    const FONT = "'Segoe UI', Helvetica, Arial, sans-serif";
    const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

    const lines = [];
    const add = (s) => lines.push(s);

    // ── SVG open ──
    add(`<svg xmlns="http://www.w3.org/2000/svg" width="${SVG_W}" height="${SVG_H}" viewBox="0 0 ${SVG_W} ${SVG_H}">`);

    // ── Background ──
    add(`  <rect x="0.5" y="0.5" width="${SVG_W - 1}" height="${SVG_H - 1}" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>`);

    // ── Header ──
    add(`  <text x="${PAD}" y="${PAD + 26}" fill="#f1f5f9" font-family="${FONT}" font-size="26" font-weight="700">Evan Jacobson</text>`);

    // ── Year dividers ──
    for (const { row: ri, year } of yearMarkers) {
        const y = rY(ri) - rH(ri) / 2;
        add(`  <line x1="0" y1="${y}" x2="${SVG_W}" y2="${y}" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/>`);
        add(`  <text x="${PAD + GRAPH_LEFT - 12}" y="${y - 4}" fill="#475569" font-family="${MONO}" font-size="9" text-anchor="end" opacity="0.7">${year}</text>`);
    }

    // ── Branch vertical lines ──
    for (const [branchId, [startRow, endRow]] of Object.entries(branchSpans)) {
        const b = branchMap[branchId];
        if (!b) continue;
        const x = lX(b.lane);
        const op = b._isEnded ? 0.35 : 0.6;
        const dash = b._isEnded ? ` stroke-dasharray="6 4"` : '';
        add(`  <line x1="${x}" y1="${rY(startRow)}" x2="${x}" y2="${rY(endRow)}" stroke="${b.color}" stroke-width="2.5"${dash} opacity="${op}" stroke-linecap="round"/>`);
    }

    // ── Fork / merge curves ──
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const b = branchMap[row.branch];
        if (!b || row.branch === 'main') continue;
        const parentX = lX(branchMap[b.parent].lane);
        const branchX = lX(b.lane);
        const y = rY(i);
        const op = b._isEnded ? 0.35 : 0.6;
        const isWt = row._isWorktree;

        if (row.type === 'fork') {
            if (isWt) {
                const midX = (parentX + branchX) / 2;
                add(`  <line x1="${parentX}" y1="${y}" x2="${branchX}" y2="${y}" stroke="${b.color}" stroke-width="2" stroke-dasharray="4 3" opacity="${op}"/>`);
                add(`  <text x="${midX}" y="${y - 5}" fill="${b.color}" font-family="${MONO}" font-size="7" text-anchor="middle" opacity="0.5">wt</text>`);
            } else {
                add(`  <path d="M ${parentX} ${y} C ${parentX} ${y + CURVE}, ${branchX} ${y - CURVE}, ${branchX} ${y}" fill="none" stroke="${b.color}" stroke-width="2.5" opacity="${op}" stroke-linecap="round"/>`);
            }
        }
        if (row.type === 'merge') {
            if (isWt) {
                add(`  <line x1="${branchX}" y1="${y}" x2="${parentX}" y2="${y}" stroke="${b.color}" stroke-width="2" stroke-dasharray="4 3" opacity="${op}"/>`);
            } else {
                add(`  <path d="M ${branchX} ${y} C ${branchX} ${y - CURVE}, ${parentX} ${y + CURVE}, ${parentX} ${y}" fill="none" stroke="${b.color}" stroke-width="2.5" opacity="${op}" stroke-linecap="round"/>`);
            }
        }
    }

    // ── Dots ──
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const b = branchMap[row.branch];
        const x = lX(b.lane);
        const y = rY(i);
        const isPresent = i === 0;

        // Glow for active branches
        if (!b._isEnded && row.type === 'fork') {
            add(`  <circle cx="${x}" cy="${y}" r="8" fill="${b.color}" opacity="0.1"/>`);
        }
        if (activeBranchLatest.has(i) && !isPresent) {
            add(`  <circle cx="${x}" cy="${y}" r="10" fill="${b.color}" opacity="0.12"/>`);
        }
        if (isPresent) {
            add(`  <circle cx="${x}" cy="${y}" r="12" fill="${b.color}" opacity="0.15"/>`);
        }

        // Main dot
        if (row.type === 'merge') {
            add(`  <circle cx="${x}" cy="${y}" r="4" fill="#0f172a" stroke="${b.color}" stroke-width="2"/>`);
            // Merge dot on parent lane
            const px = lX(branchMap[b.parent].lane);
            add(`  <circle cx="${px}" cy="${y}" r="4" fill="#0f172a" stroke="${b.color}" stroke-width="2"/>`);
        } else {
            const r = isPresent ? 6 : 5;
            add(`  <circle cx="${x}" cy="${y}" r="${r}" fill="${b.color}" stroke="${b.color}" stroke-width="2"/>`);
        }
    }

    // ── Row labels ──
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const b = branchMap[row.branch];
        const y = rY(i);
        const isMerge = row.type === 'merge';
        const rowOp = isMerge ? 0.45 : 1;

        // Pill
        const pillText = b.label;
        const pillFontSize = isMerge ? 8 : 10;
        const pillCharW = pillFontSize * 0.62;
        const pillPadX = 8;
        const pillH = isMerge ? 15 : 18;
        const pillW = pillText.length * pillCharW + pillPadX * 2;
        const pillX = labelLeft;
        const pillY = y - pillH / 2;
        const pillOp = isMerge ? 0.6 : 1;

        add(`  <g opacity="${rowOp}">`);
        add(`    <rect x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="3" fill="${b.color}" opacity="${pillOp}"/>`);
        add(`    <text x="${pillX + pillW / 2}" y="${pillY + pillH - (isMerge ? 4 : 5)}" fill="#0f172a" font-family="${MONO}" font-size="${pillFontSize}" font-weight="600" text-anchor="middle" opacity="${pillOp}">${esc(pillText)}</text>`);

        // Label text
        const textX = pillX + pillW + 8;
        const dateX = SVG_W - PAD;

        if (isMerge) {
            add(`    <text x="${textX}" y="${y + 4}" fill="#94a3b8" font-family="${FONT}" font-size="12">${esc(row.label)}</text>`);
            if (row.date) add(`    <text x="${dateX}" y="${y + 4}" fill="#475569" font-family="${MONO}" font-size="10" text-anchor="end">${esc(row.date)}</text>`);
        } else if (row.subtitle) {
            add(`    <text x="${textX}" y="${y - 3}" fill="#e2e8f0" font-family="${FONT}" font-size="13" font-weight="500">${esc(row.label)}</text>`);
            add(`    <text x="${textX}" y="${y + 12}" fill="#64748b" font-family="${FONT}" font-size="11">${esc(row.subtitle)}</text>`);
            if (row.date) add(`    <text x="${dateX}" y="${y - 3}" fill="#475569" font-family="${MONO}" font-size="10" text-anchor="end">${esc(row.date)}</text>`);
        } else {
            add(`    <text x="${textX}" y="${y + 5}" fill="#e2e8f0" font-family="${FONT}" font-size="13" font-weight="500">${esc(row.label)}</text>`);
            if (row.date) add(`    <text x="${dateX}" y="${y + 5}" fill="#475569" font-family="${MONO}" font-size="10" text-anchor="end">${esc(row.date)}</text>`);
        }

        add(`  </g>`);
    }

    // ── About section (expanded bio) ──
    if (EXPAND_ABOUT && aboutRowIdx >= 0 && bioWrapped.length > 0) {
        const cardTop = rY(aboutRowIdx) + rH(aboutRowIdx) / 2 + ABOUT_GAP;
        const cardW = SVG_W - PAD - labelLeft;
        const cardH = aboutSectionH - ABOUT_GAP * 2;

        // Card background (covers year divider lines) + border
        add(`  <rect x="${labelLeft}" y="${cardTop}" width="${cardW}" height="${cardH}" rx="8" fill="#0f172a"/>`);
        add(`  <rect x="${labelLeft}" y="${cardTop}" width="${cardW}" height="${cardH}" rx="8" fill="none" stroke="#1e293b" stroke-width="1"/>`);

        // Bio text
        let textY = cardTop + ABOUT_PAD + BIO_FONT;
        for (let p = 0; p < bioWrapped.length; p++) {
            for (const line of bioWrapped[p]) {
                add(`  <text x="${labelLeft + ABOUT_PAD}" y="${textY}" fill="#cbd5e1" font-family="${FONT}" font-size="${BIO_FONT}">${esc(line)}</text>`);
                textY += BIO_LINE_H;
            }
            if (p < bioWrapped.length - 1) textY += BIO_PARA_GAP;
        }
    }

    add('</svg>');
    return lines.join('\n');
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

const svg = generateSVG();
writeFileSync(OUT_PATH, svg);
console.log(`Generated ${OUT_PATH}`);
