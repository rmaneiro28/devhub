import React from 'react';
import { Database, Copy, Check, Wand2, Minimize2 } from 'lucide-react';
import { useDaxFormatter } from './useDaxFormatter';

const DaxFormatter: React.FC = () => {
    const {
        input,
        setInput,
        output,
        indentSize,
        setIndentSize,
        uppercaseKeywords,
        setUppercaseKeywords,
        formatDax,
        minify,
        reset
    } = useDaxFormatter();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                    <Database size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">DAX Formatter</h3>
                    <p className="text-sm text-slate-500">Format and beautify Power BI DAX code</p>
                </div>
            </div>

            {/* Options */}
            <div className="flex items-center gap-6 mb-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Indent Size:</label>
                    <select
                        value={indentSize}
                        onChange={(e) => setIndentSize(Number(e.target.value))}
                        className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                    >
                        <option value={2}>2 spaces</option>
                        <option value={4}>4 spaces</option>
                        <option value={8}>8 spaces</option>
                    </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={uppercaseKeywords}
                        onChange={(e) => setUppercaseKeywords(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Uppercase Keywords</span>
                </label>
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={formatDax}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
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
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                        DAX Code Input
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your DAX code here...&#10;&#10;Example:&#10;Total Sales = CALCULATE(SUM(Sales[Amount]),FILTER(ALL(Date),Date[Year]=2024))"
                        className="w-full h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none custom-scrollbar"
                    />
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Formatted Output</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        )}
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        {output ? (
                            <pre className="font-mono text-sm">
                                <code>{output}</code>
                            </pre>
                        ) : (
                            <p className="text-slate-400 text-sm">Formatted DAX will appear here...</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-400">
                    <strong>💡 Tip:</strong> This formatter supports common DAX functions like CALCULATE, FILTER, SUMX, VAR/RETURN, and many more.
                    It will automatically indent nested functions and format your code for better readability.
                </p>
            </div>
        </div>
    );
};

export default DaxFormatter;
