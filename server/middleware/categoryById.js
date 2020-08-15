const mongoose = require('mongoose')
const Category = require('../models/Category')

module.exports = async (req, res, next) => {
  const { categoryId } = req.params

  // 驗証 ID 是否合法
  if(!mongoose.Types.ObjectId.isValid(categoryId)){
    return res.status(403).json({
      error: 'Category not founded'
    })
  }

  try {
    let category = await Category.findById(categoryId)
    if(!category){
      return res.status(403).json({
        error: 'Category not founded'
      })
    }

    req.category = category
    next()
  } catch (error) {
    console.log(error)
    return status(500).send('Server Error')
  }
}