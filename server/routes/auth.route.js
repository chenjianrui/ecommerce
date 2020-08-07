const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken') // generate token
const bcrypt = require('bcryptjs') // encrypt password

const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')


// Models
const User = require('../models/User')

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const { name, email, password } = req.body

  try {
    let user = User.findOne({email})

    if(user){
      return res.status(400).json({
        errors: [{ msg: 'User already exists' }]
      })
    }

    const avatar = gravatar.url(email, {
      s: 200,
      r: 'pg',
      d: 'mm'
    })

    user = new User({ name, email, password, avatar })
    const salt = await bcrypt.getSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err
      res.json({token})
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

module.exports = router