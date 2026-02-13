
import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2, Copy, Check, Palette, RefreshCw, Info } from 'lucide-react';

type ColorMode = 'image' | 'url';

interface ExtractedColor {
    hex: string;
    rgb: string;
    count: number; // Frequency for sorting
}

const ColorExtractor: React.FC = () => {
    const { t } = useLanguage();
    const [mode, setMode] = useState<ColorMode>('image');
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState<ExtractedColor[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [urlInput, setUrlInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Image Logic ---
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        } else {
            setError('Please drop a valid image file.');
        }
    };

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                const imgParams = event.target.result as string;
                setPreviewImage(imgParams);
                processImage(imgParams);
            }
        };
        reader.readAsDataURL(file);
    };

    const processImage = (imageSrc: string) => {
        setLoading(true);
        setError(null);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Resize for performance (max 200px)
            const scale = Math.min(1, 200 / Math.max(img.width, img.height));
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            const colorMap: Record<string, number> = {};

            for (let i = 0; i < imageData.length; i += 4) {
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
                const a = imageData[i + 3];

                if (a < 128) continue; // Skip transparent

                // Simple quantization (round to nearest 10) to group similar colors
                const round = (n: number) => Math.round(n / 20) * 20;
                const key = `${round(r)},${round(g)},${round(b)}`;

                colorMap[key] = (colorMap[key] || 0) + 1;
            }

            const sortedColors = Object.entries(colorMap)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 12) // Top 12 colors
                .map(([key]) => {
                    const [r, g, b] = key.split(',').map(Number);
                    return {
                        hex: rgbToHex(r, g, b),
                        rgb: `rgb(${r}, ${g}, ${b})`,
                        count: colorMap[key]
                    };
                });

            setColors(sortedColors);
            setLoading(false);
        };
        img.onerror = () => {
            setError("Failed to load image.");
            setLoading(false);
        }
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    };

    // --- URL Logic ---
    const handleUrlAnalysis = async () => {
        let targetUrl = urlInput.trim();
        if (!targetUrl) return;

        if (!targetUrl.startsWith('http')) {
            targetUrl = 'https://' + targetUrl;
            setUrlInput(targetUrl);
        }

        setLoading(true);
        setError(null);
        setColors([]);

        try {
            const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
            if (!response.ok) throw new Error('Failed to fetch');

            const text = await response.text();
            extractColorsFromCss(text);

        } catch (e: any) {
            // Fallback
            try {
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
                const data = await response.json();
                if (data.contents) {
                    extractColorsFromCss(data.contents);
                } else {
                    throw new Error("No content");
                }
            } catch (err) {
                setError("Could not access website. It might be blocking proxies.");
                setLoading(false);
            }
        }
    };

    const extractColorsFromCss = (cssText: string) => {
        const hexRegex = /#([0-9a-f]{3}){1,2}\b/gi;
        const rgbRegex = /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi;

        const found: Record<string, number> = {};

        const matchesHex = cssText.match(hexRegex) || [];
        const matchesRgb = cssText.match(rgbRegex) || [];

        [...matchesHex, ...matchesRgb].forEach(c => {
            const color = c.toLowerCase();
            // Filter out excessively long strings that match by accident or very generic ones if needed
            found[color] = (found[color] || 0) + 1;
        });

        const sorted = Object.entries(found)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 20)
            .map(([c, count]) => ({
                hex: c.startsWith('rgb') ? rgbStringToHex(c) : (c.length === 4 ? expandHex(c) : c), // Normalization
                rgb: c.startsWith('#') ? hexToRgbString(c) : c,
                count
            }));

        // Deduplicate by Hex after normalization
        const uniqueMap = new Map();
        sorted.forEach(item => {
            if (!uniqueMap.has(item.hex)) {
                uniqueMap.set(item.hex, item);
            }
        });

        setColors(Array.from(uniqueMap.values()).slice(0, 12));
        setLoading(false);
    };

    const expandHex = (shortHex: string) => {
        return '#' + shortHex[1] + shortHex[1] + shortHex[2] + shortHex[2] + shortHex[3] + shortHex[3];
    }

    const rgbStringToHex = (rgb: string) => {
        const [r, g, b] = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
        return rgbToHex(r, g, b);
    }

    const hexToRgbString = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedColor(text);
        setTimeout(() => setCopiedColor(null), 1500);
    };

    return (
        <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 px-4 pb-12">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-3">
                        <Palette className="text-pink-500" />
                        Color Extractor
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Extract beautiful color palettes from images or websites instantly.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-1 shadow-sm">
                        <button
                            onClick={() => setMode('image')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${mode === 'image'
                                ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <ImageIcon size={16} />
                            From Image
                        </button>
                        <button
                            onClick={() => setMode('url')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${mode === 'url'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <LinkIcon size={16} />
                            From Website
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Input Area */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Source</h3>

                        {mode === 'image' ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[300px] ${isDragging
                                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                                        : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                                    }`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {previewImage ? (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <img src={previewImage} alt="Preview" className="max-h-[250px] rounded-lg shadow-lg" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                            <span className="text-white font-bold flex items-center gap-2"><RefreshCw size={16} /> Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
                                        <p className="text-slate-700 dark:text-slate-300 font-bold mb-1">Click to upload image</p>
                                        <p className="text-xs text-slate-400">JPG, PNG, WebP supported</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 min-h-[300px]">
                                <label className="text-xs text-slate-400">Target Website URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleUrlAnalysis()}
                                        placeholder="https://example.com"
                                        className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleUrlAnalysis}
                                    disabled={loading || !urlInput}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <LinkIcon size={20} />}
                                    {loading ? 'Scanning Website...' : 'Extract Colors'}
                                </button>

                                <div className="mt-auto p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                                    <p className="text-xs text-blue-600 dark:text-blue-400 flex gap-2">
                                        <Info size={16} />
                                        Tip: This scans the CSS and HTML of the site to find the most commonly used color codes.
                                    </p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin" /> {/* Reusing icon for generic error warning if needed, or simple text */}
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Output Area */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 min-h-[300px]">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex justify-between">
                            Extracted Palette
                            {colors.length > 0 && <span className="text-xs normal-case bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-900 dark:text-white">{colors.length} colors found</span>}
                        </h3>

                        {loading ? (
                            <div className="h-40 flex items-center justify-center text-slate-400">
                                <Loader2 size={32} className="animate-spin" />
                            </div>
                        ) : colors.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {colors.map((color, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-3 flex flex-col items-center hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => copyToClipboard(color.hex)}
                                    >
                                        <div
                                            className="w-full h-16 rounded-lg mb-3 shadow-inner"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <div className="text-center w-full">
                                            <p className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300">{color.hex}</p>
                                            <p className="text-[10px] text-slate-400">{color.rgb}</p>
                                        </div>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-black/50 rounded-full p-1">
                                            {copiedColor === color.hex ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 italic">
                                <Palette size={48} className="mb-4 opacity-20" />
                                <p>No colors extracted yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorExtractor;
