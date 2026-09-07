const { test, expect } = require("../../fixtures/base.fixture");
const { userLogin_Data } = require("../../test-data/register-data");

test.describe('Login UI Should be visible', ()=>{
      const {userId, userPassword} = userLogin_Data.validId
      test.beforeEach('User login page',async({page,loginPage})=>{
          await page.goto('/Pages/login')

      })
      test('TC01 page should be visible', async({page,loginPage})=>{
           await loginPage.loginPage_Visibility()
           
      })
      test('TC02 User Should be valid', async({page,loginPage})=>{
             await loginPage.userFillId(userId)
             await loginPage.userFillPassword(userPassword)
             await loginPage.clickShowPass()
             await loginPage.clickHidePass()
             await loginPage.enabledButton()
            
      })
      test('TC03 button should be disabled' , async ({page,loginPage})=>{
         await loginPage.userFillId('')
         await loginPage.userFillPassword('')
         await loginPage.disabledButton()
          await page.waitForTimeout(7000)
      })
      test('TC04 User can click the login button', async({page, loginPage})=>{
           await loginPage.userFillId(userId)
           await loginPage.userFillPassword(userPassword)
           await loginPage.clickLoginButton()
           await page.waitForTimeout(5000)
      })
     test('create token while user login', async ({ page, loginPage }) => {
    await loginPage.userFillId(userId);
    await loginPage.userFillPassword(userPassword);
    const responsePromise = page.waitForResponse(response =>
        response.url().includes('/website/register-user/user-login')
    ); 
    await loginPage.clickLoginButton();
    const response = await responsePromise;
    const body = await response.json();
     const token =await body.token
    const localStorageToken = await page.evaluate(()=>{
        return localStorage.getItem('token')
    })
    await expect(localStorageToken).toBeTruthy()
    await expect(localStorageToken).toBe(token)
    console.log('localstorage token', localStorageToken)

     })

})