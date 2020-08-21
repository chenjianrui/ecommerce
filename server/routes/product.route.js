const express = require('express')
const router = express.Router()
const fs = require('fs')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const productById = require('../middleware/productById')
const Product = require('../models/Product')
const formidable = require('formidable')

router.post('/', auth, adminAuth, (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, async (err, fields, files) => {
    if(err){
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    if(!files.photo){
      return res.status(400).json({
        error: 'Image is required'
      })
    }
    if(files.photo.type !== 'image/jpg' && files.photo.type !== 'image/jpeg' && files.photo.type !== 'image/png'){
      return res.status(400).json({
        error: 'Image type not allowed'
      })
    }
    const { name, description, price, category, quantity, shipping } = fields
    if(!name || !description || !price || !category || !quantity || !shipping){
      return res.status(400).json({
        error: 'All fields are required'
      })
    }
    let product = new Product(fields)
    // 1MB
    if(files.photo.size > 1000000){
      return res.status(400).json({
        error: 'Image should be less than 1MB in size'
      })
    }
    
    product.photo.data = fs.readFileSync(files.photo.path)
    product.photo.contentType = files.photo.type
    try {
      await product.save()
      res.json('Product Created Successfully')
    } catch (error) {
      console.log(error)
      res.status(500).send('Server Error')
    }

  })
})

router.get('/:productId', productById, (req, res) => {
  // photo 另外拉一個 API 來取得
  req.product.photo = undefined
  return res.json(req.product)
})

router.get('/photo/:productId', productById, (req, res) => {
  console.log(req.product)
  if(req.product.photo.data){
    // 設定內容型別: ex. image/png
    res.set('Content-Type', req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }

  res.status(400).json({
    error: 'failed to load image'
  })
})

module.exports = router