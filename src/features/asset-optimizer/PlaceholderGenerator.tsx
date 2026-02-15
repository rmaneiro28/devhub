import React from 'react';
import { ImagePlus, Download } from 'lucide-react';
import { usePlaceholderGenerator } from './usePlaceholderGenerator';

const PlaceholderGenerator: React.FC = () => {
    const {
        width, setWidth,
        height, setHeight,
        bgColor, setBgColor,
        textColor, setTextColor,
        text, setText,
        fontSize, setFontSize,
        generatePlaceholder,
        download
    } = usePlaceholderGenerator();

    const preview = generatePlaceholder();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl flex flex-col h-full min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                    <ImagePlus size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Placeholder Generator</h3>
                    <p className="text-sm text-slate-500">Create custom placeholder images</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Settings */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Width</label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Height</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`${width} × ${height}`}
                            className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Font Size: {fontSize}px</label>
                        <input
                            type="range"
                            min="12"
                            max="72"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Background</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-full h-10 rounded-lg cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Text Color</label>
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-full h-10 rounded-lg cursor-pointer"
                            />
                        </div>
                    </div>

                    <button
                        onClick={download}
                        className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center justify-center gap-2 font-medium"
                    >
                        <Download size={18} />
                        Download PNG
                    </button>
                </div>

                {/* Preview */}
                <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                    <img src={preview} alt="Placeholder preview" className="max-w-full h-auto shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default PlaceholderGenerator;
