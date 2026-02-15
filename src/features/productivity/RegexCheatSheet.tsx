import React from 'react';
import { FileSearch, Play } from 'lucide-react';
import { useRegexCheatSheet } from './useRegexCheatSheet';

const RegexCheatSheet: React.FC = () => {
    const { testString, setTestString, pattern, setPattern, flags, setFlags, matches, error, testRegex, cheatSheet } = useRegexCheatSheet();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-xl"><FileSearch size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Regex Cheat Sheet</h3>
                    <p className="text-sm text-slate-500">Test regex patterns with reference guide</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                        <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Pattern" className="col-span-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border font-mono text-sm" />
                        <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="Flags" className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border font-mono text-sm" />
                    </div>
                    <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Test string..." className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border font-mono text-sm resize-none" />
                    <button onClick={testRegex} className="w-full px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center justify-center gap-2"><Play size={20} /> Test Regex</button>
                    {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg text-sm">{error}</div>}
                    {matches && <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"><div className="text-sm font-medium text-green-600 mb-2">Matches: {matches.length}</div><div className="space-y-1">{matches.map((m, i) => <div key={i} className="text-sm font-mono">{m}</div>)}</div></div>}
                </div>
                <div className="space-y-4 max-h-[500px] overflow-auto">
                    {Object.entries(cheatSheet).map(([category, items]) => (
                        <div key={category}>
                            <h4 className="font-medium mb-2">{category}</h4>
                            <div className="space-y-1">
                                {items.map((item, i) => (
                                    <div key={i} className="flex gap-2 text-sm p-2 bg-slate-50 dark:bg-slate-950 rounded">
                                        <code className="font-mono text-violet-600">{item.pattern}</code>
                                        <span className="text-slate-500">-</span>
                                        <span>{item.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegexCheatSheet;
