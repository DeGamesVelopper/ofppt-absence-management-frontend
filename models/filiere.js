
const mongoose = require('mongoose')

const filiereSchema =  mongoose.Schema({
   abvname : {
     type: String,
     required : true
   },
   name : {
    type: String,
    required : true
  }
})

const filiereModel = mongoose.model('filiere',filiereSchema)

module.exports  = {
  filiereModel,
  filiereSchema
}