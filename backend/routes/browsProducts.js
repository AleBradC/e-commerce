import express from 'express'
const router = express.Router()

import BrowsProduct from '../models/browsProduct.js'

router.get('/', async (req, res) => {
  try {
    const products = await BrowsProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
