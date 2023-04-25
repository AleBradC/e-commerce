import express from 'express'
const router = express.Router()

import NewArrivalProduct from '../src/models/newArrivalProduct.js.js'

router.get('/', async (req, res) => {
  try {
    const products = await NewArrivalProduct.find()
    res.send(products)
  } catch (error) {
    res.status(500).send('Error: ' + error.message)
  }
})

export default router
