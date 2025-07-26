const { Router } = require('express')
const contactsRouter = Router()
const contactsController = require('../controllers/contactsController')

contactsRouter.param(
  'contactId',
  contactsController.attachContactToRequestObject,
)

contactsRouter
  .route('/')
  .get(contactsController.getUserContacts)
  .post(contactsController.addNewContact)

contactsRouter
  .route('/:contactId')
  .get(contactsController.getContactInfo)
  .delete(contactsController.removeContact)

module.exports = contactsRouter
