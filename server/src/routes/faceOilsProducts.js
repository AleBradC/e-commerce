import express from 'express'
const router = express.Router()

import FaceOilsProduct from '../src/models/faceOilsProduct.js.js'

router.get('/', async (req, res) => {
  try {
    const products = await FaceOilsProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
