import { expect, test } from "../../fixtures/base.fixture";

test("Navigate to Home Page", async ({ homePage, page }) => {
    await homePage.open();
    await expect(page).toHaveURL('http://localhost:3000/');
     const Title =  await homePage.titleIsVisible();
     console.log("Title is visible: ", Title);
});