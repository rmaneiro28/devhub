
import { renderHook, act } from '@testing-library/react';
import { useTimestampConverter } from './useTimestampConverter';
import { describe, it, expect } from 'vitest';

describe('useTimestampConverter', () => {
    it('should initialize with current time', () => {
        const { result } = renderHook(() => useTimestampConverter());
        expect(result.current.now).toBeGreaterThan(0);
        expect(result.current.epochInput).toBe('');
    });

    it('should convert epoch to human date', () => {
        const { result } = renderHook(() => useTimestampConverter());

        // 1716200000 -> 2024-05-20
        act(() => {
            result.current.convertToHuman('1716200000');
        });

        expect(result.current.outputs.toHuman).toContain('Mon, 20 May 2024');
    });

    it('should handle invalid epoch', () => {
        const { result } = renderHook(() => useTimestampConverter());

        act(() => {
            // @ts-ignore - simulating bad input
            result.current.convertToHuman('invalid');
        });

        expect(result.current.outputs.toHuman).toBe('Invalid Date');
    });

    it('should convert human date to epoch', () => {
        const { result } = renderHook(() => useTimestampConverter());

        act(() => {
            result.current.convertToEpoch('2024-05-20T12:00:00');
        });

        // May 20 2024 12:00:00 UTC is 1716206400. Local time will vary but epoch should be valid number string
        expect(Number(result.current.outputs.toEpoch)).toBeGreaterThan(0);
    });
});
