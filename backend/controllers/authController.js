const prisma = require('../lib/prisma')
const { deleteGroupByIdLogic } = require('./groupsController')

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

exports.editUserInfo = async (req, res, next) => {
  const { id } = req.user
  const { status_message, first_name, last_name, age } = req.body

  try {
    await prisma.user.update({
      where: { id },
      data: {
        status_message,
        first_name,
        last_name,
        age,
      },
    })

    res.json({ message: 'Profile updated successfully' })
  } catch (error) {
    next(error)
  }
}

exports.deleteAccount = async (req, res, next) => {
  const { id } = req.user

  try {
    const adminGroups = await prisma.group.findMany({
      where: { adminId: id },
      select: { id: true },
    })

    for (const group of adminGroups) {
      await deleteGroupByIdLogic(group.id, id)
    }

    await prisma.user.update({
      where: { id },
      data: {
        contacts: { set: [] },
        contactsOf: { set: [] },
        memberOfGroups: { set: [] },
      },
    })

    await prisma.message.deleteMany({
      where: {
        OR: [{ creatorId: id }, { recieverId: id }],
      },
    })

    await prisma.user.delete({
      where: { id },
    })

    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    next(error)
  }
}
