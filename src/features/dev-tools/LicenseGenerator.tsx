import React from 'react';
import { FileText, Download, Copy, Check } from 'lucide-react';
import { useLicenseGenerator } from './useLicenseGenerator';

const LicenseGenerator: React.FC = () => {
    const {
        licenses,
        selectedLicense,
        setSelectedLicense,
        year,
        setYear,
        author,
        setAuthor,
        output,
        generate,
        downloadFile
    } = useLicenseGenerator();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    React.useEffect(() => {
        generate();
    }, [selectedLicense, year, author]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-xl">
                    <FileText size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">License Generator</h3>
                    <p className="text-sm text-slate-500">Generate open source licenses for your projects</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">License Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {licenses.map((license) => (
                                <button
                                    key={license.name}
                                    onClick={() => setSelectedLicense(license.name)}
                                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium ${selectedLicense === license.name
                                            ? 'bg-teal-600 text-white border-teal-600'
                                            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                                        }`}
                                >
                                    {license.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Year</label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">Author/Organization</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Your Name"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800"
                            />
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">LICENSE</label>
                        {output && (
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
                        )}
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

export default LicenseGenerator;
