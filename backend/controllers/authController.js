const { ForbiddenError } = require('../errors/customErrors')
const prisma = require('../lib/prisma')

exports.getUserProfile = async (req, res, next) => {
  const { user } = req

  try {
    const authUser = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
      include: {
        friends: true,
        adminOfGroups: true,
        memberOfGroups: true,
        messages_sent: true,
        messages_recieved: true,
      },
      omit: { password: true },
    })

    res.json(authUser)
  } catch (error) {
    next(error)
  }
}

exports.getUserFriends = async (req, res, next) => {
  const { user } = req

  try {
    const userFriends = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
      select: { friends: true },
    })

    res.json(userFriends)
  } catch (error) {
    next(error)
  }
}

exports.getUserGroups = async (req, res, next) => {
  const { user } = req

  try {
    const groups = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
      select: { adminOfGroups: true, memberOfGroups: true },
    })

    res.json(groups)
  } catch (error) {
    next(error)
  }
}

exports.getAllMessages = async (req, res, next) => {
  const { user } = req

  try {
    const messages = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
      select: {
        messages_recieved: true,
        messages_sent: true,
      },
    })

    const allMessages = [...messages.messages_recieved, ...messages.messages_sent]

    const sortedMessages = allMessages.sort((a, b) => a.createdAt - b.createdAt)

    res.json(sortedMessages)
  } catch (error) {
    next(error)
  }
}

exports.postNewMessage = async (req, res, next) => {
  const { recieverId, text } = req.body
  const { user } = req

  try {
    const message = await prisma.message.create({
      data: {
        creatorId: user.id,
        text,
        recieverId,
      },
    })

    res.json(message)
  } catch (error) {
    next(error)
  }
}

exports.editMessage = async (req, res, next) => {
  const { user } = req
  const { text } = req.body
  const { messageId } = req.params

  try {
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Message text cannot be empty' })
    }

    const message = await prisma.message.findFirstOrThrow({
      where: { id: messageId },
    })

    if (message.creatorId !== user.id) {
      throw new ForbiddenError('You cannot edit a message that is not yours')
    }

    if (message.text === text.trim()) {
      return res.json(message)
    }

    const editedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { text: text.trim() },
    })

    res.json(editedMessage)
  } catch (error) {
    next(error)
  }
}

exports.deleteMessage = async (req, res, next) => {
  const { user } = req
  const { messageId } = req.params

  try {
    const message = await prisma.message.findFirstOrThrow({
      where: { id: messageId },
    })

    if (message.creatorId !== user.id) {
      throw new ForbiddenError('You cannot edit a message that is not yours')
    }

    await prisma.message.delete({
      where: { id: messageId },
    })

    res.json({ message: 'message deleted' })
  } catch (error) {
    next(error)
  }
}
