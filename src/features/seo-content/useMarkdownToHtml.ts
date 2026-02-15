import { useState, useEffect } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked for GitHub-flavored markdown
marked.setOptions({
    gfm: true,
    breaks: true,  // Convert \n to <br> like GitHub
    pedantic: false
});

// Custom renderer for code highlighting
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);
renderer.code = function ({ text, lang }: { text: string; lang?: string; escaped?: boolean }) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            const highlighted = hljs.highlight(text, { language: lang }).value;
            return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
        } catch (err) {
            console.error('Highlight error:', err);
        }
    }
    return originalCodeRenderer({ text, lang });
};

marked.use({ renderer });

export const useMarkdownToHtml = () => {
    const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
- **Bold text** and *italic text*
- \`Inline code\` and code blocks
- [Links](https://github.com)
- Lists and tables

### Code Example
\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

### Task List
- [x] Completed task
- [ ] Pending task

### Table
| Feature | Status |
|---------|--------|
| Syntax highlighting | ✓ |
| GitHub style | ✓ |
`);
    const [html, setHtml] = useState('');

    useEffect(() => {
        if (!markdown) {
            setHtml('');
            return;
        }

        try {
            const converted = marked(markdown);
            setHtml(converted as string);
        } catch (err) {
            console.error('Error converting markdown:', err);
        }
    }, [markdown]);

    return {
        markdown,
        setMarkdown,
        html
    };
};
