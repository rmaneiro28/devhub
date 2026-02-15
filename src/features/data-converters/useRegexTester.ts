
import { useState, useMemo } from 'react';

export const useRegexTester = () => {
    const [regexStr, setRegexStr] = useState('');
    const [flags, setFlags] = useState('gm');
    const [testString, setTestString] = useState('Hello world! contact@example.com\nVisit https://example.com for more info.\nDate: 2024-05-20');

    // Derived state for regex object and error
    const { regex, error } = useMemo(() => {
        if (!regexStr) return { regex: null, error: null };
        try {
            return { regex: new RegExp(regexStr, flags), error: null };
        } catch (err: any) {
            return { regex: null, error: err.message };
        }
    }, [regexStr, flags]);

    // Calculate matches
    const matches = useMemo(() => {
        if (!regex || !testString) return [];

        const results = [];
        let match;

        // We need to clone the regex to ensure lastIndex is 0 if global
        const r = new RegExp(regex.source, regex.flags);

        if (!r.global) {
            match = r.exec(testString);
            if (match) results.push(match);
        } else {
            // Safety limit for very generic matches that might hang
            let safety = 0;
            while ((match = r.exec(testString)) !== null && safety < 1000) {
                results.push(match);
                if (match[0].length === 0) r.lastIndex++; // Avoid infinite loop on zero-length matches
                safety++;
            }
        }
        return results;
    }, [regex, testString]);

    const toggleFlag = (flag: string) => {
        setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag);
    };

    return {
        regexStr,
        setRegexStr,
        flags,
        toggleFlag,
        testString,
        setTestString,
        matches,
        error,
        regex // Exporting regex object might be useful for highlighting logic if needed outside
    };
};
