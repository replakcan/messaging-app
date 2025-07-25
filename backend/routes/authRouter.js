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

authRouter.patch('/friends/new-friend', authConroller.addNewFriend)
authRouter.patch('/groups/:groupId/new-member', authConroller.addGroupNewMember)
authRouter.patch('/groups/:groupId/members/:memberId/delete', authConroller.removeExistingGroupMember)
authRouter.patch('/friends/:friendId/delete', authConroller.removeExistingFriend)

module.exports = authRouter
