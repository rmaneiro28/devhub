import { useState } from 'react';

interface PackageJsonData {
    name: string;
    version: string;
    description: string;
    author: string;
    license: string;
    main: string;
    type: 'module' | 'commonjs';
    scripts: Record<string, string>;
    dependencies: string[];
    devDependencies: string[];
}

const COMMON_SCRIPTS = {
    'start': 'node index.js',
    'dev': 'nodemon index.js',
    'build': 'tsc',
    'test': 'jest',
    'lint': 'eslint .',
    'format': 'prettier --write .'
};

export const usePackageJsonGenerator = () => {
    const [data, setData] = useState<PackageJsonData>({
        name: 'my-project',
        version: '1.0.0',
        description: '',
        author: '',
        license: 'MIT',
        main: 'index.js',
        type: 'commonjs',
        scripts: { start: 'node index.js' },
        dependencies: [],
        devDependencies: []
    });

    const [newScript, setNewScript] = useState({ key: '', value: '' });
    const [newDep, setNewDep] = useState('');
    const [newDevDep, setNewDevDep] = useState('');

    const updateField = (field: keyof PackageJsonData, value: any) => {
        setData({ ...data, [field]: value });
    };

    const addScript = (key: string, value: string) => {
        if (key && value) {
            setData({
                ...data,
                scripts: { ...data.scripts, [key]: value }
            });
            setNewScript({ key: '', value: '' });
        }
    };

    const removeScript = (key: string) => {
        const { [key]: _, ...rest } = data.scripts;
        setData({ ...data, scripts: rest });
    };

    const addDependency = (dep: string, isDev: boolean = false) => {
        if (!dep.trim()) return;

        const field = isDev ? 'devDependencies' : 'dependencies';
        if (!data[field].includes(dep)) {
            setData({
                ...data,
                [field]: [...data[field], dep]
            });
        }

        if (isDev) {
            setNewDevDep('');
        } else {
            setNewDep('');
        }
    };

    const removeDependency = (dep: string, isDev: boolean = false) => {
        const field = isDev ? 'devDependencies' : 'dependencies';
        setData({
            ...data,
            [field]: data[field].filter(d => d !== dep)
        });
    };

    const generate = (): string => {
        const pkg: any = {
            name: data.name,
            version: data.version,
            description: data.description,
            main: data.main,
            type: data.type
        };

        if (Object.keys(data.scripts).length > 0) {
            pkg.scripts = data.scripts;
        }

        if (data.dependencies.length > 0) {
            pkg.dependencies = data.dependencies.reduce((acc, dep) => {
                acc[dep] = '^1.0.0';
                return acc;
            }, {} as Record<string, string>);
        }

        if (data.devDependencies.length > 0) {
            pkg.devDependencies = data.devDependencies.reduce((acc, dep) => {
                acc[dep] = '^1.0.0';
                return acc;
            }, {} as Record<string, string>);
        }

        if (data.author) {
            pkg.author = data.author;
        }

        pkg.license = data.license;

        return JSON.stringify(pkg, null, 2);
    };

    const downloadFile = () => {
        const content = generate();
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'package.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return {
        data,
        newScript,
        setNewScript,
        newDep,
        setNewDep,
        newDevDep,
        setNewDevDep,
        commonScripts: COMMON_SCRIPTS,
        updateField,
        addScript,
        removeScript,
        addDependency,
        removeDependency,
        generate,
        downloadFile
    };
};
