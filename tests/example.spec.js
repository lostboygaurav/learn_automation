// @ts-check
import { test, expect } from '@playwright/test';

test('check title and meta description', async ({ page }) => {
  await page.goto('https://www.91trucks.com/trucks/ashok-leyland/bada-dost-i4');
  
  // Check page title
  await expect(page).toHaveTitle("Ashok Leyland Bada Dost i4 Truck Price in India, 2025 - 91trucks India");

  // Get the meta description content
  const description = await page.locator('meta[name="description"]').getAttribute('content');

  // Check if it matches your expected description
  expect(description).toBe("Ashok Leyland Bada Dost i4 is a Truck with   CC engine capacity.  It has a fuel tank capacity of 50 L. It is available in India at a price range of ₹9.99 Lakh. Check Ashok Leyland Bada Dost i4's latest prices, best offers near you, genuine user reviews, exclusive images, updated specs, horsepower, nearby dealers and more");
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
