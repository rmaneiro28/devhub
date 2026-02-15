import { renderHook, act } from '@testing-library/react';
import { useSqlMapper } from './useSqlMapper';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';

describe('useSqlMapper', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should generate TypeScript interface from SQL', async () => {
        const { result } = renderHook(() => useSqlMapper());

        const sqlInput = `CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50)
    );`;

        let generatedCodePromise;

        act(() => {
            generatedCodePromise = result.current.generateCode(sqlInput);
        });

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        const generatedCode = await generatedCodePromise;

        expect(generatedCode).toContain('interface User');
        expect(generatedCode).toContain('id: number;');
        expect(generatedCode).toContain('username: string;');
    });

    it('should handle invalid SQL gracefully', async () => {
        const { result } = renderHook(() => useSqlMapper());

        let generatedCodePromise;

        act(() => {
            // @ts-ignore
            generatedCodePromise = result.current.generateCode('INVALID SQL');
        });

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        const generatedCode = await generatedCodePromise;

        // The parser is permissive and defaults to "Unknown" table if not found
        expect(generatedCode).toContain('interface Unknown');
    });
});
