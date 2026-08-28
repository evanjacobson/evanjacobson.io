import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { ogPages, ogRouteKey } from './og-pages.mjs';

const DIST_DIR = path.resolve('dist');
const OG_DIR = path.join(DIST_DIR, 'og');
const FONTS_DIR = path.resolve('scripts/fonts');

const WIDTH = 1200;
const HEIGHT = 630;

// Palette matching the site's Tailwind usage: slate-950 background,
// slate-50/400 text, emerald-400 accent, slate-800 borders.
const COLORS = {
    background: '#020617',
    surface: '#0f172a',
    border: '#1e293b',
    title: '#f8fafc',
    subtitle: '#94a3b8',
    accent: '#34d399',
};

const fonts = [
    { name: 'Inter', weight: 400, style: 'normal', data: await readFile(path.join(FONTS_DIR, 'Inter-Regular.ttf')) },
    { name: 'Inter', weight: 600, style: 'normal', data: await readFile(path.join(FONTS_DIR, 'Inter-SemiBold.ttf')) },
    { name: 'Inter', weight: 700, style: 'normal', data: await readFile(path.join(FONTS_DIR, 'Inter-Bold.ttf')) },
];

function truncate(value, maxLength) {
    const text = String(value ?? '');
    return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}

function titleFontSize(title) {
    if (title.length > 34) return 56;
    if (title.length > 22) return 68;
    return 80;
}

function card({ eyebrow, title, subtitle }) {
    return {
        type: 'div',
        props: {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '72px 80px',
                backgroundColor: COLORS.background,
                backgroundImage: `radial-gradient(circle at 85% -10%, rgba(52, 211, 153, 0.15), transparent 55%), linear-gradient(180deg, ${COLORS.background} 0%, ${COLORS.surface} 100%)`,
                fontFamily: 'Inter',
            },
            children: [
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        width: '48px',
                                        height: '4px',
                                        backgroundColor: COLORS.accent,
                                        borderRadius: '2px',
                                    },
                                },
                            },
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: '26px',
                                        fontWeight: 600,
                                        letterSpacing: '4px',
                                        textTransform: 'uppercase',
                                        color: COLORS.accent,
                                    },
                                    children: truncate(eyebrow, 48),
                                },
                            },
                        ],
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: `${titleFontSize(title)}px`,
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        letterSpacing: '-1px',
                                        color: COLORS.title,
                                    },
                                    children: truncate(title, 80),
                                },
                            },
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: '30px',
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                        color: COLORS.subtitle,
                                        maxWidth: '980px',
                                    },
                                    children: truncate(subtitle, 150),
                                },
                            },
                        ],
                    },
                },
                {
                    type: 'div',
                    props: {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '32px',
                            borderTop: `1px solid ${COLORS.border}`,
                        },
                        children: [
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                    },
                                    children: [
                                        {
                                            type: 'div',
                                            props: {
                                                style: {
                                                    width: '14px',
                                                    height: '14px',
                                                    borderRadius: '7px',
                                                    backgroundColor: COLORS.accent,
                                                },
                                            },
                                        },
                                        {
                                            type: 'div',
                                            props: {
                                                style: {
                                                    fontSize: '28px',
                                                    fontWeight: 600,
                                                    color: COLORS.title,
                                                },
                                                children: 'evanjacobson.io',
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                type: 'div',
                                props: {
                                    style: {
                                        fontSize: '24px',
                                        fontWeight: 400,
                                        color: COLORS.subtitle,
                                    },
                                    children: 'Agentic AI Engineering',
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };
}

async function writeOgImage(fileName, page) {
    const svg = await satori(card(page), { width: WIDTH, height: HEIGHT, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
    await writeFile(path.join(OG_DIR, `${fileName}.png`), png);
}

await mkdir(OG_DIR, { recursive: true });

for (const page of ogPages) {
    await writeOgImage(ogRouteKey(page.pathname), page);
}

console.log(`Generated ${ogPages.length} Open Graph images in ${OG_DIR}`);
