import React from 'react';
import { FileCode, Download, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { useEnvManager } from './useEnvManager';

const EnvManager: React.FC = () => {
    const { variables, format, setFormat, addVariable, updateVariable, removeVariable, generate, downloadFile } = useEnvManager();
    const [copied, setCopied] = React.useState(false);
    const output = generate();

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <FileCode size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Environment Variables Manager</h3>
                    <p className="text-sm text-slate-500">Manage and export environment variables</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Variables</h4>
                        <button onClick={addVariable} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    <div className="space-y-2 max-h-[500px] overflow-auto custom-scrollbar">
                        {variables.map((v, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={v.key}
                                        onChange={(e) => updateVariable(i, 'key', e.target.value)}
                                        placeholder="KEY"
                                        className="flex-1 p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm font-mono"
                                    />
                                    {variables.length > 1 && (
                                        <button onClick={() => removeVariable(i)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={v.value}
                                    onChange={(e) => updateVariable(i, 'value', e.target.value)}
                                    placeholder="value"
                                    className="w-full p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm font-mono"
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Export Format</label>
                        <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm">
                            <option value=".env">.env</option>
                            <option value="json">JSON</option>
                            <option value="yaml">YAML</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">{format === '.env' ? '.env' : format === 'json' ? 'env.json' : 'env.yaml'}</label>
                        <div className="flex gap-2">
                            <button onClick={handleCopy} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2">
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                            <button onClick={downloadFile} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2">
                                <Download size={16} />
                                <span className="text-sm">Download</span>
                            </button>
                        </div>
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        <pre className="font-mono text-sm">{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnvManager;
