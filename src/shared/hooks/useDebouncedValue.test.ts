import { act, renderHook } from '@testing-library/react-native';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('rick', 400));

    expect(result.current).toBe('rick');
  });

  it('updates only after the delay', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebouncedValue(value, 400),
      {
        initialProps: { value: 'rick' },
      },
    );

    rerender({ value: 'morty' });

    expect(result.current).toBe('rick');

    act(() => {
      jest.advanceTimersByTime(399);
    });

    expect(result.current).toBe('rick');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('morty');
  });

  it('cancels the previous timeout when value changes again', () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebouncedValue(value, 400),
      {
        initialProps: { value: 'rick' },
      },
    );

    rerender({ value: 'morty' });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'summer' });

    act(() => {
      jest.advanceTimersByTime(399);
    });

    expect(result.current).toBe('rick');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('summer');
  });
});
