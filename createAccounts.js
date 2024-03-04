const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Non-headless mode
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
        await iframe.type('input[name="email"]', 'ridsandrads@gmail.com');
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

        // Check if the URL is still the sign-up page before clicking "Continue"
        if (page.url() === 'https://app.qurtubiks.com/sign-up') {
            // Click on the "Continue" button
            await page.click('.MuiButton-root'); // Replace with the actual class or selector of the "Continue" button
        }

        // Wait for navigation to the login page
        await page.waitForNavigation();

        // Check if you are on the login page
        if (page.url() === 'https://app.qurtubiks.com/login') {
            // Wait for the login form to load
            await page.waitForSelector('input[name="email"]');

            // Fill out the login form
            await page.type('input[name="email"]', 'ridsandrads@gmail.com');
            await page.type('input[name="password"]', 'Qurtubiks#2024'); // Replace with your actual password

            // Remove the line below to exclude taking a screenshot
            // await page.screenshot({ path: 'login_form_filled.png' });

            // Keep the browser open for manual verification
            console.log('The login form has been filled. Please verify it manually.');
        }
    }

    // Don't close the browser to inspect the page
    // await browser.close();
})();
