
const filiereRouter = require('express').Router();
const filiereController  = require('../controllers/filiereController')
const {verifyToken} = require('../helpers/jwtHelpers')


const test = (req,res,next) =>{
  res.json('hello from api')
}

filiereRouter.get('/admin/test',verifyToken,test)

filiereRouter.get('/admin/filiere/:id',verifyToken,filiereController.getFiliereByID)

filiereRouter.get('/admin/filieres',verifyToken,filiereController.getFilieres)

filiereRouter.post('/admin/addfiliere',verifyToken,filiereController.addFiliere)

filiereRouter.delete('/admin/deletefiliere/:id',verifyToken,filiereController.deleteFiliereByID)

filiereRouter.put('/admin/updatefiliere/:id',verifyToken,filiereController.updateFiliereByID)


module.exports = filiereRouter