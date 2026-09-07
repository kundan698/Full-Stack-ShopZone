let express = require('express')
const { register_route } = require('./website/user/register-route')
let website_route = express.Router()
website_route.use('/register-user', register_route)
module.exports = {website_route}