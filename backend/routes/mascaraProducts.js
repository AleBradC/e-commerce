import express from 'express'
const router = express.Router()

import MascaraProduct from '../models/mascaraProduct.js'

router.get('/', async (req, res) => {
  try {
    const products = await MascaraProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
