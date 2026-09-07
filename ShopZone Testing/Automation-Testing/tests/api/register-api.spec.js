const { tests, expect } = require("../../fixtures/api.fixture");
const { ApiUser } = require("../../test-data/api-user-test-data");

tests.describe('Api should be valid' , ()=>{
    const {username,email,password,confirmPassword,phone} = ApiUser.userDetails
     tests('check user details', async({request,registerApi})=>{
       const response = await registerApi.registerUser({
            username:username,
            email:email,
            phone:phone,
            password:password,
            confirmPassword:confirmPassword
         })
         const body = await response.json();
         console.log('body response', body);
         await expect(response.status()).toBe(200);
         await expect(body.status).toBe(1); 
         const OTP = await body.data.userOtp
         const registerEmail = await body.data.email
         console.log('user otp find' , OTP) 
         /* otp automation start */  

        const verifyUser =  await registerApi.verifyuserOtp({
             email:registerEmail,
             otp:OTP
         })
         const otpResponse = await verifyUser;
         const otpBody = await otpResponse.json()
         console.log('otp response', otpResponse)
         console.log('body otp', otpBody)
         await expect(otpResponse.status()).toBe(201)
         await expect(otpBody.status).toBe(1)

         /* closed */
     })
})