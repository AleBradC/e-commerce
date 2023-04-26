import mongoose from "mongoose";

const browProductSchema = new mongoose.Schema({
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
});

const BrowProduct = mongoose.model("BrowProduct", browProductSchema);

export default BrowProduct;
