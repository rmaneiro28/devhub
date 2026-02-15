import React from 'react';
import { Globe, Copy, Check, RefreshCw } from 'lucide-react';
import { useMetaTagsGenerator } from './useMetaTagsGenerator';

const MetaTagsGenerator: React.FC = () => {
    const {
        tags,
        updateTag,
        syncToOG,
        syncToTwitter,
        generate
    } = useMetaTagsGenerator();

    const [copied, setCopied] = React.useState(false);
    const output = generate();

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <Globe size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Meta Tags Generator</h3>
                    <p className="text-sm text-slate-500">Generate SEO and social media meta tags</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4 max-h-[600px] overflow-auto custom-scrollbar pr-2">
                    {/* Basic Tags */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm">Basic Meta Tags</h4>
                        <input
                            type="text"
                            value={tags.title}
                            onChange={(e) => updateTag('title', e.target.value)}
                            placeholder="Page Title"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                        <textarea
                            value={tags.description}
                            onChange={(e) => updateTag('description', e.target.value)}
                            placeholder="Page Description (150-160 characters)"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm resize-none"
                            rows={3}
                        />
                        <input
                            type="text"
                            value={tags.keywords}
                            onChange={(e) => updateTag('keywords', e.target.value)}
                            placeholder="Keywords (comma separated)"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                        <input
                            type="text"
                            value={tags.author}
                            onChange={(e) => updateTag('author', e.target.value)}
                            placeholder="Author"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>

                    {/* Open Graph */}
                    <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">Open Graph (Facebook)</h4>
                            <button
                                onClick={syncToOG}
                                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded flex items-center gap-1"
                            >
                                <RefreshCw size={12} />
                                Sync from Basic
                            </button>
                        </div>
                        <input
                            type="text"
                            value={tags.ogTitle}
                            onChange={(e) => updateTag('ogTitle', e.target.value)}
                            placeholder="OG Title"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                        <textarea
                            value={tags.ogDescription}
                            onChange={(e) => updateTag('ogDescription', e.target.value)}
                            placeholder="OG Description"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm resize-none"
                            rows={2}
                        />
                        <input
                            type="text"
                            value={tags.ogImage}
                            onChange={(e) => updateTag('ogImage', e.target.value)}
                            placeholder="OG Image URL (1200x630px recommended)"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                        <input
                            type="text"
                            value={tags.ogUrl}
                            onChange={(e) => updateTag('ogUrl', e.target.value)}
                            placeholder="Page URL"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>

                    {/* Twitter */}
                    <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">Twitter Card</h4>
                            <button
                                onClick={syncToTwitter}
                                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded flex items-center gap-1"
                            >
                                <RefreshCw size={12} />
                                Sync from Basic
                            </button>
                        </div>
                        <select
                            value={tags.twitterCard}
                            onChange={(e) => updateTag('twitterCard', e.target.value)}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        >
                            <option value="summary">Summary</option>
                            <option value="summary_large_image">Summary Large Image</option>
                        </select>
                        <input
                            type="text"
                            value={tags.twitterTitle}
                            onChange={(e) => updateTag('twitterTitle', e.target.value)}
                            placeholder="Twitter Title"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                        <textarea
                            value={tags.twitterDescription}
                            onChange={(e) => updateTag('twitterDescription', e.target.value)}
                            placeholder="Twitter Description"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm resize-none"
                            rows={2}
                        />
                        <input
                            type="text"
                            value={tags.twitterImage}
                            onChange={(e) => updateTag('twitterImage', e.target.value)}
                            placeholder="Twitter Image URL"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">HTML Output</label>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                    <div className="h-[600px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        <pre className="font-mono text-sm">
                            <code>{output}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetaTagsGenerator;
