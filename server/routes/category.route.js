const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Category = require('../models/Category')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const categoryById = require('../middleware/categoryById')

router.post('/', [
  check('name', 'Name is required').trim().not().isEmpty()
], auth, adminAuth, async (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({
      errors: errors.array()[0].msg
    })
  }
  const { name } = req.body

  try {
    let category = await Category.findOne({ name })
    if(category){
      return res.status(403).json({
        error: 'Category already exist'
      })
    }
    const newCategory = await new Category({ name })
    category = await newCategory.save()
    res.json(category)

  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

router.get('/all', auth, adminAuth, async (req, res) => {
  try {
    let data = await Category.find({})
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

router.get('/:categoryId', categoryById, async (req, res) => {
  try {
    res.json(req.category)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
})

module.exports = router