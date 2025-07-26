const { Router } = require('express')
const authRouter = Router()
const authConroller = require('../controllers/authController')

authRouter
  .route('/me')
  .get(authConroller.getAllUserInfo)
  .patch(authConroller.editUserInfo)
  .delete(authConroller.deleteAccount)

module.exports = authRouter
