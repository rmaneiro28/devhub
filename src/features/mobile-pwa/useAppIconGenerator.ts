import { useState } from 'react';

interface IconSize {
    size: number;
    platform: string;
    purpose: string;
}

export const useAppIconGenerator = () => {
    const [sourceImage, setSourceImage] = useState<string>('');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [padding, setPadding] = useState(0);

    const iconSizes: IconSize[] = [
        // iOS
        { size: 20, platform: 'iOS', purpose: 'iPhone Notification' },
        { size: 29, platform: 'iOS', purpose: 'iPhone Settings' },
        { size: 40, platform: 'iOS', purpose: 'iPhone Spotlight' },
        { size: 60, platform: 'iOS', purpose: 'iPhone App' },
        { size: 76, platform: 'iOS', purpose: 'iPad App' },
        { size: 83.5, platform: 'iOS', purpose: 'iPad Pro App' },
        { size: 1024, platform: 'iOS', purpose: 'App Store' },
        // Android
        { size: 48, platform: 'Android', purpose: 'MDPI' },
        { size: 72, platform: 'Android', purpose: 'HDPI' },
        { size: 96, platform: 'Android', purpose: 'XHDPI' },
        { size: 144, platform: 'Android', purpose: 'XXHDPI' },
        { size: 192, platform: 'Android', purpose: 'XXXHDPI' },
        { size: 512, platform: 'Android', purpose: 'Play Store' }
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSourceImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateIcons = () => {
        // In a real implementation, this would use canvas to resize images
        // For now, we'll just return the configuration
        return iconSizes;
    };

    return {
        sourceImage,
        backgroundColor,
        setBackgroundColor,
        padding,
        setPadding,
        handleImageUpload,
        iconSizes,
        generateIcons
    };
};
