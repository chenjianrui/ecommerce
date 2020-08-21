const mongoose = require('mongoose')
const Product = require('../models/Product')

module.exports = async (req, res, next) => {
  const { productId } = req.params

  if(!mongoose.Types.ObjectId.isValid(productId)){
    return res.status(403).json({
      error: 'Product not founded'
    })
  }
  try {
    // 利用 populate 與 category 建立關聯
    let product = await Product.findById(productId).populate('category')
    if(!product) {
      return res.status(403).json({
        error: 'Product not founded'
      })
    }
    req.product = product
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
}