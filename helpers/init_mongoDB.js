
const mongoose = require('mongoose')


mongoose.connect(process.env.MongURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify : false
})
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))

mongoose.connection.on('disconnected',()=>{
  console.log('mongodb disconnected')
})
