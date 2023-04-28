export interface ProductType {
  id: number
  brand: string
  name: string
  category: string
  tags: string[]
  imageURL: string
  hoverImageURL: string
  rating: number
  price: number
  principalBenefits: string[]
}

export interface ProductCartType {
  id: number
  brand: string
  name: string
  imageURL: string
  price: number
  quantity: number
}

export interface SlideType {
  image: string
  content: string
  button: string
  redirectLink: string
}

export interface CarouselItemType {
  image: string
  topContent: string
  middleContent: string
  bottomContent: string
  productBrand: string
  productName: string
  rating?: number
  id: number
}

export interface ComplexCarouselType {
  imageLogo: string
  content: string
}

export interface SpaServiceItemType {
  label: string
  content: string
}

export interface BlogPostType {
  postImage: string
  label: string
}

export interface ProductInfoType {
  id: number
  brand: string
  name: string
  category: string
  tags?: []
  imageURL: string
  rating: number
  price: number
  quantity: number
  generalDescription: string
  principalBenefits: []
  description: string
  ingredients: string
  carouselImages: []
  benefitsSection: {
    information: {
      title: string
      content: []
    }
    image: string
  }
  quotes: {
    title: string
    content: string
  }
  howToUseSection: {
    information: {
      title: string
      content: []
    }
    image: string
  }
  keyIngredientsSection: {
    information: {
      title: string
      content: []
    }
    image: string
  }
  clinicalResultsSection: {
    information: {
      title: string
      content: []
    }
    image: string
  }
}

export enum AccordionType {
  DESCRIPTION = 'DESCRIPTION',
  INGREDIENTS = 'INGREDIENTS',
}
