import React from 'react';
import { Image, Download, RefreshCw, Loader } from 'lucide-react';
import { useImageCompressor } from './useImageCompressor';
import { FileDropZone } from '../../components/ui/FileDropZone';

const ImageCompressor: React.FC = () => {
    const {
        originalFile,
        compressedFile,
        originalPreview,
        compressedPreview,
        quality,
        setQuality,
        maxWidth,
        setMaxWidth,
        isCompressing,
        error,
        handleFileSelect,
        compress,
        download,
        reset
    } = useImageCompressor();

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                    <Image size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Image Compressor</h3>
                    <p className="text-sm text-slate-500">Compress and resize images</p>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* Upload with Drag & Drop */}
                <FileDropZone
                    onFilesAdded={(files) => files[0] && handleFileSelect(files[0])}
                    accept="image/*"
                    multiple={false}
                >
                    <Image className="mx-auto mb-2 text-slate-400" size={32} />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Click or drag an image here</p>
                </FileDropZone>

                {/* Settings */}
                {originalFile && (
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                                    Quality: {Math.round(quality * 100)}%
                                </label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={quality}
                                    onChange={(e) => setQuality(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                                    Max Width: {maxWidth}px
                                </label>
                                <input
                                    type="number"
                                    value={maxWidth}
                                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={compress}
                                disabled={isCompressing}
                                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isCompressing ? <Loader className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                                {isCompressing ? 'Compressing...' : 'Compress'}
                            </button>
                            <button onClick={reset} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                                Reset
                            </button>
                        </div>
                    </div>
                )}

                {/* Preview */}
                {(originalPreview || compressedPreview) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {originalPreview && (
                            <div>
                                <p className="text-sm font-medium mb-2">Original ({formatFileSize(originalFile?.size || 0)})</p>
                                <img src={originalPreview} alt="Original" className="w-full rounded-lg border border-slate-200 dark:border-slate-800" />
                            </div>
                        )}
                        {compressedPreview && (
                            <div>
                                <p className="text-sm font-medium mb-2">Compressed ({formatFileSize(compressedFile?.size || 0)})</p>
                                <img src={compressedPreview} alt="Compressed" className="w-full rounded-lg border border-slate-200 dark:border-slate-800" />
                                <button
                                    onClick={download}
                                    className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                >
                                    <Download size={16} />
                                    Download
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default ImageCompressor;
