import React from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { useHtmlEncoder } from './useHtmlEncoder';

const HtmlEncoder: React.FC = () => {
    const { input, setInput, mode, setMode, output } = useHtmlEncoder();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
                    <Code2 size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">HTML Encoder/Decoder</h3>
                    <p className="text-sm text-slate-500">Encode and decode HTML entities</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setMode('encode')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'encode'
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    Encode
                </button>
                <button
                    onClick={() => setMode('decode')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'decode'
                            ? 'bg-orange-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    Decode
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Input</label>
                    <textarea
                        className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 custom-scrollbar"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter HTML entities to decode...'}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Output</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        )}
                    </div>
                    <textarea
                        readOnly
                        className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none custom-scrollbar"
                        value={output}
                    />
                </div>
            </div>
        </div>
    );
};

export default HtmlEncoder;
