const { NotFoundError, ConflictError } = require('../errors/customErrors')
const prisma = require('../lib/prisma')

exports.attachContactToRequestObject = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const currentContact = await prisma.user.findFirstOrThrow({
      where: { id: contactId },
    })

    req.currentContact = currentContact

    next()
  } catch (error) {
    next(error)
  }
}

exports.getUserContacts = async (req, res, next) => {
  const { id } = req.user

  try {
    const contacts = await prisma.user.findFirstOrThrow({
      where: { id },
      select: { contacts: true },
    })

    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

exports.addNewContact = async (req, res, next) => {
  const { id } = req.user
  const { phone } = req.body

  try {
    const phoneOwner = await prisma.user.findFirstOrThrow({
      where: { phone },
    })

    if (!phoneOwner) throw new NotFoundError('This phone number is not valid')

    const isAlreadyInContacts = await prisma.user.findFirst({
      where: {
        id,
        contacts: {
          some: { id: phoneOwner.id },
        },
      },
    })

    if (isAlreadyInContacts)
      throw new ConflictError('User is already in your contacts')

    await prisma.user.update({
      where: { id },
      data: {
        contacts: {
          connect: [{ id: phoneOwner.id }],
        },
      },
    })

    res.json({ message: 'Contact added successfully' })
  } catch (error) {
    next(error)
  }
}

exports.getContactInfo = async (req, res, next) => {
  const { id } = req.currentContact

  try {
    const contact = await prisma.user.findFirstOrThrow({
      where: { id },
    })

    res.json(contact)
  } catch (error) {
    next(error)
  }
}

exports.removeContact = async (req, res, next) => {
  const { id: contactId } = req.currentContact
  const { id: userId } = req.user

  try {
    const isContactThere = await prisma.user.findFirst({
      where: {
        id: userId,
        contacts: { some: { id: contactId } },
      },
    })

    if (!isContactThere)
      throw new NotFoundError('You do not have this person in your contacts')

    await prisma.user.update({
      where: { id: userId },
      data: {
        contacts: {
          disconnect: { id: contactId },
        },
      },
    })

    res.json({ message: 'Contact removed successfully' })
  } catch (error) {
    next(error)
  }
}
