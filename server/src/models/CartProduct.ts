import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  name: String,
  imageURL: String,
  price: Number,
  quantity: Number,
});

const CartProduct = mongoose.model("CartProduct", cartProductSchema);

export default CartProduct;
