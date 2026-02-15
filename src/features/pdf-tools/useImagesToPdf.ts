import { useState } from 'react';
import jsPDF from 'jspdf';

export const useImagesToPdf = () => {
    const [images, setImages] = useState<File[]>([]);
    const [pdfUrl, setPdfUrl] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');

    const addImages = (newFiles: FileList) => {
        const imageFiles = Array.from(newFiles).filter(file => file.type.startsWith('image/'));
        setImages(prev => [...prev, ...imageFiles]);
        setPdfUrl('');
        setError(null);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPdfUrl('');
    };

    const moveImage = (fromIndex: number, toIndex: number) => {
        const newImages = [...images];
        const [movedImage] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, movedImage);
        setImages(newImages);
        setPdfUrl('');
    };

    const createPdf = async () => {
        if (images.length === 0) {
            setError('Please add at least one image');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: pageSize
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const dataUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(file);
                });

                if (i > 0) pdf.addPage();

                const img = new Image();
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.src = dataUrl;
                });

                const imgRatio = img.width / img.height;
                const pageRatio = pageWidth / pageHeight;

                let width = pageWidth;
                let height = pageHeight;

                if (imgRatio > pageRatio) {
                    height = pageWidth / imgRatio;
                } else {
                    width = pageHeight * imgRatio;
                }

                const x = (pageWidth - width) / 2;
                const y = (pageHeight - height) / 2;

                pdf.addImage(dataUrl, 'JPEG', x, y, width, height);
            }

            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
        } catch (err) {
            setError('Error creating PDF');
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const download = () => {
        if (!pdfUrl) return;
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = 'images.pdf';
        a.click();
    };

    const reset = () => {
        setImages([]);
        setPdfUrl('');
        setError(null);
    };

    return {
        images,
        pdfUrl,
        isProcessing,
        error,
        pageSize,
        setPageSize,
        addImages,
        removeImage,
        moveImage,
        createPdf,
        download,
        reset
    };
};
