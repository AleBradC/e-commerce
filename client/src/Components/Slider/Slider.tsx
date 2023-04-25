import React, { useEffect } from 'react'
import styled from 'styled-components'

import { SlideType } from '../../helpers/types'

export interface SliderProps {
  sliders: SlideType[] | any
  sliderActiveIndex: number
  setSliderActiveIndex?: (prevIndex: any) => void
  delay?: number
}

export const Slider: React.FC<SliderProps> = ({ sliders, sliderActiveIndex, setSliderActiveIndex, delay }) => {
  useEffect(() => {
    if (delay) {
      const interval = setInterval(() => {
        setSliderActiveIndex &&
          setSliderActiveIndex((prevIndex: number) => (prevIndex === sliders.length - 1 ? 0 : prevIndex + 1))
      }, delay)

      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
    }
  })

  return (
    <Container>
      <InnerContainer style={{ transform: `translateX(${-sliderActiveIndex * 100}%)` }}>{sliders}</InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;

  cursor: pointer;
`

const InnerContainer = styled.div`
  white-space: nowrap;
  transition: transform 0.3s;
`
