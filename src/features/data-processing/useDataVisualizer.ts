import { useState } from 'react';

export type ChartType = 'bar' | 'line' | 'pie' | 'area';

export const useDataVisualizer = () => {
    const [input, setInput] = useState('');
    const [data, setData] = useState<any[]>([]);
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [error, setError] = useState('');
    const [keys, setKeys] = useState<string[]>([]);
    const [selectedXKey, setSelectedXKey] = useState('');
    const [selectedYKey, setSelectedYKey] = useState('');

    const parseData = () => {
        setError('');
        try {
            // Try parsing as JSON
            const parsed = JSON.parse(input);
            const dataArray = Array.isArray(parsed) ? parsed : [parsed];

            if (dataArray.length === 0) {
                throw new Error('Empty data');
            }

            // Extract keys from first object
            const firstItem = dataArray[0];
            const extractedKeys = Object.keys(firstItem);
            setKeys(extractedKeys);

            // Auto-select first two keys
            if (extractedKeys.length >= 2) {
                setSelectedXKey(extractedKeys[0]);
                setSelectedYKey(extractedKeys[1]);
            } else if (extractedKeys.length === 1) {
                setSelectedXKey(extractedKeys[0]);
                setSelectedYKey(extractedKeys[0]);
            }

            setData(dataArray);
        } catch (err) {
            // Try parsing as CSV
            try {
                const lines = input.trim().split('\n');
                if (lines.length < 2) {
                    throw new Error('Invalid CSV format');
                }

                const headers = lines[0].split(',').map(h => h.trim());
                const csvData = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.trim());
                    const obj: any = {};
                    headers.forEach((header, index) => {
                        const value = values[index];
                        // Try to parse as number
                        obj[header] = isNaN(Number(value)) ? value : Number(value);
                    });
                    return obj;
                });

                setKeys(headers);
                if (headers.length >= 2) {
                    setSelectedXKey(headers[0]);
                    setSelectedYKey(headers[1]);
                }
                setData(csvData);
            } catch (csvErr) {
                setError('Invalid JSON or CSV format');
                setData([]);
            }
        }
    };

    const reset = () => {
        setInput('');
        setData([]);
        setError('');
        setKeys([]);
        setSelectedXKey('');
        setSelectedYKey('');
    };

    return {
        input,
        setInput,
        data,
        chartType,
        setChartType,
        error,
        keys,
        selectedXKey,
        setSelectedXKey,
        selectedYKey,
        setSelectedYKey,
        parseData,
        reset
    };
};
