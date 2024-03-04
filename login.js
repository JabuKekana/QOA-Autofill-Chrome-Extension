const puppeteer = require('puppeteer');

async function fillLoginForm() {
  const browser = await puppeteer.launch({
    headless: false, // Run the browser in non-headless mode
    slowMo: 50,      // Slow down Puppeteer operations by 50ms to make it more visible
  });

  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('https://app.qurtubiks.com/login');

  // Wait for the login page to load
  await page.waitForSelector('input[name="email"]');
  await page.waitForSelector('input[name="password"]');

  // Fill in the email and password fields with test data
  await page.type('input[name="email"]', 'test@example.com');
  await page.type('input[name="password"]', 'password123');

  // Optionally, submit the form (if there's a submit button)
  // await page.click('button[type="submit"]');

  // Keep the browser open for manual inspection
  // Comment the next line if you want the browser to close automatically
  await page.waitForTimeout(0);

  // Close the browser manually when you're done
  // await browser.close();
}

fillLoginForm();
