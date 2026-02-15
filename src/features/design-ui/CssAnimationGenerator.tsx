import React from 'react';
import { Wand2, Copy, Check, Play } from 'lucide-react';
import { useCssAnimationGenerator } from './useCssAnimationGenerator';

const CssAnimationGenerator: React.FC = () => {
    const {
        animation,
        keyframes,
        updateAnimation,
        addKeyframe,
        updateKeyframe,
        removeKeyframe,
        generateCSS
    } = useCssAnimationGenerator();

    const [copied, setCopied] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const output = generateCSS();

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const playAnimation = () => {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), parseFloat(animation.duration) * 1000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl">
                    <Wand2 size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">CSS Animation Generator</h3>
                    <p className="text-sm text-slate-500">Create custom CSS keyframe animations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Animation Name</label>
                            <input
                                type="text"
                                value={animation.name}
                                onChange={(e) => updateAnimation('name', e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Duration</label>
                            <input
                                type="text"
                                value={animation.duration}
                                onChange={(e) => updateAnimation('duration', e.target.value)}
                                placeholder="1s"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Timing Function</label>
                            <select
                                value={animation.timingFunction}
                                onChange={(e) => updateAnimation('timingFunction', e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            >
                                <option value="ease">Ease</option>
                                <option value="linear">Linear</option>
                                <option value="ease-in">Ease In</option>
                                <option value="ease-out">Ease Out</option>
                                <option value="ease-in-out">Ease In Out</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Iteration Count</label>
                            <input
                                type="text"
                                value={animation.iterationCount}
                                onChange={(e) => updateAnimation('iterationCount', e.target.value)}
                                placeholder="1 or infinite"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium">Preview</label>
                            <button
                                onClick={playAnimation}
                                className="px-3 py-1 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center gap-2 text-sm"
                            >
                                <Play size={14} />
                                Play
                            </button>
                        </div>
                        <div className="flex items-center justify-center h-32">
                            <div
                                className={`w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg ${isPlaying ? 'animated-element' : ''}`}
                                style={isPlaying ? {
                                    animation: `${animation.name} ${animation.duration} ${animation.timingFunction}`
                                } : {}}
                            />
                        </div>
                        <style>{output}</style>
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">CSS Output</label>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        <pre className="font-mono text-sm">
                            <code>{output}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CssAnimationGenerator;
