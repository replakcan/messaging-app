const {
  ForbiddenError,
  ConflictError,
  NotFoundError,
} = require('../errors/customErrors')
const prisma = require('../lib/prisma')

exports.attachGroupToRequestObject = async (req, res, next) => {
  const { groupId } = req.params

  try {
    const group = await prisma.group.findFirstOrThrow({
      where: { id: groupId },
    })

    req.currentGroup = group
    next()
  } catch (error) {
    next(error)
  }
}

exports.getAllUserGroups = async (req, res, next) => {
  const { id } = req.user

  try {
    const groups = await prisma.group.findMany({
      where: {
        OR: [
          { adminId: id },
          {
            members: {
              some: { id },
            },
          },
        ],
      },
    })

    res.json(groups)
  } catch (error) {
    next(error)
  }
}

exports.createNewGroup = async (req, res, next) => {
  const { id } = req.user
  const { name, description } = req.body

  try {
    const group = await prisma.group.create({
      data: {
        adminId: id,
        name,
        description,
      },
    })

    res.json(group)
  } catch (error) {
    next(error)
  }
}

exports.getGroupById = (req, res, next) => {
  const { currentGroup } = req

  try {
    res.json(currentGroup)
  } catch (error) {
    next(error)
  }
}

exports.editGroupById = async (req, res, next) => {
  const { id: groupId, adminId } = req.currentGroup
  const { id: userId } = req.user
  const { name, description } = req.body

  if (adminId !== userId)
    throw new ForbiddenError(
      'You cannot edit a group that you are not an admin of'
    )

  try {
    await prisma.group.update({
      where: { id: groupId },
      data: {
        name,
        description,
      },
    })

    res.json({ msg: 'group edited successfully' })
  } catch (error) {
    next(error)
  }
}

exports.deleteGroupById = async (req, res, next) => {
  const { id: userId } = req.user
  const { id: groupId, adminId } = req.currentGroup

  if (adminId !== userId)
    throw new ForbiddenError(
      'You cannot delete a group that you are not an admin of'
    )

  try {
    await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          set: [],
        },
      },
    })

    await prisma.message.deleteMany({
      where: { groupId },
    })

    await prisma.group.delete({
      where: { id: groupId },
    })

    res.json({ msg: 'group deleted successfully' })
  } catch (error) {
    next(error)
  }
}

exports.getAllGroupMessages = async (req, res, next) => {
  const { id: groupId } = req.currentGroup

  try {
    const messages = await prisma.message.findMany({
      where: { groupId },
    })

    res.json(messages)
  } catch (error) {
    next(error)
  }
}

exports.createNewGroupMessage = async (req, res, next) => {
  const { id: groupId } = req.currentGroup
  const { id: userId } = req.user
  const { text } = req.body

  try {
    const message = await prisma.message.create({
      data: {
        text,
        groupId,
        creatorId: userId,
      },
    })

    res.json(message)
  } catch (error) {
    next(error)
  }
}

exports.getAllGroupMembers = async (req, res, next) => {
  const { id: groupId } = req.currentGroup

  try {
    const group = await prisma.group.findUniqueOrThrow({
      where: { id: groupId },
      include: { members: true },
    })

    res.json(group.members)
  } catch (error) {
    next(error)
  }
}

exports.addNewMemberToGroup = async (req, res, next) => {
  const { id: groupId, adminId } = req.currentGroup
  const { id: userId } = req.user
  const { phone } = req.body

  if (adminId !== userId)
    throw new ForbiddenError('Only group admins are allowed to add new members')

  try {
    const phoneOwner = await prisma.user.findFirstOrThrow({
      where: { phone },
    })

    const isAlreadyMember = await prisma.group.findFirst({
      where: {
        id: groupId,
        members: {
          some: { id: phoneOwner.id },
        },
      },
    })

    if (isAlreadyMember)
      throw new ConflictError('User is already a member of the group')

    await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: { id: phoneOwner.id },
        },
      },
    })

    res.json({ msg: 'New member is added successfully' })
  } catch (error) {
    next(error)
  }
}

exports.removeExistingMember = async (req, res, next) => {
  const { id: groupId, adminId } = req.currentGroup
  const { id: userId } = req.user
  const { memberId } = req.params

  if (adminId !== userId)
    throw new ForbiddenError(
      'Only group admins are allowed to remove existing members'
    )

  try {
    const isMember = await prisma.group.findFirst({
      where: {
        id: groupId,
        members: {
          some: { id: memberId },
        },
      },
    })

    if (!isMember) throw new NotFoundError('User is not a member of this group')

    await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
    })

    res.json({ msg: 'Member is removed from the group successfully' })
  } catch (error) {
    next(error)
  }
}
