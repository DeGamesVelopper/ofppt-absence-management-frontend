
const groupRouter = require('express').Router();
const groupController  = require('../controllers/groupController')
const {verifyToken} = require('../helpers/jwtHelpers')


groupRouter.post('/admin/addgroup',verifyToken,groupController.addGroup)

groupRouter.get('/admin/groups',verifyToken,groupController.getGroups)

groupRouter.delete('/admin/deletegroup/:id',verifyToken,groupController.deleteGroup)

groupRouter.put('/admin/updategroup/:id',verifyToken,groupController.updateGroup)


module.exports = groupRouter