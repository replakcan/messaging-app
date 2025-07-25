const { Router } = require('express')
const authRouter = Router()
const authConroller = require('../controllers/authController')

authRouter.get('/profile', authConroller.getUserProfile)
authRouter.get('/friends', authConroller.getUserFriends)
authRouter.get('/friends/:friendId', authConroller.getFriendById)

authRouter.patch('/friends/new-friend', authConroller.addNewFriend)

authRouter.patch(
  '/friends/:friendId/delete',
  authConroller.removeExistingFriend
)

module.exports = authRouter
