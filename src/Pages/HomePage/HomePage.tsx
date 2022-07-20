import { useState } from 'react'
import styled, { css } from 'styled-components'

import { BeautySectionImg1, BeautySectionImg2, BeautySectionImg3, SummerEssentialsImg } from './utils/images'
import {
  blogPosts,
  carouselSliders,
  complexCarouselSliders,
  sliders,
  spaServicesContent,
  spaServicesImages,
} from './utils/constants'

import { useGetNewArrivalsProductsQuery } from '../../redux/api'
import { ProductCard } from '../../Components/ProductCard/ProductCard'
import { Button } from '../../Components/Button/Button'
import { Carousel } from '../../Components/Carousel/Carousel'
import { SlideShow } from '../../Components/SlideShow/SlideShow'
import { ComplexCarousel } from '../../Components/ComplexCarousel/ComplexCarousel'

const HomePage = () => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number | any>(0)
  const [complexCarouselActiveIndex, setComplexCarouselActiveIndex] = useState<number | any>(0)
  const [spaServiceActiveIndex, setSpaServicesActiveIndex] = useState(0)

  const { data: newArrivalProducts } = useGetNewArrivalsProductsQuery()

  const handleChangeSpaServicesImage = (index: number) => {
    setSpaServicesActiveIndex(index)
  }

  return (
    <Container>
      <SliderSection>
        <SlideShow sliders={sliders} delay={2500} />
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
            <BeautyStoreSecondSectionImage src={BeautySectionImg3} alt="beauty-section-img" />
          </BeautyStoreSecondSection>
        </BeautyStoreSectionBody>
      </BeautyStoreSection>
      <SummerEssentialsSection>
        <LeftSummerEssentialsSection>
          <SummerEssentialsImage src={SummerEssentialsImg} />
          <TopDotButtonContainer isActive={activeCarouselIndex === 0}>
            <DotButton onClick={() => setActiveCarouselIndex(0)} />
          </TopDotButtonContainer>
          <MiddleDotButtonContainer isActive={activeCarouselIndex === 1}>
            <DotButton onClick={() => setActiveCarouselIndex(1)} />
          </MiddleDotButtonContainer>
          <BottomDotButtonContainer isActive={activeCarouselIndex === 2}>
            <DotButton onClick={() => setActiveCarouselIndex(2)} />
          </BottomDotButtonContainer>
        </LeftSummerEssentialsSection>

        <RightSummerEssentialsSection>
          <CarouselTitle> Summer Glow Essentials </CarouselTitle>
          <Carousel
            carouselSliders={carouselSliders}
            carouselActiveIndex={activeCarouselIndex}
            setCarouselActiveIndex={setActiveCarouselIndex}
          />
        </RightSummerEssentialsSection>
      </SummerEssentialsSection>
      <TestimonialSection>
        <ComplexCarousel
          delay={3000}
          complexCarouselSliders={complexCarouselSliders}
          complexCarouselIndex={complexCarouselActiveIndex}
          setComplexCarouselIndex={setComplexCarouselActiveIndex}
        />
      </TestimonialSection>

      <SpaServicesSection>
        <SpaSectionLeftContainer>
          <SpaSectionTitle> Spa Services </SpaSectionTitle>
          <SpaSectionDescription>
            Luxury facials, makeup application, waxing and brow shaping and so much more to meet your beauty needs.{' '}
          </SpaSectionDescription>
          <SpaSectionServicesContainer>
            {spaServicesContent.map((spaService, index) => (
              <SpaServiceItem
                key={index}
                onMouseOver={() => handleChangeSpaServicesImage(index)}
                isActive={index === spaServiceActiveIndex}
              >
                <SpaServiceLabel isActive={index === spaServiceActiveIndex}>{spaService.label}</SpaServiceLabel>
                <SpaServiceContent isActive={index === spaServiceActiveIndex}>{spaService.content}</SpaServiceContent>
              </SpaServiceItem>
            ))}
          </SpaSectionServicesContainer>
        </SpaSectionLeftContainer>
        <SpaSectionRightContainer>
          {spaServicesImages.map((image, index) => (
            <SpaServiceImageContainer isVisible={index === spaServiceActiveIndex} key={index}>
              <SpaServiceImage
                key={index}
                isVisible={index === spaServiceActiveIndex}
                src={spaServicesImages[spaServiceActiveIndex]}
              />
            </SpaServiceImageContainer>
          ))}
        </SpaSectionRightContainer>
      </SpaServicesSection>

      <BlogSection>
        <BlogPostTitle>Blog posts</BlogPostTitle>
        <BlogPostContainer>
          {blogPosts.map((blogPost, index) => (
            <BlogCart key={index}>
              <BlogPostImageContainer>
                <BlogPostImage src={blogPost.postImage} />
              </BlogPostImageContainer>
              <BlogPostLabel> {blogPost.label} </BlogPostLabel>
            </BlogCart>
          ))}
        </BlogPostContainer>
      </BlogSection>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-image: linear-gradient(to bottom, #f8e7e0 20%, #fbecec 10%, #ffffff 70%);
`

const SliderSection = styled.div`
  margin-bottom: 62px;
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

const BeautyStoreSecondSectionImage = styled.img`
  cursor: pointer;
  //to do redirect to the product

  transition: transform 0.5s, filter 1.7s ease-in-out;
  filter: grayscale(100%);

  &:hover {
    transform: scale(1.03);
    filter: grayscale(0);
  }
`

const Title = styled.div`
  margin-bottom: 25px;

  font-family: 'Optima', sans-serif;
  line-height: 1.21;
  font-size: 48px;
`

const Content = styled.div`
  margin-bottom: 25px;

  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
`

const SummerEssentialsSection = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 20px;
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

  opacity: 1;
  transition: border 0.25s ease-in-out;
  border: 2px solid transparent;

  ${props =>
    props.isActive &&
    css`
      border: 2px solid ${props => props.theme.colors.white};
    `}
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

  transition: border 0.25s ease-in-out;
  border: 2px solid transparent;

  ${props =>
    props.isActive &&
    css`
      border: 2px solid ${props => props.theme.colors.white};
    `}
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

  transition: border 0.25s ease-in-out;
  border: 2px solid transparent;

  ${props =>
    props.isActive &&
    css`
      border: 2px solid ${props => props.theme.colors.white};
    `}
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
`

const CarouselTitle = styled.div`
  margin-bottom: 38px;

  font-family: 'Optima', sans-serif;
  line-height: 1.21;
  font-size: 48px;
`

const TestimonialSection = styled.div`
  margin-bottom: 62px;
`

const SpaServicesSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 82px;
  padding: 0 30px 0 60px;
`

const SpaSectionLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 70px 0 82px;
  width: 50%;
`

const SpaSectionTitle = styled.div`
  margin: 20px 15px 0 30px;

  font-family: 'Optima', sans-serif;
  font-size: 62px;
`

const SpaSectionDescription = styled.div`
  margin-bottom: 26px;
  padding: 15px 15px 30px 30px;
  max-width: 428px;

  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
`

const SpaSectionServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 15px 30px 30px;
  max-width: 428px;
`

const SpaServiceItem = styled.div<{ isActive: boolean }>`
  margin-bottom: 15px;
  max-width: calc(100% - 50px);

  opacity: 0.5;
  transition: max-width 0.25s ease-in-out, padding 0.25s ease-in-out, opacity 0.25s ease-in-out;
  color: ${props => props.theme.colors.black};

  ${props =>
    props.isActive &&
    css`
      opacity: 1;
      padding-left: 45px;
    `}
`

const SpaServiceLabel = styled.div<{ isActive: boolean }>`
  position: relative;

  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: bold;

  color: ${props => props.theme.colors.greyDark};
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    width: 0;
    height: 1px;

    background-color: ${props => props.theme.colors.black};
    transition: width 0.25s ease-in-out;
    transform: translate(calc(-100% - 15px));
  }

  ${props =>
    props.isActive &&
    css`
      color: ${props => props.theme.colors.black};
      font-weight: bolder;

      &:before {
        content: '';
        position: absolute;
        top: 15px;
        left: 0;
        width: 30px;
        height: 1px;

        background-color: ${props => props.theme.colors.black};
        transition: width 0.25s ease-in-out;
        transform: translate(calc(-100% - 15px));
      }
    `}
`

const SpaServiceContent = styled.div<{ isActive: boolean }>`
  display: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: -0.3px;

  color: ${props => props.theme.colors.black};
  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      display: block;
    `}
`

const SpaSectionRightContainer = styled.div`
  position: relative;
  margin-left: 12px;

  height: 600px;
  width: 700px;
`

const SpaServiceImageContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;

  visibility: hidden;
  opacity: 0;
  transition: opacity 0.25s ease-in-out, visibility 0.25s ease-in-out;

  ${props =>
    props.isVisible &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`

const SpaServiceImage = styled.img<{ isVisible: boolean }>`
  height: 100%;
  width: 100%;

  overflow: hidden;
  object-position: center;
  object-fit: cover;
`

const BlogSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin-bottom: 62px;
`

const BlogPostTitle = styled.div`
  margin-bottom: 26px;
  padding-left: 24px;

  font-size: 32px;
  font-family: 'Optima', sans-serif;
`

const BlogPostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const BlogCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  cursor: pointer;
`

const BlogPostImageContainer = styled.div`
  margin-bottom: 18px;
  width: 428px;
  height: 254px;
  overflow: hidden;
`

const BlogPostImage = styled.img`
  display: block;
  width: 428px;
  height: 254px;

  object-fit: cover;
  object-position: center center;

  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.5);
  }
`

const BlogPostLabel = styled.div`
  font-size: 22px;
  font-family: 'Optima', sans-serif;
  text-align: center;
`

export default HomePage
