import React from 'react';
import { Type, Copy, Check } from 'lucide-react';
import { useTypographyScale } from './useTypographyScale';

const TypographyScale: React.FC = () => {
    const {
        baseSize,
        setBaseSize,
        ratio,
        setRatio,
        unit,
        setUnit,
        scale,
        generateCSS,
        generateTailwind,
        ratios
    } = useTypographyScale();

    const [copied, setCopied] = React.useState(false);
    const [outputFormat, setOutputFormat] = React.useState<'css' | 'tailwind'>('css');

    const handleCopy = () => {
        const output = outputFormat === 'css' ? generateCSS() : generateTailwind();
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                    <Type size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Typography Scale Generator</h3>
                    <p className="text-sm text-slate-500">Create harmonious type scales for your design system</p>
                </div>
            </div>

            {/* Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Base Size (px)</label>
                    <input
                        type="number"
                        value={baseSize}
                        onChange={(e) => setBaseSize(Number(e.target.value))}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                        min="12"
                        max="24"
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Scale Ratio</label>
                    <select
                        value={ratio}
                        onChange={(e) => setRatio(e.target.value as any)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                    >
                        {ratios.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Unit</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setUnit('px')}
                            className={`flex-1 p-3 rounded-lg border ${unit === 'px'
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            px
                        </button>
                        <button
                            onClick={() => setUnit('rem')}
                            className={`flex-1 p-3 rounded-lg border ${unit === 'rem'
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            rem
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Preview */}
                <div>
                    <h4 className="font-medium mb-4">Preview</h4>
                    <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                        {scale.map(({ step, size, unit: u }) => (
                            <div key={step} className="flex items-baseline gap-4">
                                <span className="text-xs font-mono text-slate-400 w-12">{step}</span>
                                <span
                                    style={{ fontSize: `${size}${u}` }}
                                    className="font-medium"
                                >
                                    The quick brown fox
                                </span>
                                <span className="text-xs text-slate-400 ml-auto">{size}{u}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Output */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Code</h4>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setOutputFormat('css')}
                                className={`px-3 py-1 rounded text-sm ${outputFormat === 'css'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-200 dark:bg-slate-800'
                                    }`}
                            >
                                CSS
                            </button>
                            <button
                                onClick={() => setOutputFormat('tailwind')}
                                className={`px-3 py-1 rounded text-sm ${outputFormat === 'tailwind'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-200 dark:bg-slate-800'
                                    }`}
                            >
                                Tailwind
                            </button>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 h-[500px] overflow-auto custom-scrollbar">
                        <pre className="font-mono text-sm">
                            <code>
                                {outputFormat === 'css' ? `:root {\n${generateCSS()}\n}` : generateTailwind()}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypographyScale;
