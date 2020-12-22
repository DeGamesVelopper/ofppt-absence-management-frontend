
const Group = require('../models/group')
const Error= require('http-errors')

const addGroup = async(req,res,next)=>{
   const data= req.body
   try {
     if(!data) return next(Error.NotFound('all field are required'))

      const group = new Group(data)
      const newgroup = await group.save()
      if (!newgroup) return next(Error.InternalServerError())
      res.json(newgroup)
   } catch (error) {
     next(error)
   }
}

const getGroups = async(req,res,next)=>{
  try {
    const groups = await Group.find() 
    if(!groups) next(Error.InternalServerError())
    res.json(groups)
  } catch (error) {
    next(error)
  }
}


const deleteGroup = async(req,res,next)=>{
  const id = req.params.id
  Group.findByIdAndDelete(id)
  .then((deletedGrp)=>{
      if(!deletedGrp) next(Error.InternalServerError()) 
      res.json(deletedGrp)
  })
  .catch((err)=> next(err))
}

const updateGroup = (req,res,next)=>{
  const id = req.params.id
  const {name,filiere} = req.body
 
  const options={new : true}
  Group.findByIdAndUpdate(id,{name,filiere},options)
  .then((updatedGrp)=>{
     if(!updatedGrp) return next(Error.InternalServerError())
     res.json(updatedGrp)
  })
  .catch((err)=> next(err))
}


module.exports= {
  addGroup,
  getGroups,
  deleteGroup,
  updateGroup
}