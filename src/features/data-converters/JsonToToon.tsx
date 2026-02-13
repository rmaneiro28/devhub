import React, { useState, useMemo } from 'react';
import { FileCode, ArrowRight, Copy, Check, Info } from 'lucide-react';
import { toToon } from '../../utils/toonConverter';

const JsonToToon: React.FC = () => {
    const [input, setInput] = useState(`[
  { "id": 1, "name": "Alice", "role": "Admin" },
  { "id": 2, "name": "Bob", "role": "User" },
  { "id": 3, "name": "Charlie", "role": "User" }
]`);
    const [copied, setCopied] = useState(false);

    const output = useMemo(() => {
        try {
            const parsed = JSON.parse(input);
            return toToon(parsed).trim();
        } catch (e) {
            return "// Invalid JSON";
        }
    }, [input]);

    const stats = useMemo(() => {
        const jsonLen = input.length;
        const toonLen = output.length;
        const savings = jsonLen - toonLen;
        const percent = jsonLen > 0 ? Math.round((savings / jsonLen) * 100) : 0;
        // Rough token approximation: 1 token ~= 4 chars
        const tokensSaved = Math.round(savings / 4);

        return { jsonLen, toonLen, percent, tokensSaved };
    }, [input, output]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl">
                    <FileCode size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">JSON to TOON</h3>
                    <p className="text-sm text-slate-500">Save AI tokens by converting to Token-Oriented Object Notation</p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="flex gap-4 mb-6 flex-shrink-0">
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-bold border border-green-200 dark:border-green-800">
                    {stats.percent}% Smaller
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                    <span>~{stats.tokensSaved} Tokens Saved</span>
                    <div className="group relative">
                        <Info size={14} className="text-slate-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black text-white text-xs p-2 rounded hidden group-hover:block z-10">
                            Based on approx. 4 chars per token. Actual savings vary by tokenizer.
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 flex-grow overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">JSON Input</label>
                    <textarea
                        className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 custom-scrollbar"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste JSON here..."
                    />
                </div>

                <div className="hidden lg:flex items-center justify-center">
                    <ArrowRight className="text-slate-300" size={24} />
                </div>

                <div className="flex-1 flex flex-col relative group">
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2">TOON Output</label>
                    <div className="flex-grow p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-pink-300 overflow-auto custom-scrollbar whitespace-pre">
                        {output}
                    </div>
                    {output && !output.startsWith('//') && (
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-4 top-10 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors shadow-lg border border-slate-700"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JsonToToon;
