const { test, expect } = require('@playwright/test');

test.describe('Login Functionality Tests', () => {

  const baseUrl = 'https://the-internet.herokuapp.com/login';

  test('Valid login credentials should log in successfully', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
  });

  test('Invalid password should show error', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'WrongPassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
  });

  test('Invalid username should show error', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });

  test('Empty username and password should show error', async ({ page }) => {
    await page.goto(baseUrl);

    await page.click('button[type="submit"]');

    await expect(page.locator('.flash.error')).toBeVisible();
  });

  test('Logout after login', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await page.click('a[href="/logout"]');

    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator('.flash.success')).toContainText('You logged out of the secure area!');
  });

});


