import { useState } from 'react';

export const useSvgToComponent = () => {
    const [svgInput, setSvgInput] = useState('');
    const [componentName, setComponentName] = useState('MyIcon');
    const [framework, setFramework] = useState<'react' | 'vue' | 'angular'>('react');
    const [typescript, setTypescript] = useState(true);
    const [output, setOutput] = useState('');

    const cleanSvg = (svg: string): string => {
        // Remove XML declaration
        let cleaned = svg.replace(/<\?xml[^?]*\?>/g, '');

        // Remove comments
        cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

        // Remove unnecessary whitespace
        cleaned = cleaned.trim();

        return cleaned;
    };

    const convertToReact = (svg: string, name: string, ts: boolean): string => {
        let cleaned = cleanSvg(svg);

        // Convert attributes to React format
        cleaned = cleaned
            .replace(/class=/g, 'className=')
            .replace(/stroke-width=/g, 'strokeWidth=')
            .replace(/stroke-linecap=/g, 'strokeLinecap=')
            .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
            .replace(/fill-rule=/g, 'fillRule=')
            .replace(/clip-rule=/g, 'clipRule=')
            .replace(/xmlns:xlink=/g, 'xmlnsXlink=');

        const tsInterface = ts ? `
interface ${name}Props {
  className?: string;
  size?: number;
  color?: string;
}

` : '';

        const propsType = ts ? `: React.FC<${name}Props>` : '';
        const propsDeclaration = ts ? '{ className, size = 24, color = "currentColor" }' : 'props';
        const propsSpread = ts ? '' : '\n  const { className, size = 24, color = "currentColor" } = props;';

        return `import React from 'react';
${tsInterface}const ${name}${propsType} = (${propsDeclaration}) => {${propsSpread}
  return (
    ${cleaned.replace('<svg', '<svg className={className} width={size} height={size} style={{ color }}')}
  );
};

export default ${name};`;
    };

    const convertToVue = (svg: string, name: string, ts: boolean): string => {
        const cleaned = cleanSvg(svg);

        const scriptLang = ts ? ' lang="ts"' : '';
        const propsType = ts ? `
interface Props {
  className?: string;
  size?: number;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
});` : `
defineProps({
  className: String,
  size: { type: Number, default: 24 },
  color: { type: String, default: 'currentColor' }
});`;

        return `<template>
  ${cleaned.replace('<svg', '<svg :class="className" :width="size" :height="size" :style="{ color }"')}
</template>

<script setup${scriptLang}>${propsType}
</script>`;
    };

    const convertToAngular = (svg: string, name: string, ts: boolean): string => {
        const cleaned = cleanSvg(svg);
        const kebabName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

        return `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-${kebabName}',
  template: \`
    ${cleaned.replace('<svg', '<svg [attr.class]="className" [attr.width]="size" [attr.height]="size" [style.color]="color"')}
  \`,
  standalone: true
})
export class ${name}Component {
  @Input() className?: string;
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';
}`;
    };

    const convert = () => {
        if (!svgInput.trim()) {
            setOutput('');
            return;
        }

        try {
            let result = '';
            switch (framework) {
                case 'react':
                    result = convertToReact(svgInput, componentName, typescript);
                    break;
                case 'vue':
                    result = convertToVue(svgInput, componentName, typescript);
                    break;
                case 'angular':
                    result = convertToAngular(svgInput, componentName, typescript);
                    break;
            }
            setOutput(result);
        } catch (error) {
            setOutput('Error: Invalid SVG input');
        }
    };

    const reset = () => {
        setSvgInput('');
        setOutput('');
        setComponentName('MyIcon');
    };

    return {
        svgInput,
        setSvgInput,
        componentName,
        setComponentName,
        framework,
        setFramework,
        typescript,
        setTypescript,
        output,
        convert,
        reset
    };
};
