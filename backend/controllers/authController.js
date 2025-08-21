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

exports.getDistinctConversationRecievers = async (req, res, next) => {
  const { user } = req

  try {
    const distinctSenders = await prisma.message.findMany({
      where: { recieverId: user.id },
      distinct: ['creatorId'],
      select: { creator: { select: { id: true, phone: true } } },
    })

    const sentMessages = await prisma.message.findMany({
      where: { creatorId: user.id },
      select: {
        reciever: { select: { id: true, phone: true } },
        group: { select: { id: true, name: true } },
      },
    })

    const senders = distinctSenders.map((m) => ({
      id: m.creator.id,
      value: m.creator.phone,
      type: 'user',
    }))

    const recievers = sentMessages
      .map((m) => {
        if (m.reciever) {
          return {
            id: m.reciever.id,
            value: m.reciever.phone,
            type: 'user',
          }
        }
        if (m.group) {
          return {
            id: m.group.id,
            value: m.group.name,
            type: 'group',
          }
        }
        return null
      })
      .filter(Boolean)

    const all = [...senders, ...recievers]
    const uniqueMap = new Map()

    for (const item of all) {
      if (!uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item)
      }
    }

    const uniqueValues = Array.from(uniqueMap.values())

    res.json(uniqueValues)
  } catch (error) {
    next(error)
  }
}

exports.getMessagesDistinctConversation = async (req, res, next) => {
  const { id: userId } = req.user
  const { conId } = req.params

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { creatorId: userId, recieverId: conId },
          { creatorId: conId, recieverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
    })

    res.json(messages)
  } catch (error) {
    next(error)
  }
}
