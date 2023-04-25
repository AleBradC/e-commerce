import mongoose from 'mongoose'

const browsProductSchema = new mongoose.Schema({
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

const BrowsProduct = mongoose.model('BrowsProduct', browsProductSchema)

export default BrowsProduct
