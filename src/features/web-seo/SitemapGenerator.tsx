import React from 'react';
import { Map, Download, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { useSitemapGenerator } from './useSitemapGenerator';

const SitemapGenerator: React.FC = () => {
    const {
        urls,
        domain,
        setDomain,
        addUrl,
        updateUrl,
        removeUrl,
        generate,
        downloadFile
    } = useSitemapGenerator();

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
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
                    <Map size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sitemap Generator</h3>
                    <p className="text-sm text-slate-500">Create XML sitemaps for search engines</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Domain</label>
                        <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">URLs</h4>
                        <button
                            onClick={addUrl}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                        >
                            <Plus size={16} />
                            Add URL
                        </button>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-auto custom-scrollbar">
                        {urls.map((url, index) => (
                            <div key={index} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={url.loc}
                                        onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                                        placeholder="/page or full URL"
                                        className="flex-1 p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                    {urls.length > 1 && (
                                        <button
                                            onClick={() => removeUrl(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <select
                                        value={url.changefreq}
                                        onChange={(e) => updateUrl(index, 'changefreq', e.target.value)}
                                        className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    >
                                        <option value="always">Always</option>
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                        <option value="never">Never</option>
                                    </select>
                                    <select
                                        value={url.priority}
                                        onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                                        className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    >
                                        <option value="1.0">Priority: 1.0</option>
                                        <option value="0.9">Priority: 0.9</option>
                                        <option value="0.8">Priority: 0.8</option>
                                        <option value="0.7">Priority: 0.7</option>
                                        <option value="0.6">Priority: 0.6</option>
                                        <option value="0.5">Priority: 0.5</option>
                                        <option value="0.4">Priority: 0.4</option>
                                        <option value="0.3">Priority: 0.3</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">sitemap.xml</label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                            <button
                                onClick={downloadFile}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                            >
                                <Download size={16} />
                                <span className="text-sm">Download</span>
                            </button>
                        </div>
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        <pre className="font-mono text-sm whitespace-pre-wrap">
                            {output}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SitemapGenerator;
