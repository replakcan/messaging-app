const { Router } = require('express')
const authRouter = Router()
const authConroller = require('../controllers/authController')

authRouter
  .route('/')
  .get(authConroller.getAllUserInfo)
  .patch(authConroller.editUserInfo)
  .delete(authConroller.deleteAccount)

authRouter.get('/conversations', authConroller.getDistinctConversationRecievers)

authRouter.get(
  '/conversations/:conId',
  authConroller.getMessagesDistinctConversation
)

module.exports = authRouter
