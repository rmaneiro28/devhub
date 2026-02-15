
import { renderHook, act } from '@testing-library/react';
import { useCaseConverter } from './useCaseConverter';
import { describe, it, expect } from 'vitest';

describe('useCaseConverter', () => {
    it('should initialize with empty state', () => {
        const { result } = renderHook(() => useCaseConverter());
        expect(result.current.input).toBe('');
        expect(result.current.outputs.camel).toBe('');
    });

    it('should convert text to all cases', () => {
        const { result } = renderHook(() => useCaseConverter());

        act(() => {
            result.current.setInput('hello world');
        });

        expect(result.current.outputs.camel).toBe('helloWorld');
        expect(result.current.outputs.snake).toBe('hello_world');
        expect(result.current.outputs.kebab).toBe('hello-world');
        expect(result.current.outputs.pascal).toBe('HelloWorld');
        expect(result.current.outputs.constant).toBe('HELLO_WORLD');
    });

    it('should handle mixed input', () => {
        const { result } = renderHook(() => useCaseConverter());

        act(() => {
            result.current.setInput('one_two-Three');
        });

        expect(result.current.outputs.camel).toBe('oneTwoThree');
        expect(result.current.outputs.snake).toBe('one_two_three');
    });

    it('should clear outputs on empty input', () => {
        const { result } = renderHook(() => useCaseConverter());

        act(() => {
            result.current.setInput('test');
        });
        expect(result.current.outputs.camel).toBe('test');

        act(() => {
            result.current.setInput('');
        });
        expect(result.current.outputs.camel).toBe('');
    });
});
