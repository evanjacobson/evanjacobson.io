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

function drawBinaryConsoleImage(canvas, bits, size, seed) {
  const random = createRandom(Number(seed) || 0);
  const context = canvas.getContext('2d');
  const glowCanvas = document.createElement('canvas');
  const glowContext = glowCanvas.getContext('2d');
  const vignetteCanvas = document.createElement('canvas');
  const vignetteContext = vignetteCanvas.getContext('2d');

  canvas.width = size;
  canvas.height = size;
  glowCanvas.width = size;
  glowCanvas.height = size;
  vignetteCanvas.width = size;
  vignetteCanvas.height = size;

  context.fillStyle = '#000000';
  context.fillRect(0, 0, size, size);

  const fontSize = Math.max(10, Math.floor(size / 28));
  const font = `${fontSize}px Menlo, SFMono-Regular, Consolas, 'Liberation Mono', monospace`;

  context.font = font;
  glowContext.font = font;
  context.textBaseline = 'top';
  glowContext.textBaseline = 'top';

  const charWidth = Math.max(1, context.measureText('0').width);
  const lineHeight = fontSize + Math.max(4, Math.floor(fontSize / 3));
  const columns = Math.max(1, Math.floor((size - 48) / charWidth));
  const rows = Math.max(1, Math.floor((size - 48) / lineHeight));
  const lines = wrapBits(bits, columns);

  for (let row = 0; row < rows; row += 1) {
    const source = lines[row % lines.length];
    const offset = source.length > 1 ? Math.floor(random() * source.length) : 0;
    const line = `${source.slice(offset)}${source.slice(0, offset)}`;
    const y = 24 + row * lineHeight;

    for (let column = 0; column < Math.min(line.length, columns); column += 1) {
      const x = 24 + column * charWidth;
      const brightness = randomInt(random, 120, 255);
      const blue = randomInt(random, 35, 90);

      glowContext.fillStyle = `rgba(0, ${brightness}, 60, 0.35)`;
      glowContext.fillText(line[column], x, y);
      context.fillStyle = `rgb(0, ${brightness}, ${blue})`;
      context.fillText(line[column], x, y);
    }
  }

  context.save();
  context.filter = `blur(${Math.max(1, Math.floor(size / 180))}px)`;
  context.globalAlpha = 0.85;
  context.drawImage(glowCanvas, 0, 0);
  context.restore();

  const gradient = vignetteContext.createRadialGradient(
    size / 2,
    size / 2,
    size / 5,
    size / 2,
    size / 2,
    size * 0.7,
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.55)');
  vignetteContext.fillStyle = gradient;
  vignetteContext.fillRect(0, 0, size, size);
  context.drawImage(vignetteCanvas, 0, 0);
}

function BinaryConsoleApp() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('01001011 01001001 01001100 01001111');
  const [size, setSize] = useState(1024);
  const [seed, setSeed] = useState(7);
  const bits = useMemo(() => normalizeBits(text), [text]);
  const canRender = bits.length > 0;

  useEffect(() => {
    if (!canvasRef.current || !canRender) return;

    drawBinaryConsoleImage(canvasRef.current, bits, size, seed);
  }, [bits, size, seed, canRender]);

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
                <span className="text-sm font-medium text-slate-300">Size</span>
                <select
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-emerald-500/60"
                >
                  <option value={512}>512px</option>
                  <option value={1024}>1024px</option>
                  <option value={1536}>1536px</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Seed</span>
                <input
                  value={seed}
                  onChange={(event) => setSeed(event.target.value)}
                  type="number"
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-emerald-500/60"
                />
              </label>
            </div>

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
                className="block aspect-square w-full rounded-xl bg-black"
                aria-label="Generated binary console image preview"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950 text-slate-600">
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
