import React from 'react';
import { FileText, Plus, Trash2, Download, Loader, ArrowUp, ArrowDown } from 'lucide-react';
import { usePdfMerger } from './usePdfMerger';
import { FileDropZone } from '../../components/ui/FileDropZone';

const PdfMerger: React.FC = () => {
    const {
        files,
        mergedPdfUrl,
        isProcessing,
        error,
        addFiles,
        removeFile,
        moveFile,
        mergePdfs,
        download,
        reset
    } = usePdfMerger();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
                    <FileText size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">PDF Merger</h3>
                    <p className="text-sm text-slate-500">Combine multiple PDF files into one</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Upload with Drag & Drop */}
                <FileDropZone
                    onFilesAdded={addFiles}
                    accept="application/pdf"
                    multiple={true}
                >
                    <Plus className="mx-auto mb-2 text-slate-400" size={32} />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Click or drag PDF files here</p>
                </FileDropZone>

                {/* File List */}
                {files.length > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                        <h4 className="text-sm font-medium mb-4">Files ({files.length})</h4>
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <FileText size={16} className="text-red-500" />
                                    <span className="flex-1 text-sm truncate">{file.name}</span>
                                    <div className="flex gap-1">
                                        {index > 0 && (
                                            <button
                                                onClick={() => moveFile(index, index - 1)}
                                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                            >
                                                <ArrowUp size={14} />
                                            </button>
                                        )}
                                        {index < files.length - 1 && (
                                            <button
                                                onClick={() => moveFile(index, index + 1)}
                                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                            >
                                                <ArrowDown size={14} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={mergePdfs}
                                disabled={isProcessing || files.length < 2}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader className="animate-spin" size={16} /> : <FileText size={16} />}
                                {isProcessing ? 'Merging...' : 'Merge PDFs'}
                            </button>
                            <button onClick={reset} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                                Reset
                            </button>
                        </div>
                    </div>
                )}

                {/* Result */}
                {mergedPdfUrl && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        <p className="text-green-700 dark:text-green-400 mb-4">✓ PDF merged successfully!</p>
                        <button
                            onClick={download}
                            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
                        >
                            <Download size={18} />
                            Download Merged PDF
                        </button>
                    </div>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default PdfMerger;
