let express = require('express')
const { admin_route } = require('./Route/admin-route')
const { website_route } = require('./Route/website-route')
let Route = express.Router()
Route.use('/admin', admin_route)
Route.use('/website', website_route)
module.exports = {Route}