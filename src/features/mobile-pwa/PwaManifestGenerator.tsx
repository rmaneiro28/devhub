import React from 'react';
import { Smartphone, Download, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { usePwaManifestGenerator } from './usePwaManifestGenerator';

const PwaManifestGenerator: React.FC = () => {
    const {
        manifest,
        updateField,
        addIcon,
        updateIcon,
        removeIcon,
        generate,
        downloadFile
    } = usePwaManifestGenerator();

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
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                    <Smartphone size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">PWA Manifest Generator</h3>
                    <p className="text-sm text-slate-500">Create manifest.json for Progressive Web Apps</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4 max-h-[600px] overflow-auto custom-scrollbar pr-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">App Name</label>
                            <input
                                type="text"
                                value={manifest.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Short Name</label>
                            <input
                                type="text"
                                value={manifest.short_name}
                                onChange={(e) => updateField('short_name', e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <textarea
                            value={manifest.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm resize-none"
                            rows={2}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Theme Color</label>
                            <input
                                type="color"
                                value={manifest.theme_color}
                                onChange={(e) => updateField('theme_color', e.target.value)}
                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Background Color</label>
                            <input
                                type="color"
                                value={manifest.background_color}
                                onChange={(e) => updateField('background_color', e.target.value)}
                                className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Display</label>
                            <select
                                value={manifest.display}
                                onChange={(e) => updateField('display', e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            >
                                <option value="standalone">Standalone</option>
                                <option value="fullscreen">Fullscreen</option>
                                <option value="minimal-ui">Minimal UI</option>
                                <option value="browser">Browser</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Orientation</label>
                            <select
                                value={manifest.orientation}
                                onChange={(e) => updateField('orientation', e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                            >
                                <option value="any">Any</option>
                                <option value="portrait">Portrait</option>
                                <option value="landscape">Landscape</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                        <h4 className="font-medium text-sm">Icons</h4>
                        <button
                            onClick={addIcon}
                            className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
                        >
                            <Plus size={16} />
                            Add Icon
                        </button>
                    </div>

                    <div className="space-y-2">
                        {manifest.icons.map((icon, index) => (
                            <div key={index} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={icon.src}
                                        onChange={(e) => updateIcon(index, 'src', e.target.value)}
                                        placeholder="/icon-192.png"
                                        className="flex-1 p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                    {manifest.icons.length > 1 && (
                                        <button
                                            onClick={() => removeIcon(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        value={icon.sizes}
                                        onChange={(e) => updateIcon(index, 'sizes', e.target.value)}
                                        placeholder="192x192"
                                        className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={icon.type}
                                        onChange={(e) => updateIcon(index, 'type', e.target.value)}
                                        placeholder="image/png"
                                        className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 text-sm"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">manifest.json</label>
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

export default PwaManifestGenerator;
