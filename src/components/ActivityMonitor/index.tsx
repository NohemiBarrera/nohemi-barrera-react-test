import { useEffect, useRef } from 'react'

interface ActivityMonitorProps {
  timeout: number
  onInactive: () => void
}

export const ActivityMonitor: React.FC<ActivityMonitorProps> = ({ timeout, onInactive }) => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(onInactive, timeout)
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

    events.forEach(event => {
      document.addEventListener(event, resetTimer)
    })

    resetTimer()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      events.forEach(event => {
        document.removeEventListener(event, resetTimer)
      })
    }
  }, [timeout, onInactive])

  return null
}