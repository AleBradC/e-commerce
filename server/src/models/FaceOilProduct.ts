import mongoose from "mongoose";

const faceOilProductSchema = new mongoose.Schema({
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

const FaceOilProduct = mongoose.model("FaceOilProduct", faceOilProductSchema);

export default FaceOilProduct;
