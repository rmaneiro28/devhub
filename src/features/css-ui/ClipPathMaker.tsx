import React, { useState, useRef, useEffect } from 'react';
import { Scissors, Copy, Check, Move } from 'lucide-react';

const ClipPathMaker: React.FC = () => {
    const [points, setPoints] = useState<{ x: number, y: number }[]>([
        { x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }
    ]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const handleMouseDown = (index: number) => {
        setDragIndex(index);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragIndex !== null && boxRef.current) {
            const rect = boxRef.current.getBoundingClientRect();
            const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
            const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

            const newPoints = [...points];
            newPoints[dragIndex] = { x: Math.round(x), y: Math.round(y) };
            setPoints(newPoints);
        }
    };

    const handleMouseUp = () => {
        setDragIndex(null);
    };

    const getClipPath = () => {
        const poly = points.map(p => `${p.x}% ${p.y}%`).join(', ');
        return `polygon(${poly})`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`clip-path: ${getClipPath()};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 rounded-xl">
                    <Scissors size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Clip Path Maker</h3>
                    <p className="text-sm text-slate-500">Create custom shapes for CSS clip-path</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 flex-grow">

                {/* Editor Area */}
                <div className="flex-grow bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-8 relative overflow-hidden select-none"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div
                        ref={boxRef}
                        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-indigo-500 to-fuchsia-500 relative shadow-2xl"
                        style={{ clipPath: getClipPath() }}
                    >
                        {/* Points are rendered outside the clipped element usually, 
                             BUT we need them draggable.
                             Problem: If we put them inside, they get clipped. 
                             Solution: We need a wrapper layer for handles that sits ON TOP of the clipped element, matching its size.
                         */}
                    </div>

                    {/* Handle Layer (Positioned absolutely over the box area) */}
                    <div
                        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] pointer-events-none"
                    >
                        {points.map((p, i) => (
                            <div
                                key={i}
                                className="absolute w-6 h-6 -ml-3 -mt-3 bg-white border-2 border-fuchsia-600 rounded-full shadow-lg cursor-move pointer-events-auto flex items-center justify-center hover:scale-125 transition-transform z-20"
                                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                onMouseDown={() => handleMouseDown(i)}
                            >
                                <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full"></div>
                            </div>
                        ))}
                        {/* Connecting lines SVG visualization could go here */}
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-4 block">Points</label>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {points.map((p, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-mono">
                                    <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">{i + 1}</span>
                                    <div className="flex gap-2 flex-grow">
                                        <div className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                                            <span className="text-slate-400">X</span>
                                            <input
                                                type="number" value={p.x}
                                                onChange={(e) => {
                                                    const newPoints = [...points];
                                                    newPoints[i].x = Number(e.target.value);
                                                    setPoints(newPoints);
                                                }}
                                                className="w-8 bg-transparent focus:outline-none"
                                            />
                                            <span className="text-slate-400">%</span>
                                        </div>
                                        <div className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                                            <span className="text-slate-400">Y</span>
                                            <input
                                                type="number" value={p.y}
                                                onChange={(e) => {
                                                    const newPoints = [...points];
                                                    newPoints[i].y = Number(e.target.value);
                                                    setPoints(newPoints);
                                                }}
                                                className="w-8 bg-transparent focus:outline-none"
                                            />
                                            <span className="text-slate-400">%</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setPoints(points.filter((_, idx) => idx !== i))}
                                        className="text-red-400 hover:text-red-500"
                                        disabled={points.length <= 3}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setPoints([...points, { x: 50, y: 50 }])}
                            className="mt-4 w-full py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors"
                        >
                            + Add Point
                        </button>
                    </div>

                    <div className="mt-auto bg-slate-900 rounded-xl p-4 border border-slate-800 relative group">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase">CSS Output</span>
                            <button onClick={copyToClipboard} className="text-fuchsia-400 hover:text-fuchsia-300 bg-fuchsia-500/10 p-1.5 rounded-lg hover:bg-fuchsia-500/20 transition-all">
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>
                        <code className="block font-mono text-xs text-fuchsia-300 break-all leading-relaxed">
                            clip-path: {getClipPath()};
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClipPathMaker;
