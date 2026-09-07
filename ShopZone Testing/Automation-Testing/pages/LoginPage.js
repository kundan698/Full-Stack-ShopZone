const { expect } = require("@playwright/test")

class LoginPageModal {
    constructor(page) {
         this.page = page
         this.loginPage = page.getByTestId('login-page')
         this.Text = page.getByText('Welcome Back')
         this.userIdInput = page.getByTestId('login-email')
         this.userPasswordInput = page.getByTestId('login-password')
         this.show_Hide_Password = page.getByTestId('toggle-password')
         this.loginButton = page.getByTestId('login-submit')
         this.userLoginButton = page.getByRole('button', {name:'Login'})

    }
    
    /* UI Assertion  */
    async loginPage_Visibility(){
         await expect(this.loginPage).toBeVisible()
         await expect(this.Text).toBeVisible()
         await expect(this.userIdInput).toBeVisible()
         await expect(this.userPasswordInput).toBeVisible()
         await expect(this.show_Hide_Password).toBeVisible()
         await expect(this.loginButton).toBeVisible()
         await expect(this.userLoginButton).toBeVisible()


    }
    async userFillId(userId){
         await this.userIdInput.fill(userId)
    }
    async userFillPassword(userPassword){
         await this.userPasswordInput.fill(userPassword)
    }
    async clickShowPass(){
           await this.show_Hide_Password.click()
    }
    async clickHidePass(){
          await this.show_Hide_Password.click()
    }
    async enabledButton(){
         await expect(this.loginButton).toBeEnabled()
    }
    async disabledButton(){
        await expect(this.loginButton).toBeDisabled()
    }
    async clickLoginButton(){
         await this.userLoginButton.click()
    }


    /* Assertion Closed */
}

module.exports = {LoginPageModal}