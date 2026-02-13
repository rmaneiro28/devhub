import React, { useState } from 'react';
import { Search, AlertTriangle, Check, Info, Shield, Eye, Globe, Loader2, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AnalysisResult {
    score: number;
    issues: Issue[];
    url: string;
}

interface Issue {
    type: 'critical' | 'warning' | 'info' | 'success';
    message: string;
    category: 'seo' | 'accessibility' | 'security' | 'performance';
}

const WebAnalyzer: React.FC = () => {
    const { t } = useLanguage();
    const [urlInput, setUrlInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const fetchAndAnalyze = async () => {
        let targetUrl = urlInput.trim();
        if (!targetUrl) return;

        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = 'https://' + targetUrl;
            setUrlInput(targetUrl);
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Strategy 1: corsproxy.io (Direct HTML)
            try {
                const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
                if (response.ok) {
                    const html = await response.text();
                    if (html.trim().length > 0) {
                        analyzeHtml(html, targetUrl);
                        return;
                    }
                }
            } catch (e) {
                console.warn('Primary proxy failed, trying backup...', e);
            }

            // Strategy 2: allorigins.win (JSON wrapped)
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
            const data = await response.json();

            if (data.contents) {
                analyzeHtml(data.contents, targetUrl);
            } else {
                throw new Error('Could not retrieve content via proxies.');
            }
        } catch (err: any) {
            console.error(err);
            setError(`Failed to access URL. ${err.message}. Try a different site.`);
            setLoading(false);
        }
    };

    const analyzeHtml = (htmlContent: string, url: string) => {
        const issues: Issue[] = [];
        let score = 100;

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // --- SEO ---
        // Title
        const title = doc.querySelector('title');
        if (!title || !title.textContent?.trim()) {
            issues.push({ type: 'critical', message: 'Missing <title> tag.', category: 'seo' });
            score -= 20;
        } else if (title.textContent.length < 10) {
            issues.push({ type: 'warning', message: 'Page title is too short (< 10 chars).', category: 'seo' });
            score -= 5;
        } else if (title.textContent.length > 60) {
            issues.push({ type: 'warning', message: 'Page title is too long (> 60 chars).', category: 'seo' });
            score -= 5;
        } else {
            issues.push({ type: 'success', message: `Title found: "${title.textContent.substring(0, 30)}..."`, category: 'seo' });
        }

        // Meta Description
        const metaDesc = doc.querySelector('meta[name="description"]');
        if (!metaDesc || !metaDesc.getAttribute('content')) {
            issues.push({ type: 'critical', message: 'Missing meta description.', category: 'seo' });
            score -= 20;
        } else {
            issues.push({ type: 'success', message: 'Meta description present.', category: 'seo' });
        }

        // H1
        const h1s = doc.querySelectorAll('h1');
        if (h1s.length === 0) {
            issues.push({ type: 'critical', message: 'No <h1> tag found.', category: 'seo' });
            score -= 15;
        } else if (h1s.length > 1) {
            issues.push({ type: 'warning', message: 'Multiple <h1> tags found (should be one).', category: 'seo' });
            score -= 5;
        }

        // --- Accessibility ---
        // Images Alt
        const images = doc.querySelectorAll('img');
        let imagesWithoutAlt = 0;
        images.forEach(img => {
            if (!img.getAttribute('alt')) imagesWithoutAlt++;
        });

        if (imagesWithoutAlt > 0) {
            issues.push({ type: 'critical', message: `${imagesWithoutAlt} images missing 'alt' text.`, category: 'accessibility' });
            score -= (10 + (imagesWithoutAlt * 2));
        } else if (images.length > 0) {
            issues.push({ type: 'success', message: 'All images have alt text.', category: 'accessibility' });
        }

        // --- Security ---
        // Target Blank
        const links = doc.querySelectorAll('a[target="_blank"]');
        let insecureLinks = 0;
        links.forEach(link => {
            const rel = link.getAttribute('rel');
            if (!rel || !rel.includes('noopener') || !rel.includes('noreferrer')) {
                insecureLinks++;
            }
        });

        if (insecureLinks > 0) {
            issues.push({ type: 'warning', message: `${insecureLinks} external links using target="_blank" without rel="noopener noreferrer".`, category: 'security' });
            score -= 10;
        }

        // --- Best Practices ---
        // Viewport
        const viewport = doc.querySelector('meta[name="viewport"]');
        if (!viewport) {
            issues.push({ type: 'critical', message: 'Missing viewport meta tag (not mobile friendly).', category: 'performance' });
            score -= 15;
        }

        setResult({
            score: Math.max(0, score),
            issues: issues.sort((a, b) => (a.type === 'critical' ? -1 : 1)),
            url: url
        });
        setLoading(false);
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500';
        if (score >= 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
                        <Globe className="text-teal-500" />
                        Web Analyzer
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Enter a website URL to instantly analyze SEO, accessibility, and security issues.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col h-auto lg:h-[600px]">
                        <div className="flex justify-between items-center mb-6">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                                <LinkIcon size={16} />
                                Target URL
                            </label>
                        </div>

                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && fetchAndAnalyze()}
                                placeholder="https://example.com"
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 font-mono text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button
                                onClick={fetchAndAnalyze}
                                disabled={loading || !urlInput.trim()}
                                className="py-4 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-teal-500/25 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                                {loading ? 'Scanning...' : 'Analyze Website'}
                            </button>
                        </div>

                        {error && (
                            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400">
                                <AlertTriangle size={20} />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Checks Performed</h3>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Meta Tags (Title, Desc)</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Heading Structure (H1)</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Image Accessibility (Alt)</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Link Security (Target Blank)</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-green-500" /> Mobile Responsiveness (Viewport)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col h-[600px] overflow-hidden">
                        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Shield size={16} />
                            Report
                        </h2>

                        {result ? (
                            <div className="flex flex-col h-full overflow-hidden">
                                <div className="flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800">
                                    <div className="text-center">
                                        <span className={`text-6xl font-black ${getScoreColor(result.score)}`}>
                                            {result.score}
                                        </span>
                                        <p className="text-sm text-slate-500 mt-2 uppercase tracking-widest font-bold">Health Score</p>
                                        <p className="text-xs text-slate-400 mt-1 truncate max-w-[200px] mx-auto">{result.url}</p>
                                    </div>
                                </div>

                                <div className="flex-grow overflow-y-auto custom-scrollbar p-2 space-y-3 mt-4">
                                    {result.issues.map((issue, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl border flex items-start gap-3 ${issue.type === 'critical' ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' :
                                            issue.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30' :
                                                issue.type === 'success' ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' :
                                                    'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'
                                            }`}>
                                            <div className="mt-0.5">
                                                {issue.type === 'critical' && <AlertTriangle size={18} className="text-red-500" />}
                                                {issue.type === 'warning' && <AlertTriangle size={18} className="text-yellow-500" />}
                                                {issue.type === 'success' && <Check size={18} className="text-green-500" />}
                                                {issue.type === 'info' && <Info size={18} className="text-blue-500" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs font-bold uppercase tracking-wider ${issue.category === 'seo' ? 'text-purple-500' :
                                                        issue.category === 'accessibility' ? 'text-blue-500' :
                                                            issue.category === 'security' ? 'text-orange-500' : 'text-slate-500'
                                                        }`}>
                                                        {issue.category}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                                                    {issue.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-slate-400">
                                <Eye size={48} className="mb-4 opacity-50" />
                                <p>Enter a URL to generate report...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebAnalyzer;