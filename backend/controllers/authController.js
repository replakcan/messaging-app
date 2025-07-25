const prisma = require('../lib/prisma')

exports.getAllUserInfo = async (req, res, next) => {
  const { id } = req.user

  try {
    const authUser = await prisma.user.findFirstOrThrow({
      where: { id },
      include: {
        contacts: true,
        adminOfGroups: true,
        memberOfGroups: true,
        messages_recieved: true,
        messages_sent: true,
        contactsOf: true,
      },
    })

    res.json(authUser)
  } catch (error) {
    next(error)
  }
}
