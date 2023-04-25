import mongoose from 'mongoose'

const LipSticksProductSchema = new mongoose.Schema({
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

const LipSticksProduct = mongoose.model('LipSticksProduct', LipSticksProductSchema)

export default LipSticksProduct
