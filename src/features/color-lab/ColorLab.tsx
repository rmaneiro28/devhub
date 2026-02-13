
import React, { useState } from 'react';
import { Palette, Wand2, Copy, Check, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

const ColorLab: React.FC = () => {
  const [prompt, setPrompt] = useState('Modern SaaS Dashboard');
  const [colors, setColors] = useState<string[]>(['#0f172a', '#1e293b', '#14b8a6', '#0d9488', '#f8fafc']);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePalette = async () => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey.includes('PLACEHOLDER')) {
        alert('Please set a valid VITE_GEMINI_API_KEY in .env.local');
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional 5-color palette for: ${prompt}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              palette: {
                type: Type.ARRAY,
                items: { type: Type.STRING, description: "Hex color code" }
              }
            },
            required: ["palette"]
          }
        }
      });
      const data = JSON.parse(response.text || '{"palette":[]}');
      if (data.palette && data.palette.length >= 5) {
        setColors(data.palette.slice(0, 5));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <p className="text-sm text-slate-500">AI-driven accessibility-first palettes</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a mood or brand name..."
          className="flex-grow px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={generatePalette}
          disabled={loading}
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
          Generate
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
        <span>Accent</span>
        <span>Lightest</span>
      </div>
    </div>
  );
};

export default ColorLab;
