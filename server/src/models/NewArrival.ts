import mongoose from "mongoose";

const newArrivalProductSchema = new mongoose.Schema({
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

const NewArrivalProduct = mongoose.model(
  "NewArrivalProduct",
  newArrivalProductSchema
);

export default NewArrivalProduct;
