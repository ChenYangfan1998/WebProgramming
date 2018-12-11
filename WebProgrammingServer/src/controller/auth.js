const config = require('./../config/config')

const expressJwt = require('express-jwt')

const jwtAuth = expressJwt({ secret: config.user.jwtSecret }).unless({ path: ['/login', '/register'] })

module.exports = jwtAuth
