import express from 'express'
const router = express.Router()

import CleansersProduct from '../src/models/cleansersProduct.js.js'

router.get('/', async (req, res) => {
  try {
    const products = await CleansersProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
