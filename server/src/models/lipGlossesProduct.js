import mongoose from 'mongoose'

const LipGlossesProductSchema = new mongoose.Schema({
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

const LipGlossesProduct = mongoose.model('LipGlossesProduct', LipGlossesProductSchema)

export default LipGlossesProduct
