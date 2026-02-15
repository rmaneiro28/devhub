// Simplified UI components - creating minimal but functional versions
import React from 'react';
import { BookOpen, Download, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { useChangelogGenerator } from './useChangelogGenerator';

const ChangelogGenerator: React.FC = () => {
    const { projectName, setProjectName, entries, addEntry, updateEntry, removeEntry, generate, downloadFile } = useChangelogGenerator();
    const [copied, setCopied] = React.useState(false);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl"><BookOpen size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Changelog Generator</h3>
                    <p className="text-sm text-slate-500">Generate changelogs following Keep a Changelog format</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm" />
                    <button onClick={addEntry} className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"><Plus size={16} /> Add Entry</button>
                    <div className="space-y-2 max-h-[400px] overflow-auto">
                        {entries.map((e, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg space-y-2">
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="text" value={e.version} onChange={(ev) => updateEntry(i, 'version', ev.target.value)} placeholder="1.0.0" className="p-2 bg-white dark:bg-slate-900 rounded border text-sm" />
                                    <input type="date" value={e.date} onChange={(ev) => updateEntry(i, 'date', ev.target.value)} className="p-2 bg-white dark:bg-slate-900 rounded border text-sm" />
                                    <select value={e.type} onChange={(ev) => updateEntry(i, 'type', ev.target.value as any)} className="p-2 bg-white dark:bg-slate-900 rounded border text-sm">
                                        <option value="added">Added</option>
                                        <option value="changed">Changed</option>
                                        <option value="fixed">Fixed</option>
                                        <option value="removed">Removed</option>
                                    </select>
                                </div>
                                <textarea value={e.description} onChange={(ev) => updateEntry(i, 'description', ev.target.value)} placeholder="Description" className="w-full p-2 bg-white dark:bg-slate-900 rounded border text-sm" rows={2} />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">CHANGELOG.md</label>
                        <div className="flex gap-2">
                            <button onClick={() => { navigator.clipboard.writeText(generate()); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><Copy size={16} /></button>
                            <button onClick={downloadFile} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><Download size={16} /></button>
                        </div>
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border overflow-auto"><pre className="font-mono text-sm">{generate()}</pre></div>
                </div>
            </div>
        </div>
    );
};

export default ChangelogGenerator;
