import React, { useState } from 'react';
// Icons are now imported in toolsData.tsx
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

import { getTools, Feature } from '../utils/toolsData';

interface FeatureGridProps {
  onSelectTool: (id: string) => void;
}

type Category = 'All' | 'CSS & UI' | 'Data & Converters' | 'SEO & Content' | 'Images';


const FeatureGrid: React.FC<FeatureGridProps> = ({ onSelectTool }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All'); // String type to match translation keys if needed, or keeping Category type and mapping

  // Re-creating features array here to use 't'
  const features: Feature[] = getTools(t);

  const categories = [
    { id: 'All', label: t.grid.categories.all },
    { id: 'CSS & UI', label: t.grid.categories.css },
    { id: 'Data & Converters', label: t.grid.categories.data },
    { id: 'SEO & Content', label: t.grid.categories.seo },
    { id: 'Images', label: t.grid.categories.images }
  ];

  const filteredFeatures = activeCategory === 'All'
    ? features
    : features.filter(f => f.category === activeCategory);

  return (
    <section id="features" className="py-12 lg:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
            {t.grid.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            {t.grid.subtitle}
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${activeCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20 transform scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFeatures.map((feature) => (
            <Link
              key={feature.id}
              to={`/tool/${feature.id}`}
              className="group relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-500/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner`}
                style={{ backgroundColor: `color-mix(in srgb, var(--${feature.color}-500), transparent 90%)`, color: `var(--${feature.color}-600)` }}
              >
                {/* Fallback color style since tailwind dynamic classes might not work without safelist, using inline style for bg tint */}
                <div className={`text-${feature.color}-600 dark:text-${feature.color}-400`}>
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                {feature.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                  {feature.category === 'CSS & UI' ? 'UI' : feature.category.split(' ')[0]}
                </span>
                <span className="text-teal-600 dark:text-teal-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
                  {t.common.launch} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
