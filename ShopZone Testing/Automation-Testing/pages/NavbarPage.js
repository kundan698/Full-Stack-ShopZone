const { expect } = require("@playwright/test")

class Navbar {
    constructor(page) {
       this.page
       this.ShopLogo = page.getByTestId('logos') 
       this.inputSearch = page.getByTestId('search-input')
       this.loginLink = page.getByText('Login')
       this.UserRegister = page.getByText('Register')
       this.WishList = page.getByText('Wishlist')
    }
   async VisibleLogo (){
     await expect( this.ShopLogo).toBeVisible()
   }
   async LoginVisible  (){
     await expect(this.loginLink).toBeVisible()
   }
   async visibleRegister(){
       await expect(this.UserRegister).toBeVisible()
   }
   async visibleWishlist(){
     await expect(this.WishList).toBeVisible()
   }
   async ClickLogo(){
     await this.ShopLogo.click()
   }
   async SearcEngineVisible (){
      await expect(this.inputSearch).toBeVisible()
      
   }
  async ClickInput(){
     await this.inputSearch.click()
  }
  async fillInput(){
      await this.inputSearch.fill('tshirt')
  }
  async clickLogin(){
        await this.loginLink.click()
  }
  async clickRegister () {
     await this.UserRegister.click()
  }
  async wishListClick(){
    await this.WishList.click()
  }

}
module.exports = {Navbar}