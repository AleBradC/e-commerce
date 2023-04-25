import styled, { css } from 'styled-components'

import { ComplexCarouselType } from '../../helpers/types'
import { Slide } from '../Slider/Components/Slide'
import { Slider } from '../Slider/Slider'

import LeftArrowImg from '../../assets/icons/left-arrow.png'
import RightArrowImg from '../../assets/icons/right-arrow.png'

export interface ComplexCarouselProps {
  delay: number
  complexCarouselIndex: number
  complexCarouselSliders: ComplexCarouselType[]
  setComplexCarouselIndex: (index: any) => void
}

export const ComplexCarousel: React.FC<ComplexCarouselProps> = ({
  delay,
  complexCarouselSliders,
  complexCarouselIndex,
  setComplexCarouselIndex,
}) => {
  const handleUpdateCarouselIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = complexCarouselSliders.length - 1
    } else if (newIndex >= complexCarouselSliders.length) {
      newIndex = 0
    }

    setComplexCarouselIndex(newIndex)
  }

  return (
    <Slider
      delay={delay}
      sliderActiveIndex={complexCarouselIndex}
      setSliderActiveIndex={setComplexCarouselIndex}
      sliders={complexCarouselSliders.map(({ imageLogo, content }, index) => (
        <Slide key={index}>
          <Container>
            <Body>
              <LeftArrow onClick={() => handleUpdateCarouselIndex(complexCarouselIndex - 1)}>
                <ArrowImg src={LeftArrowImg} />
              </LeftArrow>
              <ImageContainer>
                <ImageLogo src={imageLogo} />
              </ImageContainer>
              <Content>{content}</Content>
              <RightArrow onClick={() => handleUpdateCarouselIndex(complexCarouselIndex + 1)}>
                <ArrowImg src={RightArrowImg} />
              </RightArrow>
            </Body>

            <Footer>
              {complexCarouselSliders.map((_, index) => (
                <SlideProgressBar
                  key={index}
                  onClick={() => setComplexCarouselIndex(index)}
                  isActive={complexCarouselIndex === index}
                />
              ))}
            </Footer>
          </Container>
        </Slide>
      ))}
    />
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 60px;
`

const ImageLogo = styled.img`
  max-width: 130px;
  width: 100%;
`

const Content = styled.div`
  max-width: 993px;
  margin: 0 48px 48px 48px;
  white-space: pre-wrap;
  text-align: center;
  font-style: italic;

  font-size: 28px;
  line-height: 1.32;
  font-family: 'Optima', sans-serif;
`

const ArrowImg = styled.img`
  width: 30px;
  height: 30px;
`

const LeftArrow = styled.button`
  position: absolute;
  top: 16px;
  left: 62px;

  border: none;
  background: none;
`

const RightArrow = styled.button`
  position: absolute;
  top: 16px;
  right: 62px;

  border: none;
  background: none;
`

const Footer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 24px;
`

const SlideProgressBar = styled.button<{ isActive: boolean }>`
  display: inline-block;
  margin: 15px 7px 0;
  padding: 0;
  height: 4px;
  width: 4%;

  border-radius: 50px;
  border: none;

  background-color: ${props => props.theme.colors.white2};
  ${props =>
    props.isActive &&
    css`
      background-color: ${props => props.theme.colors.brown};
    `};
`
