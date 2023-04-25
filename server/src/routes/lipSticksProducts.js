import express from 'express'
const router = express.Router()

import LipSticksProduct from '../src/models/lipSticksProduct.js.js'

router.get('/', async (req, res) => {
  try {
    const products = await LipSticksProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
