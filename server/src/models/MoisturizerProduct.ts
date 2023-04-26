import mongoose from "mongoose";

const moisturizerProductSchema = new mongoose.Schema({
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

const MoisturizerProduct = mongoose.model(
  "MoisturizerProduct",
  moisturizerProductSchema
);

export default MoisturizerProduct;
