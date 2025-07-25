const prisma = require('../lib/prisma')

exports.findManyUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      omit: {
        password: true,
      },
    })

    res.json(users)
  } catch (error) {
    next(error)
  }
}

exports.findUserById = async (req, res, next) => {
  const { userId } = req.params

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
}
