import { useState } from 'react';

interface GitIgnoreTemplate {
    name: string;
    content: string;
}

const TEMPLATES: GitIgnoreTemplate[] = [
    {
        name: 'Node.js',
        content: `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock

# Environment
.env
.env.local
.env.*.local

# Build
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db`
    },
    {
        name: 'Python',
        content: `# Byte-compiled / optimized
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
venv/
env/
ENV/
.venv

# Distribution
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp

# Environment
.env
.env.local

# Testing
.pytest_cache/
.coverage
htmlcov/

# OS
.DS_Store
Thumbs.db`
    },
    {
        name: 'React',
        content: `# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db`
    },
    {
        name: 'Java',
        content: `# Compiled class files
*.class

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup

# Gradle
.gradle/
build/

# IDE
.idea/
*.iml
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db`
    },
    {
        name: 'Next.js',
        content: `# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Environment
.env
.env*.local

# Vercel
.vercel

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db`
    }
];

export const useGitIgnoreGenerator = () => {
    const [selectedTemplates, setSelectedTemplates] = useState<string[]>(['Node.js']);
    const [customEntries, setCustomEntries] = useState('');
    const [output, setOutput] = useState('');

    const toggleTemplate = (templateName: string) => {
        if (selectedTemplates.includes(templateName)) {
            setSelectedTemplates(selectedTemplates.filter(t => t !== templateName));
        } else {
            setSelectedTemplates([...selectedTemplates, templateName]);
        }
    };

    const generate = () => {
        const sections = selectedTemplates.map(name => {
            const template = TEMPLATES.find(t => t.name === name);
            return template ? `# ${template.name}\n${template.content}` : '';
        });

        if (customEntries.trim()) {
            sections.push(`# Custom\n${customEntries.trim()}`);
        }

        setOutput(sections.join('\n\n'));
    };

    const downloadFile = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '.gitignore';
        link.click();
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setSelectedTemplates(['Node.js']);
        setCustomEntries('');
        setOutput('');
    };

    return {
        templates: TEMPLATES,
        selectedTemplates,
        customEntries,
        setCustomEntries,
        output,
        toggleTemplate,
        generate,
        downloadFile,
        reset
    };
};
