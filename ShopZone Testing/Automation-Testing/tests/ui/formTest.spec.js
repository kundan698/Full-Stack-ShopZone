import test from "@playwright/test";

test('Form Test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
    await page.getByPlaceholder('Enter Name').click();
    await page.getByPlaceholder('Enter Name').fill('John Doe');
    await page.getByPlaceholder('Enter Name').press('Tab');
    await page.getByPlaceholder('Enter Email').fill('john.doe@example.com');
    await page.getByPlaceholder('Enter Email').press('Tab');
    await page.getByPlaceholder('Enter Phone').fill('1234567890');
    await page.getByPlaceholder('Enter Phone').press('Tab');
    await page.getByText('Address').click();
    await page.getByText('Address').fill('123 Main St, Anytown, USA');
    await page.getByRole('radio', {name :'Male', exact:true}).check();
    await page.getByRole('radio', { name: 'Female' , exact: true}).check();
    await page.getByRole('checkbox', { name: 'Sunday', exact:true }).check();
    await page.getByRole('checkbox', { name: 'Monday', exact:true }).check();
    await page.getByRole('checkbox', { name: 'Tuesday', exact:true }).check();
    await page.getByRole('checkbox', { name: 'Wednesday', exact:true }).check();
    await page.getByRole('checkbox', { name: 'Thursday', exact:true }).check();
    await page.getByRole('checkbox', { name: 'Friday', exact:true }).check();
    await page.getByRole('checkbox', { name: 'Saturday', exact:true }).check();
    await page.getByLabel('Country:').selectOption('India');
    await page.getByLabel('Colors:').selectOption('Green');
    await page.getByLabel('Sorted List:').selectOption('Deer')
    await page.getByText('Date Picker 1 (mm/dd/yyyy):').click();
  await page.getByRole('link', { name: '7', exact: true }).click();
  await page.getByText('Date Picker 2 (dd/mm/yyyy) :').click();
  await page.getByRole('link', { name: '11' }).click();
    await page.waitForTimeout(5000)
});