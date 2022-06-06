import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import products from './routes/products.js';
import cart from './routes/cart.js';
import productInfo from './routes/productInfo.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/productInfo', productInfo);

app.get('/', (req, res) => {
  res.send('HELLO :D ');
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connection established...'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));
