import React, { useState } from 'react';
import { Layers, Plus, Trash2, Copy, Check, ArrowUp, ArrowDown, Settings2 } from 'lucide-react';

interface ShadowLayer {
    id: string;
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
}

const BoxShadowGenerator: React.FC = () => {
    const [shadows, setShadows] = useState<ShadowLayer[]>([
        { id: '1', x: 0, y: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,0.1)', inset: false },
        { id: '2', x: 0, y: 4, blur: 6, spread: -2, color: 'rgba(0,0,0,0.05)', inset: false }
    ]);
    const [boxColor, setBoxColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#f8fafc');
    const [copied, setCopied] = useState(false);

    const addLayer = () => {
        const newLayer: ShadowLayer = {
            id: Date.now().toString(),
            x: 0,
            y: 4,
            blur: 10,
            spread: 0,
            color: 'rgba(0,0,0,0.2)',
            inset: false
        };
        setShadows([...shadows, newLayer]);
    };

    const removeLayer = (id: string) => {
        setShadows(shadows.filter(s => s.id !== id));
    };

    const updateLayer = (id: string, updates: Partial<ShadowLayer>) => {
        setShadows(shadows.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const moveLayer = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index > 0) {
            const newShadows = [...shadows];
            [newShadows[index], newShadows[index - 1]] = [newShadows[index - 1], newShadows[index]];
            setShadows(newShadows);
        } else if (direction === 'down' && index < shadows.length - 1) {
            const newShadows = [...shadows];
            [newShadows[index], newShadows[index + 1]] = [newShadows[index + 1], newShadows[index]];
            setShadows(newShadows);
        }
    };

    const getBoxShadowString = () => {
        return shadows.map(s =>
            `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`
        ).join(', ');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`box-shadow: ${getBoxShadowString()};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)] min-h-[600px]">

            {/* Controls Panel */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-xl overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
                    <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
                        <Settings2 size={20} />
                        <h3 className="font-bold">Layers</h3>
                    </div>
                    <button
                        onClick={addLayer}
                        className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors"
                        title="Add Layer"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {shadows.map((layer, index) => (
                        <div key={layer.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-4 group">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Layer {index + 1}</span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => moveLayer(index, 'up')} disabled={index === 0} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"><ArrowUp size={14} /></button>
                                    <button onClick={() => moveLayer(index, 'down')} disabled={index === shadows.length - 1} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"><ArrowDown size={14} /></button>
                                    <button onClick={() => removeLayer(layer.id)} className="p-1 text-rose-400 hover:text-rose-600"><Trash2 size={14} /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase">X Offset</label>
                                    <input
                                        type="range" min="-100" max="100"
                                        value={layer.x}
                                        onChange={(e) => updateLayer(layer.id, { x: Number(e.target.value) })}
                                        className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase">Y Offset</label>
                                    <input
                                        type="range" min="-100" max="100"
                                        value={layer.y}
                                        onChange={(e) => updateLayer(layer.id, { y: Number(e.target.value) })}
                                        className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase">Blur</label>
                                    <input
                                        type="range" min="0" max="100"
                                        value={layer.blur}
                                        onChange={(e) => updateLayer(layer.id, { blur: Number(e.target.value) })}
                                        className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase">Spread</label>
                                    <input
                                        type="range" min="-50" max="50"
                                        value={layer.spread}
                                        onChange={(e) => updateLayer(layer.id, { spread: Number(e.target.value) })}
                                        className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex-grow space-y-1">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase">Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={layer.color.startsWith('#') ? layer.color : '#000000'} // Fallback for rgba in color input
                                            onChange={(e) => updateLayer(layer.id, { color: e.target.value })}
                                            className="w-8 h-8 rounded border border-slate-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={layer.color}
                                            onChange={(e) => updateLayer(layer.id, { color: e.target.value })}
                                            className="flex-grow px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded font-mono"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end pb-1">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={layer.inset}
                                            onChange={(e) => updateLayer(layer.id, { inset: e.target.checked })}
                                            className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 bg-slate-200 border-transparent"
                                        />
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Inset</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Preview Box */}
                <div
                    className="flex-grow bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-12 relative overflow-hidden"
                    style={{ backgroundColor: bgColor }}
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)', backgroundSize: '24px 24px' }}
                    ></div>

                    <div
                        className="w-64 h-64 rounded-3xl transition-all duration-200 flex items-center justify-center"
                        style={{
                            backgroundColor: boxColor,
                            boxShadow: getBoxShadowString()
                        }}
                    >
                        <Layers size={48} className="text-slate-900/10 dark:text-white/10" />
                    </div>

                    <div className="absolute bottom-4 left-4 flex gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-2 rounded-xl border border-white/20">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
                            <span>Bg</span>
                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-none" />
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
                            <span>Sqr</span>
                            <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="w-6 h-6 rounded cursor-pointer border-none" />
                        </label>
                    </div>
                </div>

                {/* CSS Output */}
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 relative group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-violet-500/20 text-violet-400 rounded-lg">
                                <Check size={14} />
                            </div>
                            <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">CSS Output</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-violet-600/20"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy CSS'}
                        </button>
                    </div>
                    <code className="block font-mono text-sm text-violet-300 break-words leading-relaxed pl-4 border-l-2 border-violet-500/30">
                        box-shadow: {getBoxShadowString()};
                    </code>
                </div>
            </div>
        </div>
    );
};

export default BoxShadowGenerator;
