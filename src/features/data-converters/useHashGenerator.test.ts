import { renderHook, act } from '@testing-library/react';
import { useHashGenerator } from './useHashGenerator';
import { describe, it, expect } from 'vitest';

describe('useHashGenerator', () => {
    it('should initialize with empty default values', () => {
        const { result } = renderHook(() => useHashGenerator());
        expect(result.current.input).toBe('');
        expect(result.current.hashes.md5).toBe('');
        expect(result.current.hashes.sha1).toBe('');
        expect(result.current.hashes.sha256).toBe('');
        expect(result.current.hashes.sha512).toBe('');
    });

    it('should generate hashes for input', () => {
        const { result } = renderHook(() => useHashGenerator());

        act(() => {
            result.current.setInput('test');
        });

        // Known hashes for "test"
        expect(result.current.hashes.md5).toBe('098f6bcd4621d373cade4e832627b4f6');
        expect(result.current.hashes.sha1).toBe('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
        expect(result.current.hashes.sha256).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
        expect(result.current.hashes.sha512).toBe('ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d494031a32371d8fc9eaec290518384bd746d84f236ba8f225732388dc82898950d268d89e');
    });

    it('should clear hashes when input is empty', () => {
        const { result } = renderHook(() => useHashGenerator());

        act(() => {
            result.current.setInput('test');
        });
        expect(result.current.hashes.md5).not.toBe('');

        act(() => {
            result.current.setInput('');
        });
        expect(result.current.hashes.md5).toBe('');
    });
});
