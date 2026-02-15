
import React from 'react';
import FeatureGrid from '../components/FeatureGrid';
import { useLanguage } from '../context/LanguageContext';
import { Search, X } from 'lucide-react';
import { useToolSearch } from '../hooks/useToolSearch';
import { getTools } from '../utils/toolsData';

const Tools: React.FC = () => {
    const { t } = useLanguage();
    const tools = getTools(t);
    const { searchQuery, setSearchQuery, filteredTools, clearSearch, hasResults, resultCount } = useToolSearch(tools);

    const searchComponent = (
        <div className="relative w-full max-w-2xl mx-auto px-4">
            <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools by name, description, or category..."
                className="w-full pl-14 pr-14 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/50 transition-all text-lg"
            />
            {searchQuery && (
                <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-10 flex items-center text-slate-400 hover:text-red-500 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            )}
            {searchQuery && (
                <div className="absolute -bottom-8 left-8">
                    <p className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {hasResults ? `${resultCount} ${resultCount === 1 ? 'resultado' : 'resultados'}` : 'Sin resultados'}
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                        {t.grid.title}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                        {t.grid.subtitle}
                    </p>
                </div>
            </div>

            {hasResults ? (
                <FeatureGrid
                    tools={filteredTools}
                    showHeader={false}
                    searchBar={searchComponent}
                />
            ) : searchQuery ? (
                <div className="text-center py-20 px-4">
                    <div className="max-w-7xl mx-auto mb-16">
                        {searchComponent}
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-xl">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={32} className="text-slate-300" />
                        </div>
                        <p className="text-slate-500 text-lg font-medium mb-6">No tools match your search.</p>
                        <button
                            onClick={clearSearch}
                            className="px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20"
                        >
                            Clear Search
                        </button>
                    </div>
                </div>
            ) : (
                <FeatureGrid
                    tools={filteredTools}
                    showHeader={false}
                    searchBar={searchComponent}
                />
            )}
        </div>
    );
};

export default Tools;
