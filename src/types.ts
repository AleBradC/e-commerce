export interface Product {
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

export interface ProductCart {
  id: number
  brand: string
  name: string
  imageURL: string
  price: number
  quantity: number
}
