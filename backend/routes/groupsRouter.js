const { Router } = require('express')
const groupsRouter = Router()
const groupsController = require('../controllers/groupsController')

groupsRouter.param('groupId', groupsController.attachGroupToRequestObject)

groupsRouter
  .route('/')
  .get(groupsController.getAllUserGroups)
  .post(groupsController.createNewGroup)

groupsRouter
  .route('/:groupId')
  .get(groupsController.getGroupById)
  .patch(groupsController.editGroupById)
  .delete(groupsController.deleteGroupById)

groupsRouter
  .route('/:groupId/messages')
  .get(groupsController.getAllGroupMessages)
  .post(groupsController.createNewGroupMessage)

groupsRouter
  .route('/:groupId/members')
  .get(groupsController.getAllGroupMembers)
  .patch(groupsController.addNewMemberToGroup)

groupsRouter.delete(
  '/:groupId/members/:memberId',
  groupsController.removeExistingMember,
)

module.exports = groupsRouter
