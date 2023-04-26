import mongoose from "mongoose";

const cleanserProductSchema = new mongoose.Schema({
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

const CleanserProduct = mongoose.model(
  "CleanserProduct",
  cleanserProductSchema
);

export default CleanserProduct;
