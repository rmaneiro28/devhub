import React from 'react';
import { Image, Copy, Download, Check } from 'lucide-react';
import { useImageToBase64 } from './useImageToBase64';
import { FileDropZone } from '../../components/ui/FileDropZone';

const ImageToBase64: React.FC = () => {
    const {
        mode,
        setMode,
        imageFile,
        base64String,
        decodedImageUrl,
        error,
        handleImageUpload,
        handleBase64Input,
        copyBase64,
        downloadImage,
        reset
    } = useImageToBase64();

    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        copyBase64();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-xl">
                    <Image size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Image ↔ Base64</h3>
                    <p className="text-sm text-slate-500">Convert images to Base64 and back</p>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setMode('encode')}
                    className={`px-4 py-2 rounded-lg font-medium ${mode === 'encode' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                >
                    Image → Base64
                </button>
                <button
                    onClick={() => setMode('decode')}
                    className={`px-4 py-2 rounded-lg font-medium ${mode === 'decode' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                >
                    Base64 → Image
                </button>
            </div>

            {mode === 'encode' ? (
                <div className="space-y-6">
                    <FileDropZone
                        onFilesAdded={(files) => files[0] && handleImageUpload(files[0])}
                        accept="image/*"
                        multiple={false}
                    >
                        <Image className="mx-auto mb-2 text-slate-400" size={32} />
                        <p className="text-sm text-slate-600 dark:text-slate-400">Click or drag an image here</p>
                    </FileDropZone>

                    {base64String && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium">Base64 Output</label>
                                <button onClick={handleCopy} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                </button>
                            </div>
                            <textarea
                                readOnly
                                value={base64String}
                                className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs resize-none custom-scrollbar"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Paste Base64 String</label>
                        <textarea
                            value={base64String}
                            onChange={(e) => handleBase64Input(e.target.value)}
                            placeholder="data:image/png;base64,iVBORw0KGgo..."
                            className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs resize-none custom-scrollbar"
                        />
                    </div>

                    {decodedImageUrl && (
                        <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                            <img src={decodedImageUrl} alt="Decoded" className="max-w-full h-auto mx-auto rounded-lg mb-4" />
                            <button
                                onClick={downloadImage}
                                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2"
                            >
                                <Download size={16} />
                                Download Image
                            </button>
                        </div>
                    )}
                </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default ImageToBase64;
