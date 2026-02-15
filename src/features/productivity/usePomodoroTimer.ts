import { useState, useEffect } from 'react';

export const usePomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'work' | 'break'>('work');
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer finished
                        setIsActive(false);
                        if (mode === 'work') {
                            setMode('break');
                            setMinutes(breakDuration);
                        } else {
                            setMode('work');
                            setMinutes(workDuration);
                        }
                        // Play notification sound
                        new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUhELTKXh8bllHAU2jdXyzn0vBSh+zPDajkIKE1yx6OyrWBQLSKDf8sFuJAUuhM/y2Ik2CBZnuuzmolQSC0yl4fG5ZRwFNo3V8s59LwUofszw2o5CChNcsejtq1gVC0ig3/LBbiQFL4XQ8tmJNggWZ7rs5qJUEgtMpeHxuWUcBTaN1fLOfS8FKH7M8NqOQgoTXLHo7atYFQtIoN/ywW4kBS+F0PLZiTYIFme67OaiVBILTKXh8bllHAU2jdXyzn0vBSh+zPDajkIKE1yx6O2rWBULSKDf8sFuJAUvhdDy2Yk2CBZnuuzmolQSC0yl4fG5ZRwFNo3V8s59LwUofszw2o5CChNcsejtq1gVC0ig3/LBbiQFL4XQ8tmJNggWZ7rs5qJUEgtMpeHxuWUcBTaN1fLOfS8FKH7M8NqOQgoTXLHo7atYFQtIoN/ywW4kBS+F0PLZiTYIFme67OaiVBILTKXh8bllHAU2jdXyzn0vBSh+zPDajkIKE1yx6O2rWBULSKDf8sFuJAUvhdDy2Yk2CBZnuuzmolQSC0yl4fG5ZRwFNo3V8s59LwUofszw2o5CChNcsejtq1gVC0ig3/LBbiQFL4XQ8tmJNggWZ7rs5qJUEgtMpeHxuWUcBTaN1fLOfS8FKH7M8NqOQgoTXLHo7atYFQtIoN/ywW4kBS+F0PLZiTYIFme67OaiVBILTKXh8bllHAU2jdXyzn0vBSh+zPDajkIKE1yx6O2rWBULSKDf8sFuJAUvhdDy2Yk2CBZnuuzmolQSC0yl4fG5ZRwFNo3V8s59LwUofszw2o5CChNcsejtq1gVC0ig3/LBbiQFL4XQ8tmJNggWZ7rs5qJUEgtMpeHxuWUcBTaN1fLOfS8FKH7M8NqOQgoTXLHo7atYFQtIoN/ywW4kBS+F0PLZiTYIFme67OaiVBILTKXh8bllHAU2jdXyzn0vBSh+zPDajkIKE1yx6O2rWBULSKDf8sFuJAUvhdDy2Yk2CBZnuuzmolQSC0yl4fG5ZRwFNo3V8s59LwUofszw2o5CChNcsejtq1gVC0ig3/LBbiQFL4XQ8tmJNggWZ7rs5qJUEgtMpeHxuWUcBTaN1fLOfS8FKH7M8NqOQgoTXLHo7atYFQtIoN/ywW4kBS+F0PLZiTYIFme67OaiVBILTKXh8bllHAU2jdXyzn0vBSh+zPDajkIKE1yx6O2rWBULSKDf8sFuJAU=').play().catch(() => { });
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, minutes, seconds, mode, workDuration, breakDuration]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setIsActive(false);
        setMode('work');
        setMinutes(workDuration);
        setSeconds(0);
    };

    return {
        minutes,
        seconds,
        isActive,
        mode,
        workDuration,
        setWorkDuration,
        breakDuration,
        setBreakDuration,
        toggle,
        reset
    };
};
