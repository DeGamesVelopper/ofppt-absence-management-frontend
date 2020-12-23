
const Filiere = require('../models/filiere').filiereModel
const Error = require('http-errors')


const addFiliere = async(req,res,next)=>{
   const { data } = req.body
   const {  abvname, name } = data
   try {
      if(!abvname && !name) return next(Error.NotAcceptable('empty field'))
      const flr = new Filiere({abvname,name})
      const savedFlr = await flr.save()
      if(!savedFlr) return next(Error.InternalServerError())
      res.json(savedFlr)
   } catch (error) {
      next(error)
   }
}

const getFilieres = async(req,res,next)=>{
  try {
    const filieres = await Filiere.find()
    if(!filieres) return next(Error.NotFound("No filiere found"))
    res.json(filieres)
  } catch (error) {
     next(error)
  }
}

const getFiliereByID = async(req,res,next)=>{
   const id =req.params.id
   try {
     const filiere = await Filiere.findById(id)
     if(!filiere) return next(Error.NotFound("no filiere found"))
     res.json(filiere)
   } catch (error) {
      next(error)
   }
 }

const deleteFiliereByID = async(req,res,next)=>{
   const id = req.params.id
   deletedFlr= await Filiere.findByIdAndDelete(id)
   if(!deletedFlr) next(Error.InternalServerError()) 
   res.json(deletedFlr)
}

const updateFiliereByID = (req,res,next)=>{
   const id = req.params.id
   const {data} = req.body
  
   const options={new : true}
   Filiere.findByIdAndUpdate(id,data,options)
   .then((updatedFlr)=>{
      if(!updatedFlr) return next(Error.InternalServerError())
      res.json(updatedFlr)
   })
   .catch((err)=> next(err))
}

module.exports ={
  getFiliereByID,
  getFilieres,
  addFiliere,
  deleteFiliereByID,
  updateFiliereByID
}