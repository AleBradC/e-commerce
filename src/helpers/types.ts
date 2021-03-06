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
  tags: []
  rating: number
  price: number
  quantity: number
  generalDescription: string
  principalBenefits: []
  description: string
  ingredients: string
  carouselImages: []
  quotes: {
    title: string
    content: string
  }
  section: []
}
