
import { renderHook, act } from '@testing-library/react';
import { useBorderRadius } from './useBorderRadius';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useBorderRadius', () => {
    beforeEach(() => {
        // Mock clipboard API
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

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useBorderRadius());
        expect(result.current.mode).toBe('simple');
        expect(result.current.format).toBe('css');
        expect(result.current.unit).toBe('px');
        expect(result.current.copied).toBe(false);
        expect(result.current.tl).toBe(10);
    });

    it('should update simple mode values', () => {
        const { result } = renderHook(() => useBorderRadius());

        act(() => {
            result.current.setTl(20);
            result.current.setUnit('%');
        });

        expect(result.current.tl).toBe(20);
        expect(result.current.unit).toBe('%');
        // 20% 10% 10% 10%
        expect(result.current.borderRadiusValue).toBe('20% 10% 10% 10%');
    });

    it('should switch to fancy mode and update values', () => {
        const { result } = renderHook(() => useBorderRadius());

        act(() => {
            result.current.setMode('fancy');
        });

        expect(result.current.mode).toBe('fancy');

        // Verify fancy radius format logic
        // 50% 50% 50% 50% / 50% 50% 50% 50%  (default 50 for all axes)
        expect(result.current.borderRadiusValue).toBe('50% 50% 50% 50% / 50% 50% 50% 50%');

        act(() => {
            result.current.setTopAxis(60);
        });

        expect(result.current.topAxis).toBe(60);
        // 60% 40% 50% 50% / 50% 50% 50% 50%
        expect(result.current.borderRadiusValue).toContain('60% 40%');
    });

    it('should handle copy to clipboard', async () => {
        const { result } = renderHook(() => useBorderRadius());

        await act(async () => {
            result.current.copyToClipboard();
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('border-radius: 10px 10px 10px 10px;');
        expect(result.current.copied).toBe(true);

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.copied).toBe(false);
    });

    it('should format code correctly for JSX and HTML', () => {
        const { result } = renderHook(() => useBorderRadius());

        act(() => {
            result.current.setFormat('jsx');
        });
        // Default radius: 10px 10px 10px 10px
        const expectedRadius = '10px 10px 10px 10px';
        expect(result.current.getCode()).toBe(`style={{ borderRadius: '${expectedRadius}' }}`);

        act(() => {
            result.current.setFormat('html');
        });
        expect(result.current.getCode()).toBe(`style="border-radius: ${expectedRadius};"`);
    });
});
