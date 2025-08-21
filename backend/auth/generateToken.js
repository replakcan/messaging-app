require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync(
  path.resolve(process.env.PRIVATE_KEY_PATH),
  'utf8',
)

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.phone,
  }

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1d',
  })
}

module.exports = generateToken
