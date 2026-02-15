import React from 'react';
import { Activity, CheckCircle, Smartphone, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Status: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-6">
                        <Activity size={40} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t.status.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        {t.status.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{t.status.webApp}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t.status.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-sm">
                            <CheckCircle size={14} /> {t.status.operational}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                                <Smartphone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{t.status.pwa}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t.status.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-sm">
                            <CheckCircle size={14} /> {t.status.operational}
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                        {t.status.lastUpdated}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Status;
