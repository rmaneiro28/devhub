
import { useState, useCallback } from 'react';

export const useCaseConverter = () => {
    const [input, setInput] = useState('');
    const [outputs, setOutputs] = useState({
        camel: '',
        snake: '',
        kebab: '',
        pascal: '',
        constant: '',
        sentence: '',
        title: ''
    });

    const toCamel = (str: string) => {
        return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '').replace(/^(.)/, c => c.toLowerCase());
    };

    const toPascal = (str: string) => {
        return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '').replace(/^(.)/, c => c.toUpperCase());
    };

    const toSnake = (str: string) => {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[-_\s]+/g, '_').toLowerCase();
    };

    const toKebab = (str: string) => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[-_\s]+/g, '-').toLowerCase();
    };

    const toConstant = (str: string) => {
        return str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[-_\s]+/g, '_').toUpperCase();
    };

    const toSentence = (str: string) => {
        const result = str.replace(/([A-Z])/g, " $1").replace(/[-_\s]+/g, " ").trim();
        return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
    };

    const toTitle = (str: string) => {
        return str.replace(/([A-Z])/g, " $1").replace(/[-_\s]+/g, " ").trim()
            .replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
    };

    const convert = useCallback((text: string) => {
        setInput(text);
        if (!text) {
            setOutputs({
                camel: '', snake: '', kebab: '', pascal: '', constant: '', sentence: '', title: ''
            });
            return;
        }

        try {
            setOutputs({
                camel: toCamel(text),
                pascal: toPascal(text),
                snake: toSnake(text),
                kebab: toKebab(text),
                constant: toConstant(text),
                sentence: toSentence(text),
                title: toTitle(text)
            });
        } catch (e) {
            console.error("Conversion error", e);
            // Fallback to empty if regex fails
            setOutputs({
                camel: '', snake: '', kebab: '', pascal: '', constant: '', sentence: '', title: ''
            });
        }
    }, []);

    return {
        input,
        setInput: convert,
        outputs
    };
};
