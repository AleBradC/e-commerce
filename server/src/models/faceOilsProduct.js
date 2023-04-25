import mongoose from 'mongoose'

const FaceOilsProductSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  name: String,
  category: String,
  tags: [],
  imageURL: String,
  hoverImageURL: String,
  rating: Number,
  price: Number,
  principalBenefits: [],
})

const FaceOilsProduct = mongoose.model('FaceOilsProduct', FaceOilsProductSchema)

export default FaceOilsProduct
