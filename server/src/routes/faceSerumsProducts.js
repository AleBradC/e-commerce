import express from 'express'
const router = express.Router()

import FaceSerumsProduct from '../src/models/faceSerumsProduct.js'

router.get('/', async (req, res) => {
  try {
    const products = await FaceSerumsProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
