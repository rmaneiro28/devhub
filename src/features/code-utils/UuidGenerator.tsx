import React, { useState } from 'react';
import { Fingerprint, Copy, Check, RefreshCw, Sliders } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

const UuidGenerator: React.FC = () => {
    const [count, setCount] = useState(1);
    const [type, setType] = useState<'uuid' | 'nanoid'>('uuid');
    const [ids, setIds] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generate = () => {
        const newIds = [];
        for (let i = 0; i < count; i++) {
            if (type === 'uuid') {
                newIds.push(uuidv4());
            } else {
                newIds.push(nanoid());
            }
        }
        setIds(newIds);
    };

    // Initial generate
    React.useEffect(() => {
        generate();
    }, [count, type]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(ids.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                    <Fingerprint size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">ID Generator</h3>
                    <p className="text-sm text-slate-500">Generate UUIDs, NanoIDs, and more</p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-wrap gap-6 items-center">

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Type</label>
                    <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 inline-flex">
                        <button
                            onClick={() => setType('uuid')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${type === 'uuid'
                                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            UUID v4
                        </button>
                        <button
                            onClick={() => setType('nanoid')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${type === 'nanoid'
                                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300'
                                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            NanoID
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2 flex-grow max-w-xs">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold text-slate-400 uppercase">Quantity</label>
                        <span className="text-xs font-mono font-bold text-purple-600">{count}</span>
                    </div>
                    <input
                        type="range"
                        min="1" max="50"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>

                <button
                    onClick={generate}
                    className="ml-auto p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-500 text-slate-500 hover:text-purple-500 rounded-xl transition-all shadow-sm"
                    title="Regenerate"
                >
                    <RefreshCw size={20} />
                </button>
            </div>

            {/* Output */}
            <div className="flex-grow bg-slate-100 dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800 relative group overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>

                <div className="overflow-y-auto p-6 font-mono text-sm text-slate-700 dark:text-slate-300 custom-scrollbar flex-grow">
                    {ids.map((id, i) => (
                        <div key={i} className="py-1 border-b border-slate-200/50 dark:border-slate-800/50 last:border-0 flex items-center justify-between group/line">
                            <span>{id}</span>
                            <span className="text-xs text-slate-400 opacity-0 group-hover/line:opacity-100">{i + 1}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute top-4 right-4">
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-purple-600/20 transition-all opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied' : 'Copy All'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UuidGenerator;
