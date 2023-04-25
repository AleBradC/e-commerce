import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { CarouselItemType } from '../../helpers/types'
import { Slide } from '../Slider/Components/Slide'
import { Button } from '../Button/Button'
import { Slider } from '../Slider/Slider'

import LeftArrowImg from '../../assets/icons/left-arrow.png'
import RightArrowImg from '../../assets/icons/right-arrow.png'

export interface CarouselProps {
  carouselSliders: CarouselItemType[]
  carouselActiveIndex: number
  setCarouselActiveIndex: (index: any) => void
}

export const Carousel: React.FC<CarouselProps> = ({ carouselSliders, carouselActiveIndex, setCarouselActiveIndex }) => {
  const navigate = useNavigate()

  const handleUpdateCarouselIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = carouselSliders.length - 1
    } else if (newIndex >= carouselSliders.length) {
      newIndex = 0
    }

    setCarouselActiveIndex(newIndex)
  }

  const redirectToRoutine = (productId: number) => {
    if (!productId) {
      return null
    }

    navigate(`/product/${productId}`)
  }

  return (
    <Slider
      sliderActiveIndex={carouselActiveIndex}
      sliders={carouselSliders.map(
        ({ topContent, middleContent, bottomContent, image, productBrand, productName, id }, index) => (
          <Slide key={index}>
            <Container>
              <Body>
                <TopContent> {topContent} </TopContent>
                <MiddleContent> {middleContent} </MiddleContent>
                <BottomContent> {bottomContent} </BottomContent>
                <CarouselImage src={image} />
              </Body>
              <Footer>
                <ProductDetails>
                  <LeftArrow onClick={() => handleUpdateCarouselIndex(carouselActiveIndex - 1)}>
                    <ArrowImg src={LeftArrowImg} />
                  </LeftArrow>
                  <ProductBrand> {productBrand} </ProductBrand>
                  <ProductName> {productName} </ProductName>
                  <RightArrow onClick={() => handleUpdateCarouselIndex(carouselActiveIndex + 1)}>
                    <ArrowImg src={RightArrowImg} />
                  </RightArrow>
                </ProductDetails>
                <Button onClick={() => redirectToRoutine(id)}> SHOP THE ROUTINE </Button>
              </Footer>
            </Container>
          </Slide>
        )
      )}
    />
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: auto;
`

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TopContent = styled.div`
  position: absolute;
  right: calc(50% + 142px);
  bottom: 80%;
  left: auto;
  transform: translateY(50%);
  margin-left: auto;
  padding-right: 26px;
  padding-bottom: 3px;
  max-width: 100%;
  word-break: break-word;

  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid ${props => props.theme.colors.brown};
`

const MiddleContent = styled.div`
  position: absolute;
  left: calc(50% + 142px);
  bottom: 62%;
  right: auto;
  transform: translateY(50%);
  margin-left: auto;
  padding-left: 26px;
  padding-bottom: 3px;
  max-width: 100%;
  word-break: break-word;

  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid ${props => props.theme.colors.brown};
`

const BottomContent = styled.div`
  position: absolute;
  right: calc(50% + 113px);
  bottom: 20%;
  left: auto;
  transform: translateY(-50%);
  margin-left: auto;
  padding-right: 26px;
  padding-bottom: 3px;
  max-width: 100%;
  word-break: break-word;

  font-family: 'Montserrat', sans-serif;
  border-bottom: 1px solid ${props => props.theme.colors.brown};
`

const CarouselImage = styled.img`
  max-width: 268px;
  width: 100%;
  height: 296px;
  object-fit: contain;
  object-position: center;
`

const Footer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 64px;
`

const ArrowImg = styled.img`
  width: 30px;
  height: 30px;
`

const LeftArrow = styled.button`
  position: absolute;
  left: 48px;

  border: none;
  background: none;
`

const RightArrow = styled.button`
  position: absolute;
  right: 48px;

  border: none;
  background: none;
`

const ProductBrand = styled.div`
  margin-bottom: 6px;

  font-family: 'Montserrat', sans-serif;
  color: ${props => props.theme.colors.grey4};
`

const ProductName = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`
