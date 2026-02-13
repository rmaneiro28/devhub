import React, { useState, useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import InteractiveDemo from './features/sql-mapper/SqlMapper';
import AssetOptimizer from './features/asset-optimizer/AssetOptimizer';
import ColorLab from './features/color-lab/ColorLab';
import HealthMonitor from './features/health-monitor/HealthMonitor';
import UnitConverter from './features/css-ui/UnitConverter';
import BorderRadius from './features/css-ui/BorderRadius';
import GradientMate from './features/css-ui/GradientMate';
import BoxShadowGenerator from './features/css-ui/BoxShadowGenerator';
import JsonToTs from './features/data-converters/JsonToTs';
import JsonToToon from './features/data-converters/JsonToToon';
import JwtDecoder from './features/data-converters/JwtDecoder';
import RegexTester from './features/data-converters/RegexTester';
import DiffViewer from './features/code-utils/DiffViewer';
import Base64Encoder from './features/code-utils/Base64Encoder';
import UuidGenerator from './features/code-utils/UuidGenerator';
import CronParser from './features/code-utils/CronParser';
import CurlToCode from './features/network/CurlToCode';
import HttpStatus from './features/network/HttpStatus';
import GridGenerator from './features/css-ui/GridGenerator';
import KeycodeInfo from './features/css-ui/KeycodeInfo';
import ClipPathMaker from './features/css-ui/ClipPathMaker';
import MetaTagGenerator from './features/seo-content/MetaTagGenerator';
import LoremIpsum from './features/seo-content/LoremIpsum';
import MarkdownLive from './features/seo-content/MarkdownLive';
import WebAnalyzer from './features/web-analyzer/WebAnalyzer';
import ColorExtractor from './features/color-extractor/ColorExtractor';
import Documentation from './features/docs/Documentation';
import About from './pages/About';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Status from './pages/Status';
import Footer from './components/layout/Footer';
import { Theme } from './types';
import { ArrowLeft } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';

const ToolLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const renderTool = () => {
    switch (id) {
      case 'sql-crud': return <InteractiveDemo />;
      case 'asset-optimizer': return <AssetOptimizer />;
      case 'color-lab': return <ColorLab />;
      case 'health-monitor': return <HealthMonitor />;
      case 'unit-converter': return <UnitConverter />;
      case 'border-radius': return <BorderRadius />;
      case 'gradient-mate': return <GradientMate />;
      case 'box-shadow': return <BoxShadowGenerator />;
      case 'json-ts': return <JsonToTs />;
      case 'json-toon': return <JsonToToon />;
      case 'jwt-decoder': return <JwtDecoder />;
      case 'regex-tester': return <RegexTester />;
      case 'diff-viewer': return <DiffViewer />;
      case 'base64': return <Base64Encoder />;
      case 'uuid-gen': return <UuidGenerator />;
      case 'cron-parser': return <CronParser />;
      case 'curl-converter': return <CurlToCode />;
      case 'http-status': return <HttpStatus />;
      case 'grid-generator': return <GridGenerator />;
      case 'keycode-info': return <KeycodeInfo />;
      case 'clip-path': return <ClipPathMaker />;
      case 'meta-gen': return <MetaTagGenerator />;
      case 'lorem-ipsum': return <LoremIpsum />;
      case 'markdown-live': return <MarkdownLive />;
      case 'web-analyzer': return <WebAnalyzer />;
      case 'color-extractor': return <ColorExtractor />;
      default: return <div className="text-center py-20 text-slate-500">{t.common.toolNotImplemented}</div>;
    }
  };

  const getToolTitle = () => {
    switch (id) {
      case 'sql-crud': return t.tools.sqlMapper.title;
      case 'asset-optimizer': return t.tools.assetOptimizer.title;
      case 'color-lab': return t.tools.colorLab.title;
      case 'health-monitor': return t.tools.healthMonitor.title;
      case 'unit-converter': return t.tools.unitConverter.title;
      case 'border-radius': return t.tools.borderRadius.title;
      case 'gradient-mate': return t.tools.gradientMate.title;
      case 'box-shadow': return t.tools.boxShadow.title;
      case 'json-ts': return t.tools.jsonTs.title;
      case 'json-toon': return "JSON to TOON"; // Todo: Add to translations
      case 'jwt-decoder': return t.tools.jwtDecoder.title;
      case 'regex-tester': return t.tools.regexTester.title;
      case 'diff-viewer': return "Diff Viewer";
      case 'base64': return "Base64 Converter";
      case 'uuid-gen': return "UUID Generator";
      case 'cron-parser': return "Cron Job Parser";
      case 'curl-converter': return "CURL to Code";
      case 'http-status': return "HTTP Status Cats";
      case 'grid-generator': return "CSS Grid Generator";
      case 'keycode-info': return "Keycode Info";
      case 'clip-path': return "Clip Path Maker";
      case 'meta-gen': return t.tools.metaGen.title;
      case 'lorem-ipsum': return t.tools.loremIpsum.title;
      case 'markdown-live': return t.tools.markdownLive.title;
      case 'web-analyzer': return t.tools.webAnalyzer.title;
      case 'color-extractor': return t.tools.colorExtractor.title;
      default: return 'Tool';
    }
  };

  if (!id) return <Navigate to="/" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/tools')}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            title={t.common.backHome}
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {getToolTitle()}
            </h1>
            <p className="text-slate-500 text-sm">{t.common.devHubTitle}</p>
          </div>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {renderTool()}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(Theme.DARK);
    }
  }, []);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} onHomeClick={() => navigate('/')} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/status" element={<Status />} />
          <Route path="/tool/:id" element={<ToolLayout />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
