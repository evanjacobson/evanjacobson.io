import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Image as ImageIcon, RefreshCw, Sparkles } from 'lucide-react';

function createRandom(seed) {
  let value = seed >>> 0;

  return function random() {
    value += 0x6D2B79F5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(random, min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function normalizeBits(text) {
  return text.replace(/[^01]/g, '');
}

function wrapBits(bits, columns) {
  const repeated = bits.repeat(Math.floor((columns * columns) / bits.length) + 3);
  const lines = [];

  for (let index = 0; index < repeated.length; index += columns) {
    lines.push(repeated.slice(index, index + columns));
  }

  return lines;
}

function parseHexColor(hexColor) {
  const normalized = hexColor.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((character) => `${character}${character}`).join('')
    : normalized;

  if (!/^[0-9a-f]{6}$/i.test(value)) {
    return { red: 0, green: 255, blue: 96 };
  }

  return {
    red: parseInt(value.slice(0, 2), 16),
    green: parseInt(value.slice(2, 4), 16),
    blue: parseInt(value.slice(4, 6), 16),
  };
}

function clampColor(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function drawBinaryConsoleImage(canvas, bits, width, height, seed, padding, baseColor) {
  const random = createRandom(Number(seed) || 0);
  const context = canvas.getContext('2d');
  const glowCanvas = document.createElement('canvas');
  const glowContext = glowCanvas.getContext('2d');
  const vignetteCanvas = document.createElement('canvas');
  const vignetteContext = vignetteCanvas.getContext('2d');
  const color = parseHexColor(baseColor);
  const shortestSide = Math.min(width, height);
  const safePadding = Math.min(padding, Math.floor(shortestSide / 2) - 1);

  canvas.width = width;
  canvas.height = height;
  glowCanvas.width = width;
  glowCanvas.height = height;
  vignetteCanvas.width = width;
  vignetteCanvas.height = height;

  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  const fontSize = Math.max(10, Math.floor(shortestSide / 28));
  const font = `${fontSize}px Menlo, SFMono-Regular, Consolas, 'Liberation Mono', monospace`;

  context.font = font;
  glowContext.font = font;
  context.textBaseline = 'alphabetic';
  glowContext.textBaseline = 'alphabetic';

  const zeroMetrics = context.measureText('0');
  const charWidth = Math.max(1, zeroMetrics.width);
  const glyphLeft = zeroMetrics.actualBoundingBoxLeft || 0;
  const glyphRight = zeroMetrics.actualBoundingBoxRight || charWidth;
  const glyphAscent = zeroMetrics.actualBoundingBoxAscent || fontSize;
  const glyphDescent = zeroMetrics.actualBoundingBoxDescent || Math.ceil(fontSize * 0.2);
  const glyphWidth = glyphLeft + glyphRight;
  const glyphHeight = glyphAscent + glyphDescent;
  const lineHeight = fontSize + Math.max(4, Math.floor(fontSize / 3));
  const usableWidth = Math.max(1, width - safePadding * 2);
  const usableHeight = Math.max(1, height - safePadding * 2);
  const columns = Math.max(1, Math.floor((usableWidth - glyphWidth) / charWidth) + 1);
  const rows = Math.max(1, Math.floor((usableHeight - glyphHeight) / lineHeight) + 1);
  const columnGap = columns > 1 ? (usableWidth - glyphWidth) / (columns - 1) : 0;
  const rowGap = rows > 1 ? (usableHeight - glyphHeight) / (rows - 1) : 0;
  const lines = wrapBits(bits, columns);

  for (let row = 0; row < rows; row += 1) {
    const line = lines[row % lines.length];
    const y = safePadding + glyphAscent + row * rowGap;

    for (let column = 0; column < Math.min(line.length, columns); column += 1) {
      const x = safePadding + glyphLeft + column * columnGap;
      const brightness = randomInt(random, 60, 115) / 100;
      const red = clampColor(color.red * brightness);
      const green = clampColor(color.green * brightness);
      const blue = clampColor(color.blue * brightness);

      glowContext.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.35)`;
      glowContext.fillText(line[column], x, y);
      context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      context.fillText(line[column], x, y);
    }
  }

  context.save();
  context.filter = `blur(${Math.max(1, Math.floor(shortestSide / 180))}px)`;
  context.globalAlpha = 0.85;
  context.drawImage(glowCanvas, 0, 0);
  context.restore();

  const gradient = vignetteContext.createRadialGradient(
    width / 2,
    height / 2,
    shortestSide / 5,
    width / 2,
    height / 2,
    shortestSide * 0.7,
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.55)');
  vignetteContext.fillStyle = gradient;
  vignetteContext.fillRect(0, 0, width, height);
  context.drawImage(vignetteCanvas, 0, 0);
}

function BinaryConsoleApp() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('01001011 01001001 01001100 01001111');
  const [width, setWidth] = useState('1024');
  const [height, setHeight] = useState('1024');
  const [scale, setScale] = useState(100);
  const [padding, setPadding] = useState(24);
  const [baseColor, setBaseColor] = useState('#00ff60');
  const [seed, setSeed] = useState(7);
  const bits = useMemo(() => normalizeBits(text), [text]);
  const canRender = bits.length > 0;
  const renderWidth = Math.max(1, Number(width) || 1);
  const renderHeight = Math.max(1, Number(height) || 1);
  const previewAspectRatio = `${renderWidth} / ${renderHeight}`;

  useEffect(() => {
    if (!canvasRef.current || !canRender) return;

    drawBinaryConsoleImage(canvasRef.current, bits, renderWidth, renderHeight, seed, padding, baseColor);
  }, [bits, renderWidth, renderHeight, seed, padding, baseColor, canRender]);

  const updateWidth = (value) => {
    setWidth(value);
    setScale(100);
  };

  const updateHeight = (value) => {
    setHeight(value);
    setScale(100);
  };

  const updateScale = (value) => {
    const nextScale = Number(value);

    setScale(nextScale);
    setWidth(String(Math.max(1, Math.round(renderWidth * (nextScale / scale)))));
    setHeight(String(Math.max(1, Math.round(renderHeight * (nextScale / scale)))));
  };

  const randomizeSeed = () => {
    setSeed(Math.floor(Math.random() * 100000));
  };

  const downloadImage = () => {
    if (!canvasRef.current || !canRender) return;

    const link = document.createElement('a');
    link.download = 'binary-console.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <section className="mt-10 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/30">
      <div className="grid lg:grid-cols-[360px_1fr]">
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400 mb-4">
            <Sparkles className="w-4 h-4" />
            Binary Console Image
          </div>
          <h2 className="text-2xl font-bold text-slate-50 tracking-tight">
            Turn binary text into a glowing console tile.
          </h2>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            A browser-native port of the Python generator, with deterministic seeds and instant PNG export.
          </p>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">Binary text</span>
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={5}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-700 focus:border-emerald-500/60"
                placeholder="01001011 01001001 01001100 01001111"
              />
              {!canRender && (
                <span className="mt-2 block text-xs text-amber-400">
                  Enter at least one 0 or 1.
                </span>
              )}
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Width</span>
                <input
                  value={width}
                  onChange={(event) => updateWidth(event.target.value)}
                  type="number"
                  min="1"
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-emerald-500/60"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Height</span>
                <input
                  value={height}
                  onChange={(event) => updateHeight(event.target.value)}
                  type="number"
                  min="1"
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-emerald-500/60"
                />
              </label>
            </div>

            <label className="block">
              <span className="flex items-center justify-between text-sm font-medium text-slate-300">
                <span>Scale</span>
                <span className="text-xs text-slate-500">{scale}%</span>
              </span>
              <input
                value={scale}
                onChange={(event) => updateScale(event.target.value)}
                type="range"
                min="25"
                max="200"
                className="mt-3 w-full accent-emerald-500"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Padding</span>
                <input
                  value={padding}
                  onChange={(event) => setPadding(Math.max(0, Number(event.target.value) || 0))}
                  type="number"
                  min="0"
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-emerald-500/60"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Base color</span>
                <input
                  value={baseColor}
                  onChange={(event) => setBaseColor(event.target.value)}
                  type="color"
                  className="mt-2 h-[46px] w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 outline-none transition-colors focus:border-emerald-500/60"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-300">Seed</span>
              <input
                value={seed}
                onChange={(event) => setSeed(event.target.value)}
                type="number"
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-emerald-500/60"
              />
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={downloadImage}
                disabled={!canRender}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
              >
                <Download className="w-4 h-4" />
                Download PNG
              </button>
              <button
                type="button"
                onClick={randomizeSeed}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:text-slate-100"
              >
                <RefreshCw className="w-4 h-4" />
                New Layout
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_42%)]">
          <div className="rounded-2xl border border-slate-800 bg-black/70 p-3 shadow-2xl shadow-emerald-950/20">
            {canRender ? (
              <canvas
                ref={canvasRef}
                className="block w-full bg-black"
                style={{ aspectRatio: previewAspectRatio }}
                aria-label="Generated binary console image preview"
              />
            ) : (
              <div
                className="flex w-full items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950 text-slate-600"
                style={{ aspectRatio: previewAspectRatio }}
              >
                <ImageIcon className="w-10 h-10" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BinaryConsoleApp;
