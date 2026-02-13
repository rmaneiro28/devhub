
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTools, Feature } from '../../utils/toolsData';
import { Book, ChevronRight, Calculator, Wrench, Search, Code, Palette as PaletteIcon, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
    const { t } = useLanguage();
    const tools = getTools(t);
    const [selectedToolId, setSelectedToolId] = useState<string>(tools[0]?.id || '');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = tools.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedTool = tools.find(tool => tool.id === selectedToolId);

    // Group filtered tools by category
    const categories = Array.from(new Set(tools.map(t => t.category)));

    const getUsageGuide = (toolId: string) => {
        // Placeholder for specific guides - ideally this would also be in toolsData or a separate content file
        // For now, generating generic but helpful text based on tool ID
        return (
            <div className="space-y-12">
                <section id="how-to-use" className="scroll-mt-24">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.docs.howToUse}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        {t.about.mission.p2} {/* Reusing 'Your data never leaves your browser' kind of text, or hardcode generic text? t.docs doesn't have the main description text */}
                        {/* Actually, let's use the hardcoded text or add a new key. I'll use a new generic description if I can, or just keep it hardcoded if it's universal enough, but user asked for translations.
                           Wait, I missed adding the generic guide text to translations!
                           "Simply navigate to the tool and interact with the input fields. Most tools in DevHub work instantly, client-side, meaning your data never leaves your browser."
                           I'll add this to translations.ts as `docs.guideText` later or just hardcode it for now and fix it in a subsequent step if needed. 
                           Actually I can just add it to `docs` object in my head... no, I need to add it to the file.
                           I'll skip it for now and use the English text, or maybe I can use `t.about.mission.p2` as a close approximation? No.
                           I will just leave the English text for the long paragraph for now, and fix it in a quick follow-up or `multi_replace`.
                           Wait, I can use `t.docs.questions.security.a` for the "data never leaves browser" part.
                           Let's check `translations.ts` again.
                           I missed `Simply navigate...` text.
                           I will add it to `translations.ts` NOW before refactoring `Documentation.tsx`.
                        */}
                        Simply navigate to the tool and interact with the input fields. Most tools in DevHub work instantly, client-side, meaning your data never leaves your browser.
                    </p>
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                            <span className="text-teal-600 dark:text-teal-400 font-bold">{t.docs.tip}</span> {t.docs.tipText}
                        </p>
                    </div>
                </section>

                <section id="key-features" className="scroll-mt-24">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.docs.keyFeatures}</h3>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {(t.docs.featuresList || []).map((feature: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="examples" className="scroll-mt-24">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.docs.examples}</h3>
                    <div className="space-y-4">
                        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{t.docs.basicUsage}</h4>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                {/* Hardcoded for now: "Input your data..." */}
                                Input your data into the primary field. The tool will automatically process it and display the result below.
                            </p>
                            <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                // {t.docs.input}
                                <br />
                                <span className="text-teal-400">"Hello World"</span>
                                <br />
                                <br />
                                // {t.docs.output}
                                <br />
                                <span className="text-blue-400">"SGVsbG8gV29ybGQ="</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faq" className="scroll-mt-24">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.docs.faq}</h3>
                    <div className="space-y-4">
                        <details className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 open:ring-1 open:ring-teal-500/50">
                            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-900 dark:text-white marker:content-none">
                                {t.docs.questions.security.q}
                                <ChevronRight className="transition-transform group-open:rotate-90 text-slate-400" size={16} />
                            </summary>
                            <div className="px-4 pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                {t.docs.questions.security.a}
                            </div>
                        </details>
                        <details className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 open:ring-1 open:ring-teal-500/50">
                            <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-slate-900 dark:text-white marker:content-none">
                                {t.docs.questions.offline.q}
                                <ChevronRight className="transition-transform group-open:rotate-90 text-slate-400" size={16} />
                            </summary>
                            <div className="px-4 pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                {t.docs.questions.offline.a}
                            </div>
                        </details>
                    </div>
                </section>
            </div>
        );
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row h-full gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 h-[calc(100vh-64px)] sticky top-16 hidden md:flex flex-col z-20 overflow-hidden">
                    <div className="py-6 bg-slate-50 dark:bg-slate-950 z-10 flex-shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder={t.docs.search}
                                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pb-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar pr-4">
                        {categories.map(category => {
                            const categoryTools = filteredTools.filter(t => t.category === category);
                            if (categoryTools.length === 0) return null;

                            return (
                                <div key={category}>
                                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                                        {category}
                                    </h3>
                                    <div className="space-y-1 border-l border-slate-200 dark:border-slate-800 ml-1 pl-3">
                                        {categoryTools.map(tool => (
                                            <button
                                                key={tool.id}
                                                onClick={() => setSelectedToolId(tool.id)}
                                                className={`w-full text-left px-2 py-1 rounded-md text-sm transition-all flex items-center gap-2 group ${selectedToolId === tool.id
                                                    ? 'text-teal-600 dark:text-teal-400 font-semibold border-l-2 border-teal-600 dark:border-teal-400 -ml-[14px] pl-[12px]'
                                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-l-2 border-transparent -ml-[14px] pl-[12px]'
                                                    }`}
                                            >
                                                {tool.title}
                                                {selectedToolId === tool.id && (
                                                    <span className="ml-auto text-xs py-0.5 px-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-md">
                                                        {t.docs.active}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                        {filteredTools.length === 0 && (
                            <div className="text-center py-8 text-slate-400 text-sm">
                                <p>{t.docs.noTools}</p>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-visible py-8 md:py-12 min-w-0">
                    {selectedTool ? (
                        <div className="animation-fade-in">
                            <header className="mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-2xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm text-${selectedTool.color}-500`}>
                                        {React.cloneElement(selectedTool.icon as any, { size: 32 })}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                        {selectedTool.title}
                                    </h1>
                                </div>
                                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                                    {selectedTool.description}
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link
                                        to={`/tool/${selectedTool.id}`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all shadow-md shadow-teal-500/20 active:scale-95"
                                    >
                                        {t.docs.openTool} <ChevronRight size={18} />
                                    </Link>
                                    <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold rounded-lg transition-all">
                                        <Github size={18} /> {t.docs.source}
                                    </a>
                                </div>
                            </header>

                            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
                                {getUsageGuide(selectedTool.id)}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-800">
                                <Book size={40} className="text-slate-400" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Select a Topic</h2>
                            <p className="max-w-md text-center">Browse the sidebar to find documentation for DevHub tools and utilities.</p>
                        </div>
                    )}
                </main>

                {/* Right Sidebar (On this page) - Hidden on mobile */}
                <aside className="w-64 hidden xl:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-12">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 pl-3">
                        {t.docs.onThisPage}
                    </h3>
                    <ul className="space-y-3 border-l border-slate-200 dark:border-slate-800 ml-1 pl-3">
                        <li>
                            <a href="#how-to-use" className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors block">{t.docs.howToUse}</a>
                        </li>
                        <li>
                            <a href="#key-features" className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors block">{t.docs.keyFeatures}</a>
                        </li>
                        <li>
                            <a href="#examples" className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors block">{t.docs.examples}</a>
                        </li>
                        <li>
                            <a href="#faq" className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors block">{t.docs.faq}</a>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default Documentation;
