
import React from 'react';
import QRCode from "react-qr-code";
import { QrCode, Download, RefreshCw } from 'lucide-react';
import { useQrGenerator } from './useQrGenerator';

const QrGenerator: React.FC = () => {
    const { input, setInput, size, setSize, qrValue, generate, download } = useQrGenerator();

    React.useEffect(() => {
        if (input) {
            generate();
        }
    }, [input]);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-xl">
                    <QrCode size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">QR Code Generator</h3>
                    <p className="text-sm text-slate-500">Create and download QR codes</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-6">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Content</label>
                        <textarea
                            className="w-full p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 custom-scrollbar h-32"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter URL or text..."
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Size (px)</label>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{size}px</span>
                        </div>
                        <input
                            type="range"
                            min="128"
                            max="1024"
                            step="32"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-600"
                        />
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    {qrValue ? (
                        <div className="flex flex-col items-center gap-6">
                            <div className="p-4 bg-white rounded-xl shadow-sm">
                                <QRCode
                                    id="qr-code-svg"
                                    value={qrValue}
                                    size={Math.min(size, 256)} // Preview size limit
                                    level="H"
                                />
                            </div>
                            <button
                                onClick={download}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition-opacity"
                            >
                                <Download size={20} />
                                Download PNG
                            </button>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400">
                            <QrCode size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Enter text to generate QR code</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QrGenerator;
