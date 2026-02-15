
import { renderHook, act } from '@testing-library/react';
import { useRegexTester } from './useRegexTester';
import { describe, it, expect } from 'vitest';

describe('useRegexTester', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => useRegexTester());
        expect(result.current.regexStr).toBe('');
        expect(result.current.flags).toBe('gm');
        expect(result.current.testString).toContain('Hello world!');
        expect(result.current.matches).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it('should update regex string and find matches', () => {
        const { result } = renderHook(() => useRegexTester());

        act(() => {
            result.current.setRegexStr('Hello');
        });

        expect(result.current.regexStr).toBe('Hello');
        expect(result.current.matches.length).toBe(1);
        expect(result.current.matches[0][0]).toBe('Hello');
    });

    it('should toggle flags correctly', () => {
        const { result } = renderHook(() => useRegexTester());

        expect(result.current.flags).toBe('gm');

        act(() => {
            result.current.toggleFlag('i');
        });
        expect(result.current.flags).toContain('i');
        expect(result.current.flags).toContain('g');
        expect(result.current.flags).toContain('m');


        act(() => {
            result.current.toggleFlag('g');
        });
        expect(result.current.flags).not.toContain('g');
        expect(result.current.flags).toContain('m');
        expect(result.current.flags).toContain('i');
    });

    it('should handle invalid regex', () => {
        const { result } = renderHook(() => useRegexTester());

        act(() => {
            result.current.setRegexStr('[abc');
        });

        expect(result.current.error).not.toBeNull();
        expect(result.current.matches).toEqual([]);
    });

    it('should handle global flag matching correctly', () => {
        const { result } = renderHook(() => useRegexTester());

        act(() => {
            result.current.setTestString('test test test');
            result.current.setRegexStr('test');
            // flags are gm by default
        });

        expect(result.current.matches.length).toBe(3);
    });
});
