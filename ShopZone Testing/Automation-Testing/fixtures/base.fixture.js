const { test: base } = require("@playwright/test");
const { HomePage } = require("../pages/HomePage");
const { Navbar } = require("../pages/NavbarPage");
const { RegisterModalPage } = require("../pages/registerPage");
const { LoginPageModal } = require("../pages/LoginPage");

const test = base.extend({
    homePage: async ({ page }, use) => {
       const homePage = new HomePage(page);
       await use(homePage);
    },
    navBar: async({page}, use)=>{
        const navBar = new Navbar(page)
        await use(navBar)

    },
    registerPage : async({page}, use)=>{
        const registerPage = new RegisterModalPage(page)
        await use(registerPage)
    },
    loginPage:async({page},use)=>{
        const loginPage = new LoginPageModal(page)
        await use(loginPage)
    }
});

module.exports = {
    test,
    expect: require("@playwright/test").expect,
};