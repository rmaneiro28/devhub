import React from 'react';
import { Package, Download, Copy, Check, Plus, Trash2 } from 'lucide-react';
import { usePackageJsonGenerator } from './usePackageJsonGenerator';

const PackageJsonGenerator: React.FC = () => {
    const {
        data,
        newScript,
        setNewScript,
        newDep,
        setNewDep,
        newDevDep,
        setNewDevDep,
        commonScripts,
        updateField,
        addScript,
        removeScript,
        addDependency,
        removeDependency,
        generate,
        downloadFile
    } = usePackageJsonGenerator();

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
                    <Package size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">package.json Generator</h3>
                    <p className="text-sm text-slate-500">Create package.json files interactively</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4 max-h-[600px] overflow-auto custom-scrollbar pr-2">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Version</label>
                            <input
                                type="text"
                                value={data.version}
                                onChange={(e) => updateField('version', e.target.value)}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Description</label>
                        <input
                            type="text"
                            value={data.description}
                            onChange={(e) => updateField('description', e.target.value)}
                            className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Main</label>
                            <input
                                type="text"
                                value={data.main}
                                onChange={(e) => updateField('main', e.target.value)}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Type</label>
                            <select
                                value={data.type}
                                onChange={(e) => updateField('type', e.target.value)}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            >
                                <option value="commonjs">CommonJS</option>
                                <option value="module">ES Module</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">License</label>
                            <select
                                value={data.license}
                                onChange={(e) => updateField('license', e.target.value)}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            >
                                <option value="MIT">MIT</option>
                                <option value="ISC">ISC</option>
                                <option value="Apache-2.0">Apache 2.0</option>
                                <option value="GPL-3.0">GPL 3.0</option>
                            </select>
                        </div>
                    </div>

                    {/* Scripts */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Scripts</label>
                        </div>
                        <div className="space-y-2 mb-2">
                            {Object.entries(data.scripts).map(([key, value]) => (
                                <div key={key} className="flex gap-2 items-center p-2 bg-slate-50 dark:bg-slate-950 rounded">
                                    <span className="text-xs font-mono flex-1">{key}: {value}</span>
                                    <button onClick={() => removeScript(key)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newScript.key}
                                onChange={(e) => setNewScript({ ...newScript, key: e.target.value })}
                                placeholder="Script name"
                                className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            />
                            <input
                                type="text"
                                value={newScript.value}
                                onChange={(e) => setNewScript({ ...newScript, value: e.target.value })}
                                placeholder="Command"
                                className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            />
                            <button
                                onClick={() => addScript(newScript.key, newScript.value)}
                                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Dependencies */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Dependencies</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {data.dependencies.map(dep => (
                                <span key={dep} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs flex items-center gap-1">
                                    {dep}
                                    <button onClick={() => removeDependency(dep)} className="hover:text-red-500">
                                        <Trash2 size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newDep}
                                onChange={(e) => setNewDep(e.target.value)}
                                placeholder="Package name"
                                className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            />
                            <button
                                onClick={() => addDependency(newDep)}
                                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Dev Dependencies */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Dev Dependencies</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {data.devDependencies.map(dep => (
                                <span key={dep} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs flex items-center gap-1">
                                    {dep}
                                    <button onClick={() => removeDependency(dep, true)} className="hover:text-red-500">
                                        <Trash2 size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newDevDep}
                                onChange={(e) => setNewDevDep(e.target.value)}
                                placeholder="Package name"
                                className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 text-sm"
                            />
                            <button
                                onClick={() => addDependency(newDevDep, true)}
                                className="px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">package.json</label>
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

export default PackageJsonGenerator;
