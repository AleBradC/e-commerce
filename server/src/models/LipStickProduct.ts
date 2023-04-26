import mongoose from "mongoose";

const lipStickProductSchema = new mongoose.Schema({
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

const LipStickProduct = mongoose.model(
  "LipStickProduct",
  lipStickProductSchema
);

export default LipStickProduct;
