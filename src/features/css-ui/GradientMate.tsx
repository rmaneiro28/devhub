import React, { useState } from 'react';
import { Copy, Check, RotateCw, Plus, Trash2, Wand2 } from 'lucide-react';

interface Stop {
    id: string;
    color: string;
    position: number;
}

const GradientMate: React.FC = () => {
    const [stops, setStops] = useState<Stop[]>([
        { id: '1', color: '#14b8a6', position: 0 },
        { id: '2', color: '#6366f1', position: 100 }
    ]);
    const [type, setType] = useState<'linear' | 'radial'>('linear');
    const [angle, setAngle] = useState(135);
    const [copied, setCopied] = useState(false);

    const generateGradient = () => {
        const sortedStops = [...stops].sort((a, b) => a.position - b.position);
        const stopsString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
        return type === 'linear'
            ? `linear-gradient(${angle}deg, ${stopsString})`
            : `radial-gradient(circle, ${stopsString})`;
    };

    const gradientString = generateGradient();

    const addStop = () => {
        const newStop: Stop = {
            id: Math.random().toString(36).substr(2, 9),
            color: '#ffffff',
            position: 50
        };
        setStops([...stops, newStop]);
    };

    const removeStop = (id: string) => {
        if (stops.length > 2) {
            setStops(stops.filter(s => s.id !== id));
        }
    };

    const updateStop = (id: string, updates: Partial<Stop>) => {
        setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`background: ${gradientString};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl">
                    <Wand2 size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gradient Mate</h2>
                    <p className="text-sm text-slate-500">Design beautiful gradients visually</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                {/* Preview Area */}
                <div className="space-y-4">
                    <div
                        className="w-full aspect-square md:aspect-video lg:aspect-square rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300"
                        style={{ background: gradientString }}
                    />

                    {/* CSS Output */}
                    <div className="bg-slate-900 rounded-xl p-4 relative group border border-slate-800 shadow-md">
                        <code className="text-slate-300 font-mono text-xs leading-relaxed break-all block">
                            <span className="text-purple-400">background</span>: <span className="text-teal-300">{gradientString}</span>;
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-2 top-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">

                    {/* Type & Angle */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Type</label>
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                <button
                                    onClick={() => setType('linear')}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded ${type === 'linear' ? 'bg-white dark:bg-slate-700 shadow text-teal-600' : 'text-slate-500'}`}
                                >
                                    Linear
                                </button>
                                <button
                                    onClick={() => setType('radial')}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded ${type === 'radial' ? 'bg-white dark:bg-slate-700 shadow text-teal-600' : 'text-slate-500'}`}
                                >
                                    Radial
                                </button>
                            </div>
                        </div>

                        {type === 'linear' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex justify-between">
                                    Angle <span>{angle}°</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range" min="0" max="360"
                                        value={angle} onChange={(e) => setAngle(Number(e.target.value))}
                                        className="w-full accent-teal-600"
                                    />
                                    <button onClick={() => setAngle((a) => (a + 45) % 360)} className="text-slate-400 hover:text-teal-600">
                                        <RotateCw size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Color Stops */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-xs font-bold text-slate-500 uppercase">Colors</label>
                            <button
                                onClick={addStop}
                                className="text-xs flex items-center gap-1 text-teal-600 hover:text-teal-700 font-bold"
                            >
                                <Plus size={14} /> Add Color
                            </button>
                        </div>

                        <div className="space-y-4">
                            {stops.map((stop, index) => (
                                <div key={stop.id} className="flex items-center gap-3 animate-fade-in group">
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={stop.color}
                                            onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                                            className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer border-0 p-0"
                                        />
                                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 pointer-events-none" />
                                    </div>

                                    <div className="flex-grow">
                                        <input
                                            type="range" min="0" max="100"
                                            value={stop.position}
                                            onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                                            className="w-full accent-teal-600"
                                        />
                                    </div>

                                    <span className="text-xs font-mono w-8 text-right text-slate-500">{stop.position}%</span>

                                    <button
                                        onClick={() => removeStop(stop.id)}
                                        disabled={stops.length <= 2}
                                        className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GradientMate;
