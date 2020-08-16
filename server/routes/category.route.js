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

router.put('/:categoryId', auth, adminAuth, categoryById, async (req, res) => {
  // 從 middleware categoryById 取得該 category
  // 再從 request body 拿到想 update 的 name
  let category = req.category
  const { name } = req.body
    if(name) {
      // 使用 trim 去除掉空白字元
      category.name = name.trim()
    }
  try {
    category = await category.save()
    res.json(category) 
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server Error')
  }
})

router.delete('/:categoryId', auth, adminAuth, categoryById, async (req, res) => {
  // 從 middleware categoryById 取得該 category
  let category = req.category

  try {
    const { name } = category
    await category.remove();
    res.json({
      msg: `${name} deleted successfully`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server Error')
  }
})

module.exports = router