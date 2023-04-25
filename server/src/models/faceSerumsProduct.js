import mongoose from 'mongoose'

const FaceSerumsProductSchema = new mongoose.Schema({
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

const FaceSerumsProduct = mongoose.model('FaceSerumsProduct', FaceSerumsProductSchema)

export default FaceSerumsProduct
