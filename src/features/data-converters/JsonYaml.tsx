import React from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { useJsonYaml } from './useJsonYaml';

const JsonYaml: React.FC = () => {
    const { input, setInput, output, mode, setMode, error } = useJsonYaml();
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-xl">
                    <Code size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">JSON ↔ YAML</h3>
                    <p className="text-sm text-slate-500">Convert between JSON and YAML</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setMode('json-to-yaml')}
                    className={`px-4 py-2 rounded-lg font-medium ${mode === 'json-to-yaml' ? 'bg-yellow-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                >
                    JSON → YAML
                </button>
                <button
                    onClick={() => setMode('yaml-to-json')}
                    className={`px-4 py-2 rounded-lg font-medium ${mode === 'yaml-to-json' ? 'bg-yellow-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                >
                    YAML → JSON
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                        {mode === 'json-to-yaml' ? 'JSON Input' : 'YAML Input'}
                    </label>
                    <textarea
                        className="w-full h-96 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 custom-scrollbar"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'json-to-yaml' ? '{"key": "value"}' : 'key: value'}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">
                            {mode === 'json-to-yaml' ? 'YAML Output' : 'JSON Output'}
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

export default JsonYaml;
