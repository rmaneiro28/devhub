
import React from 'react';
import {
    Database, Image as ImageIcon, Palette, Activity,
    Layers, Box, Type, Code, Key, Search,
    Globe, FileText, Wand2, Hash, FileCode,
    GitCompare, Binary, Fingerprint, Clock,
    Terminal, Cat, LayoutGrid, Keyboard, Scissors
} from 'lucide-react';

export type Category = 'All' | 'CSS & UI' | 'Data & Converters' | 'SEO & Content' | 'Images';

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
        category: 'Data & Converters',
        color: 'teal'
    }
];
