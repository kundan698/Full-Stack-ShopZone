const { expect } = require("@playwright/test");

class HomePage {
    constructor(page) {
        this.page = page;
       
    }
    async open(){
        await this.page.goto(`http://localhost:3000/`);
    }
    async titleIsVisible(){
        return await this.page.title()
    }
}
module.exports = { HomePage };