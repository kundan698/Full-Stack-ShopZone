const { expect } = require("@playwright/test")

class RegisterModalPage {
    constructor(page) {
         this.page = page
         this.createAccountText = page.getByTestId('create-account')
         this.username = page.getByTestId('user-name')
         this.email = page.getByTestId('email')
         this.phone = page.getByTestId('phone')
         this.password = page.getByTestId('password')
         this.confirmPassword = page.getByTestId('confirm-password')
         this.UserRole = page.getByRole('button', {name:'Create Account'})

         /* OTP Programing Start... */
         
         this.otp1 = page.getByLabel('OTP digit 1')
         this.otp2 = page.getByLabel('OTP digit 2')
         this.otp3 = page.getByLabel('OTP digit 3')
         this.otp4 = page.getByLabel('OTP digit 4')
         this.otp5 = page.getByLabel('OTP digit 5')
         this.otp6 = page.getByLabel('OTP digit 6')
         this.VerifyOTP = page.getByRole('button', {name:'Verify OTP'})
         /* OTP Programing Closed */

         /* Register Success should e visible */
         this.registerSuccess = page.getByTestId('register-success')
         this.LoginPage = page.getByText('Continue to Login')

         /* Cloed */
    }
    async verifyRegisterModalVisible(){
      await expect(this.createAccountText).toBeVisible()
        await expect(this.username).toBeVisible()
        await expect(this.email).toBeVisible()
        await expect(this.phone).toBeVisible()
        await expect(this.password).toBeVisible()
        await expect(this.confirmPassword).toBeVisible()
        await expect(this.username).toBeVisible()
    }
    
    /* Action UI */
    async fillUsername(username){
       await this.username.fill(username)
    }
    async fillEmail(email){
         await this.email.fill(email)
    }
    async fillPhone(phone){
         await this.phone.fill(phone)
    }
    async fillPassword(password){
        await this.password.fill(password)
    }
    async fillConfirmPassword(confirmPassword){
          await this.confirmPassword.fill(confirmPassword)
    }
    async UserClickRegister(){
         await this.UserRole.click()
    }

    /* fill OTP inside input field */

    async fillOtp(otp){
        await this.otp1.fill(otp[0])
        await this.otp2.fill(otp[1])
        await this.otp3.fill(otp[2])
        await this.otp4.fill(otp[3])
        await this.otp5.fill(otp[4])
        await this.otp6.fill(otp[5])
    }
    async VerifyotpClick(){
          await this.VerifyOTP.click()
    }
    /* OTP program closed */

    /* Click to login page and navigate to url */
    /* async loginPopup(){
         await expect(this.registerSuccess).toBeVisible()
    }
    async navigateLogin(){
         await this.LoginPage.click()
    }
 */
    /* closed */
}

module.exports = {RegisterModalPage}