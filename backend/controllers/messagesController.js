const { ForbiddenError } = require('../errors/customErrors')
const prisma = require('../lib/prisma')

exports.attachMessageToRequestObject = async (req, res, next) => {
  const { messageId } = req.params

  try {
    const message = await prisma.message.findFirstOrThrow({
      where: { id: messageId },
    })

    req.currentMessage = message
    next()
  } catch (error) {
    next(error)
  }
}

exports.getAllUserMessages = async (req, res, next) => {
  const { id } = req.user

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ creatorId: id }, { recieverId: id }],
      },
    })

    res.json(messages)
  } catch (error) {
    next(error)
  }
}

exports.createNewMessage = async (req, res, next) => {
  const { id } = req.user
  const { to, text } = req.body

  try {
    const reciever = await prisma.user.findFirstOrThrow({
      where: { phone: to },
    })

    const message = await prisma.message.create({
      data: {
        creatorId: id,
        recieverId: reciever.id,
        text,
      },
    })

    res.json(message)
  } catch (error) {
    next(error)
  }
}

exports.getMessageById = (req, res, next) => {
  const { currentMessage } = req

  try {
    res.json(currentMessage)
  } catch (error) {
    next(error)
  }
}

exports.editMessageById = async (req, res, next) => {
  const { id: messageId, creatorId } = req.currentMessage
  const { id: userId } = req.user
  const { text } = req.body

  if (creatorId !== userId) throw new ForbiddenError('You cannot edit a message that is not yours')

  try {
    await prisma.message.update({
      where: { id: messageId },
      data: {
        text,
      },
    })

    res.json({ msg: 'message edited successfully' })
  } catch (error) {
    next(error)
  }
}

exports.deleteMessageById = async (req, res, next) => {
  const { id: userId } = req.user
  const { id: messageId, creatorId } = req.currentMessage

  if (creatorId !== userId) throw new ForbiddenError('You cannot delete a message that is not yours')

  try {
    await prisma.message.delete({
      where: { id: messageId },
    })

    res.json({ msg: 'message deleted successfully' })
  } catch (error) {
    next(error)
  }
}
