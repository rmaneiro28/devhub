import React, { useState, useEffect, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import LoadingSpinner from './components/ui/LoadingSpinner';
import SeoHead from './components/seo/SeoHead';
import { Theme } from './types';
import { ArrowLeft } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import Footer from './components/layout/Footer';
import About from './pages/About';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Status from './pages/Status';
import Documentation from './features/docs/Documentation';

// Lazy loading features
const InteractiveDemo = React.lazy(() => import('./features/sql-mapper/SqlMapper'));
const AssetOptimizer = React.lazy(() => import('./features/asset-optimizer/AssetOptimizer'));
const ColorLab = React.lazy(() => import('./features/color-lab/ColorLab'));
const HealthMonitor = React.lazy(() => import('./features/health-monitor/HealthMonitor'));
const UnitConverter = React.lazy(() => import('./features/css-ui/UnitConverter'));
const BorderRadius = React.lazy(() => import('./features/css-ui/BorderRadius'));
const GradientMate = React.lazy(() => import('./features/css-ui/GradientMate'));
const BoxShadowGenerator = React.lazy(() => import('./features/css-ui/BoxShadowGenerator'));
const JsonToTs = React.lazy(() => import('./features/data-converters/JsonToTs'));
const JsonToToon = React.lazy(() => import('./features/data-converters/JsonToToon'));
const JwtDecoder = React.lazy(() => import('./features/data-converters/JwtDecoder'));
const RegexTester = React.lazy(() => import('./features/data-converters/RegexTester'));
const DiffViewer = React.lazy(() => import('./features/code-utils/DiffViewer'));
const Base64Encoder = React.lazy(() => import('./features/code-utils/Base64Encoder'));
const UuidGenerator = React.lazy(() => import('./features/code-utils/UuidGenerator'));
const CronParser = React.lazy(() => import('./features/code-utils/CronParser'));
const CurlToCode = React.lazy(() => import('./features/network/CurlToCode'));
const HttpStatus = React.lazy(() => import('./features/network/HttpStatus'));
const GridGenerator = React.lazy(() => import('./features/css-ui/GridGenerator'));
const KeycodeInfo = React.lazy(() => import('./features/css-ui/KeycodeInfo'));
const ClipPathMaker = React.lazy(() => import('./features/css-ui/ClipPathMaker'));
const MetaTagGenerator = React.lazy(() => import('./features/seo-content/MetaTagGenerator'));
const LoremIpsum = React.lazy(() => import('./features/seo-content/LoremIpsum'));
const MarkdownLive = React.lazy(() => import('./features/seo-content/MarkdownLive'));
const WebAnalyzer = React.lazy(() => import('./features/web-analyzer/WebAnalyzer'));
const ColorExtractor = React.lazy(() => import('./features/color-extractor/ColorExtractor'));
const JsonFormatter = React.lazy(() => import('./features/data-converters/JsonFormatter'));
const UrlEncoder = React.lazy(() => import('./features/network/UrlEncoder'));
const HashGenerator = React.lazy(() => import('./features/data-converters/HashGenerator'));
const PasswordGenerator = React.lazy(() => import('./features/data-converters/PasswordGenerator'));
const CaseConverter = React.lazy(() => import('./features/code-utils/CaseConverter'));
const QrGenerator = React.lazy(() => import('./features/asset-optimizer/QrGenerator'));
const TimestampConverter = React.lazy(() => import('./features/data-converters/TimestampConverter'));
const ImageCompressor = React.lazy(() => import('./features/asset-optimizer/ImageCompressor'));
const PlaceholderGenerator = React.lazy(() => import('./features/asset-optimizer/PlaceholderGenerator'));
const HtmlEncoder = React.lazy(() => import('./features/data-converters/HtmlEncoder'));
const SqlFormatter = React.lazy(() => import('./features/data-converters/SqlFormatter'));
const RandomData = React.lazy(() => import('./features/code-utils/RandomData'));
const PdfMerger = React.lazy(() => import('./features/pdf-tools/PdfMerger'));
const ImagesToPdf = React.lazy(() => import('./features/pdf-tools/ImagesToPdf'));
const ImageToBase64 = React.lazy(() => import('./features/asset-optimizer/ImageToBase64'));
const MarkdownToHtml = React.lazy(() => import('./features/seo-content/MarkdownToHtml'));
const WordCounter = React.lazy(() => import('./features/seo-content/WordCounter'));
const CitationGenerator = React.lazy(() => import('./features/seo-content/CitationGenerator'));
const JsonYaml = React.lazy(() => import('./features/data-converters/JsonYaml'));
const CsvJson = React.lazy(() => import('./features/data-converters/CsvJson'));

// Design & UI Tools
const SvgToComponent = React.lazy(() => import('./features/design-ui/SvgToComponent'));
const FaviconGenerator = React.lazy(() => import('./features/design-ui/FaviconGenerator'));
const TypographyScale = React.lazy(() => import('./features/design-ui/TypographyScale'));
const AccessibilityChecker = React.lazy(() => import('./features/design-ui/AccessibilityChecker'));

// Data Processing Tools
const ExcelToJson = React.lazy(() => import('./features/data-processing/ExcelToJson'));
const XmlJson = React.lazy(() => import('./features/data-processing/XmlJson'));
const ApiMockGenerator = React.lazy(() => import('./features/data-processing/ApiMockGenerator'));
const DataVisualizer = React.lazy(() => import('./features/data-processing/DataVisualizer'));

// Development Tools
const GitIgnoreGenerator = React.lazy(() => import('./features/dev-tools/GitIgnoreGenerator'));
const PackageJsonGenerator = React.lazy(() => import('./features/dev-tools/PackageJsonGenerator'));
const LicenseGenerator = React.lazy(() => import('./features/dev-tools/LicenseGenerator'));

// Web & SEO Tools
const MetaTagsGenerator = React.lazy(() => import('./features/web-seo/MetaTagsGenerator'));
const RobotsTxtGenerator = React.lazy(() => import('./features/web-seo/RobotsTxtGenerator'));
const SitemapGenerator = React.lazy(() => import('./features/web-seo/SitemapGenerator'));
const EmailTemplateBuilder = React.lazy(() => import('./features/web-seo/EmailTemplateBuilder'));

// Mobile & PWA
const PwaManifestGenerator = React.lazy(() => import('./features/mobile-pwa/PwaManifestGenerator.tsx'));
const AppIconGenerator = React.lazy(() => import('./features/mobile-pwa/AppIconGenerator.tsx'));

// Design & UI
const CssAnimationGenerator = React.lazy(() => import('./features/design-ui/CssAnimationGenerator.tsx'));

// Security & Encryption
const JwtGenerator = React.lazy(() => import('./features/security/JwtGenerator.tsx'));
const BcryptGenerator = React.lazy(() => import('./features/security/BcryptGenerator.tsx'));
const CorsTester = React.lazy(() => import('./features/security/CorsTester.tsx'));

// Development Tools
const EnvManager = React.lazy(() => import('./features/dev-tools/EnvManager.tsx'));
const ChangelogGenerator = React.lazy(() => import('./features/dev-tools/ChangelogGenerator.tsx'));
const SqlQueryBuilder = React.lazy(() => import('./features/dev-tools/SqlQueryBuilder.tsx'));
const CodeSnippetManager = React.lazy(() => import('./features/dev-tools/CodeSnippetManager.tsx'));

// Productivity
const PomodoroTimer = React.lazy(() => import('./features/productivity/PomodoroTimer.tsx'));
const RegexCheatSheet = React.lazy(() => import('./features/productivity/RegexCheatSheet.tsx'));
const WebhookTester = React.lazy(() => import('./features/productivity/WebhookTester.tsx'));

// Formatters
const DaxFormatter = React.lazy(() => import('./features/formatters/DaxFormatter'));

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
      case 'json-formatter': return <JsonFormatter />;
      case 'url-encoder': return <UrlEncoder />;
      case 'hash-generator': return <HashGenerator />;
      case 'password-generator': return <PasswordGenerator />;
      case 'case-converter': return <CaseConverter />;
      case 'qr-generator': return <QrGenerator />;
      case 'timestamp-converter': return <TimestampConverter />;
      case 'image-compressor': return <ImageCompressor />;
      case 'placeholder-generator': return <PlaceholderGenerator />;
      case 'html-encoder': return <HtmlEncoder />;
      case 'sql-formatter': return <SqlFormatter />;
      case 'random-data': return <RandomData />;
      case 'pdf-merger': return <PdfMerger />;
      case 'images-to-pdf': return <ImagesToPdf />;
      case 'image-to-base64': return <ImageToBase64 />;
      case 'markdown-to-html': return <MarkdownToHtml />;
      case 'word-counter': return <WordCounter />;
      case 'citation-generator': return <CitationGenerator />;
      case 'json-yaml': return <JsonYaml />;
      case 'csv-json': return <CsvJson />;
      case 'svg-to-component': return <SvgToComponent />;
      case 'favicon-generator': return <FaviconGenerator />;
      case 'typography-scale': return <TypographyScale />;
      case 'accessibility-checker': return <AccessibilityChecker />;
      case 'excel-to-json': return <ExcelToJson />;
      case 'xml-json': return <XmlJson />;
      case 'api-mock-generator': return <ApiMockGenerator />;
      case 'data-visualizer': return <DataVisualizer />;
      case 'gitignore-generator': return <GitIgnoreGenerator />;
      case 'package-json-generator': return <PackageJsonGenerator />;
      case 'license-generator': return <LicenseGenerator />;
      case 'meta-tags-generator': return <MetaTagsGenerator />;
      case 'robots-txt-generator': return <RobotsTxtGenerator />;
      case 'sitemap-generator': return <SitemapGenerator />;
      case 'pwa-manifest-generator': return <PwaManifestGenerator />;
      case 'css-animation-generator': return <CssAnimationGenerator />;
      case 'dax-formatter': return <DaxFormatter />;
      // Security & Encryption
      case 'jwt-generator': return <JwtGenerator />;
      case 'bcrypt-generator': return <BcryptGenerator />;
      case 'cors-tester': return <CorsTester />;
      // Development Tools
      case 'env-manager': return <EnvManager />;
      case 'changelog-generator': return <ChangelogGenerator />;
      case 'sql-query-builder': return <SqlQueryBuilder />;
      case 'code-snippet-manager': return <CodeSnippetManager />;
      // Productivity
      case 'pomodoro-timer': return <PomodoroTimer />;
      case 'regex-cheat-sheet': return <RegexCheatSheet />;
      case 'webhook-tester': return <WebhookTester />;
      // Web & SEO
      case 'email-template-builder': return <EmailTemplateBuilder />;
      // Mobile & PWA
      case 'app-icon-generator': return <AppIconGenerator />;
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
      case 'json-formatter': return "JSON Formatter";
      case 'url-encoder': return "URL Encoder";
      case 'hash-generator': return "Hash Generator";
      case 'password-generator': return "Password Generator";
      case 'case-converter': return "Case Converter";
      case 'qr-generator': return "QR Code Generator";
      case 'timestamp-converter': return "Unix Timestamp";
      case 'image-compressor': return "Image Compressor";
      case 'placeholder-generator': return "Placeholder Generator";
      case 'html-encoder': return "HTML Encoder";
      case 'sql-formatter': return "SQL Formatter";
      case 'random-data': return "Random Data Generator";
      case 'pdf-merger': return "PDF Merger";
      case 'images-to-pdf': return "Images to PDF";
      case 'image-to-base64': return "Image to Base64";
      case 'markdown-to-html': return "Markdown to HTML";
      case 'word-counter': return "Word Counter";
      case 'citation-generator': return "Citation Generator";
      case 'json-yaml': return "JSON/YAML Converter";
      case 'csv-json': return "CSV/JSON Converter";
      case 'svg-to-component': return "SVG to Component";
      case 'favicon-generator': return "Favicon Generator";
      case 'typography-scale': return "Typography Scale";
      case 'accessibility-checker': return "Accessibility Checker";
      case 'excel-to-json': return "Excel to JSON";
      case 'xml-json': return "XML/JSON Converter";
      case 'api-mock-generator': return "API Mock Generator";
      case 'data-visualizer': return "Data Visualizer";
      case 'gitignore-generator': return ".gitignore Generator";
      case 'package-json-generator': return "package.json Generator";
      case 'license-generator': return "License Generator";
      case 'meta-tags-generator': return "Meta Tags Generator";
      case 'robots-txt-generator': return "robots.txt Generator";
      case 'sitemap-generator': return "Sitemap Generator";
      case 'pwa-manifest-generator': return "PWA Manifest Generator";
      case 'css-animation-generator': return "CSS Animation Generator";
      case 'dax-formatter': return "DAX Formatter";
      // New tools
      case 'jwt-generator': return "JWT Generator";
      case 'bcrypt-generator': return "Bcrypt Generator";
      case 'cors-tester': return "CORS Tester";
      case 'env-manager': return "Environment Variables Manager";
      case 'changelog-generator': return "Changelog Generator";
      case 'sql-query-builder': return "SQL Query Builder";
      case 'code-snippet-manager': return "Code Snippet Manager";
      case 'pomodoro-timer': return "Pomodoro Timer";
      case 'regex-cheat-sheet': return "Regex Cheat Sheet";
      case 'webhook-tester': return "Webhook Tester";
      case 'email-template-builder': return "Email Template Builder";
      case 'app-icon-generator': return "App Icon Generator";
      default: return 'Tool';
    }
  };

  const toolTitle = getToolTitle();

  if (!id) return <Navigate to="/" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SeoHead title={toolTitle} description={`${toolTitle} - Free, secure and open source developer tool.`} />
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
              {toolTitle}
            </h1>
            <p className="text-slate-500 text-sm">{t.common.devHubTitle}</p>
          </div>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Suspense fallback={<LoadingSpinner />}>
          {renderTool()}
        </Suspense>
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} onHomeClick={() => navigate('/')} />

      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner fullScreen />}>
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
        </Suspense>
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
