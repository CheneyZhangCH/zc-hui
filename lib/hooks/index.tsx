import { useEffect, useRef } from 'react'

export const useUpdate = <T, K extends Function>(dep: T, fn: K) => {
  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      return
    }
    fn()
  }, [dep])
}
