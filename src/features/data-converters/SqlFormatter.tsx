import React from 'react';
import { Database, Wand2, Minimize2, Copy, Check } from 'lucide-react';
import { useSqlFormatter } from './useSqlFormatter';

const SqlFormatter: React.FC = () => {
    const { input, setInput, output, error, formatSql, minify } = useSqlFormatter();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-xl">
                    <Database size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">SQL Formatter</h3>
                    <p className="text-sm text-slate-500">Format and minify SQL queries</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={formatSql}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center gap-2"
                >
                    <Wand2 size={16} />
                    Format
                </button>
                <button
                    onClick={minify}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2"
                >
                    <Minimize2 size={16} />
                    Minify
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Input SQL</label>
                    <textarea
                        className="w-full h-96 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 custom-scrollbar"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="SELECT * FROM users WHERE id = 1"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Formatted SQL</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        )}
                    </div>
                    <textarea
                        readOnly
                        className="w-full h-96 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none custom-scrollbar"
                        value={output}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default SqlFormatter;
