import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { SlideType } from '../../helpers/types'
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
      sliders={sliders.map(({ image, redirectLink, content, button }, index) => (
        <Slide key={index}>
          <Container bgImg={image}>
            <Body>
              <Content> {content} </Content>
              <Button onClick={() => handleRedirect(redirectLink)}> {button} </Button>
            </Body>
            <Footer>
              {sliders.map((_, index) => (
                <SlideProgressBar key={index} onClick={() => setActiveIndex(index)} isActive={activeIndex === index} />
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
  background-size: 100%;
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

const SlideProgressBar = styled.button<{ isActive: boolean }>`
  display: inline-block;
  margin: 15px 7px 0;
  padding: 0;
  height: 4px;
  width: 6%;

  border-radius: 50px;
  border: none;

  background-color: ${props => props.theme.colors.white2}
    ${props =>
      props.isActive &&
      css`
        background-color: ${props => props.theme.colors.white};
      `};
`
