const { Router } = require('express')
const indexRouter = Router()
const indexController = require('../controllers/indexController')
const isAuth = require('../auth/isAuth')

indexRouter.post('/login', indexController.usersLoginPost)
indexRouter.post('/register', indexController.usersRegisterPost)
indexRouter.get('/verify', isAuth, indexController.verifyCurrentUser)

module.exports = indexRouter
