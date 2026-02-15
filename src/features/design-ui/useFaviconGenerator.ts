import { useState } from 'react';

interface FaviconSize {
    size: number;
    name: string;
}

const FAVICON_SIZES: FaviconSize[] = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
];

export const useFaviconGenerator = () => {
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [generatedIcons, setGeneratedIcons] = useState<{ size: number; dataUrl: string; name: string }[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSourceImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const resizeImage = (img: HTMLImageElement, size: number): Promise<string> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d')!;

            // Enable image smoothing for better quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            ctx.drawImage(img, 0, 0, size, size);
            resolve(canvas.toDataURL('image/png'));
        });
    };

    const generateFavicons = async () => {
        if (!sourceImage) return;

        setIsGenerating(true);
        const img = new Image();
        img.src = sourceImage;

        img.onload = async () => {
            const icons = await Promise.all(
                FAVICON_SIZES.map(async ({ size, name }) => ({
                    size,
                    name,
                    dataUrl: await resizeImage(img, size)
                }))
            );
            setGeneratedIcons(icons);
            setIsGenerating(false);
        };
    };

    const downloadIcon = (dataUrl: string, filename: string) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        link.click();
    };

    const downloadAll = async () => {
        // For simplicity, download one by one
        // In production, you'd use JSZip to create a ZIP file
        generatedIcons.forEach(({ dataUrl, name }) => {
            setTimeout(() => downloadIcon(dataUrl, name), 100);
        });
    };

    const reset = () => {
        setSourceImage(null);
        setGeneratedIcons([]);
    };

    return {
        sourceImage,
        generatedIcons,
        isGenerating,
        handleImageUpload,
        generateFavicons,
        downloadIcon,
        downloadAll,
        reset
    };
};
