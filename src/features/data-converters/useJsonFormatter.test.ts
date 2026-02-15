
import { renderHook, act } from '@testing-library/react';
import { useJsonFormatter } from './useJsonFormatter';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useJsonFormatter', () => {
    beforeEach(() => {
        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn(),
            },
        });
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('should initialize with empty state', () => {
        const { result } = renderHook(() => useJsonFormatter());
        expect(result.current.input).toBe('');
        expect(result.current.error).toBeNull();
        expect(result.current.copied).toBe(false);
    });

    it('should format valid JSON', () => {
        const { result } = renderHook(() => useJsonFormatter());

        act(() => {
            result.current.setInput('{"a":1,"b":2}');
        });

        act(() => {
            result.current.format();
        });

        expect(result.current.input).toBe('{\n  "a": 1,\n  "b": 2\n}');
        expect(result.current.error).toBeNull();
    });

    it('should minify valid JSON', () => {
        const { result } = renderHook(() => useJsonFormatter());

        act(() => {
            result.current.setInput('{\n  "a": 1,\n  "b": 2\n}');
        });

        act(() => {
            result.current.minify();
        });

        expect(result.current.input).toBe('{"a":1,"b":2}');
        expect(result.current.error).toBeNull();
    });

    it('should handle invalid JSON on format', () => {
        const { result } = renderHook(() => useJsonFormatter());

        act(() => {
            result.current.setInput('{ "a": 1, '); // Invalid
        });

        act(() => {
            result.current.format();
        });

        expect(result.current.error).toContain('Invalid JSON');
        // Input should not change on error (or it remains valid string but formats fails)
        expect(result.current.input).toBe('{ "a": 1, ');
    });

    it('should validate JSON correctly', () => {
        const { result } = renderHook(() => useJsonFormatter());

        // Valid
        act(() => {
            result.current.setInput('{}');
        });

        act(() => {
            result.current.validate();
        });
        expect(result.current.error).toBeNull();

        // Invalid
        act(() => {
            result.current.setInput('{');
        });

        act(() => {
            result.current.validate();
        });
        expect(result.current.error).toContain('Invalid JSON');

        // Empty
        act(() => {
            result.current.setInput('   ');
        });

        act(() => {
            result.current.validate();
        });
        expect(result.current.error).toContain('Empty input');
    });

    it('should handle copy to clipboard', async () => {
        const { result } = renderHook(() => useJsonFormatter());

        act(() => {
            result.current.setInput('test');
        });

        await act(async () => {
            result.current.copyToClipboard();
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test');
        expect(result.current.copied).toBe(true);

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.copied).toBe(false);
    });
});
