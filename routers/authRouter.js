
const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.post('/admin/login',authController.logIn)

module.exports = authRouter

