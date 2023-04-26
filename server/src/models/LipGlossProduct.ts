import mongoose from "mongoose";

const lipGlossProductSchema = new mongoose.Schema({
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

const LipGlossProduct = mongoose.model(
  "LipGlossProduct",
  lipGlossProductSchema
);

export default LipGlossProduct;
