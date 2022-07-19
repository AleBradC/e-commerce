import { useState } from 'react'
import styled from 'styled-components'

import { BlogPostType, CarouselItemType, ComplexCarouselType, SlideType, SpaServiceItemType } from '../../types'
import { useGetNewArrivalsProductsQuery } from '../../redux/api'
import { logInRoute, allProductsRoute } from '../../Helpers/routes'
import { ProductCard } from '../../Components/ProductCard/ProductCard'
import { Button } from '../../Components/Button/Button'
import { Carousel } from '../../Components/Carousel/Carousel'
import { SlideShow } from '../../Components/SlideShow/SlideShow'
import { ComplexCarousel } from '../../Components/ComplexCarousel/ComplexCarousel'

import SliderImg1 from '../../assets/homePage/slider/banner1.jpg'
import SliderImg2 from '../../assets/homePage/slider/banner2.jpg'
import SliderImg3 from '../../assets/homePage/slider/banner3.jpg'
import SliderImg4 from '../../assets/homePage/slider/banner4.png'

import BeautySectionImg1 from '../../assets/homePage/beauty-section-img1.png'
import BeautySectionImg2 from '../../assets/homePage/beauty-section-img2.png'
import BeautySectionImg3 from '../../assets/homePage/beauty-section-img3.png'

import SummerEssentialsImg from '../../assets/homePage/carrousel-image-essentials.png'

import CarouselImg1 from '../../assets/homePage/carousel/carousel-item1.png'
import CarouselImg2 from '../../assets/homePage/carousel/carousel-item2.png'
import CarouselImg3 from '../../assets/homePage/carousel/carousel-item3.jpg'

import AllureLogoImg from '../../assets/homePage/complexCarousel/allure-logo.png'
import HarpersLogoImg from '../../assets/homePage/complexCarousel/harpers-bazar-logo.png'
import RectangleLogoImg from '../../assets/homePage/complexCarousel/rectangle-logo.png'
import VanityLogoImg from '../../assets/homePage/complexCarousel/vanity-logo.png'

import SpaServiceBeautyBarImg from '../../assets/homePage/spa-service-beauty-bar.png'
import SpaServiceFacialsImg from '../../assets/homePage/spa-service-facials.png'
import SpaServiceHydrafacialImg from '../../assets/homePage/spa-service-hydrafacial.png'
import SpaServiceMicroImg from '../../assets/homePage/spa-service-micro.png'
import SpaServiceWaxingImg from '../../assets/homePage/spa-service-waxings.png'

import BlogPost1Img from '../../assets/homePage/blog-post-1.png'
import BlogPost2Img from '../../assets/homePage/blog-post-2.png'
import BlogPost3Img from '../../assets/homePage/blog-post-3.png'

const sliders: SlideType[] = [
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

const carouselSliders: CarouselItemType[] = [
  {
    image: CarouselImg1,
    topContent: 'Niacinamide (Vitamin B3)',
    middleContent: 'Lactic Acid',
    bottomContent: 'Hyaluronic Acid',
    productBrand: 'ELTAMD',
    productName: 'UV REPLENISH Broad-Spectrum SPF 44',
    rating: 5,
  },
  {
    image: CarouselImg2,
    topContent: 'Organic Jojoba',
    middleContent: 'Shea Butter',
    bottomContent: 'Plant-Based Seed Oils',
    productBrand: 'WESTMAN ATELIER',
    productName: 'Squeaky Clean Liquid Lip Balm',
  },
  {
    image: CarouselImg3,
    topContent: 'Vitamin C',
    middleContent: 'Wild Rose Extract',
    bottomContent: 'Polygonum Bistorta Root',
    productBrand: 'DR. BARBARA STURM',
    productName: 'Glow Drops',
    rating: 5,
  },
]

const complexCarouselSliders: ComplexCarouselType[] = [
  {
    imageLogo: RectangleLogoImg,
    content: '"This OG clean-beauty boutique is famous for next-big-thing brands."',
  },
  {
    imageLogo: AllureLogoImg,
    content: '"One of the raddest beauty outposts in the entire city"',
  },
  {
    imageLogo: HarpersLogoImg,
    content: '"For beauty lovers walking into SHEN is like walking into haven"',
  },
  {
    imageLogo: VanityLogoImg,
    content: '"An expert in finding everyone`s next beauty obsession"',
  },
]

const spaServicesContent: SpaServiceItemType[] = [
  {
    label: 'Microblading',
    content: 'For the client who needs a little brow help, unevenness or lack of hair we`ve got you covered.',
    serviceImage: SpaServiceMicroImg,
  },
  {
    label: 'Facials',
    content: 'An option for every skin type and concern.',
    serviceImage: SpaServiceFacialsImg,
  },
  {
    label: 'Hydrafacial',
    content:
      'Using a unique, patented vortex-fusion delivery system to exfoliate and hydrate skin, while the spiral design delivers painless extractions.',
    serviceImage: SpaServiceHydrafacialImg,
  },
  {
    label: 'Waxing',
    content: 'Reveal your most beautiful skin with bikini, Brazilian, eyebrow, facial or body waxing',
    serviceImage: SpaServiceWaxingImg,
  },
  {
    label: 'Beauty Bar',
    content:
      'Experience personalized beauty by licensed professionals providing a full service experience that allows every client to feel pampered and look amazing.',
    serviceImage: SpaServiceBeautyBarImg,
  },
]

const blogPosts: BlogPostType[] = [
  {
    postImage: BlogPost1Img,
    label: 'Esthetician Recommended Skin Care Products for Aging Skin',
  },
  {
    postImage: BlogPost2Img,
    label: 'Behind The Brand: Alpyn Beauty with Kendra Kolb Butler',
  },
  {
    postImage: BlogPost3Img,
    label: 'SHEN’s Lead Esthetician Monica Dawidowicz',
  },
]

const HomePage = () => {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number | any>(0)
  const [complexCarouselActiveIndex, setComplexCarouselActiveIndex] = useState<number | any>(0)
  const [spaServiceActiveIndex, setSpaServicesActiveIndex] = useState(0)

  const { data: newArrivalProducts } = useGetNewArrivalsProductsQuery()

  const handleChangeSpaServicesImage = (index: number) => {
    setSpaServicesActiveIndex(index)
  }

  const switchSpaServiceImage = () => {
    if (spaServiceActiveIndex === 0) {
      return SpaServiceMicroImg
    }
    if (spaServiceActiveIndex === 1) {
      return SpaServiceFacialsImg
    }
    if (spaServiceActiveIndex === 2) {
      return SpaServiceHydrafacialImg
    }
    if (spaServiceActiveIndex === 3) {
      return SpaServiceWaxingImg
    }
    if (spaServiceActiveIndex === 4) {
      return SpaServiceBeautyBarImg
    }
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

      <SpaSection>
        <SpaSectionLeftContainer>
          <SpaSectionTitle> Spa Services </SpaSectionTitle>
          <SpaSectionDescription>
            Luxury facials, makeup application, waxing and brow shaping and so much more to meet your beauty needs.{' '}
          </SpaSectionDescription>
          <SpaSectionServicesContainer>
            {spaServicesContent.map((spaService, index) => (
              <SpaService key={index}>
                <SpaServiceLabel onMouseEnter={() => handleChangeSpaServicesImage(index)}>
                  {spaService.label}
                </SpaServiceLabel>
                <SpaServiceContent>{spaService.content}</SpaServiceContent>
              </SpaService>
            ))}
          </SpaSectionServicesContainer>
        </SpaSectionLeftContainer>
        <SpaSectionRightContainer>
          <SpaServiceImage src={switchSpaServiceImage()} />
        </SpaSectionRightContainer>
      </SpaSection>

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

const SpaSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 82px;
  padding: 0 30px 0 60px;
`

const SpaSectionLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding: 0 70px 0 82px;
`

const SpaSectionTitle = styled.div`
  margin: 20px 15px 0 30px;
  font-family: 'Optima', sans-serif;
  font-size: 62px;
`

const SpaSectionDescription = styled.div`
  padding: 15px 15px 30px 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
`

const SpaSectionServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 15px 30px 30px;
`

const SpaServiceLabel = styled.div`
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
    transform: translate(calc(-100% - 15px));
    width: 10px;
    height: 2px;

    color: ${props => props.theme.colors.black};
  }
`

const SpaServiceContent = styled.div`
  display: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: -0.3px;

  color: ${props => props.theme.colors.black};
  cursor: pointer;
`

const SpaService = styled.div`
  margin-bottom: 15px;

  &:hover {
    padding-left: 45px;

    ${SpaServiceLabel} {
      color: ${props => props.theme.colors.black};
    }

    ${SpaServiceContent} {
      display: block;
    }
  }
`

const SpaSectionRightContainer = styled.div`
  width: 700px;
  height: 600px;
`

const SpaServiceImage = styled.img``

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
