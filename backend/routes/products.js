import express from 'express';
const router = express.Router();

import Product from '../models/product.js';

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});


export default router;
