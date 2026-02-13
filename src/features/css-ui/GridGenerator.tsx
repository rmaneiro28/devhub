import React, { useState, useMemo } from 'react';
import { LayoutGrid, Copy, Check, ArrowRight } from 'lucide-react';

const GridGenerator: React.FC = () => {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [gap, setGap] = useState(16); // Keeping for potential unified gap control if needed, but using splits below
    const [rowGap, setRowGap] = useState(16);
    const [colGap, setColGap] = useState(16);
    const [copied, setCopied] = useState(false);
    const [format, setFormat] = useState<'css' | 'scss' | 'tailwind'>('css');

    const gridStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: `${rowGap}px ${colGap}px`,
        height: '100%',
        width: '100%',
    }), [rows, cols, rowGap, colGap]);

    const outputCode = useMemo(() => {
        if (format === 'tailwind') {
            // Tailwind doesn't strictly support separate row/col gap in arbitrary values easily in one class without utilities?
            // Actually it does: gap-x-[16px] gap-y-[16px]
            return `<div class="grid grid-cols-${cols} grid-rows-${rows} gap-x-[${colGap}px] gap-y-[${rowGap}px] w-full h-full">
  <!-- Content -->
</div>`;
        } else if (format === 'scss') {
            return `$grid-cols: ${cols};
$grid-rows: ${rows};
$gap-x: ${colGap}px;
$gap-y: ${rowGap}px;

.grid-container {
  display: grid;
  grid-template-columns: repeat($grid-cols, 1fr);
  grid-template-rows: repeat($grid-rows, 1fr);
  gap: $gap-y $gap-x;
}`;
        } else {
            return `.grid-container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${rowGap}px ${colGap}px;
}`;
        }
    }, [cols, rows, rowGap, colGap, format]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] min-h-[600px]">

            {/* Controls */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-xl">
                        <LayoutGrid size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Grid Gen</h3>
                        <p className="text-sm text-slate-500">Visual CSS Grid Builder</p>
                    </div>
                </div>

                <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 flex-grow">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500 uppercase">Columns</label>
                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">{cols}</span>
                        </div>
                        <input type="range" min="1" max="12" value={cols} onChange={e => setCols(Number(e.target.value))} className="w-full accent-cyan-600" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500 uppercase">Rows</label>
                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">{rows}</span>
                        </div>
                        <input type="range" min="1" max="12" value={rows} onChange={e => setRows(Number(e.target.value))} className="w-full accent-cyan-600" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500 uppercase">Column Gap (px)</label>
                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">{colGap}</span>
                        </div>
                        <input type="range" min="0" max="50" value={colGap} onChange={e => setColGap(Number(e.target.value))} className="w-full accent-cyan-600" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500 uppercase">Row Gap (px)</label>
                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono">{rowGap}</span>
                        </div>
                        <input type="range" min="0" max="50" value={rowGap} onChange={e => setRowGap(Number(e.target.value))} className="w-full accent-cyan-600" />
                    </div>
                </div>

                <div className="mt-auto bg-slate-100 dark:bg-black rounded-xl p-4 border border-slate-200 dark:border-slate-800 relative group flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800">
                            {['css', 'scss', 'tailwind'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFormat(f as any)}
                                    className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-colors ${format === f ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                                >
                                    {f === 'tailwind' ? 'TW' : f}
                                </button>
                            ))}
                        </div>
                        <button onClick={copyToClipboard} className="text-cyan-600 hover:text-cyan-500 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-105 active:scale-95">
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                    </div>
                    <pre className="font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap word-break-break-all max-h-[150px] overflow-y-auto custom-scrollbar">
                        {outputCode}
                    </pre>
                </div>
            </div>

            {/* Preview */}
            <div className="flex-grow bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-8 overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                <div className="w-full h-full max-w-3xl max-h-[800px] bg-white dark:bg-slate-900 shadow-2xl rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-4" style={{ resize: 'both', overflow: 'auto' }}>
                    <div style={gridStyle}>
                        {Array.from({ length: rows * cols }).map((_, i) => (
                            <div key={i} className="bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-lg flex items-center justify-center text-cyan-700 dark:text-cyan-300 font-mono text-sm font-bold relative group transition-all hover:bg-cyan-200 dark:hover:bg-cyan-800/50">
                                <span className="absolute top-1 left-2 text-[10px] opacity-50">{i + 1}</span>
                                <div className="hidden group-hover:flex absolute inset-0 items-center justify-center opacity-50">
                                    <div className="flex flex-col items-center">
                                        <ArrowRight size={12} className="rotate-45" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GridGenerator;
