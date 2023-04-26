import mongoose from "mongoose";

const faceSerumProductSchema = new mongoose.Schema({
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

const FaceSerumProduct = mongoose.model(
  "FaceSerumProduct",
  faceSerumProductSchema
);

export default FaceSerumProduct;
