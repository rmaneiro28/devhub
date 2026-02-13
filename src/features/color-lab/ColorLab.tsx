
import React, { useState } from 'react';
import { Palette, Wand2, Copy, Check, Loader2, RefreshCw } from 'lucide-react';

const ColorLab: React.FC = () => {
  const [colors, setColors] = useState<string[]>(['#0f172a', '#1e293b', '#14b8a6', '#0d9488', '#f8fafc']);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Simple HSL to Hex helper
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateRandomPalette = () => {
    setLoading(true);
    // Simulate thinking time for effect
    setTimeout(() => {
      const baseHue = Math.floor(Math.random() * 360);
      const newColors = [
        hslToHex(baseHue, 60, 10), // Darkest
        hslToHex(baseHue, 50, 20),
        hslToHex(baseHue, 70, 50), // Main
        hslToHex((baseHue + 180) % 360, 70, 60), // Complementary/Accent
        hslToHex(baseHue, 80, 95), // Lightest
      ];
      setColors(newColors);
      setLoading(false);
    }, 500);
  };

  const copyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
          <Palette size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Color Palette Lab</h3>
          <p className="text-sm text-slate-500">Algorithmic harmony generator</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 justify-center">
        <button
          onClick={generateRandomPalette}
          disabled={loading}
          className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
          Generate Random Harmony
        </button>
      </div>

      <div className="grid grid-cols-5 h-48 rounded-2xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800">
        {colors.map((color, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: color }}
            className="group relative flex flex-col items-center justify-end pb-4 transition-transform hover:scale-x-105 z-0 hover:z-10 cursor-pointer"
            onClick={() => copyColor(color, idx)}
          >
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-lg">
              {copiedIndex === idx ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
              {color}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Darkest</span>
        <span>Dark</span>
        <span>Main</span>
        <span>Accent</span>
        <span>Lightest</span>
      </div>
    </div>
  );
};

export default ColorLab;
