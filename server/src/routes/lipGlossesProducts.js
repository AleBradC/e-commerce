import express from 'express'
const router = express.Router()

import LipGlossesProduct from '../src/models/lipGlossesProduct.js.js'

router.get('/', async (req, res) => {
  try {
    const products = await LipGlossesProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
