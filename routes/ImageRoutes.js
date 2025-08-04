const express = require('express')
const imageRoutes = express.Router()
const {generateImage} = require('../controllers/imageController')
const userAuth = require('../middleware/auth')

imageRoutes.post('/generate-image', userAuth, generateImage)

module.exports = imageRoutes