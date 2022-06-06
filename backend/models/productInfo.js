import mongoose from 'mongoose';

const productInfoSchema = new mongoose.Schema({
  id: Number,
  image: String,
  title: String,
  price: Number,
  description: String,
  sku: Number,
  rating: Number,
  comments: [
    {
      commentId: Number,
      body: String,
    }
  ],
},
{
  value: String,
  _id: false
});

const ProductInfo = mongoose.model('ProductInfo', productInfoSchema);

export default ProductInfo;
