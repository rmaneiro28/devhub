import React from 'react';
import { Terminal, Heart, Globe, Users, Coffee, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center justify-center p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl mb-6">
                        <Terminal size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        {t.about.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">{t.about.subtitle}</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {t.about.description}
                    </p>
                </div>

                {/* Mission Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none mb-12 border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t.about.mission.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {t.about.mission.p1}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {t.about.mission.p2}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl text-center">
                                <Users className="w-8 h-8 text-teal-500 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{t.about.stats.free}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl text-center">
                                <Globe className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">Client</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{t.about.stats.clientSide}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl text-center">
                                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">25+</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{t.about.stats.tools}</div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl text-center">
                                <Coffee className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">∞</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{t.about.stats.coffees}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Developer Section */}
                <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <p className="text-slate-500 dark:text-slate-500 mb-6">
                        {t.about.developer.created} <span className="font-bold text-slate-900 dark:text-white">Rúbel Maneiro</span>
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="https://github.com/rmaneiro28/devhub"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl transition-transform hover:-translate-y-1"
                        >
                            <Github size={20} />
                            {t.about.developer.star}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
