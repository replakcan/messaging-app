const { Router } = require('express')
const usersRouter = Router()
const usersController = require('../controllers/usersController')

usersRouter.get('/', usersController.findManyUsers)
usersRouter.get('/:userId', usersController.findUserById)

module.exports = usersRouter
