const { Router } = require('express')
const authRouter = Router()
const authConroller = require('../controllers/authController')

authRouter.get('/all-user-info', authConroller.getAllUserInfo)

module.exports = authRouter
