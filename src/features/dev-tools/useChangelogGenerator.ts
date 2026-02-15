import { useState } from 'react';

interface ChangelogEntry {
    version: string;
    date: string;
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
    description: string;
}

export const useChangelogGenerator = () => {
    const [projectName, setProjectName] = useState('My Project');
    const [entries, setEntries] = useState<ChangelogEntry[]>([
        { version: '1.0.0', date: new Date().toISOString().split('T')[0], type: 'added', description: '' }
    ]);

    const addEntry = () => {
        setEntries([...entries, {
            version: '1.0.0',
            date: new Date().toISOString().split('T')[0],
            type: 'added',
            description: ''
        }]);
    };

    const updateEntry = (index: number, field: keyof ChangelogEntry, value: string) => {
        const newEntries = [...entries];
        newEntries[index] = { ...newEntries[index], [field]: value };
        setEntries(newEntries);
    };

    const removeEntry = (index: number) => {
        setEntries(entries.filter((_, i) => i !== index));
    };

    const generate = (): string => {
        let changelog = `# Changelog\n\nAll notable changes to ${projectName} will be documented in this file.\n\n`;
        changelog += `The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\n`;
        changelog += `and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n`;

        // Group by version
        const grouped = entries.reduce((acc, entry) => {
            if (!acc[entry.version]) acc[entry.version] = [];
            acc[entry.version].push(entry);
            return acc;
        }, {} as Record<string, ChangelogEntry[]>);

        Object.entries(grouped).forEach(([version, versionEntries]) => {
            const date = versionEntries[0].date;
            changelog += `## [${version}] - ${date}\n\n`;

            const types = ['added', 'changed', 'deprecated', 'removed', 'fixed', 'security'] as const;
            types.forEach(type => {
                const typeEntries = versionEntries.filter(e => e.type === type);
                if (typeEntries.length > 0) {
                    changelog += `### ${type.charAt(0).toUpperCase() + type.slice(1)}\n`;
                    typeEntries.forEach(e => {
                        if (e.description) changelog += `- ${e.description}\n`;
                    });
                    changelog += '\n';
                }
            });
        });

        return changelog;
    };

    const downloadFile = () => {
        const content = generate();
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'CHANGELOG.md';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        projectName,
        setProjectName,
        entries,
        addEntry,
        updateEntry,
        removeEntry,
        generate,
        downloadFile
    };
};
