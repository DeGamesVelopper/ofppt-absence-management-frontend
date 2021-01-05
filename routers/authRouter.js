
const authRouter = require('express').Router()
const authController = require('../controllers/authController')

authRouter.post('/admin/login',authController.logIn)
authRouter.post('/admin/checkToken',authController.isTokenValid)

module.exports = authRouter

