import React from 'react';
import { Table, Copy, Check } from 'lucide-react';
import { useCsvJson } from './useCsvJson';

const CsvJson: React.FC = () => {
    const { input, setInput, output, mode, setMode, error } = useCsvJson();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-lime-100 dark:bg-lime-900/30 text-lime-600 rounded-xl">
                    <Table size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">CSV ↔ JSON</h3>
                    <p className="text-sm text-slate-500">Convert between CSV and JSON</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setMode('csv-to-json')}
                    className={`px-4 py-2 rounded-lg font-medium ${mode === 'csv-to-json' ? 'bg-lime-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                >
                    CSV → JSON
                </button>
                <button
                    onClick={() => setMode('json-to-csv')}
                    className={`px-4 py-2 rounded-lg font-medium ${mode === 'json-to-csv' ? 'bg-lime-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                >
                    JSON → CSV
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                        {mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
                    </label>
                    <textarea
                        className="w-full h-96 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-lime-500 custom-scrollbar"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'csv-to-json' ? 'name,age\nJohn,30\nJane,25' : '[{"name":"John","age":30}]'}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">
                            {mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
                        </label>
                        {output && (
                            <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
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

export default CsvJson;
