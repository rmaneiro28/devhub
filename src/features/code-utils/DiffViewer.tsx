import React, { useState, useMemo } from 'react';
import { diffLines, Change } from 'diff';
import { GitCompare, Copy, Check, ArrowRight } from 'lucide-react';

const DiffViewer: React.FC = () => {
    const [oldText, setOldText] = useState('function greeting() {\n  return "Hello World";\n}');
    const [newText, setNewText] = useState('function greeting() {\n  return "Hello DevHub";\n}');
    const [copied, setCopied] = useState(false);

    const changes = useMemo(() => {
        return diffLines(oldText, newText);
    }, [oldText, newText]);

    // Copy merged text logic? Or just diff... let's just copy diff representation?
    // Let's copy newText for now as "result"
    const copyToClipboard = () => {
        navigator.clipboard.writeText(newText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
            <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
                    <GitCompare size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Diff Viewer</h3>
                    <p className="text-sm text-slate-500">Compare text or code changes line by line</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow overflow-hidden">
                {/* Inputs */}
                <div className="flex flex-col gap-4 overflow-hidden">
                    {/* Original */}
                    <div className="flex-1 flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2">Original Text</label>
                        <textarea
                            className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 custom-scrollbar"
                            value={oldText}
                            onChange={(e) => setOldText(e.target.value)}
                            placeholder="Paste original text..."
                        />
                    </div>
                    {/* Modified */}
                    <div className="flex-1 flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2">Modified Text</label>
                        <textarea
                            className="flex-grow p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 custom-scrollbar"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            placeholder="Paste modified text..."
                        />
                    </div>
                </div>

                {/* Output Diff */}
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Difference</label>
                    </div>
                    <div className="flex-grow bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar p-4 font-mono text-xs">
                        {changes.map((part, index) => {
                            let color = 'text-slate-500 dark:text-slate-400';
                            let bg = '';
                            let prefix = '  ';

                            if (part.added) {
                                color = 'text-green-600 dark:text-green-400';
                                bg = 'bg-green-50 dark:bg-green-900/20';
                                prefix = '+ ';
                            } else if (part.removed) {
                                color = 'text-red-600 dark:text-red-400';
                                bg = 'bg-red-50 dark:bg-red-900/20';
                                prefix = '- ';
                            }

                            return (
                                <div key={index} className={`${bg} ${color} w-full whitespace-pre-wrap px-2 py-0.5 border-l-2 ${part.added ? 'border-green-500' : part.removed ? 'border-red-500' : 'border-transparent'}`}>
                                    {part.value.replace(/\n$/, '')}
                                    {/* .replace to avoid double newline visualization issues if strict line mapping isn't active */}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;
