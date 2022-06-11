import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    id: Number,
    brand: String,
    tags: [],
    imageURL: String,
    rating: Number,
    price: Number,
  },
  {
    value: String,
    _id: false,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
