import { useState } from 'react';
import * as jose from 'jose';

export const useJwtGenerator = () => {
    const [mode, setMode] = useState<'generate' | 'verify'>('generate');
    const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
    const [secret, setSecret] = useState('your-256-bit-secret');
    const [algorithm, setAlgorithm] = useState('HS256');
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState('');
    const [error, setError] = useState('');

    const generateToken = async () => {
        try {
            setError('');
            const parsedPayload = JSON.parse(payload);
            const secretKey = new TextEncoder().encode(secret);

            const jwt = await new jose.SignJWT(parsedPayload)
                .setProtectedHeader({ alg: algorithm })
                .setIssuedAt()
                .setExpirationTime('2h')
                .sign(secretKey);

            setToken(jwt);
        } catch (err: any) {
            setError(err.message || 'Failed to generate token');
        }
    };

    const verifyToken = async () => {
        try {
            setError('');
            const secretKey = new TextEncoder().encode(secret);

            const { payload: verifiedPayload } = await jose.jwtVerify(token, secretKey);
            setDecoded(JSON.stringify(verifiedPayload, null, 2));
        } catch (err: any) {
            setError(err.message || 'Invalid token or secret');
        }
    };

    const decodeWithoutVerify = () => {
        try {
            setError('');
            const decoded = jose.decodeJwt(token);
            setDecoded(JSON.stringify(decoded, null, 2));
        } catch (err: any) {
            setError('Invalid JWT format');
        }
    };

    return {
        mode,
        setMode,
        payload,
        setPayload,
        secret,
        setSecret,
        algorithm,
        setAlgorithm,
        token,
        setToken,
        decoded,
        error,
        generateToken,
        verifyToken,
        decodeWithoutVerify
    };
};
