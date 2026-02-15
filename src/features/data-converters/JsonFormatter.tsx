
import React from 'react';
import { FileCode, Check, Copy, AlertCircle, Play, Minimize2, CheckCircle2 } from 'lucide-react';
import { useJsonFormatter } from './useJsonFormatter';

const JsonFormatter: React.FC = () => {
    const {
        input,
        setInput,
        error,
        format,
        minify,
        validate,
        copied,
        copyToClipboard
    } = useJsonFormatter();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                        <FileCode size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">JSON Formatter & Validator</h3>
                        <p className="text-sm text-slate-500">Format, minify, and validate JSON data</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={format}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                        title="Format JSON"
                    >
                        <Play size={16} /> Format
                    </button>
                    <button
                        onClick={minify}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                        title="Minify JSON"
                    >
                        <Minimize2 size={16} /> Minify
                    </button>
                    <button
                        onClick={validate}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                        title="Validate JSON only"
                    >
                        <CheckCircle2 size={16} /> Validate
                    </button>
                </div>
            </div>

            <div className="flex flex-col flex-grow relative group">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                        onClick={copyToClipboard}
                        className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors backdrop-blur-sm border border-slate-700"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                </div>

                <textarea
                    className={`flex-grow p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 custom-scrollbar transition-all ${error ? 'border-red-300 dark:border-red-900 focus:ring-red-500' : 'border-slate-200 dark:border-slate-800'}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste your JSON here..."
                    spellCheck={false}
                />

                {error && (
                    <div className="absolute bottom-4 left-4 right-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-2 text-sm font-medium animate-in slide-in-from-bottom-2 duration-200">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JsonFormatter;
