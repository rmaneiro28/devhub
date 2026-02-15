
import { renderHook, act } from '@testing-library/react';
import { useQrGenerator } from './useQrGenerator';
import { describe, it, expect } from 'vitest';

describe('useQrGenerator', () => {
    it('should initialize with default values', () => {
        const { result } = renderHook(() => useQrGenerator());
        expect(result.current.input).toBe('');
        expect(result.current.qrValue).toBe('');
        expect(result.current.size).toBe(256);
    });

    it('should generate QR code value', () => {
        const { result } = renderHook(() => useQrGenerator());

        act(() => {
            result.current.setInput('https://example.com');
        });

        act(() => {
            result.current.generate();
        });

        expect(result.current.qrValue).toBe('https://example.com');
    });

    it('should update size', () => {
        const { result } = renderHook(() => useQrGenerator());
        act(() => {
            result.current.setSize(512);
        });
        expect(result.current.size).toBe(512);
    });
});
