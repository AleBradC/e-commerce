import express from 'express'
const router = express.Router()

import MoisturizersProduct from '../src/models/moisturizersProduct.js.js'

router.get('/', async (req, res) => {
  try {
    const products = await MoisturizersProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
