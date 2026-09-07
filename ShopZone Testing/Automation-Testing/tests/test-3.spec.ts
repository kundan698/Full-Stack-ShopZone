import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.getByText('Date Picker 1 (mm/dd/yyyy):').click();
  await page.locator('#ui-datepicker-div').getByRole('link', { name: '4', exact: true }).click();
});