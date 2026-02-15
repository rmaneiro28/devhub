import React from 'react';
import { Wand2, Plus, Trash2, Download, Copy, Check } from 'lucide-react';
import { useApiMockGenerator } from './useApiMockGenerator';

const ApiMockGenerator: React.FC = () => {
    const {
        fields,
        count,
        setCount,
        output,
        addField,
        updateField,
        removeField,
        generate,
        downloadJson
    } = useApiMockGenerator();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const fieldTypes = ['string', 'number', 'boolean', 'email', 'uuid', 'date', 'name', 'phone'] as const;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-xl">
                    <Wand2 size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">API Mock Generator</h3>
                    <p className="text-sm text-slate-500">Generate realistic mock data for API testing</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Schema Builder */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">Define Schema</h4>
                        <button
                            onClick={addField}
                            className="px-3 py-1 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center gap-2 text-sm"
                        >
                            <Plus size={16} />
                            Add Field
                        </button>
                    </div>

                    <div className="space-y-2 max-h-[400px] overflow-auto custom-scrollbar">
                        {fields.map((field, index) => (
                            <div key={index} className="flex gap-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                                <input
                                    type="text"
                                    value={field.name}
                                    onChange={(e) => updateField(index, { name: e.target.value })}
                                    className="flex-1 p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    placeholder="Field name"
                                />
                                <select
                                    value={field.type}
                                    onChange={(e) => updateField(index, { type: e.target.value as any })}
                                    className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                >
                                    {fieldTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => removeField(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Number of Records</label>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            min="1"
                            max="1000"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                        />
                    </div>

                    <button
                        onClick={generate}
                        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 font-medium"
                    >
                        Generate Mock Data
                    </button>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Generated JSON</label>
                        {output && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                                >
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                                <button
                                    onClick={downloadJson}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                                >
                                    <Download size={16} />
                                    <span className="text-sm">Download</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        {output ? (
                            <pre className="font-mono text-sm">
                                <code>{output}</code>
                            </pre>
                        ) : (
                            <p className="text-slate-400 text-sm">Configure schema and generate mock data...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiMockGenerator;
