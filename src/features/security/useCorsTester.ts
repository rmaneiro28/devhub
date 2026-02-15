import { useState } from 'react';

export const useCorsTester = () => {
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('GET');
    const [headers, setHeaders] = useState('');
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        details?: any;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const testCors = async () => {
        setLoading(true);
        setResult(null);

        try {
            const customHeaders: Record<string, string> = {};
            if (headers) {
                headers.split('\n').forEach(line => {
                    const [key, value] = line.split(':').map(s => s.trim());
                    if (key && value) customHeaders[key] = value;
                });
            }

            const response = await fetch(url, {
                method,
                headers: customHeaders,
                mode: 'cors'
            });

            setResult({
                success: true,
                message: 'CORS request successful!',
                details: {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries())
                }
            });
        } catch (error: any) {
            setResult({
                success: false,
                message: error.message || 'CORS request failed',
                details: error
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        url,
        setUrl,
        method,
        setMethod,
        headers,
        setHeaders,
        result,
        loading,
        testCors
    };
};
