import React from 'react';
import { Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
                        <Scale size={32} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t.terms.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t.terms.subtitle}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Table of Contents - Sticky Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0 sticky top-24">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t.terms.contents}</h3>
                            <nav className="space-y-2 text-sm">
                                <a href="#acceptance" className="block text-teal-600 dark:text-teal-400 font-medium">1. {t.terms.sections.acceptance.title}</a>
                                <a href="#use-license" className="block text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">2. {t.terms.sections.license.title}</a>
                                <a href="#disclaimer" className="block text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">3. {t.terms.sections.disclaimer.title}</a>
                                <a href="#limitations" className="block text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">4. {t.terms.sections.limitations.title}</a>
                                <a href="#privacy" className="block text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">5. {t.terms.sections.privacy.title}</a>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm prose prose-slate dark:prose-invert max-w-none">
                        <section id="acceptance" className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="text-teal-500">1.</span> {t.terms.sections.acceptance.title}
                            </h2>
                            <p>{t.terms.sections.acceptance.content}</p>
                        </section>

                        <section id="use-license" className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="text-teal-500">2.</span> {t.terms.sections.license.title}
                            </h2>
                            <p className="mb-4">{t.terms.sections.license.content}</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-teal-500">
                                {t.terms.sections.license.items?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section id="disclaimer" className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="text-teal-500">3.</span> {t.terms.sections.disclaimer.title}
                            </h2>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-sm">
                                <p className="mb-0">{t.terms.sections.disclaimer.content}</p>
                            </div>
                        </section>

                        <section id="limitations" className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="text-teal-500">4.</span> {t.terms.sections.limitations.title}
                            </h2>
                            <p>{t.terms.sections.limitations.content}</p>
                        </section>

                        <section id="privacy">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="text-teal-500">5.</span> {t.terms.sections.privacy.title}
                            </h2>
                            <p>
                                {t.terms.sections.privacy.content}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
