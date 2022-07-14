import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export interface SliderProps {
  sliders: string[] | any
  delay?: number
}

export const Slider: React.FC<SliderProps> = ({ sliders, delay }) => {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    if (delay) {
      setTimeout(() => setIndex(prevIndex => (prevIndex === sliders.length - 1 ? 0 : prevIndex + 1)), delay)
      return () => {
        resetTimeout()
      }
    }
  }, [delay, index])

  return (
    <SlideShow>
      <SlideShowSlider style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>{sliders}</SlideShowSlider>
    </SlideShow>
  )
}

const SlideShow = styled.div`
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
`

const SlideShowSlider = styled.div`
  width: 100%;
  white-space: nowrap;
  transition: ease 1000ms;
`
