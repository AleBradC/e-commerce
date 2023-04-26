import mongoose from "mongoose";

const productInfoSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  name: String,
  category: String,
  tags: [],
  imageURL: String,
  rating: Number,
  price: Number,
  quantity: Number,
  generalDescription: String,
  principalBenefits: [],
  description: String,
  ingredients: String,
  carouselImages: [],
  benefitsSection: {
    information: {
      title: String,
      content: [],
    },
    image: String,
  },
  quotes: {
    title: String,
    content: String,
  },
  howToUseSection: {
    information: {
      title: String,
      content: [],
    },
    image: String,
  },
  keyIngredientsSection: {
    information: {
      title: String,
      content: [],
    },
    image: String,
  },
  clinicalResultsSection: {
    information: {
      title: String,
      content: [],
    },
    image: String,
  },
});

const ProductInfo = mongoose.model("ProductInfo", productInfoSchema);

export default ProductInfo;
