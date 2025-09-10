const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Open the site
  await page.goto('https://www.91trucks.com/');

  // 2. Verify Logo on Top Left
  const logo = await page.waitForSelector('img[alt="91trucks"]'); // adjust selector if needed
  await page.waitForTimeout(3000);
  if (await logo.isVisible()) {
    console.log("✅ Logo is visible on the top left");
  } else {
    console.log("❌ Logo is NOT visible");
  }

  // 3. Use Elastic Search to find a truck (Mahindra ZEO)
  await page.fill('input[placeholder="Search for Trucks, Buses, ThreeWheelers."]', 'Mahindra ZEO', 'tata Ace gold'); // adjust placeholder
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  console.log("✅ Search completed for Mahindra ZEO or tata Ace gold");

  // 4. Select a Location (e.g., Gurgaon or Ahmedabad)
  await page.click('button:has-text("Select Location")'); // adjust if needed

  // Wait for popup/modal to appear
  await page.waitForSelector('div[role="dialog"], .popup, .modal', { timeout: 10000 });

  //Option A: Search city by typing ===
  await page.fill('input[placeholder="Search city"]', 'Gurgaon'); // adjust placeholder text
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  console.log("✅ City searched and selected: Gurgaon");

  // === Option B: Select city directly by icon/text ===
  await page.click('text=Gurgaon');  // if clickable city is shown
  // console.log("✅ City selected from icons: Gurgaon");

  // Verify location applied (optional check)
  const location = await page.textContent('button:has-text("Gurgaon")');
  console.log("📍 Current Location set to:", location);

  // 5. Toggle Language (Hindi / English)
  await page.click('button:has-text("हिन्दी")'); // Switch to Hindi
  await page.waitForTimeout(2000);
  console.log("✅ Language switched to Hindi");

  await page.click('button:has-text("English")'); // Switch back to English
  console.log("✅ Language switched back to English");

  // Take a screenshot at the end
  await page.screenshot({ path: '91trucks-final.png' });

  await browser.close();
})();
