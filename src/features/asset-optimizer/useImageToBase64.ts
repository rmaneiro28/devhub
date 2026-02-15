import { useState } from 'react';

export const useImageToBase64 = () => {
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [base64String, setBase64String] = useState('');
    const [decodedImageUrl, setDecodedImageUrl] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (file: File) => {
        setImageFile(file);
        setError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64String(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleBase64Input = (input: string) => {
        setBase64String(input);
        setError(null);

        try {
            setDecodedImageUrl(input);
        } catch (err) {
            setError('Invalid Base64 string');
        }
    };

    const copyBase64 = () => {
        navigator.clipboard.writeText(base64String);
    };

    const downloadImage = () => {
        if (!decodedImageUrl) return;
        const a = document.createElement('a');
        a.href = decodedImageUrl;
        a.download = 'decoded-image.png';
        a.click();
    };

    const reset = () => {
        setImageFile(null);
        setBase64String('');
        setDecodedImageUrl('');
        setError(null);
    };

    return {
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
    };
};
