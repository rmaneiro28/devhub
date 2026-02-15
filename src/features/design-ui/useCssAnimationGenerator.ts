import { useState } from 'react';

interface Animation {
    name: string;
    duration: string;
    timingFunction: string;
    delay: string;
    iterationCount: string;
    direction: string;
    fillMode: string;
}

interface Keyframe {
    percentage: string;
    properties: { [key: string]: string };
}

export const useCssAnimationGenerator = () => {
    const [animation, setAnimation] = useState<Animation>({
        name: 'myAnimation',
        duration: '1s',
        timingFunction: 'ease',
        delay: '0s',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'none'
    });

    const [keyframes, setKeyframes] = useState<Keyframe[]>([
        { percentage: '0%', properties: { transform: 'translateX(0)', opacity: '1' } },
        { percentage: '100%', properties: { transform: 'translateX(100px)', opacity: '0' } }
    ]);

    const updateAnimation = (field: keyof Animation, value: string) => {
        setAnimation({ ...animation, [field]: value });
    };

    const addKeyframe = () => {
        setKeyframes([...keyframes, { percentage: '50%', properties: {} }]);
    };

    const updateKeyframe = (index: number, percentage: string, properties: { [key: string]: string }) => {
        const newKeyframes = [...keyframes];
        newKeyframes[index] = { percentage, properties };
        setKeyframes(newKeyframes);
    };

    const removeKeyframe = (index: number) => {
        setKeyframes(keyframes.filter((_, i) => i !== index));
    };

    const generateCSS = (): string => {
        let css = `@keyframes ${animation.name} {\n`;

        keyframes.forEach(kf => {
            css += `  ${kf.percentage} {\n`;
            Object.entries(kf.properties).forEach(([prop, value]) => {
                css += `    ${prop}: ${value};\n`;
            });
            css += `  }\n`;
        });

        css += `}\n\n`;
        css += `.animated-element {\n`;
        css += `  animation-name: ${animation.name};\n`;
        css += `  animation-duration: ${animation.duration};\n`;
        css += `  animation-timing-function: ${animation.timingFunction};\n`;
        css += `  animation-delay: ${animation.delay};\n`;
        css += `  animation-iteration-count: ${animation.iterationCount};\n`;
        css += `  animation-direction: ${animation.direction};\n`;
        css += `  animation-fill-mode: ${animation.fillMode};\n`;
        css += `}`;

        return css;
    };

    return {
        animation,
        keyframes,
        updateAnimation,
        addKeyframe,
        updateKeyframe,
        removeKeyframe,
        generateCSS
    };
};
