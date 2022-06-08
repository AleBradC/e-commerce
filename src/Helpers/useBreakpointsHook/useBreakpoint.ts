import { useEffect, useState } from 'react'
import breakpoints from './breakpoints'

export interface BreakpointProps {
  width: number
  height: number
}

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState('')
  const [windowSize, setWindowSize] = useState<BreakpointProps>({
    width: 0,
    height: 0,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    if (0 < windowSize.width && windowSize.width < 350) {
      setBreakPoint(breakpoints[0])
    }
    if (350 < windowSize.width && windowSize.width < 700) {
      setBreakPoint(breakpoints[350])
    }
    if (700 < windowSize.width && windowSize.width < 1025) {
      setBreakPoint(breakpoints[700])
    }
    if (1025 < windowSize.width && windowSize.width < 1921) {
      setBreakPoint(breakpoints[1025])
    }
    if (windowSize.width >= 1921) {
      setBreakPoint(breakpoints[1921])
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [windowSize.width])
  return breakpoint
}

export default useBreakpoint
