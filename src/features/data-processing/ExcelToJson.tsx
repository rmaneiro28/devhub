import React from 'react';
import { FileSpreadsheet, Download, Copy, Check } from 'lucide-react';
import { useExcelToJson } from './useExcelToJson';
import { FileDropZone } from '../../components/ui/FileDropZone';

const ExcelToJson: React.FC = () => {
    const {
        jsonOutput,
        fileName,
        sheets,
        selectedSheet,
        handleFileUpload,
        handleSheetChange,
        downloadJson,
        reset
    } = useExcelToJson();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                    <FileSpreadsheet size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Excel to JSON</h3>
                    <p className="text-sm text-slate-500">Convert Excel/CSV files to JSON format</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-4">
                    <FileDropZone
                        onFilesAdded={(files) => files[0] && handleFileUpload(files[0])}
                        accept=".xlsx,.xls,.csv"
                        multiple={false}
                    >
                        <FileSpreadsheet className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Click or drag Excel/CSV file here
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Supports .xlsx, .xls, .csv
                        </p>
                    </FileDropZone>

                    {fileName && (
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                <p className="text-sm font-medium mb-2">File: {fileName}</p>
                                {sheets.length > 1 && (
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
                                            Select Sheet
                                        </label>
                                        <select
                                            value={selectedSheet}
                                            onChange={(e) => handleSheetChange(e.target.value)}
                                            className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-sm"
                                        >
                                            {sheets.map((sheet) => (
                                                <option key={sheet} value={sheet}>
                                                    {sheet}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={reset}
                                className="w-full px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                            >
                                Upload New File
                            </button>
                        </div>
                    )}
                </div>

                {/* JSON Output */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">JSON Output</label>
                        {jsonOutput && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                                >
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                                </button>
                                <button
                                    onClick={downloadJson}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                                >
                                    <Download size={16} />
                                    <span className="text-sm">Download</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="h-[500px] p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-auto custom-scrollbar">
                        {jsonOutput ? (
                            <pre className="font-mono text-sm">
                                <code>{jsonOutput}</code>
                            </pre>
                        ) : (
                            <p className="text-slate-400 text-sm">Upload a file to see JSON output...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcelToJson;
