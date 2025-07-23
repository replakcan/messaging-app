const { Router } = require('express')
const authRouter = Router()
const authConroller = require('../controllers/authController')

authRouter.get('/profile', authConroller.getUserProfile)
authRouter.get('/friends', authConroller.getUserFriends)
authRouter.get('/groups', authConroller.getUserGroups)

authRouter.route('/messages').get(authConroller.getAllMessages).post(authConroller.postNewMessage)

authRouter.route('/messages/:messageId').patch(authConroller.editMessage).delete(authConroller.deleteMessage)

module.exports = authRouter
