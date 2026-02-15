import { useState } from 'react';
import * as XLSX from 'xlsx';

export const useExcelToJson = () => {
    const [jsonOutput, setJsonOutput] = useState('');
    const [fileName, setFileName] = useState('');
    const [sheets, setSheets] = useState<string[]>([]);
    const [selectedSheet, setSelectedSheet] = useState('');
    const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);

    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        setFileName(file.name);

        reader.onload = (e) => {
            const data = e.target?.result;
            const wb = XLSX.read(data, { type: 'binary' });
            setWorkbook(wb);
            setSheets(wb.SheetNames);
            setSelectedSheet(wb.SheetNames[0]);
            convertSheet(wb, wb.SheetNames[0]);
        };

        reader.readAsBinaryString(file);
    };

    const convertSheet = (wb: XLSX.WorkBook, sheetName: string) => {
        const worksheet = wb.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonOutput(JSON.stringify(json, null, 2));
    };

    const handleSheetChange = (sheetName: string) => {
        setSelectedSheet(sheetName);
        if (workbook) {
            convertSheet(workbook, sheetName);
        }
    };

    const downloadJson = () => {
        const blob = new Blob([jsonOutput], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName.replace(/\.[^/.]+$/, '')}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setJsonOutput('');
        setFileName('');
        setSheets([]);
        setSelectedSheet('');
        setWorkbook(null);
    };

    return {
        jsonOutput,
        fileName,
        sheets,
        selectedSheet,
        handleFileUpload,
        handleSheetChange,
        downloadJson,
        reset
    };
};
