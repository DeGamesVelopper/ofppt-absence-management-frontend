
const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const Error = require('http-errors')
const jwt = require('jsonwebtoken')
const {signToken} = require('../helpers/jwtHelpers')

const logIn = async(req,res,next)=>{

  const {username,password} = req.body
  try {
    if (!username || !password) return next(Error.BadRequest()) 
    const admin = await Admin.findOne({username})
    if(!admin) return next(Error.BadRequest("Invalid username or password"))
    
    const Matching = await bcrypt.compare(password,admin.password)
    if(!Matching) return next(Error.BadRequest("Invalid username or password"))
    
    const token = await signToken(admin._id.toString())
      
    res.json({token})
  } catch (err) {
      next(err)
  }
}

const isTokenValid = async(req,res,next) =>{
  const {token} = req.body
  if (!token) return next(Error.Unauthorized())
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err,payload)=>{
      if (err) return next(Error.Unauthorized())
      res.json({token})
    })
  } catch (error) {
     return next(error)
  }
  
}

module.exports = {
  logIn,
  isTokenValid
}