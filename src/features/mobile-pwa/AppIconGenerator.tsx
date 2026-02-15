import React from 'react';
import { Smartphone, Upload } from 'lucide-react';
import { useAppIconGenerator } from './useAppIconGenerator';

const AppIconGenerator: React.FC = () => {
    const { sourceImage, backgroundColor, setBackgroundColor, padding, setPadding, handleImageUpload, iconSizes } = useAppIconGenerator();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl"><Smartphone size={24} /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">App Icon Generator</h3>
                    <p className="text-sm text-slate-500">Generate app icons for iOS and Android</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="icon-upload" />
                        <label htmlFor="icon-upload" className="cursor-pointer">
                            <Upload className="mx-auto mb-4 text-slate-400" size={48} />
                            <p className="text-sm text-slate-600 dark:text-slate-400">Click to upload icon (1024x1024 recommended)</p>
                        </label>
                    </div>
                    {sourceImage && (
                        <div className="flex justify-center">
                            <img src={sourceImage} alt="Source" className="w-32 h-32 rounded-lg border" />
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Background Color</label>
                        <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-full h-12 rounded-lg border" />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Padding: {padding}px</label>
                        <input type="range" min="0" max="50" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full" />
                    </div>
                </div>
                <div className="space-y-4 max-h-[500px] overflow-auto">
                    <h4 className="font-medium">Icon Sizes</h4>
                    <div className="space-y-2">
                        {iconSizes.map((size, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border text-sm">
                                <div>
                                    <div className="font-medium">{size.platform} - {size.purpose}</div>
                                    <div className="text-xs text-slate-500">{size.size}x{size.size}px</div>
                                </div>
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded" style={{ width: `${Math.min(size.size / 10, 32)}px`, height: `${Math.min(size.size / 10, 32)}px` }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppIconGenerator;
