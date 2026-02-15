import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export const usePdfMerger = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [mergedPdfUrl, setMergedPdfUrl] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addFiles = (newFiles: FileList) => {
        const pdfFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
        setFiles(prev => [...prev, ...pdfFiles]);
        setMergedPdfUrl('');
        setError(null);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setMergedPdfUrl('');
    };

    const moveFile = (fromIndex: number, toIndex: number) => {
        const newFiles = [...files];
        const [movedFile] = newFiles.splice(fromIndex, 1);
        newFiles.splice(toIndex, 0, movedFile);
        setFiles(newFiles);
        setMergedPdfUrl('');
    };

    const mergePdfs = async () => {
        if (files.length < 2) {
            setError('Please add at least 2 PDF files');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setMergedPdfUrl(url);
        } catch (err) {
            setError('Error merging PDFs');
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const download = () => {
        if (!mergedPdfUrl) return;
        const a = document.createElement('a');
        a.href = mergedPdfUrl;
        a.download = 'merged.pdf';
        a.click();
    };

    const reset = () => {
        setFiles([]);
        setMergedPdfUrl('');
        setError(null);
    };

    return {
        files,
        mergedPdfUrl,
        isProcessing,
        error,
        addFiles,
        removeFile,
        moveFile,
        mergePdfs,
        download,
        reset
    };
};
