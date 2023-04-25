import mongoose from 'mongoose'

const CleansersProductSchema = new mongoose.Schema({
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

const CleansersProduct = mongoose.model('CleansersProduct', CleansersProductSchema)

export default CleansersProduct
