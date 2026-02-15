import React from 'react';
import { FileImage, Plus, Trash2, Download, Loader, ArrowUp, ArrowDown } from 'lucide-react';
import { useImagesToPdf } from './useImagesToPdf';
import { FileDropZone } from '../../components/ui/FileDropZone';

const ImagesToPdf: React.FC = () => {
    const {
        images,
        pdfUrl,
        isProcessing,
        error,
        pageSize,
        setPageSize,
        addImages,
        removeImage,
        moveImage,
        createPdf,
        download,
        reset
    } = useImagesToPdf();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                    <FileImage size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Images to PDF</h3>
                    <p className="text-sm text-slate-500">Convert multiple images into a PDF</p>
                </div>
            </div>

            <div className="space-y-6">
                <FileDropZone
                    onFilesAdded={addImages}
                    accept="image/*"
                    multiple={true}
                >
                    <Plus className="mx-auto mb-2 text-slate-400" size={32} />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Click or drag images here</p>
                </FileDropZone>

                {images.length > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-medium">Images ({images.length})</h4>
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(e.target.value as 'a4' | 'letter')}
                                className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm"
                            >
                                <option value="a4">A4</option>
                                <option value="letter">Letter</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                            {images.map((file, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-32 object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                                    />
                                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {index > 0 && (
                                            <button
                                                onClick={() => moveImage(index, index - 1)}
                                                className="p-1 bg-white dark:bg-slate-900 rounded shadow-lg"
                                            >
                                                <ArrowUp size={14} />
                                            </button>
                                        )}
                                        {index < images.length - 1 && (
                                            <button
                                                onClick={() => moveImage(index, index + 1)}
                                                className="p-1 bg-white dark:bg-slate-900 rounded shadow-lg"
                                            >
                                                <ArrowDown size={14} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="p-1 bg-red-500 text-white rounded shadow-lg"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={createPdf}
                                disabled={isProcessing}
                                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader className="animate-spin" size={16} /> : <FileImage size={16} />}
                                {isProcessing ? 'Creating...' : 'Create PDF'}
                            </button>
                            <button onClick={reset} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                                Reset
                            </button>
                        </div>
                    </div>
                )}

                {pdfUrl && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                        <p className="text-green-700 dark:text-green-400 mb-4">✓ PDF created successfully!</p>
                        <button
                            onClick={download}
                            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default ImagesToPdf;
