import { useState } from 'react';

interface ManifestData {
    name: string;
    short_name: string;
    description: string;
    start_url: string;
    display: string;
    background_color: string;
    theme_color: string;
    orientation: string;
    scope: string;
    icons: Array<{
        src: string;
        sizes: string;
        type: string;
        purpose?: string;
    }>;
}

export const usePwaManifestGenerator = () => {
    const [manifest, setManifest] = useState<ManifestData>({
        name: 'My PWA App',
        short_name: 'PWA',
        description: 'A Progressive Web Application',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'portrait',
        scope: '/',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
    });

    const updateField = (field: keyof ManifestData, value: any) => {
        setManifest({ ...manifest, [field]: value });
    };

    const addIcon = () => {
        setManifest({
            ...manifest,
            icons: [...manifest.icons, { src: '', sizes: '192x192', type: 'image/png' }]
        });
    };

    const updateIcon = (index: number, field: string, value: string) => {
        const newIcons = [...manifest.icons];
        newIcons[index] = { ...newIcons[index], [field]: value };
        setManifest({ ...manifest, icons: newIcons });
    };

    const removeIcon = (index: number) => {
        setManifest({
            ...manifest,
            icons: manifest.icons.filter((_, i) => i !== index)
        });
    };

    const generate = (): string => {
        return JSON.stringify(manifest, null, 2);
    };

    const downloadFile = () => {
        const content = generate();
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'manifest.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        manifest,
        updateField,
        addIcon,
        updateIcon,
        removeIcon,
        generate,
        downloadFile
    };
};
