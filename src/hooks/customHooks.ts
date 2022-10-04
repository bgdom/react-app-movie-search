import { useCallback, useState } from 'react'

export const useDelay = (delayTimeMillisecond: number, override: boolean) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return useCallback((action: () => void) => {
    if (override && timeoutId)
      clearTimeout(timeoutId)
    
    setTimeoutId(setTimeout(action, delayTimeMillisecond))
  }, [timeoutId, delayTimeMillisecond, override])
}