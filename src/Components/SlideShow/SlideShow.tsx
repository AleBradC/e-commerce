import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { SlideType } from '../../types'
import { Button } from '../Button/Button'
import { Slider } from '../Slider/Slider'
import { Slide } from '../Slider/Components/Slide'

export interface SlideShowProps {
  delay: number
  sliders: SlideType[]
}

export const SlideShow: React.FC<SlideShowProps> = ({ delay, sliders }) => {
  const navigate = useNavigate()

  const [activeIndex, setActiveIndex] = useState(0)

  const handleRedirect = (route: string) => {
    navigate(route)
  }

  return (
    <Slider
      sliderActiveIndex={activeIndex}
      setSliderActiveIndex={setActiveIndex}
      delay={delay}
      sliders={sliders.map((slide, index) => (
        <Slide key={index}>
          <Container bgImg={slide.image}>
            <Body>
              <Content> {slide.content} </Content>
              <Button onClick={() => handleRedirect(slide.redirectLink)}> {slide.button} </Button>
            </Body>
            <Footer>
              {sliders.map((_, index) => (
                <SlideBar key={index}></SlideBar>
              ))}
            </Footer>
          </Container>
        </Slide>
      ))}
    />
  )
}

const Container = styled.div<{ bgImg?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 36px 46px 36px;
  height: 676px;

  object-fit: cover;
  background-image: url(${props => props.bgImg});
  background-repeat: no-repeat;
  background-size: auto;
`

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;

  border-top: 1px solid ${props => props.theme.colors.white};
`

const Content = styled.div`
  font-size: 38px;
  font-family: 'Optima', sans-serif;
  letter-spacing: 4px;

  color: ${props => props.theme.colors.white};
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  width: 100%;
`

const SlideBar = styled.div`
  display: inline-block;
  margin: 15px 7px 0;
  height: 3px;
  width: 6%;

  border-radius: 50px;
  background-color: ${props => props.theme.colors.white2};
`
