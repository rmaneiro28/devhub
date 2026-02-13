
import React, { useState } from 'react';
import { Globe, Copy, Check } from 'lucide-react';

const MetaTagGenerator: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const [copied, setCopied] = useState(false);

    const generateMeta = () => {
        return `<!-- SEO Meta Tags -->
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateMeta());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-xl">
                    <Globe size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Meta Tag Generator</h3>
                    <p className="text-sm text-slate-500">Essential SEO tags for your website</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Page Title</label>
                        <input
                            type="text"
                            maxLength={60}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="My Awesome Website"
                        />
                        <p className="text-right text-xs text-slate-400 mt-1">{title.length}/60</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                        <textarea
                            maxLength={160}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none h-24"
                            placeholder="A brief description of your content..."
                        />
                        <p className="text-right text-xs text-slate-400 mt-1">{description.length}/160</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Keywords (comma separated)</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="react, tools, development"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div className="relative group">
                    <div className="h-full bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-xs text-cyan-300 overflow-auto whitespace-pre-wrap">
                        {generateMeta()}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="absolute right-4 top-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors shadow-lg"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MetaTagGenerator;
