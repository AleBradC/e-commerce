import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: Number,
  image: String,
  title: String,
  price: Number,
  category: String,
  tags: [],
  quantity: Number,
},
{
  value: String,
  _id: false
});

const Product = mongoose.model('Product', productSchema);

export default Product;
