import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('h');
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('link', { name: 'Wishlist' }).click();
  await page.getByTestId('cart-link').click();
});