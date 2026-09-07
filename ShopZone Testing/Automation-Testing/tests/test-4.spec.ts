import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.getByText('Date Picker 2 (dd/mm/yyyy) :').click();
  await page.getByRole('link', { name: '11' }).click();
});