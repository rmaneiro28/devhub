import React, { useState } from 'react';
import {
  Database, Image as ImageIcon, Palette, Activity,
  Layers, Box, Type, Code, Key, Search,
  Globe, FileText, Wand2, Hash, FileCode,
  GitCompare, Binary, Fingerprint, Clock,
  Terminal, Cat, LayoutGrid, Keyboard, Scissors
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface FeatureGridProps {
  onSelectTool: (id: string) => void;
}

type Category = 'All' | 'CSS & UI' | 'Data & Converters' | 'SEO & Content' | 'Images';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: Category;
  color: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ onSelectTool }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All'); // String type to match translation keys if needed, or keeping Category type and mapping

  // Re-creating features array here to use 't'
  const features: Feature[] = [
    // Code Utilities
    {
      id: 'diff-viewer',
      title: t.tools.diffViewer.title,
      description: t.tools.diffViewer.desc,
      icon: <GitCompare className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'orange'
    },
    {
      id: 'base64',
      title: t.tools.base64.title,
      description: t.tools.base64.desc,
      icon: <Binary className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'blue'
    },
    {
      id: 'uuid-gen',
      title: t.tools.uuidGen.title,
      description: t.tools.uuidGen.desc,
      icon: <Fingerprint className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'purple'
    },
    {
      id: 'cron-parser',
      title: t.tools.cronParser.title,
      description: t.tools.cronParser.desc,
      icon: <Clock className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'red'
    },

    // Network
    {
      id: 'curl-converter',
      title: t.tools.curlConverter.title,
      description: t.tools.curlConverter.desc,
      icon: <Terminal className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'indigo'
    },
    {
      id: 'http-status',
      title: t.tools.httpStatus.title,
      description: t.tools.httpStatus.desc,
      icon: <Cat className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'amber'
    },

    // Core / AI (Refactored to No-AI)
    {
      id: 'sql-crud',
      title: t.tools.sqlMapper.title,
      description: t.tools.sqlMapper.desc,
      icon: <Database className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'teal'
    },
    {
      id: 'color-lab',
      title: t.tools.colorLab.title,
      description: t.tools.colorLab.desc,
      icon: <Palette className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'indigo'
    },
    // Images
    {
      id: 'asset-optimizer',
      title: t.tools.assetOptimizer.title,
      description: t.tools.assetOptimizer.desc,
      icon: <ImageIcon className="w-6 h-6" />,
      category: 'Images',
      color: 'emerald'
    },
    // CSS & UI
    {
      id: 'box-shadow',
      title: t.tools.boxShadow.title,
      description: t.tools.boxShadow.desc,
      icon: <Layers className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'violet'
    },
    {
      id: 'gradient-mate',
      title: t.tools.gradientMate.title,
      description: t.tools.gradientMate.desc,
      icon: <Wand2 className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'pink'
    },
    {
      id: 'border-radius',
      title: t.tools.borderRadius.title,
      description: t.tools.borderRadius.desc,
      icon: <Box className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'orange'
    },
    {
      id: 'unit-converter',
      title: t.tools.unitConverter.title,
      description: t.tools.unitConverter.desc,
      icon: <Hash className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'blue'
    },
    {
      id: 'grid-generator',
      title: t.tools.gridGenerator.title,
      description: t.tools.gridGenerator.desc,
      icon: <LayoutGrid className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'cyan'
    },
    {
      id: 'keycode-info',
      title: t.tools.keycodeInfo.title,
      description: t.tools.keycodeInfo.desc,
      icon: <Keyboard className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'lime'
    },
    {
      id: 'clip-path',
      title: t.tools.clipPath.title,
      description: t.tools.clipPath.desc,
      icon: <Scissors className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'fuchsia'
    },
    // Data
    {
      id: 'json-ts',
      title: t.tools.jsonTs.title,
      description: t.tools.jsonTs.desc,
      icon: <Code className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'sky'
    },
    {
      id: 'json-toon',
      title: t.tools.jsonToon.title,
      description: t.tools.jsonToon.desc,
      icon: <FileCode className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'pink'
    },
    {
      id: 'jwt-decoder',
      title: t.tools.jwtDecoder.title,
      description: t.tools.jwtDecoder.desc,
      icon: <Key className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'amber'
    },
    {
      id: 'regex-tester',
      title: t.tools.regexTester.title,
      description: t.tools.regexTester.desc,
      icon: <Search className="w-6 h-6" />,
      category: 'Data & Converters',
      color: 'rose'
    },
    // SEO & Content
    {
      id: 'web-analyzer',
      title: t.tools.webAnalyzer.title,
      description: t.tools.webAnalyzer.desc,
      icon: <Search className="w-6 h-6" />,
      category: 'SEO & Content',
      color: 'pink'
    },
    {
      id: 'color-extractor',
      title: t.tools.colorExtractor.title,
      description: t.tools.colorExtractor.desc,
      icon: <Palette className="w-6 h-6" />,
      category: 'CSS & UI',
      color: 'indigo'
    },
    {
      id: 'meta-gen',
      title: t.tools.metaGen.title,
      description: t.tools.metaGen.desc,
      icon: <Globe className="w-6 h-6" />,
      category: 'SEO & Content',
      color: 'cyan'
    },
    {
      id: 'lorem-ipsum',
      title: t.tools.loremIpsum.title,
      description: t.tools.loremIpsum.desc,
      icon: <Type className="w-6 h-6" />,
      category: 'SEO & Content',
      color: 'slate'
    },
    {
      id: 'markdown-live',
      title: t.tools.markdownLive.title,
      description: t.tools.markdownLive.desc,
      icon: <FileText className="w-6 h-6" />,
      category: 'SEO & Content',
      color: 'zinc'
    },
    // Utils
    {
      id: 'health-monitor',
      title: t.tools.healthMonitor.title,
      description: t.tools.healthMonitor.desc,
      icon: <Activity className="w-6 h-6" />,
      category: 'Data & Converters', // Keeping category assignment static for now or needing internal mapping
      color: 'teal'
    }
  ];

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
