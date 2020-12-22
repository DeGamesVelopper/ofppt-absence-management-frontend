
const adminRouter = require('express').Router()

const authRouter= require('./authRouter')
const filiereRouter= require('./filiereRouter')
const groupRouter= require('./groupRouter')

adminRouter.use(authRouter,filiereRouter,groupRouter)

module.exports = adminRouter