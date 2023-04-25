import mongoose from 'mongoose'

const mascaraProductSchema = new mongoose.Schema({
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

const MascaraProduct = mongoose.model('MascaraProduct', mascaraProductSchema)

export default MascaraProduct
