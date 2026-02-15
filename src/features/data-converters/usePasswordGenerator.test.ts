
import { renderHook, act } from '@testing-library/react';
import { usePasswordGenerator } from './usePasswordGenerator';
import { describe, it, expect } from 'vitest';

describe('usePasswordGenerator', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => usePasswordGenerator());
        expect(result.current.length).toBe(16);
        expect(result.current.lowercase).toBe(true);
        expect(result.current.uppercase).toBe(true);
        expect(result.current.numbers).toBe(true);
        expect(result.current.symbols).toBe(true);
    });

    it('should generate password of correct length', () => {
        const { result } = renderHook(() => usePasswordGenerator());

        act(() => {
            result.current.setLength(10);
            result.current.generate();
        });

        expect(result.current.password).toHaveLength(10);
    });

    it('should handle character type options', () => {
        const { result } = renderHook(() => usePasswordGenerator());

        act(() => {
            result.current.setLowercase(false);
            result.current.setUppercase(false);
            result.current.setNumbers(true); // Only numbers
            result.current.setSymbols(false);
            result.current.generate();
        });

        expect(result.current.password).toMatch(/^\d+$/);
    });

    it('should show error if no charset selected', () => {
        const { result } = renderHook(() => usePasswordGenerator());

        act(() => {
            result.current.setLowercase(false);
            result.current.setUppercase(false);
            result.current.setNumbers(false);
            result.current.setSymbols(false);
            result.current.generate();
        });

        expect(result.current.error).not.toBeNull();
    });
});
