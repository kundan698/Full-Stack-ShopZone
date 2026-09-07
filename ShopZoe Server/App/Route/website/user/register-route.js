let express = require('express')
const { UserSignUp, VerifyOTP, UserLogin } = require('../../../controller/website/user/register-controller')

let register_route = express.Router()
register_route.post('/insert', UserSignUp)
register_route.post('/verify-otp', VerifyOTP)
register_route.post('/user-login', UserLogin)
module.exports = {register_route}

/* http://localhost:3333/website/register-user/insert
   http://localhost:3333/website/register-user/verify-otp
   http://localhost:3333/website/register-user/user-login

*/
