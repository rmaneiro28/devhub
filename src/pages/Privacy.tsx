import React from 'react';
import { Shield, Lock, Database, Server } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Privacy: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-6">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t.privacy.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t.privacy.subtitle}
                    </p>
                </div>

                <div className="grid gap-6 mb-16">
                    {/* Key Highlights Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg w-fit mb-4">
                                <Server size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.privacy.highlights.clientSide.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {t.privacy.highlights.clientSide.desc}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg w-fit mb-4">
                                <Database size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.privacy.highlights.noStorage.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {t.privacy.highlights.noStorage.desc}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg w-fit mb-4">
                                <Lock size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{t.privacy.highlights.secure.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {t.privacy.highlights.secure.desc}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm prose prose-slate dark:prose-invert max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. {t.privacy.sections.info.title}</h2>
                        <p>{t.privacy.sections.info.content}</p>
                        <h4 className="font-bold text-slate-900 dark:text-white mt-4 mb-2">a. Automatically Collected Data</h4>
                        <p>
                            Like most websites, we may collect anonymous usage data (e.g., browser type, referring site, date/time of visit) to understand how our tools are used. We do not link this to personally identifiable information.
                        </p>
                        <h4 className="font-bold text-slate-900 dark:text-white mt-4 mb-2">b. User Input Data</h4>
                        <p>
                            Data you paste into our tools (e.g., JSON, SQL, Base64 strings) is processed locally within your browser's JavaScript engine whenever possible. For tools requiring server-side assistance (like the CORS proxy), data is transmitted securely, processed in memory, and immediately discarded.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. {t.privacy.sections.cookies.title}</h2>
                        <p>{t.privacy.sections.cookies.content}</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            {t.privacy.sections.cookies.items?.map((item, index) => (
                                <li key={index}><strong>{item.label}:</strong> {item.text}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. {t.privacy.sections.thirdParty.title}</h2>
                        <p>{t.privacy.sections.thirdParty.content}</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li><strong>Hosting:</strong> Changes to infrastructure providers.</li>
                            <li><strong>Analytics:</strong> Anonymous traffic analysis tools.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. {t.privacy.sections.contact.title}</h2>
                        <p>
                            {t.privacy.sections.contact.content} <a href="mailto:privacy@devhub.com" className="text-teal-600 hover:underline">privacy@devhub.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
