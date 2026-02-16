
import React from 'react';
import {
    Database, Image as ImageIcon, Palette, Activity,
    Layers, Box, Type, Code, Key, Search,
    Globe, FileText, Wand2, Hash, FileCode,
    GitCompare, Binary, Fingerprint, Clock,
    Terminal, Cat, LayoutGrid, Keyboard, Scissors,
    ImagePlus, Code2, Shuffle, FileImage, Table, BookOpen,
    Eye, Sparkles, FileSpreadsheet, BarChart3, Package, Bot, Map, Smartphone,
    Lock, Shield, Mail, Webhook, FileSearch
} from 'lucide-react';

export type Category = 'All' | 'Dev Core' | 'Frontend' | 'Web' | 'Content';

export interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: Category;
    color: string;
}

export const getTools = (t: any): Feature[] => [
    // Code Utilities
    {
        id: 'diff-viewer',
        title: t.tools.diffViewer.title,
        description: t.tools.diffViewer.desc,
        icon: <GitCompare className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'orange'
    },
    {
        id: 'base64',
        title: t.tools.base64.title,
        description: t.tools.base64.desc,
        icon: <Binary className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'blue'
    },
    {
        id: 'uuid-gen',
        title: t.tools.uuidGen.title,
        description: t.tools.uuidGen.desc,
        icon: <Fingerprint className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'purple'
    },
    {
        id: 'cron-parser',
        title: t.tools.cronParser.title,
        description: t.tools.cronParser.desc,
        icon: <Clock className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'red'
    },

    // Network
    {
        id: 'curl-converter',
        title: t.tools.curlConverter.title,
        description: t.tools.curlConverter.desc,
        icon: <Terminal className="w-6 h-6" />,
        category: 'Web',
        color: 'indigo'
    },
    {
        id: 'http-status',
        title: t.tools.httpStatus.title,
        description: t.tools.httpStatus.desc,
        icon: <Cat className="w-6 h-6" />,
        category: 'Web',
        color: 'amber'
    },

    // Core / AI (Refactored to No-AI)
    {
        id: 'sql-crud',
        title: t.tools.sqlMapper.title,
        description: t.tools.sqlMapper.desc,
        icon: <Database className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'teal'
    },
    {
        id: 'color-lab',
        title: t.tools.colorLab.title,
        description: t.tools.colorLab.desc,
        icon: <Palette className="w-6 h-6" />,
        category: 'Frontend',
        color: 'indigo'
    },
    // Images
    {
        id: 'asset-optimizer',
        title: t.tools.assetOptimizer.title,
        description: t.tools.assetOptimizer.desc,
        icon: <ImageIcon className="w-6 h-6" />,
        category: 'Frontend',
        color: 'emerald'
    },
    // CSS & UI
    {
        id: 'box-shadow',
        title: t.tools.boxShadow.title,
        description: t.tools.boxShadow.desc,
        icon: <Layers className="w-6 h-6" />,
        category: 'Frontend',
        color: 'violet'
    },
    {
        id: 'gradient-mate',
        title: t.tools.gradientMate.title,
        description: t.tools.gradientMate.desc,
        icon: <Wand2 className="w-6 h-6" />,
        category: 'Frontend',
        color: 'pink'
    },
    {
        id: 'border-radius',
        title: t.tools.borderRadius.title,
        description: t.tools.borderRadius.desc,
        icon: <Box className="w-6 h-6" />,
        category: 'Frontend',
        color: 'orange'
    },
    {
        id: 'unit-converter',
        title: t.tools.unitConverter.title,
        description: t.tools.unitConverter.desc,
        icon: <Hash className="w-6 h-6" />,
        category: 'Frontend',
        color: 'blue'
    },
    {
        id: 'grid-generator',
        title: t.tools.gridGenerator.title,
        description: t.tools.gridGenerator.desc,
        icon: <LayoutGrid className="w-6 h-6" />,
        category: 'Frontend',
        color: 'cyan'
    },
    {
        id: 'keycode-info',
        title: t.tools.keycodeInfo.title,
        description: t.tools.keycodeInfo.desc,
        icon: <Keyboard className="w-6 h-6" />,
        category: 'Frontend',
        color: 'lime'
    },
    {
        id: 'clip-path',
        title: t.tools.clipPath.title,
        description: t.tools.clipPath.desc,
        icon: <Scissors className="w-6 h-6" />,
        category: 'Frontend',
        color: 'fuchsia'
    },
    // Data
    {
        id: 'json-ts',
        title: t.tools.jsonTs.title,
        description: t.tools.jsonTs.desc,
        icon: <Code className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'sky'
    },
    {
        id: 'json-toon',
        title: t.tools.jsonToon.title,
        description: t.tools.jsonToon.desc,
        icon: <FileCode className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'pink'
    },
    {
        id: 'jwt-decoder',
        title: t.tools.jwtDecoder.title,
        description: t.tools.jwtDecoder.desc,
        icon: <Key className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'amber'
    },
    {
        id: 'regex-tester',
        title: t.tools.regexTester.title,
        description: t.tools.regexTester.desc,
        icon: <Search className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'rose'
    },
    // SEO & Content
    {
        id: 'web-analyzer',
        title: t.tools.webAnalyzer.title,
        description: t.tools.webAnalyzer.desc,
        icon: <Search className="w-6 h-6" />,
        category: 'Web',
        color: 'pink'
    },
    {
        id: 'color-extractor',
        title: t.tools.colorExtractor.title,
        description: t.tools.colorExtractor.desc,
        icon: <Palette className="w-6 h-6" />,
        category: 'Frontend',
        color: 'indigo'
    },
    {
        id: 'meta-gen',
        title: t.tools.metaGen.title,
        description: t.tools.metaGen.desc,
        icon: <Globe className="w-6 h-6" />,
        category: 'Web',
        color: 'cyan'
    },
    {
        id: 'lorem-ipsum',
        title: t.tools.loremIpsum.title,
        description: t.tools.loremIpsum.desc,
        icon: <Type className="w-6 h-6" />,
        category: 'Content',
        color: 'slate'
    },
    {
        id: 'markdown-live',
        title: t.tools.markdownLive.title,
        description: t.tools.markdownLive.desc,
        icon: <FileText className="w-6 h-6" />,
        category: 'Content',
        color: 'zinc'
    },
    {
        id: 'json-formatter',
        title: "JSON Formatter",
        description: "Format, validate, and minify JSON data",
        icon: <FileCode className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'indigo'
    },
    {
        id: 'url-encoder',
        title: "URL Encoder",
        description: "Encode and decode URLs efficiently",
        icon: <Globe className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'purple'
    },
    {
        id: 'hash-generator',
        title: "Hash Generator",
        description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes",
        icon: <Fingerprint className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'blue'
    },
    {
        id: 'password-generator',
        title: "Password Generator",
        description: "Create secure random passwords",
        icon: <Key className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'green'
    },
    {
        id: 'case-converter',
        title: "Case Converter",
        description: "Convert text between different cases",
        icon: <Type className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'pink'
    },
    {
        id: 'qr-generator',
        title: "QR Code Generator",
        description: "Generate and download QR codes",
        icon: <Box className="w-6 h-6" />,
        category: 'Frontend',
        color: 'slate'
    },
    {
        id: 'timestamp-converter',
        title: "Unix Timestamp",
        description: "Convert between epoch and human dates",
        icon: <Clock className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'red'
    },
    {
        id: 'image-compressor',
        title: "Image Compressor",
        description: "Compress and resize images",
        icon: <ImageIcon className="w-6 h-6" />,
        category: 'Frontend',
        color: 'purple'
    },
    {
        id: 'placeholder-generator',
        title: "Placeholder Generator",
        description: "Create custom placeholder images",
        icon: <ImagePlus className="w-6 h-6" />,
        category: 'Frontend',
        color: 'amber'
    },
    {
        id: 'html-encoder',
        title: "HTML Encoder",
        description: "Encode and decode HTML entities",
        icon: <Code2 className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'orange'
    },
    {
        id: 'sql-formatter',
        title: "SQL Formatter",
        description: "Format and minify SQL queries",
        icon: <Database className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'cyan'
    },
    {
        id: 'random-data',
        title: "Random Data Generator",
        description: "Generate fake data for testing",
        icon: <Shuffle className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'violet'
    },
    {
        id: 'pdf-merger',
        title: "PDF Merger",
        description: "Combine multiple PDF files into one",
        icon: <FileText className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'red'
    },
    {
        id: 'images-to-pdf',
        title: "Images to PDF",
        description: "Convert images to PDF document",
        icon: <FileImage className="w-6 h-6" />,
        category: 'Frontend',
        color: 'indigo'
    },
    {
        id: 'image-to-base64',
        title: "Image ↔ Base64",
        description: "Convert images to Base64 and back",
        icon: <ImageIcon className="w-6 h-6" />,
        category: 'Frontend',
        color: 'teal'
    },
    {
        id: 'markdown-to-html',
        title: "Markdown to HTML",
        description: "Convert Markdown to HTML",
        icon: <FileCode className="w-6 h-6" />,
        category: 'Content',
        color: 'blue'
    },
    {
        id: 'word-counter',
        title: "Word Counter",
        description: "Count words, characters, reading time",
        icon: <FileText className="w-6 h-6" />,
        category: 'Content',
        color: 'emerald'
    },
    {
        id: 'json-yaml',
        title: "JSON ↔ YAML",
        description: "Convert between JSON and YAML",
        icon: <Code className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'yellow'
    },
    {
        id: 'csv-json',
        title: "CSV ↔ JSON",
        description: "Convert between CSV and JSON",
        icon: <Table className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'lime'
    },
    {
        id: 'citation-generator',
        title: "Citation Generator",
        description: "Generate academic citations (APA, MLA, Chicago, IEEE, etc.)",
        icon: <BookOpen className="w-6 h-6" />,
        category: 'Content',
        color: 'blue'
    },
    // Design & UI Tools
    {
        id: 'svg-to-component',
        title: "SVG to Component",
        description: "Convert SVG to React, Vue, or Angular components",
        icon: <FileCode className="w-6 h-6" />,
        category: 'Frontend',
        color: 'purple'
    },
    {
        id: 'favicon-generator',
        title: "Favicon Generator",
        description: "Generate favicons in all required sizes",
        icon: <ImageIcon className="w-6 h-6" />,
        category: 'Frontend',
        color: 'green'
    },
    {
        id: 'typography-scale',
        title: "Typography Scale",
        description: "Generate harmonious typography scales",
        icon: <Type className="w-6 h-6" />,
        category: 'Frontend',
        color: 'indigo'
    },
    {
        id: 'accessibility-checker',
        title: "Accessibility Checker",
        description: "Check color contrast for WCAG compliance",
        icon: <Eye className="w-6 h-6" />,
        category: 'Frontend',
        color: 'pink'
    },
    // Data Processing Tools
    {
        id: 'excel-to-json',
        title: "Excel to JSON",
        description: "Convert Excel/CSV files to JSON format",
        icon: <FileSpreadsheet className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'emerald'
    },
    {
        id: 'xml-json',
        title: "XML/JSON Converter",
        description: "Bidirectional conversion between XML and JSON",
        icon: <Code className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'orange'
    },
    {
        id: 'api-mock-generator',
        title: "API Mock Generator",
        description: "Generate realistic mock data for API testing",
        icon: <Wand2 className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'violet'
    },
    {
        id: 'data-visualizer',
        title: "Data Visualizer",
        description: "Create charts from JSON or CSV data",
        icon: <BarChart3 className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'cyan'
    },
    // Development Tools
    {
        id: 'gitignore-generator',
        title: ".gitignore Generator",
        description: "Create .gitignore files for your projects",
        icon: <GitCompare className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'red'
    },
    {
        id: 'package-json-generator',
        title: "package.json Generator",
        description: "Create package.json files interactively",
        icon: <Package className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'blue'
    },
    {
        id: 'license-generator',
        title: "License Generator",
        description: "Generate open source licenses for your projects",
        icon: <FileText className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'teal'
    },
    // Web & SEO Tools
    {
        id: 'meta-tags-generator',
        title: "Meta Tags Generator",
        description: "Generate SEO and social media meta tags",
        icon: <Globe className="w-6 h-6" />,
        category: 'Web',
        color: 'blue'
    },
    {
        id: 'robots-txt-generator',
        title: "robots.txt Generator",
        description: "Control search engine crawlers",
        icon: <Bot className="w-6 h-6" />,
        category: 'Web',
        color: 'slate'
    },
    {
        id: 'sitemap-generator',
        title: "Sitemap Generator",
        description: "Create XML sitemaps for search engines",
        icon: <Map className="w-6 h-6" />,
        category: 'Web',
        color: 'green'
    },
    // Mobile & PWA
    {
        id: 'pwa-manifest-generator',
        title: "PWA Manifest Generator",
        description: "Create manifest.json for Progressive Web Apps",
        icon: <Smartphone className="w-6 h-6" />,
        category: 'Web',
        color: 'purple'
    },
    // Design & UI
    {
        id: 'css-animation-generator',
        title: "CSS Animation Generator",
        description: "Create custom CSS keyframe animations",
        icon: <Wand2 className="w-6 h-6" />,
        category: 'Frontend',
        color: 'pink'
    },
    // Formatters
    {
        id: 'dax-formatter',
        title: "DAX Formatter",
        description: "Format and beautify Power BI DAX code",
        icon: <Database className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'amber'
    },
    // Security & Encryption
    {
        id: 'jwt-generator',
        title: "JWT Generator",
        description: "Generate and verify JSON Web Tokens",
        icon: <Key className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'indigo'
    },
    {
        id: 'bcrypt-generator',
        title: "Bcrypt Generator",
        description: "Generate and verify bcrypt password hashes",
        icon: <Lock className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'purple'
    },
    {
        id: 'cors-tester',
        title: "CORS Tester",
        description: "Test Cross-Origin Resource Sharing configurations",
        icon: <Globe className="w-6 h-6" />,
        category: 'Web',
        color: 'teal'
    },
    // Development Tools (additional)
    {
        id: 'env-manager',
        title: "Environment Variables Manager",
        description: "Manage and export environment variables",
        icon: <FileCode className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'blue'
    },
    {
        id: 'changelog-generator',
        title: "Changelog Generator",
        description: "Generate changelogs following Keep a Changelog format",
        icon: <BookOpen className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'green'
    },
    {
        id: 'sql-query-builder',
        title: "SQL Query Builder",
        description: "Build SQL queries visually",
        icon: <Database className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'cyan'
    },
    {
        id: 'code-snippet-manager',
        title: "Code Snippet Manager",
        description: "Save and organize code snippets",
        icon: <Code2 className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'orange'
    },
    // Productivity
    {
        id: 'pomodoro-timer',
        title: "Pomodoro Timer",
        description: "Stay focused with the Pomodoro Technique",
        icon: <Clock className="w-6 h-6" />,
        category: 'Content',
        color: 'red'
    },
    {
        id: 'regex-cheat-sheet',
        title: "Regex Cheat Sheet",
        description: "Test regex patterns with reference guide",
        icon: <FileSearch className="w-6 h-6" />,
        category: 'Dev Core',
        color: 'violet'
    },
    {
        id: 'webhook-tester',
        title: "Webhook Tester",
        description: "Test and debug webhook requests",
        icon: <Webhook className="w-6 h-6" />,
        category: 'Web',
        color: 'emerald'
    },
    // Web & SEO (additional)
    {
        id: 'email-template-builder',
        title: "Email Template Builder",
        description: "Create responsive HTML email templates",
        icon: <Mail className="w-6 h-6" />,
        category: 'Web',
        color: 'pink'
    },
    // Mobile & PWA (additional)
    {
        id: 'app-icon-generator',
        title: "App Icon Generator",
        description: "Generate app icons for iOS and Android",
        icon: <Smartphone className="w-6 h-6" />,
        category: 'Web',
        color: 'blue'
    },
    // Utils
    {
        id: 'health-monitor',
        title: t.tools.healthMonitor.title,
        description: t.tools.healthMonitor.desc,
        icon: <Activity className="w-6 h-6" />,
        category: 'Web',
        color: 'teal'
    }
];
