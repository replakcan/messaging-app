const { Router } = require('express')
const authRouter = Router()
const authConroller = require('../controllers/authController')

authRouter.get('/profile', authConroller.getUserProfile)
authRouter.get('/friends', authConroller.getUserFriends)
authRouter.get('/friends/:friendId', authConroller.getFriendById)
authRouter.get('/groups', authConroller.getUserGroups)
authRouter.post('/groups', authConroller.createNewGroup)
authRouter.get('/groups/:groupId', authConroller.getGroupById)
authRouter.delete('/groups/:groupId', authConroller.deleteGroupById)

authRouter.route('/messages').get(authConroller.getAllMessages)
authRouter.get('/messages/friends/:friendId', authConroller.getMessagesByFriendId)
authRouter.post('/messages/friends/:friendId', authConroller.postNewFriendMessage)
authRouter.post('/messages/groups/:groupId', authConroller.postNewGroupMessage)
authRouter.get('/messages/groups/:groupId', authConroller.getMessagesByGroupId)

authRouter
  .route('/messages/:messageId')
  .get(authConroller.getMessageById)
  .patch(authConroller.editMessage)
  .delete(authConroller.deleteMessage)

authRouter.patch('/friends/new-friend', authConroller.addNewFriend)
authRouter.patch('/groups/:groupId/new-member', authConroller.addGroupNewMember)
authRouter.patch('/groups/:groupId/members/:memberId/delete', authConroller.removeExistingGroupMember)
authRouter.patch('/friends/:friendId/delete', authConroller.removeExistingFriend)

module.exports = authRouter
