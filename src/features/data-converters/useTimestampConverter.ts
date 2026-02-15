
import { useState, useCallback } from 'react';

export const useTimestampConverter = () => {
    // Current time
    const [now, setNow] = useState(Math.floor(Date.now() / 1000));

    // Input states
    const [epochInput, setEpochInput] = useState<string>('');
    const [humanInput, setHumanInput] = useState<string>('');
    const [outputs, setOutputs] = useState({
        toHuman: '',
        toEpoch: ''
    });

    const convertToHuman = useCallback((epoch: string) => {
        setEpochInput(epoch);
        if (!epoch) {
            setOutputs(prev => ({ ...prev, toHuman: '' }));
            return;
        }

        try {
            // Handle MS or Seconds
            let ts = Number(epoch);
            if (epoch.length > 11) ts = Math.floor(ts / 1000); // Assume MS if long

            const date = new Date(ts * 1000);
            if (isNaN(date.getTime())) {
                setOutputs(prev => ({ ...prev, toHuman: 'Invalid Date' }));
            } else {
                setOutputs(prev => ({ ...prev, toHuman: date.toUTCString() + ' / ' + date.toLocaleString() }));
            }
        } catch (e) {
            setOutputs(prev => ({ ...prev, toHuman: 'Error' }));
        }
    }, []);

    const convertToEpoch = useCallback((dateStr: string) => {
        setHumanInput(dateStr);
        if (!dateStr) {
            setOutputs(prev => ({ ...prev, toEpoch: '' }));
            return;
        }

        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                setOutputs(prev => ({ ...prev, toEpoch: 'Invalid Date Format' }));
            } else {
                setOutputs(prev => ({ ...prev, toEpoch: Math.floor(date.getTime() / 1000).toString() }));
            }
        } catch (e) {
            setOutputs(prev => ({ ...prev, toEpoch: 'Error' }));
        }
    }, []);

    return {
        now,
        epochInput, convertToHuman,
        humanInput, convertToEpoch,
        outputs
    };
};
