import { useState } from 'react';

interface CodeSnippet {
    id: string;
    title: string;
    language: string;
    code: string;
    tags: string[];
    createdAt: string;
}

export const useCodeSnippetManager = () => {
    const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
    const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet>({
        id: Date.now().toString(),
        title: '',
        language: 'javascript',
        code: '',
        tags: [],
        createdAt: new Date().toISOString()
    });
    const [searchTerm, setSearchTerm] = useState('');

    const saveSnippet = () => {
        if (!currentSnippet.title || !currentSnippet.code) return;

        const existing = snippets.find(s => s.id === currentSnippet.id);
        if (existing) {
            setSnippets(snippets.map(s => s.id === currentSnippet.id ? currentSnippet : s));
        } else {
            setSnippets([...snippets, currentSnippet]);
        }

        resetForm();
    };

    const deleteSnippet = (id: string) => {
        setSnippets(snippets.filter(s => s.id !== id));
    };

    const editSnippet = (snippet: CodeSnippet) => {
        setCurrentSnippet(snippet);
    };

    const resetForm = () => {
        setCurrentSnippet({
            id: Date.now().toString(),
            title: '',
            language: 'javascript',
            code: '',
            tags: [],
            createdAt: new Date().toISOString()
        });
    };

    const filteredSnippets = snippets.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        s.language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        snippets: filteredSnippets,
        currentSnippet,
        setCurrentSnippet,
        searchTerm,
        setSearchTerm,
        saveSnippet,
        deleteSnippet,
        editSnippet,
        resetForm
    };
};
