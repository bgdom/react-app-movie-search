import { renderHook, act } from '@testing-library/react'
import { useDelay } from './customHooks'

jest.useFakeTimers();

interface RenderProps {
  delayTimeMillisecond: number,
  override: boolean
}

describe('useDelay', () => {
  it('should delay one action', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDelay(2000, false))

    act(() => result.current(callback))
    jest.advanceTimersByTime(2000)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should delay all actions', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDelay(2000, false))

    act(() => result.current(callback))

    jest.advanceTimersByTime(1000)

    act(() => result.current(callback))
    jest.advanceTimersByTime(1001)

    expect(callback).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1001)
    expect(callback).toHaveBeenCalledTimes(2)

  })

  it('should override delay action if called before delay', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDelay(2000, true))

    act(() => result.current(callback))
    jest.advanceTimersByTime(1000)

    act(() => result.current(callback))
    jest.advanceTimersByTime(2000)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should keep same function reference', () => {
    const { result, rerender } = renderHook((props: RenderProps) => useDelay(props.delayTimeMillisecond, props.override), {
      initialProps: {
        delayTimeMillisecond: 1000,
        override: false
      }
    })

    const firstRef = result.current;
    rerender({
      delayTimeMillisecond: 1000,
      override: false
    })
    const secondRef = result.current
    expect(firstRef).toEqual(secondRef)

    rerender({
      delayTimeMillisecond: 2000,
      override: false
    })

    const thirdRef = result.current
    expect(secondRef).not.toEqual(thirdRef)

    rerender({
      delayTimeMillisecond: 2000,
      override: true
    })

    const fourthRef = result.current
    expect(thirdRef).not.toEqual(fourthRef)

    const callback = jest.fn()
    act(() => fourthRef(callback))

    const fifthRef = result.current
    expect(fourthRef).not.toEqual(fifthRef)

    rerender({
      delayTimeMillisecond: 2000,
      override: true
    })
    const sixthRef = result.current
    expect(fifthRef).toEqual(sixthRef)

    jest.advanceTimersByTime(1000)
    act(() => sixthRef(callback))

    expect(result.current).not.toEqual(sixthRef)
  })
})