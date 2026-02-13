
import React from 'react';
import FeatureGrid from '../components/FeatureGrid';
import { useLanguage } from '../context/LanguageContext';

const Tools: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="pt-12 min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{t.grid.title}</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">{t.grid.subtitle}</p>
            </div>
            <FeatureGrid />
        </div>
    );
};

export default Tools;
