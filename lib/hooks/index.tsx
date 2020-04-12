import { useEffect, useRef } from 'react'

export const useUpdate = (dep: boolean, fn: () => void) => {
  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      return
    }
    fn()
  }, [dep])
}

