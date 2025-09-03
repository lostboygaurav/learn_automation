import { test, expect } from '@playwright/test';

test('check title and description', async ({ page }) => {
  await page.goto('https://www.91trucks.com/trucks/ashok-leyland/bada-dost-i4');
  
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Ashok Leyland Bada Dost i4 Truck Price in India, 2025 - 91trucks India");
  await expect(page).toHaveDescription("Ashok Leyland Bada Dost i4 is a Truck with   CC engine capacity.  It has a fuel tank capacity of 50 L. It is available in India at a price range of ₹9.99 Lakh. Check Ashok Leyland Bada Dost i4's latest prices, best offers near you, genuine user reviews, exclusive images, updated specs, horsepower, nearby dealers and more");

});