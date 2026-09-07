import { expect, test } from "../../fixtures/base.fixture";

test.describe('NavBar Logo brands', ()=>{
     test('TC01 Navbar logo Should be visible' , async({navBar,page})=>{
         await page.goto('/')
         const header = await navBar.VisibleLogo()
         console.log('header boolean' , header)
         await navBar.ClickLogo()
         await expect(page).toHaveURL('/')
         await navBar.SearcEngineVisible()
         await navBar.ClickInput()
         await navBar.fillInput()
         await navBar.LoginVisible()
         await navBar.clickLogin()
         await expect(page).toHaveURL(/\/Pages\/login$/)
         await navBar.visibleRegister()
         await navBar.clickRegister()
         await expect(page).toHaveURL(/\/Pages\/register$/)
         await navBar.visibleWishlist()
         await navBar.wishListClick()
         await expect(page).toHaveURL(/\/Pages\/wishlist$/)
         await page.waitForTimeout(5000)
         
     })
})

/* /\/Pages\/login$/ */