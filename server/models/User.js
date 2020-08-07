const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type:String,
    required: true
  },
  avatar: {
    type: String
  },
  role: {
    type: Number,
    default: 0
  },
  history: {
    type: Array,
    default: []
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User