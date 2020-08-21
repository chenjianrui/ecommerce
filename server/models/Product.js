const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxLength: 2000
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    maxLength: 32
  },
  category: {
    type: ObjectId,
    ref: 'category',
    required: true
  },
  quantity: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  shipping: {
    required: false,
    type: Boolean
  }
}, {
  timestamps: true
})

const Product = mongoose.model('product', productSchema)
module.exports = Product