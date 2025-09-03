// login.spec.js
const { test, expect } = require('@playwright/test');

test('Login test - valid credentials', async ({ page }) => {
  // 1. Go to the login page
  await page.goto('https://devcv.91trucks.com/'); // replace with real URL

  // 2. Enter username
  await page.fill('input[name="username"]', 'yourUsername'); // replace selector/username

  // 3. Enter password
  await page.fill('input[name="password"]', 'yourPassword'); // replace selector/password

  // 4. Click login button
  await page.click('button[type="submit"]');

  // 5. Assertion: Check if redirected to dashboard or see welcome message
  await expect(page).toHaveURL(/.*dashboard/); // adjust expected URL
  await expect(page.locator('h1')).toHaveText('Welcome'); // adjust selector and text
});