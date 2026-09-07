const { test: base, expect, request } = require("@playwright/test");
const { RegisterApiModal } = require("../api/RegisterApiPage");
const { LoginApiModalPage } = require("../api/Login-Api-Page");

const tests = base.extend({
    registerApi: async({request}, use)=>{
        const registerApi = new RegisterApiModal(request)
        await use(registerApi)
    },
    loginUserApi: async({request}, use)=>{
         const loginUserApi = new LoginApiModalPage(request)
         await use(loginUserApi)
    }
})
module.exports = {tests,expect,request}