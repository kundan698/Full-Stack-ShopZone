import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.getByPlaceholder( 'Enter Name' ).click();
  await page.getByPlaceholder( 'Enter Name' ).fill('Kundan Kumar');
  await page.getByPlaceholder( 'Enter EMail' ).click();
  await page.getByPlaceholder( 'Enter EMail' ).fill('test123@gmail.com');
  await page.getByPlaceholder( 'Enter Phone' ).click();
  await page.getByPlaceholder( 'Enter Phone' ).fill('9794607643');
  await page.getByText( ' Address' ).click();
  await page.getByText( ' Address' ).fill('Chennai India');
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('radio', { name: 'Female', exact: true }).check();
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.waitForTimeout(2000)
  await page.getByRole('checkbox', { name: 'Sunday' }).check();
  await page.getByRole('checkbox', { name: 'Monday' }).check();
  await page.getByRole('checkbox', { name: 'Tuesday' }).check();
  await page.getByRole('checkbox', { name: 'Wednesday' }).check();
  await page.getByLabel('Country:').selectOption('india');
  await page.getByLabel('Colors:').selectOption('green');
  await page.getByLabel('Sorted List:').selectOption('elephant');
});