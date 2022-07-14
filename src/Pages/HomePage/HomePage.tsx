import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useGetNewArrivalsProductsQuery } from '../../redux/api'
import { logInRoute, allProductsRoute } from '../../Helpers/routes'
import { ProductCard } from '../../Components/ProductCard/ProductCard'
import { Slider } from '../../Components/Slider/Slider'
import { Slide } from '../../Components/Slider/Components/Slide'
import { Button } from '../../Components/Button/Button'

import SliderImg1 from '../../assets/homePage/slider/banner1.jpg'
import SliderImg2 from '../../assets/homePage/slider/banner2.jpg'
import SliderImg3 from '../../assets/homePage/slider/banner3.jpg'
import SliderImg4 from '../../assets/homePage/slider/banner4.png'

import BeautySectionImg1 from '../../assets/homePage/beauty-section-img1.png'
import BeautySectionImg2 from '../../assets/homePage/beauty-section-img2.png'
import BeautySectionImg3 from '../../assets/homePage/beauty-section-img3.png'

import SummerEssentialsImg from '../../assets/homePage/carrousel-image-essentials.png'

import CarrouselImg1 from '../../assets/homePage/carrousel/carrousel-item1.png'
import CarrouselImg2 from '../../assets/homePage/carrousel/carrousel-item2.png'
import CarrouselImg3 from '../../assets/homePage/carrousel/carrousel-item3.jpg'

const sliders = [
  {
    image: SliderImg1,
    content: 'JOIN THE PARTY AND GET REWARDED',
    button: 'REGISTER',
    redirectLink: logInRoute,
  },
  {
    image: SliderImg2,
    content: 'CUSTOMER APPROVED BEST SELLERS',
    button: 'SHOP NOW',
    redirectLink: allProductsRoute,
  },
  {
    image: SliderImg3,
    content: 'EXPLORE SCANDINAVIAN SKINCARE',
    button: 'SHOP NOW',
    redirectLink: allProductsRoute,
  },
  {
    image: SliderImg4,
    content: 'CLEAN SUN PROTECTION',
    button: 'SHOP NOW',
    redirectLink: allProductsRoute,
  },
]

const carrousel = [
  {
    image: CarrouselImg1,
    topContent: 'Niacinamide (Vitamin B3)',
    middleContent: 'Lactic Acid',
    bottomContent: 'Hyaluronic Acid',
    productBrand: 'ELTAMD',
    productName: 'UV REPLENISH Broad-Spectrum SPF 44',
    rating: 5,
  },
  {
    image: CarrouselImg2,
    productBrand: 'WESTMAN ATELIER',
    productName: 'Squeaky Clean Liquid Lip Balm',
    topContent: 'Organic Jojoba',
    middleContent: 'Shea Butter',
    bottomContent: 'Plant-Based Seed Oils',
  },
  {
    image: CarrouselImg3,
    productBrand: 'DR. BARBARA STURM',
    productName: 'Glow Drops',
    rating: 5,
    topContent: 'Vitamin C',
    middleContent: 'Wild Rose Extract',
    bottomContent: 'Polygonum Bistorta Root',
  },
]

const HomePage = () => {
  const navigate = useNavigate()

  const [isActiveDotButton, setIsActiveDotButton] = useState(0)

  const { data: newArrivalProducts } = useGetNewArrivalsProductsQuery()

  const handleRedirect = (route: string) => {
    navigate(route)
  }

  const handleChangeActiveDotButton = (index: number) => {
    setIsActiveDotButton(index)
  }

  return (
    <Container>
      <SliderSection>
        <Slider
          delay={3200}
          sliders={sliders.map((slide, index) => (
            <Slide key={index}>
              <SlideContainer bgImg={slide.image}>
                <SlideBody>
                  <SlideContent> {slide.content} </SlideContent>
                  <Button onClick={() => handleRedirect(slide.redirectLink)}> {slide.button} </Button>
                </SlideBody>
                <SlideFooter>
                  {sliders.map((_, index) => (
                    <SlideBar key={index}></SlideBar>
                  ))}
                </SlideFooter>
              </SlideContainer>
            </Slide>
          ))}
        />
      </SliderSection>

      <NewArrivalSection>
        <NewArrivalHeader>
          <NewArrivalTitle>What’s New</NewArrivalTitle>
          <NewArrivalButton> SHOP NEW ARRIVALS </NewArrivalButton>
        </NewArrivalHeader>
        <ProductsList>
          {newArrivalProducts?.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              brand={product.brand}
              name={product.name}
              tags={product.tags}
              imageURL={product.imageURL}
              hoverImageURL={product.hoverImageURL}
              rating={product.rating}
              price={product.price}
            />
          ))}
        </ProductsList>
      </NewArrivalSection>

      <BeautyStoreSection>
        <BeautyStoreSectionTitle>
          Brooklyn`s Original Beauty Store. Curating the cool, the essential, and the unexpected.
        </BeautyStoreSectionTitle>

        <BeautyStoreSectionBody>
          <BeautyStoreFirstSection>
            <LeftImage src={BeautySectionImg1} alt="beauty-section-img" />
            <RightContainer>
              <RightContainerImage src={BeautySectionImg2} alt="beauty-section-img" />
              <RightContainerContent>
                <Content>
                  Want to brighten your skin, reduce blemishes, boost hydration or fight the signs of aging? We’ve got
                  you covered.
                </Content>
                <AntiAgingButton> SHOP ANTI-AGING</AntiAgingButton>
              </RightContainerContent>
            </RightContainer>
          </BeautyStoreFirstSection>

          <BeautyStoreSecondSection>
            <BeautyStoreSecondSectionContent>
              <Title>SHEN Exclusive: IDEO Skincare</Title>
              <Content>
                The Skin Memory Serum is a first-ever anti-aging serum with proprietary RMA Complex to target the
                visible signs of aging—discoloration, lines, unevenness, and laxity.
              </Content>
              <Button> THE SKIN MEMORY SERUM </Button>
            </BeautyStoreSecondSectionContent>
            <img src={BeautySectionImg3} alt="beauty-section-img" />
          </BeautyStoreSecondSection>
        </BeautyStoreSectionBody>
      </BeautyStoreSection>

      <SummerEssentialsSection>
        <LeftSummerEssentialsSection>
          <SummerEssentialsImage src={SummerEssentialsImg} />
          <TopDotButtonContainer isActive={isActiveDotButton === 0}>
            <DotButton onClick={() => handleChangeActiveDotButton(0)} />
          </TopDotButtonContainer>
          <MiddleDotButtonContainer isActive={isActiveDotButton === 1}>
            <DotButton onClick={() => handleChangeActiveDotButton(1)} />
          </MiddleDotButtonContainer>
          <BottomDotButtonContainer isActive={isActiveDotButton === 2}>
            <DotButton onClick={() => handleChangeActiveDotButton(2)} />
          </BottomDotButtonContainer>
        </LeftSummerEssentialsSection>

        <RightSummerEssentialsSection>
          <CarrouselTitle> Summer Glow Essentials </CarrouselTitle>
          <Slider
            sliders={carrousel.map(carrouselItem => (
              <Slide key={carrouselItem.productName}>
                <Carrousel>
                  <CarrouselBody>
                    <CarrouselTopContent> {carrouselItem.topContent} </CarrouselTopContent>
                    <CarrouselMiddleContent> {carrouselItem.middleContent} </CarrouselMiddleContent>
                    <CarrouselBottomContent> {carrouselItem.bottomContent} </CarrouselBottomContent>
                    <CarrouselImage src={carrouselItem.image} />
                  </CarrouselBody>
                  <CarrouselFooter>
                    <ProductDetails>
                      <LeftArrow>x</LeftArrow>
                      <ProductBrand> {carrouselItem.productBrand} </ProductBrand>
                      <ProductName> {carrouselItem.productName} </ProductName>
                      <RightArrow>x</RightArrow>
                    </ProductDetails>
                    <Button> SHOP THE ROUTINE </Button>
                  </CarrouselFooter>
                </Carrousel>
              </Slide>
            ))}
          />
        </RightSummerEssentialsSection>
      </SummerEssentialsSection>

      <TestimonialSection></TestimonialSection>

      <ServicesSection></ServicesSection>

      <BlogSection></BlogSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const SliderSection = styled.div`
  margin-bottom: 62px;
  width: 100%;
  height: 100%;
`

const SlideContainer = styled.div<{ bgImg?: string }>`
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

const SlideBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;

  border-top: 1px solid ${props => props.theme.colors.white};
`

const SlideContent = styled.div`
  font-size: 38px;
  font-family: 'Optima', sans-serif;
  letter-spacing: 4px;

  color: ${props => props.theme.colors.white};
`

const SlideFooter = styled.div`
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

const NewArrivalSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px 0 40px;
  margin-bottom: 62px;
`

const NewArrivalHeader = styled.div`
  display: flex;
  align-items: center;
`

const NewArrivalTitle = styled.div`
  padding: 24px;

  font-family: 'Optima', sans-serif;
  font-size: 42px;
  line-height: 1.11;
`

const NewArrivalButton = styled.div`
  padding-bottom: 6px;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme.colors.black};
  border-bottom: 1px solid ${props => props.theme.colors.black};

  &:hover {
    color: ${props => props.theme.colors.greyDark};
    border-bottom: 1px solid ${props => props.theme.colors.greyDark};
  }
`

const ProductsList = styled.div`
  display: flex;
  justify-content: space-between;
`

const BeautyStoreSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 62px;
`

const BeautyStoreSectionTitle = styled.div`
  max-width: 652px;
  margin: 48px auto;

  font-family: 'Optima', sans-serif;
  font-size: 36px;
  line-height: 1.11;
  text-align: center;
`

const BeautyStoreSectionBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 20px;
`

const BeautyStoreFirstSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 161px 178px 46px 68px;

  &:before {
    content: '';
    position: absolute;
    top: 28px;
    left: calc(50% + 10px);
    transform: translate(-50%);
    width: 2px;
    height: 95px;

    background-color: ${props => props.theme.colors.greyLight};
  }
`

const LeftImage = styled.img`
  padding: 0 78px;
  margin-bottom: 0;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 86px 20px;
`

const RightContainerImage = styled.img`
  padding-right: 0;
  margin-bottom: 65px;
`

const RightContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 41px;

  font-family: 'Optima', sans-serif;
  font-size: 20px;
  line-height: 1.5;
  text-align: left;
`

const AntiAgingButton = styled.div`
  padding-bottom: 6px;

  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme.colors.black};
  border-bottom: 1px solid ${props => props.theme.colors.black};

  &:hover {
    color: ${props => props.theme.colors.greyDark};
    border-bottom: 1px solid ${props => props.theme.colors.greyDark};
  }
`

const BeautyStoreSecondSection = styled.div`
  display: flex;
  padding: 20px;
`

const BeautyStoreSecondSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 48px 0 0;
`

const Title = styled.div`
  font-family: 'Optima', sans-serif;
  margin-bottom: 25px;
  line-height: 1.21;
  font-size: 48px;
`

const Content = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  margin-bottom: 25px;
`

const SummerEssentialsSection = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 62px;
  padding: 70px 0;
`

const LeftSummerEssentialsSection = styled.div`
  height: 100%;
  max-width: 50%;
`

const SummerEssentialsImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  object-position: center;
`

const TopDotButtonContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 28%;
  left: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 30px;
  height: 30px;
  border-radius: 100%;

  border: 2px solid ${props => (props.isActive ? props.theme.colors.white : 'transparent')};
`

const MiddleDotButtonContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 40%;
  left: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 30px;
  height: 30px;
  border-radius: 100%;

  border: 2px solid ${props => (props.isActive ? props.theme.colors.white : 'transparent')};
`

const BottomDotButtonContainer = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 55%;
  left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 30px;
  height: 30px;
  border-radius: 100%;

  border: 2px solid ${props => (props.isActive ? props.theme.colors.white : 'transparent')};
`

const DotButton = styled.button`
  width: 15px;
  height: 15px;

  border-radius: 100%;
  border: none;
  background: ${props => props.theme.colors.white};
`

const RightSummerEssentialsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px 0 42px;

  background-image: linear-gradient(${props => props.theme.colors.white} 10%, rgba(248, 235, 227, 0.8) 100%);
`

const CarrouselTitle = styled.div`
  margin-bottom: 38px;
  font-family: 'Optima', sans-serif;
  line-height: 1.21;
  font-size: 48px;
`

const Carrousel = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: auto;
`

const CarrouselBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CarrouselTopContent = styled.div`
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

const CarrouselMiddleContent = styled.div`
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

const CarrouselBottomContent = styled.div`
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

const CarrouselImage = styled.img`
  max-width: 268px;
  width: 100%;
  height: 296px;
  object-fit: contain;
  object-position: center;
`

const CarrouselFooter = styled.div`
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

const LeftArrow = styled.div``
const RightArrow = styled.div``

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

const TestimonialSection = styled.div`
  margin-bottom: 62px;
`

const ServicesSection = styled.div`
  margin-bottom: 62px;
`

const BlogSection = styled.div`
  margin-bottom: 62px;
`

export default HomePage
