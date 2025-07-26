const generateToken = require('../auth/generateToken')
const { UnauthorizedError } = require('../errors/customErrors')
const prisma = require('../lib/prisma')
const bcrypt = require('bcryptjs')

exports.usersLoginPost = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        phone: username,
      },
    })

    if (!user) throw new UnauthorizedError('Invalid credentials')

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw new UnauthorizedError('Invalid credentials')

    const token = generateToken(user)

    res.json({ token })
  } catch (error) {
    next(error)
  }
}

exports.usersRegisterPost = async (req, res, next) => {
  const { first_name, last_name, age, email, password, phone } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        phone,
        email,
        age,
        password: hashedPassword,
      },
    })

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

exports.verifyCurrentUser = async (req, res, next) => {
  const { id } = req.user

  try {
    const currentUser = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    })

    res.json(currentUser)
  } catch (error) {
    next(error)
  }
}
