const { ForbiddenError, NotFoundError } = require('../errors/customErrors')
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

exports.getUserGroups = async (req, res, next) => {
  const { user } = req

  try {
    const groups = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
      select: {
        adminOfGroups: {
          select: {
            id: true,
            name: true,
            description: true,
            members: true,
            createdAt: true,
            adminId: true,
            admin: { select: { id: true, phone: true } },
          },
        },
        memberOfGroups: {
          select: {
            id: true,
            name: true,
            description: true,
            members: true,
            createdAt: true,
            adminId: true,
            admin: { select: { id: true, phone: true } },
          },
        },
      },
    })

    res.json(groups)
  } catch (error) {
    next(error)
  }
}

exports.createNewGroup = async (req, res, next) => {
  const { user } = req
  const { name, description } = req.body

  try {
    const group = await prisma.group.create({
      data: {
        adminId: user.id,
        name,
        description,
      },
    })

    res.json(group)
  } catch (error) {
    next(error)
  }
}

exports.getGroupById = async (req, res, next) => {
  const { groupId } = req.params

  try {
    const group = await prisma.group.findFirstOrThrow({
      where: { id: groupId },
      include: {
        messages: true,
        members: true,
        admin: {
          select: {
            phone: true,
          },
        },
      },
    })

    res.json(group)
  } catch (error) {
    next(error)
  }
}

exports.deleteGroupById = async (req, res, next) => {
  const { groupId } = req.params

  try {
    await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          set: [],
        },
      },
    })

    await prisma.group.delete({
      where: { id: groupId },
    })

    res.json({ message: 'Group deleted successfully' })
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

exports.getMessagesByGroupId = async (req, res, next) => {
  const { groupId } = req.params

  try {
    const groupMessages = await prisma.message.findMany({
      where: {
        groupId,
      },
    })

    const sortedMessages = groupMessages.sort((a, b) => a.createdAt - b.createdAt)

    res.json(sortedMessages)
  } catch (error) {
    next(error)
  }
}

exports.addGroupNewMember = async (req, res, next) => {
  const { groupId } = req.params
  const { user } = req
  const { newMemberId } = req.body

  try {
    const group = await prisma.group.findFirstOrThrow({
      where: { id: groupId },
    })

    if (group.adminId != user.id) throw new ForbiddenError('You are not an admin')

    await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: [{ id: newMemberId }],
        },
      },
    })

    res.json({ message: 'Member added successfully' })
  } catch (error) {
    next(error)
  }
}

exports.removeExistingGroupMember = async (req, res, next) => {
  const { user } = req
  const { groupId, memberId } = req.params

  try {
    const group = await prisma.group.findFirstOrThrow({
      where: { id: groupId },
      include: {
        admin: true,
        members: true,
      },
    })

    if (group.adminId !== user.id) {
      throw new ForbiddenError('You are not the admin of this group')
    }

    const memberInGroup = group.members.some((member) => member.id === memberId)
    if (!memberInGroup) {
      return res.status(404).json({ message: 'Member not found in the group' })
    }

    await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
    })

    res.json({ message: 'Member removed successfully from the group' })
  } catch (error) {
    next(error)
  }
}
