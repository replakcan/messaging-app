const { Router } = require('express')
const messagesRouter = Router()
const messagesController = require('../controllers/messagesController')

messagesRouter.param(
  'messageId',
  messagesController.attachMessageToRequestObject
)

messagesRouter
  .route('/')
  .get(messagesController.getAllUserMessages)
  .post(messagesController.createNewMessage)

messagesRouter
  .route('/:messageId')
  .get(messagesController.getMessageById)
  .patch(messagesController.editMessageById)
  .delete(messagesController.deleteMessageById)

module.exports = messagesRouter
