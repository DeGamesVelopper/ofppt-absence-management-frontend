

const jwt = require('jsonwebtoken')
const Error = require('http-errors')


const signToken = (id)=>{
  return new Promise((resolve, reject)=>{
     const payload = {}
     const options = {
       expiresIn: "1d", 
       audience : id
     }
     jwt.sign(payload,process.env.SECRET_KEY,options, (err, token) =>{
       if (err) reject(Error.InternalServerError())
       resolve(token)
     })
  })
}

const verifyToken = (req,res,next)=>{
   
    const token = req.headers['authorization']
    if (!token) return next(Error.Unauthorized())
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err,payload)=>{
          if (err) return next(Error.Unauthorized())
          req.payload = payload.aud
          next()
        })
    } catch (error) {
       next(error)
    }
}


module.exports = {
  signToken,
  verifyToken
}