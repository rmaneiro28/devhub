
import React from 'react';
import { Fingerprint, Check, Copy, ShieldCheck } from 'lucide-react';
import { useHashGenerator } from './useHashGenerator';

const HashGenerator: React.FC = () => {
    const { input, setInput, hashes } = useHashGenerator();
    const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

    const handleCopy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <Fingerprint size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hash Generator</h3>
                    <p className="text-sm text-slate-500">Generate multiple hashes (MD5, SHA) instantly</p>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Input Text</label>
                    <textarea
                        className="w-full p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 custom-scrollbar h-32"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to hash..."
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {Object.entries(hashes).map(([algo, hash]) => (
                        <div key={algo} className="group relative">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-slate-400 uppercase">{algo.toUpperCase()}</label>
                                <span className={`text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 ${hash ? 'opacity-100' : 'opacity-0'}`}>
                                    {hash.length} chars
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    readOnly
                                    value={hash}
                                    className="w-full p-4 pr-12 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`${algo.toUpperCase()} hash will appear here...`}
                                />
                                {hash && (
                                    <button
                                        onClick={() => handleCopy(hash, algo)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                        title="Copy hash"
                                    >
                                        {copiedKey === algo ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
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

export default HashGenerator;
