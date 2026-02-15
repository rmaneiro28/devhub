import { useState } from 'react';

export const useRegexCheatSheet = () => {
    const [testString, setTestString] = useState('');
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
    const [error, setError] = useState('');

    const testRegex = () => {
        try {
            setError('');
            const regex = new RegExp(pattern, flags);
            const result = testString.match(regex);
            setMatches(result);
        } catch (err: any) {
            setError(err.message);
            setMatches(null);
        }
    };

    const cheatSheet = {
        'Character Classes': [
            { pattern: '.', description: 'Any character except newline' },
            { pattern: '\\d', description: 'Digit (0-9)' },
            { pattern: '\\D', description: 'Not a digit' },
            { pattern: '\\w', description: 'Word character (a-z, A-Z, 0-9, _)' },
            { pattern: '\\W', description: 'Not a word character' },
            { pattern: '\\s', description: 'Whitespace' },
            { pattern: '\\S', description: 'Not whitespace' }
        ],
        'Anchors': [
            { pattern: '^', description: 'Start of string' },
            { pattern: '$', description: 'End of string' },
            { pattern: '\\b', description: 'Word boundary' },
            { pattern: '\\B', description: 'Not a word boundary' }
        ],
        'Quantifiers': [
            { pattern: '*', description: '0 or more' },
            { pattern: '+', description: '1 or more' },
            { pattern: '?', description: '0 or 1' },
            { pattern: '{3}', description: 'Exactly 3' },
            { pattern: '{3,}', description: '3 or more' },
            { pattern: '{3,5}', description: 'Between 3 and 5' }
        ],
        'Groups': [
            { pattern: '(abc)', description: 'Capture group' },
            { pattern: '(?:abc)', description: 'Non-capturing group' },
            { pattern: 'a|b', description: 'OR operator' }
        ]
    };

    return {
        testString,
        setTestString,
        pattern,
        setPattern,
        flags,
        setFlags,
        matches,
        error,
        testRegex,
        cheatSheet
    };
};
