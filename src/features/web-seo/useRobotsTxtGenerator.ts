import { useState } from 'react';

export const useRobotsTxtGenerator = () => {
    const [userAgents, setUserAgents] = useState([{ agent: '*', rules: ['Allow: /'] }]);
    const [sitemapUrl, setSitemapUrl] = useState('');
    const [crawlDelay, setCrawlDelay] = useState('');

    const addUserAgent = () => {
        setUserAgents([...userAgents, { agent: '*', rules: ['Allow: /'] }]);
    };

    const updateAgent = (index: number, agent: string) => {
        const newAgents = [...userAgents];
        newAgents[index].agent = agent;
        setUserAgents(newAgents);
    };

    const updateRules = (index: number, rules: string) => {
        const newAgents = [...userAgents];
        newAgents[index].rules = rules.split('\n').filter(r => r.trim());
        setUserAgents(newAgents);
    };

    const removeAgent = (index: number) => {
        setUserAgents(userAgents.filter((_, i) => i !== index));
    };

    const generate = (): string => {
        let content = '';

        userAgents.forEach(({ agent, rules }) => {
            content += `User-agent: ${agent}\n`;
            rules.forEach(rule => {
                content += `${rule}\n`;
            });
            if (crawlDelay) {
                content += `Crawl-delay: ${crawlDelay}\n`;
            }
            content += '\n';
        });

        if (sitemapUrl) {
            content += `Sitemap: ${sitemapUrl}\n`;
        }

        return content.trim();
    };

    const downloadFile = () => {
        const content = generate();
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'robots.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        userAgents,
        sitemapUrl,
        setSitemapUrl,
        crawlDelay,
        setCrawlDelay,
        addUserAgent,
        updateAgent,
        updateRules,
        removeAgent,
        generate,
        downloadFile
    };
};
