import mongoose from 'mongoose'

const productInfoSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  name: String,
  category: String,
  tags: [],
  rating: Number,
  price: Number,
  quantity: Number,
  generalDescription: String,
  principalBenefits: [],
  description: String,
  ingredients: String,
  carouselImages: [],
  quotes: {
    title: String,
    content: String,
  },
  section: [],
})

const ProductInfo = mongoose.model('ProductInfo', productInfoSchema)

export default ProductInfo
