import { useState, useEffect } from 'react';

export const useWordCounter = () => {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
    });

    useEffect(() => {
        if (!text) {
            setStats({
                characters: 0,
                charactersNoSpaces: 0,
                words: 0,
                sentences: 0,
                paragraphs: 0,
                readingTime: 0
            });
            return;
        }

        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, '').length;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
        const readingTime = Math.ceil(words / 200); // 200 words per minute

        setStats({
            characters,
            charactersNoSpaces,
            words,
            sentences,
            paragraphs,
            readingTime
        });
    }, [text]);

    return {
        text,
        setText,
        stats
    };
};
