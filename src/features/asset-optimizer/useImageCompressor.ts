import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export const useImageCompressor = () => {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string>('');
    const [compressedPreview, setCompressedPreview] = useState<string>('');
    const [quality, setQuality] = useState(0.8);
    const [maxWidth, setMaxWidth] = useState(1920);
    const [maxHeight, setMaxHeight] = useState(1080);
    const [isCompressing, setIsCompressing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (file: File) => {
        setOriginalFile(file);
        setCompressedFile(null);
        setCompressedPreview('');
        setError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setOriginalPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const compress = async () => {
        if (!originalFile) return;

        setIsCompressing(true);
        setError(null);

        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: Math.max(maxWidth, maxHeight),
                useWebWorker: true,
                initialQuality: quality
            };

            const compressed = await imageCompression(originalFile, options);
            setCompressedFile(compressed);

            const reader = new FileReader();
            reader.onloadend = () => {
                setCompressedPreview(reader.result as string);
            };
            reader.readAsDataURL(compressed);
        } catch (err) {
            setError('Error compressing image');
            console.error(err);
        } finally {
            setIsCompressing(false);
        }
    };

    const download = () => {
        if (!compressedFile) return;

        const url = URL.createObjectURL(compressedFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compressed-${originalFile?.name || 'image'}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setOriginalFile(null);
        setCompressedFile(null);
        setOriginalPreview('');
        setCompressedPreview('');
        setError(null);
    };

    return {
        originalFile,
        compressedFile,
        originalPreview,
        compressedPreview,
        quality,
        setQuality,
        maxWidth,
        setMaxWidth,
        maxHeight,
        setMaxHeight,
        isCompressing,
        error,
        handleFileSelect,
        compress,
        download,
        reset
    };
};
