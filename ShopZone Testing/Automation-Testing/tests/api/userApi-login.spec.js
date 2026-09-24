const { tests, request, expect } = require("../../fixtures/api.fixture");
const { ApiUser } = require("../../test-data/api-user-test-data");

tests.describe('Api should be visible and valid' , ()=>{
     const {email,password} = ApiUser.userDetails
    tests('user mail should be exist & password' , async({request,loginUserApi})=>{
      const login_response = await loginUserApi.loginApi_user({
             email,
             password
        })
        const response = await login_response;
        const body = await response.json()
        console.log('login response',response)
        console.log('body response', body)
        const token = body.token
        console.log('login token', token)

    })
})
