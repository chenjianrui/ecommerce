const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
require('dotenv').config({
  path: './config/index.env'
})

const connectDB = require('./config/db')
connectDB();
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

// routes
app.use('/api/user/', require('./routes/auth.route'))
app.use('/api/category/', require('./routes/category.route'))
app.get('/', (req, res) => {
  res.send('test page')
})

app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not founded'
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})