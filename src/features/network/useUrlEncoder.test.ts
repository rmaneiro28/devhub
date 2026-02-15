
import { renderHook, act } from '@testing-library/react';
import { useUrlEncoder } from './useUrlEncoder';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useUrlEncoder', () => {
    beforeEach(() => {
        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn(),
            },
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should initialize with encode mode', () => {
        const { result } = renderHook(() => useUrlEncoder());
        expect(result.current.mode).toBe('encode');
        expect(result.current.input).toBe('');
        expect(result.current.output).toBe('');
        expect(result.current.error).toBeNull();
    });

    it('should encode test string', () => {
        const { result } = renderHook(() => useUrlEncoder());

        act(() => {
            result.current.setInput('hello world');
        });

        expect(result.current.output).toBe('hello%20world');
        expect(result.current.error).toBeNull();
    });

    it('should decode string', () => {
        const { result } = renderHook(() => useUrlEncoder());

        act(() => {
            result.current.setMode('decode');
        });

        act(() => {
            result.current.setInput('hello%20world');
        });

        expect(result.current.output).toBe('hello world');
        expect(result.current.error).toBeNull();
    });

    it('should handle decoding errors', () => {
        const { result } = renderHook(() => useUrlEncoder());

        act(() => {
            result.current.setMode('decode');
        });

        act(() => {
            result.current.setInput('%'); // Malformed URI sequence
        });

        expect(result.current.error).toContain('Error');
        expect(result.current.output).toBe('');
    });

    it('should clear output on empty input', () => {
        const { result } = renderHook(() => useUrlEncoder());

        act(() => {
            result.current.setInput('test');
        });
        expect(result.current.output).toBe('test');

        act(() => {
            result.current.setInput('');
        });
        expect(result.current.output).toBe('');
        expect(result.current.error).toBeNull();
    });

    it('should copy output to clipboard', () => {
        const { result } = renderHook(() => useUrlEncoder());

        act(() => {
            result.current.setInput('test');
        });

        act(() => {
            result.current.copyToClipboard();
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
    });
});
