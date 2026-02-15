import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileDropZoneProps {
    onFilesAdded: (files: FileList) => void;
    accept?: string;
    multiple?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
    onFilesAdded,
    accept = '*',
    multiple = true,
    children,
    className = ''
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFilesAdded(files);
        }
    }, [onFilesAdded]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesAdded(e.target.files);
        }
    }, [onFilesAdded]);

    return (
        <label
            className={`block w-full p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                } ${className}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileInput}
                className="hidden"
            />
            {children || (
                <>
                    <Upload className={`mx-auto mb-2 transition-transform ${isDragging ? 'scale-110' : ''}`} size={32} />
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {isDragging ? 'Drop files here' : 'Click or drag files here'}
                    </p>
                </>
            )}
        </label>
    );
};
