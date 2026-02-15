import React from 'react';
import { Image as ImageIcon, Download, Loader } from 'lucide-react';
import { useFaviconGenerator } from './useFaviconGenerator';
import { FileDropZone } from '../../components/ui/FileDropZone';

const FaviconGenerator: React.FC = () => {
    const {
        sourceImage,
        generatedIcons,
        isGenerating,
        handleImageUpload,
        generateFavicons,
        downloadIcon,
        downloadAll,
        reset
    } = useFaviconGenerator();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
                    <ImageIcon size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Favicon Generator</h3>
                    <p className="text-sm text-slate-500">Generate favicons in all required sizes</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-4">
                    <FileDropZone
                        onFilesAdded={(files) => files[0] && handleImageUpload(files[0])}
                        accept="image/*"
                        multiple={false}
                    >
                        <ImageIcon className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Click or drag an image here
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Recommended: 512x512px or larger
                        </p>
                    </FileDropZone>

                    {sourceImage && (
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                <p className="text-sm font-medium mb-2">Preview:</p>
                                <img src={sourceImage} alt="Source" className="w-32 h-32 object-contain mx-auto" />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={generateFavicons}
                                    disabled={isGenerating}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? <Loader className="animate-spin" size={16} /> : null}
                                    {isGenerating ? 'Generating...' : 'Generate Favicons'}
                                </button>
                                <button
                                    onClick={reset}
                                    className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Generated Icons */}
                <div>
                    {generatedIcons.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium">Generated Icons</h4>
                                <button
                                    onClick={downloadAll}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                                >
                                    <Download size={16} />
                                    Download All
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {generatedIcons.map(({ size, name, dataUrl }) => (
                                    <div
                                        key={size}
                                        className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800"
                                    >
                                        <div className="flex items-center justify-center mb-2 bg-white dark:bg-slate-900 rounded p-2">
                                            <img src={dataUrl} alt={`${size}x${size}`} style={{ width: size, height: size }} />
                                        </div>
                                        <p className="text-xs font-medium text-center mb-2">{size}x{size}px</p>
                                        <button
                                            onClick={() => downloadIcon(dataUrl, name)}
                                            className="w-full px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded text-xs hover:bg-slate-300 dark:hover:bg-slate-700"
                                        >
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                <p className="text-sm font-medium mb-2">HTML Usage:</p>
                                <pre className="text-xs bg-white dark:bg-slate-900 p-3 rounded overflow-x-auto">
                                    {`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}
                                </pre>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                            Upload an image and generate favicons to see them here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaviconGenerator;
