
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Error = require('http-errors')
const adminRouter = require('./routers/adminRouter')

require('dotenv').config('dev')

require('./helpers/init_mongoDB')

const PORT = process.env.PORT || 5000

const app = new express()

//Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.use('/api',adminRouter)


if (process.env.NODE_ENV ==='production') {
  const path= require('path')
  
  app.use(express.static('client/build'))
  
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT,()=>{
  console.log(`Server started at port ${PORT}`)
})


//404 not found
app.use(async(req,res,next)=>{
  next(Error.NotFound())
})

//error handler 
app.use(async(err,req,res,next)=>{
 const status = err.status || 500
 res.status(status)
 res.json({error : err.message})
})
