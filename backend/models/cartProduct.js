import mongoose from 'mongoose'

const cartProductSchema = new mongoose.Schema(
  {
    _id: Number,
    id: Number,
    brand: String,
    name: String,
    imageURL: String,
    price: Number,
    quantity: Number,
  },
  {
    value: String,
    _id: false,
  }
)

const CartProduct = mongoose.model('CartProduct', cartProductSchema)

export default CartProduct
