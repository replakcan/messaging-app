require('dotenv').config()
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const fs = require('node:fs')
const path = require('node:path')
const passport = require('passport')
const prisma = require('../lib/prisma')

const publicKey = fs.readFileSync(path.resolve(process.env.PUBLIC_KEY_PATH), 'utf-8')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: ['RS256'],
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: jwt_payload.id,
        },
      })

      if (user) return done(null, user)

      return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  })
)
