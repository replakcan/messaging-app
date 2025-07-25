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

exports.addNewFriend = async (req, res, next) => {
  const { user } = req
  const { contactPhone } = req.body

  try {
    const newContact = await prisma.user.findFirstOrThrow({
      where: { phone: contactPhone },
    })

    const authUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        friends: {
          connect: [{ id: newContact.id }],
        },
      },
      include: { friends: true },
      omit: { password: true },
    })

    res.json(authUser)
  } catch (error) {
    next(error)
  }
}

exports.getFriendById = async (req, res, next) => {
  const { friendId } = req.params

  try {
    const friend = await prisma.user.findUniqueOrThrow({
      where: { id: friendId },
      omit: { password: true },
    })

    res.json(friend)
  } catch (error) {
    next(error)
  }
}

exports.removeExistingFriend = async (req, res, next) => {
  const { user } = req
  const { friendId } = req.params

  try {
    await prisma.user.findFirstOrThrow({
      where: { id: friendId },
    })

    const authUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        friends: {
          disconnect: [{ id: friendId }],
        },
      },
      include: { friends: true },
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

    const friendsWithoutPaswords = userFriends.friends.map((friend) => {
      const { password, ...rest } = friend
      return rest
    })

    res.json(friendsWithoutPaswords)
  } catch (error) {
    next(error)
  }
}

exports.getMessagesByFriendId = async (req, res, next) => {
  const { friendId } = req.params
  const { user } = req

  try {
    const sentMessages = await prisma.message.findMany({
      where: {
        creatorId: user.id,
        recieverId: friendId,
      },
    })

    const recievedMessages = await prisma.message.findMany({
      where: {
        creatorId: friendId,
        recieverId: user.id,
      },
    })

    const allMessages = [...sentMessages, ...recievedMessages]

    const sortedMessages = allMessages.sort((a, b) => a.createdAt - b.createdAt)

    res.json(sortedMessages)
  } catch (error) {
    next(error)
  }
}
