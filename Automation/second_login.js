// install playwright first: npm install @playwright/test

const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false }); // headless:false => show browser
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to your website
  await page.goto('https://devcv.91trucks.com/');

  // Click on "Login with Google"
  await page.click('text=Sign in with Google');  // adjust selector based on your button

  // Wait for Google login popup
  const [popup] = await Promise.all([
    // context.waitForEvent('page', { timeout: 30000}),
    page.waitForSelector('input[type="email"]'),
    // page.click('text=Sign in with Google') // triggers popup
  ]);

  // Fill Google login form
  // await page.waitForTimeout(30000)
  await popup.fill('gaurav.gupta@91trucks.com');
  await page.click('text=Next')

  passwordField = await page.waitForSelector('input[type="password"]');
  await passwordField.fill('Trucks@123');
  await page.click('text=Next');

  // Wait until redirected back to your app
  await page.waitForURL('https://devcv.91trucks.com/dashboard');  // replace with your app’s post-login page
  await page.waitForTimeout(5000)
  
    const menuTabs = [
    { name: 'Deals', selector: 'text=deal'},
    { name: 'Customers', selector: 'text=customers' },
    { name: 'Users', selector: 'text=user' }
    // ➕ add more tabs here
  ];

  for (const tab of menuTabs) {
    console.log(`➡️ Opening ${tab.name} page...`);
    await page.click(tab.selector);
    await page.waitForLoadState('networkidle'); // wait until content loads
    await page.waitForTimeout(5000);
    await page.screenshot({ path: `${tab.name}.png` }); // optional screenshot
  }

//   await page.waitForURL('https://devcv.91trucks.com/deal');  // replace with your app’s post-login page
//   
//   await page.waitForURL('https://devcv.91trucks.com/customers');  // replace with your app’s post-login page
//   await page.waitForTimeout(10000),

  console.log("✅ Successfully logged in with Google!");

  // Close
  await browser.close();
})();
