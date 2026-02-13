import React, { useState } from 'react';
import { Box, Copy, Check, Settings2, Sparkles, FileCode, Code, FileJson } from 'lucide-react';

type Mode = 'simple' | 'fancy';
type Format = 'css' | 'jsx' | 'html';

const BorderRadius: React.FC = () => {
    const [mode, setMode] = useState<Mode>('simple');
    const [format, setFormat] = useState<Format>('css');
    const [copied, setCopied] = useState(false);

    // Simple Mode State
    const [tl, setTl] = useState(10);
    const [tr, setTr] = useState(10);
    const [br, setBr] = useState(10);
    const [bl, setBl] = useState(10);
    const [unit, setUnit] = useState<'px' | '%'>('px');

    // Fancy Mode State (8 values)
    const [topAxis, setTopAxis] = useState(50);
    const [rightAxis, setRightAxis] = useState(50);
    const [bottomAxis, setBottomAxis] = useState(50);
    const [leftAxis, setLeftAxis] = useState(50);


    const getSimpleRadius = () => `${tl}${unit} ${tr}${unit} ${br}${unit} ${bl}${unit}`; // top-left top-right bottom-right bottom-left

    const getFancyRadius = () => {
        // Standard Fancy generator logic (8 values)
        return `${topAxis}% ${100 - topAxis}% ${100 - bottomAxis}% ${bottomAxis}% / ${leftAxis}% ${rightAxis}% ${100 - rightAxis}% ${100 - leftAxis}%`;
    };

    const borderRadiusValue = mode === 'simple' ? getSimpleRadius() : getFancyRadius();

    const getCode = () => {
        switch (format) {
            case 'css':
                return `border-radius: ${borderRadiusValue};`;
            case 'jsx':
                return `style={{ borderRadius: '${borderRadiusValue}' }}`;
            case 'html':
                return `style="border-radius: ${borderRadiusValue};"`;
            default:
                return `border-radius: ${borderRadiusValue};`;
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header & Mode Switch */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    {/* Title handled by parent usually but we can add sub-header */}
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start md:self-auto">
                    <button
                        onClick={() => setMode('simple')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'simple'
                            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        <Settings2 size={16} />
                        Simple
                    </button>
                    <button
                        onClick={() => setMode('fancy')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'fancy'
                            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        <Sparkles size={16} />
                        Fancy
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Preview Area */}
                <div className="relative aspect-square w-full max-w-md mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-12">
                    {/* The Shape */}
                    <div
                        className={`w-full h-full bg-gradient-to-br from-teal-400 to-indigo-500 transition-all duration-300 shadow-2xl ${mode === 'fancy' ? 'animate-blob-pulse' : ''
                            }`}
                        style={{ borderRadius: borderRadiusValue }}
                    />

                    {/* Fancy Mode Handles overlay */}
                    {mode === 'fancy' && (
                        <>
                            {/* Top Slider */}
                            <input
                                type="range" min="0" max="100"
                                value={topAxis} onChange={(e) => setTopAxis(Number(e.target.value))}
                                className="absolute top-4 left-12 right-12 cursor-ew-resize accent-teal-500"
                            />
                            {/* Bottom Slider */}
                            <input
                                type="range" min="0" max="100"
                                value={bottomAxis} onChange={(e) => setBottomAxis(Number(e.target.value))}
                                className="absolute bottom-4 left-12 right-12 cursor-ew-resize accent-teal-500"
                            />
                            {/* Left Slider */}
                            <input
                                type="range" min="0" max="100"
                                value={leftAxis} onChange={(e) => setLeftAxis(Number(e.target.value))}
                                className="absolute left-4 top-12 bottom-12 h-auto cursor-ns-resize accent-teal-500"
                                style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                            />
                            {/* Right Slider */}
                            <input
                                type="range" min="0" max="100"
                                value={rightAxis} onChange={(e) => setRightAxis(Number(e.target.value))}
                                className="absolute right-4 top-12 bottom-12 h-auto cursor-ns-resize accent-teal-500"
                                style={{ writingMode: 'vertical-lr' }}
                            />
                        </>
                    )}
                </div>

                {/* Controls Area */}
                <div className="space-y-8">
                    {/* Format Selector */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        <button
                            onClick={() => setFormat('css')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${format === 'css' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 border-teal-200 dark:border-teal-800' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <FileCode size={14} /> CSS
                        </button>
                        <button
                            onClick={() => setFormat('jsx')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${format === 'jsx' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 border-teal-200 dark:border-teal-800' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <Code size={14} /> JSX / TSX
                        </button>
                        <button
                            onClick={() => setFormat('html')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${format === 'html' ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 border-teal-200 dark:border-teal-800' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <FileJson size={14} /> HTML
                        </button>
                    </div>

                    {/* CSS Output */}
                    <div className="bg-slate-900 rounded-xl p-6 relative group border border-slate-800 shadow-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-t-xl" />
                        <code className="text-slate-300 font-mono text-sm leading-relaxed break-all block">
                            {format === 'css' && (
                                <>
                                    <span className="text-purple-400">border-radius</span>: <span className="text-teal-300">{borderRadiusValue}</span>;
                                </>
                            )}
                            {format === 'jsx' && (
                                <>
                                    <span className="text-purple-400">style</span>=<span className="text-yellow-300">{`{{`}</span> <span className="text-blue-300">borderRadius</span>: <span className="text-green-300">'{borderRadiusValue}'</span> <span className="text-yellow-300">{`}}`}</span>
                                </>
                            )}
                            {format === 'html' && (
                                <>
                                    <span className="text-purple-400">style</span>=<span className="text-green-300">"border-radius: {borderRadiusValue};"</span>
                                </>
                            )}
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-4 top-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                    </div>

                    {/* Simple Controls */}
                    {mode === 'simple' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="flex justify-end">
                                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex">
                                    <button onClick={() => setUnit('px')} className={`px-3 py-1 text-xs font-bold rounded ${unit === 'px' ? 'bg-white dark:bg-slate-600 shadow' : 'text-slate-500'}`}>PX</button>
                                    <button onClick={() => setUnit('%')} className={`px-3 py-1 text-xs font-bold rounded ${unit === '%' ? 'bg-white dark:bg-slate-600 shadow' : 'text-slate-500'}`}>%</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Top Left</label>
                                    <input type="range" min="0" max={unit === 'px' ? 200 : 50} value={tl} onChange={(e) => setTl(Number(e.target.value))} className="w-full accent-teal-600 mb-2" />
                                    <input type="number" value={tl} onChange={(e) => setTl(Number(e.target.value))} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border-none rounded text-right font-mono text-sm" />
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Top Right</label>
                                    <input type="range" min="0" max={unit === 'px' ? 200 : 50} value={tr} onChange={(e) => setTr(Number(e.target.value))} className="w-full accent-teal-600 mb-2" />
                                    <input type="number" value={tr} onChange={(e) => setTr(Number(e.target.value))} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border-none rounded text-right font-mono text-sm" />
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bottom Left</label>
                                    <input type="range" min="0" max={unit === 'px' ? 200 : 50} value={bl} onChange={(e) => setBl(Number(e.target.value))} className="w-full accent-teal-600 mb-2" />
                                    <input type="number" value={bl} onChange={(e) => setBl(Number(e.target.value))} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border-none rounded text-right font-mono text-sm" />
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bottom Right</label>
                                    <input type="range" min="0" max={unit === 'px' ? 200 : 50} value={br} onChange={(e) => setBr(Number(e.target.value))} className="w-full accent-teal-600 mb-2" />
                                    <input type="number" value={br} onChange={(e) => setBr(Number(e.target.value))} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border-none rounded text-right font-mono text-sm" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Fancy Instructions */}
                    {mode === 'fancy' && (
                        <div className="bg-teal-50 dark:bg-teal-900/10 p-6 rounded-xl border border-teal-100 dark:border-teal-800/30">
                            <h4 className="font-bold text-teal-800 dark:text-teal-400 mb-2 flex items-center gap-2">
                                <Sparkles size={16} /> How it works
                            </h4>
                            <p className="text-sm text-teal-700 dark:text-teal-500 leading-relaxed">
                                Drag the handles around the shape to create organic, blob-like structures.
                                The top/bottom sliders control horizontal curvature, while left/right sliders control vertical curvature.
                                This uses standard 8-value CSS border-radius syntax.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BorderRadius;
