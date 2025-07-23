const { Router } = require('express')
const authRouter = Router()
const authController = require('../controllers/authController')
const isAuth = require('../auth/isAuth')

authRouter.post('/login', authController.usersLoginPost)
authRouter.post('/register', authController.usersRegisterPost)
authRouter.get('/verify', isAuth, authController.verifyCurrentUser)

module.exports = authRouter
