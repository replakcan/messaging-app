require('dotenv').config()
require('./auth/jwtStrategy')
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const usersRouter = require('./routes/usersRouter')
const indexRouter = require('./routes/indexRouter')
const authRouter = require('./routes/authRouter')
const isAuth = require('./auth/isAuth')
const messagesRouter = require('./routes/messagesRouter')
const groupsRouter = require('./routes/groupsRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use('/groups', isAuth, groupsRouter)
app.use('/messages', isAuth, messagesRouter)
app.use('/auth', isAuth, authRouter)
app.use('/users', usersRouter)
app.use('/', indexRouter)

app.use((err, req, res, next) => {
  console.log(err)

  res.status(err.statusCode || 500).send(err.message)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`express is on at port ${PORT}`)
})
