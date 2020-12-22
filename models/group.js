
const mongoose = require('mongoose')
const {filiereSchema} = require('../models/filiere')

const groupSchema =  mongoose.Schema({
  name : {
    type: String,
    required : true
  },
  filiere : filiereSchema
})

module.exports  = mongoose.model('group',groupSchema)