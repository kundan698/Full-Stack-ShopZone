const { test, expect } = require("../../fixtures/base.fixture");
const { registerData } = require("../../test-data/register-data");

test.describe('User Register Page should be visible', ()=>{
     test.beforeEach(async ({page,registerPage})=>{
     await page.goto('/Pages/register')
     await registerPage.verifyRegisterModalVisible()
     const {username, email, phone,password,confirmPassword} = registerData.validuser;
         await registerPage.fillUsername(username)
         await registerPage.fillEmail(email)
         await registerPage.fillPhone(phone)
         await registerPage.fillPassword(password)
         await registerPage.fillConfirmPassword(confirmPassword)
     })
    
     test('User should be able to enter OTP successfully', async({page,registerPage})=>{
          const waitForRespose_Promise = page.waitForResponse(response=>response.url().includes(`/website/register-user/insert`)
         )
         await registerPage.UserClickRegister()
         const response = await waitForRespose_Promise;
         const body = await response.json()
         const userOtp = body.data.userOtp
         console.log(userOtp)
         await registerPage.fillOtp(userOtp)
         await registerPage.VerifyotpClick()
         
     })
     /* test('Register success popup should be visible', async({page,registerPage})=>{
        await registerPage.loginPopup()
        await registerPage.navigateLogin()
        await expect(page).toHaveURL(/\/Pages\/login$/)
        await page.waitForTimeout(5000)
     }) */
  
})