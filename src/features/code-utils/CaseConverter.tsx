
import React from 'react';
import { Type, Check, Copy } from 'lucide-react';
import { useCaseConverter } from './useCaseConverter';

const CaseConverter: React.FC = () => {
    const { input, setInput, outputs } = useCaseConverter();
    const [copied, setCopied] = React.useState<string | null>(null);

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl">
                    <Type size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Case Converter</h3>
                    <p className="text-sm text-slate-500">Transform text between cases (camel, snake, etc.)</p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Input Text</label>
                    <textarea
                        className="w-full p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 custom-scrollbar h-32"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to convert..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(outputs).map(([type, value]) => (
                        <div key={type} className="group relative">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">{type.replace(/([A-Z])/g, ' $1').trim()}</label>
                            </div>
                            <div className="relative">
                                <input
                                    readOnly
                                    value={value}
                                    className="w-full p-4 pr-12 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="..."
                                />
                                {value && (
                                    <button
                                        onClick={() => handleCopy(value, type)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-400 hover:text-pink-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                        title="Copy"
                                    >
                                        {copied === type ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseConverter;
