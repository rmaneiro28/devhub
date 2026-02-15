import { useState } from 'react';
import bcrypt from 'bcryptjs';

export const useBcryptGenerator = () => {
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [compareInput, setCompareInput] = useState('');
    const [compareHash, setCompareHash] = useState('');
    const [compareResult, setCompareResult] = useState<boolean | null>(null);
    const [rounds, setRounds] = useState(10);

    const generateHash = async () => {
        if (!input) return;
        const salt = await bcrypt.genSalt(rounds);
        const hashed = await bcrypt.hash(input, salt);
        setHash(hashed);
    };

    const verifyHash = async () => {
        if (!compareInput || !compareHash) return;
        const result = await bcrypt.compare(compareInput, compareHash);
        setCompareResult(result);
    };

    return {
        input,
        setInput,
        hash,
        rounds,
        setRounds,
        generateHash,
        compareInput,
        setCompareInput,
        compareHash,
        setCompareHash,
        compareResult,
        verifyHash
    };
};
