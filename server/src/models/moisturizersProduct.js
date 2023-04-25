import mongoose from 'mongoose'

const moisturizersProductSchema = new mongoose.Schema({
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

const MoisturizersProduct = mongoose.model('MoisturizersProduct', moisturizersProductSchema)

export default MoisturizersProduct
