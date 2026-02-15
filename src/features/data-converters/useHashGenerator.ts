
import { useState, useMemo } from 'react';
import CryptoJS from 'crypto-js';

export const useHashGenerator = () => {
    const [input, setInput] = useState('');

    const hashes = useMemo(() => {
        if (!input) {
            return { md5: '', sha1: '', sha256: '', sha512: '' };
        }

        try {
            return {
                md5: CryptoJS.MD5(input).toString(),
                sha1: CryptoJS.SHA1(input).toString(),
                sha256: CryptoJS.SHA256(input).toString(),
                sha512: CryptoJS.SHA512(input).toString()
            };
        } catch (e) {
            console.error("Hashing error", e);
            return { md5: '', sha1: '', sha256: '', sha512: '' };
        }
    }, [input]);

    return {
        input,
        setInput,
        hashes
    };
};
