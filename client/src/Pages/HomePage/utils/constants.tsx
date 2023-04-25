import {
  BlogPostType,
  CarouselItemType,
  ComplexCarouselType,
  SlideType,
  SpaServiceItemType,
} from '../../../helpers/types'
import {
  AllureLogoImg,
  BlogPost1Img,
  BlogPost2Img,
  BlogPost3Img,
  CarouselImg1,
  CarouselImg2,
  CarouselImg3,
  HarpersLogoImg,
  RectangleLogoImg,
  SliderImg1,
  SliderImg2,
  SliderImg3,
  SliderImg4,
  SpaServiceBeautyBarImg,
  SpaServiceFacialsImg,
  SpaServiceHydrafacialImg,
  SpaServiceMicroImg,
  SpaServiceWaxingImg,
  VanityLogoImg,
} from './images'
import { allProductsRoute, logInRoute } from '../../../helpers/routes'

export const sliders: SlideType[] = [
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

export const carouselSliders: CarouselItemType[] = [
  {
    image: CarouselImg1,
    topContent: 'Niacinamide (Vitamin B3)',
    middleContent: 'Lactic Acid',
    bottomContent: 'Hyaluronic Acid',
    productBrand: 'ELTAMD',
    productName: 'UV REPLENISH Broad-Spectrum SPF 44',
    rating: 5,
    id: 1,
  },
  {
    image: CarouselImg2,
    topContent: 'Organic Jojoba',
    middleContent: 'Shea Butter',
    bottomContent: 'Plant-Based Seed Oils',
    productBrand: 'WESTMAN ATELIER',
    productName: 'Squeaky Clean Liquid Lip Balm',
    id: 1,
  },
  {
    image: CarouselImg3,
    topContent: 'Vitamin C',
    middleContent: 'Wild Rose Extract',
    bottomContent: 'Polygonum Bistorta Root',
    productBrand: 'DR. BARBARA STURM',
    productName: 'Glow Drops',
    rating: 5,
    id: 34,
  },
]

export const complexCarouselSliders: ComplexCarouselType[] = [
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

export const spaServicesContent: SpaServiceItemType[] = [
  {
    label: 'Microblading',
    content: 'For the client who needs a little brow help, unevenness or lack of hair we`ve got you covered.',
  },
  {
    label: 'Facials',
    content: 'An option for every skin type and concern.',
  },
  {
    label: 'Hydrafacial',
    content:
      'Using a unique, patented vortex-fusion delivery system to exfoliate and hydrate skin, while the spiral design delivers painless extractions.',
  },
  {
    label: 'Waxing',
    content: 'Reveal your most beautiful skin with bikini, Brazilian, eyebrow, facial or body waxing',
  },
  {
    label: 'Beauty Bar',
    content:
      'Experience personalized beauty by licensed professionals providing a full service experience that allows every client to feel pampered and look amazing.',
  },
]

export const spaServicesImages = [
  SpaServiceMicroImg,
  SpaServiceFacialsImg,
  SpaServiceHydrafacialImg,
  SpaServiceWaxingImg,
  SpaServiceBeautyBarImg,
]

export const blogPosts: BlogPostType[] = [
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
