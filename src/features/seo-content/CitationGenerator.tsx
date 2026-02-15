import React from 'react';
import { BookOpen, Copy, Check, Plus, Trash2, Link as LinkIcon, Loader } from 'lucide-react';
import { useCitationGenerator } from './useCitationGenerator';

const CitationGenerator: React.FC = () => {
    const {
        style,
        setStyle,
        sourceType,
        setSourceType,
        formData,
        citation,
        extractUrl,
        setExtractUrl,
        isExtracting,
        extractError,
        updateField,
        addAuthor,
        updateAuthor,
        removeAuthor,
        generateCitation,
        extractFromUrl,
        reset
    } = useCitationGenerator();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(citation);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Citation Generator</h3>
                    <p className="text-sm text-slate-500">Generate academic references in multiple formats</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Citation Style */}
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Citation Style</label>
                    <select
                        value={style}
                        onChange={(e) => setStyle(e.target.value as any)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                    >
                        <option value="apa">APA 7th</option>
                        <option value="mla">MLA 9th</option>
                        <option value="chicago">Chicago</option>
                        <option value="ieee">IEEE</option>
                        <option value="vancouver">Vancouver</option>
                        <option value="harvard">Harvard</option>
                    </select>
                </div>

                {/* Source Type */}
                <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Source Type</label>
                    <select
                        value={sourceType}
                        onChange={(e) => {
                            setSourceType(e.target.value as any);
                            updateField('sourceType', e.target.value);
                        }}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                    >
                        <option value="book">Book</option>
                        <option value="article">Article</option>
                        <option value="journal">Journal</option>
                        <option value="website">Website</option>
                        <option value="thesis">Thesis</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                {/* Form */}
                <div className="space-y-4 overflow-auto custom-scrollbar">
                    {/* URL Auto-Extract */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                            <LinkIcon size={16} />
                            Auto-Extract from URL
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={extractUrl}
                                onChange={(e) => setExtractUrl(e.target.value)}
                                placeholder="https://example.com/article"
                                className="flex-1 p-2 bg-white dark:bg-slate-900 rounded-lg border border-blue-300 dark:border-blue-700 text-sm"
                            />
                            <button
                                onClick={extractFromUrl}
                                disabled={isExtracting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isExtracting ? <Loader className="animate-spin" size={16} /> : <LinkIcon size={16} />}
                                {isExtracting ? 'Extracting...' : 'Extract'}
                            </button>
                        </div>
                        {extractError && (
                            <p className="text-red-500 text-xs mt-2">{extractError}</p>
                        )}
                        <p className="text-xs text-slate-500 mt-2">
                            Paste a URL from an academic article, blog, or website to auto-fill citation data
                        </p>
                    </div>

                    {/* Authors */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">Authors</label>
                            <button
                                onClick={addAuthor}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        {formData.authors.map((author, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => updateAuthor(index, e.target.value)}
                                    placeholder="Last Name, First Name"
                                    className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                />
                                {formData.authors.length > 1 && (
                                    <button
                                        onClick={() => removeAuthor(index)}
                                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Year</label>
                        <input
                            type="text"
                            value={formData.year}
                            onChange={(e) => updateField('year', e.target.value)}
                            placeholder="2024"
                            className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>

                    {/* Conditional Fields */}
                    {(sourceType === 'book' || sourceType === 'thesis') && (
                        <>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Publisher</label>
                                <input
                                    type="text"
                                    value={formData.publisher}
                                    onChange={(e) => updateField('publisher', e.target.value)}
                                    className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">City</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => updateField('city', e.target.value)}
                                    className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                />
                            </div>
                        </>
                    )}

                    {(sourceType === 'article' || sourceType === 'journal') && (
                        <>
                            <div>
                                <label className="text-sm font-medium mb-2 block">Journal Name</label>
                                <input
                                    type="text"
                                    value={formData.journal}
                                    onChange={(e) => updateField('journal', e.target.value)}
                                    className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Volume</label>
                                    <input
                                        type="text"
                                        value={formData.volume}
                                        onChange={(e) => updateField('volume', e.target.value)}
                                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Issue</label>
                                    <input
                                        type="text"
                                        value={formData.issue}
                                        onChange={(e) => updateField('issue', e.target.value)}
                                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Pages</label>
                                    <input
                                        type="text"
                                        value={formData.pages}
                                        onChange={(e) => updateField('pages', e.target.value)}
                                        placeholder="1-10"
                                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">DOI (optional)</label>
                                <input
                                    type="text"
                                    value={formData.doi}
                                    onChange={(e) => updateField('doi', e.target.value)}
                                    placeholder="10.1000/xyz123"
                                    className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                />
                            </div>
                        </>
                    )}

                    {sourceType === 'website' && (
                        <div>
                            <label className="text-sm font-medium mb-2 block">URL</label>
                            <input
                                type="text"
                                value={formData.url}
                                onChange={(e) => updateField('url', e.target.value)}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                    )}

                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={generateCitation}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Generate Citation
                        </button>
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Generated Citation</label>
                        {citation && (
                            <button onClick={handleCopy} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        )}
                    </div>
                    <div className="h-full p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                        {citation ? (
                            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: citation.replace(/\*/g, '<em>').replace(/<\/em><em>/g, '') }} />
                        ) : (
                            <p className="text-slate-400 text-sm">Fill in the form and click "Generate Citation"</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitationGenerator;
