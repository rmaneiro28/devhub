import React from 'react';
import { Code2, Search, Save, Edit, Trash2 } from 'lucide-react';
import { useCodeSnippetManager } from './useCodeSnippetManager';

const CodeSnippetManager: React.FC = () => {
    const { snippets, currentSnippet, setCurrentSnippet, searchTerm, setSearchTerm, saveSnippet, deleteSnippet, editSnippet } = useCodeSnippetManager();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl"><Code2 size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Code Snippet Manager</h3>
                    <p className="text-sm text-slate-500">Save and organize code snippets</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <input type="text" value={currentSnippet.title} onChange={(e) => setCurrentSnippet({ ...currentSnippet, title: e.target.value })} placeholder="Snippet title" className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    <select value={currentSnippet.language} onChange={(e) => setCurrentSnippet({ ...currentSnippet, language: e.target.value })} className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm">
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="css">CSS</option>
                        <option value="html">HTML</option>
                    </select>
                    <textarea value={currentSnippet.code} onChange={(e) => setCurrentSnippet({ ...currentSnippet, code: e.target.value })} placeholder="Code..." className="w-full h-64 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border font-mono text-sm resize-none" />
                    <button onClick={saveSnippet} className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2"><Save size={20} /> Save Snippet</button>
                </div>
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search snippets..." className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm" />
                    </div>
                    <div className="space-y-2 max-h-[500px] overflow-auto">
                        {snippets.map(s => (
                            <div key={s.id} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border hover:border-orange-500 cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1" onClick={() => editSnippet(s)}>
                                        <h4 className="font-medium">{s.title}</h4>
                                        <p className="text-xs text-slate-500">{s.language}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => editSnippet(s)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded"><Edit size={14} /></button>
                                        <button onClick={() => deleteSnippet(s.id)} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 rounded"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeSnippetManager;
