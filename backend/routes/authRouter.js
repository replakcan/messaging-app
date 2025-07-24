const { Router } = require('express')
const authRouter = Router()
const authConroller = require('../controllers/authController')

authRouter.get('/profile', authConroller.getUserProfile)
authRouter.get('/friends', authConroller.getUserFriends)
authRouter.get('/groups', authConroller.getUserGroups)
authRouter.post('/groups', authConroller.createNewGroup)
authRouter.get('/groups/:groupId', authConroller.getGroupById)
authRouter.delete('/groups/:groupId', authConroller.deleteGroupById)

authRouter.route('/messages').get(authConroller.getAllMessages)
authRouter.post('/messages/friend/:friendId', authConroller.postNewFriendMessage)
authRouter.post('/messages/group/:groupId', authConroller.postNewGroupMessage)

authRouter
  .route('/messages/:messageId')
  .get(authConroller.getMessageById)
  .patch(authConroller.editMessage)
  .delete(authConroller.deleteMessage)

authRouter.patch('/friends/new-friend', authConroller.addNewFriend)
authRouter.patch('/friends/:friendId/delete', authConroller.removeExistingFriend)

module.exports = authRouter
