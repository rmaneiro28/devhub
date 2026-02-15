import { useState, useMemo } from 'react';
import { Feature } from '../utils/toolsData';

export const useToolSearch = (tools: Feature[]) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = useMemo(() => {
        if (!searchQuery.trim()) {
            return tools;
        }

        const query = searchQuery.toLowerCase();
        return tools.filter(tool =>
            tool.title.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.category.toLowerCase().includes(query)
        );
    }, [tools, searchQuery]);

    const clearSearch = () => setSearchQuery('');

    return {
        searchQuery,
        setSearchQuery,
        filteredTools,
        clearSearch,
        hasResults: filteredTools.length > 0,
        resultCount: filteredTools.length
    };
};
