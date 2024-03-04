
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Launch in non-headless mode
    const page = await browser.newPage();

    // Go to the sign-up page
    await page.goto('https://app.qurtubiks.com/sign-up');

    // Check if there is an iframe on the page
    const iframeElement = await page.$('iframe[src*="your-iframe-source"]');
    
    if (iframeElement) {
        // Switch to the iframe
        const iframe = await iframeElement.contentFrame();

        // Wait for the form inside the iframe to load
        await iframe.waitForSelector('input[name="email"]');

        // Fill out the form inside the iframe
        await iframe.type('input[name="email"]', 'example@email.com');
        await iframe.type('input[name="password"]', 'Qurtubiks#2024');
        await iframe.type('input[name="confirmPassword"]', 'Qurtubiks#2024');
    } else {
        // Wait for the page to load
        await page.waitForSelector('.MuiButton-containedInfo'); // Assuming the Learner button has this class
        await page.waitForSelector('.MuiButton-containedSecondary'); // Assuming the Parent button has this class

        // Click on the "Parent" button
        await page.evaluate(() => {
            const parentButton = document.querySelector('.MuiButton-containedSecondary');
            parentButton.click();
        });

        // Wait for the form to load
        await page.waitForSelector('input[name="email"]');

        // Fill out the form on the main page
        await page.type('input[name="email"]', 'ridsandrads@gmail.com');
        await page.type('input[name="password"]', 'Qurtubiks#2024');
        await page.type('input[name="confirmPassword"]', 'Qurtubiks#2024');
    }

    // Remove the line below to exclude taking a screenshot
    // await page.screenshot({ path: 'signup_form_filled.png' });

    // Keep the browser open for manual verification
    console.log('The form has been filled. Please verify it manually.');

    // Don't close the browser to inspect the page
    // await browser.close();
})();

