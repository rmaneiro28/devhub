
import { useState, useCallback, useEffect } from 'react';

export const usePasswordGenerator = () => {
    const [length, setLength] = useState(16);
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const generate = useCallback(() => {
        let charset = "";
        if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numbers) charset += "0123456789";
        if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (!charset) {
            setError("Please select at least one character type.");
            setPassword("");
            return;
        }
        setError(null);

        let retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal);
    }, [length, lowercase, uppercase, numbers, symbols]);

    // Auto-generate on change
    useEffect(() => {
        generate();
    }, [generate]);

    return {
        length, setLength,
        lowercase, setLowercase,
        uppercase, setUppercase,
        numbers, setNumbers,
        symbols, setSymbols,
        password,
        generate,
        error
    };
};
