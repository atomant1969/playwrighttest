import { test, expect } from '@playwright/test';
import { PageObject } from './page/page';
import testData from './testData.json';

test.use({ headless: false }); // Ensure non-headless mode

test.describe('Website Testing', () => {
    let pageObject: PageObject;
    let page: any;
    let context: any;
    let browser: any;

    // Create browser context once for all tests
    test.beforeAll(async ({ browser: playwrightBrowser }) => {
        browser = playwrightBrowser;
        context = await browser.newContext();
        page = await context.newPage();
        pageObject = new PageObject(page);
    });

    // Close the browser after all tests are done
    test.afterAll(async () => {
        await context.close();
    });

    // Iterate through the testData array and create individual tests dynamically
    testData.filter((data) => data.testName.includes('login')).forEach((data) => {
        // Create a test for each test data entry
        test(data.testName, async () => {
            // Setup: Reuse the existing pageObject and navigate
            await pageObject.open('https://gymlog.ru/');
            await pageObject.clickLoginButton();
            //await pageObject.applyData();

            // Fill in email and password from the test data
            await pageObject.fillEmail(data.email);
            await pageObject.fillPassword(data.password);
            await pageObject.applyData();

            // Wait to see results
            await pageObject.waitForTimeout(1000);

            // Perform assertions
			
            const actualText = await pageObject.getTextNormalized(pageObject.displayErrorMessage);
            expect(actualText).toBe(pageObject.normalizeText(data.message));
        });
    });
	// this section is for testing the registration page
	testData.filter((data) => data.testName.includes('register')).forEach((data) => {
        // Create a test for each test data entry
        test(data.testName, async () => {
            // Setup: Reuse the existing pageObject and navigate
            await pageObject.open('https://gymlog.ru/');
            await pageObject.clickRegisterButton();
            //await pageObject.applyData();

            // Fill in email and password from the test data
            await pageObject.fillRegisterEmail(data.email);
            // Click the registration button by its text content
			await pageObject.clickButtonByText("Начать работу бесплатно");


            // Wait to see results
            await pageObject.waitForTimeout(4000);

            // Perform assertions
            const actualText = await pageObject.getTextNormalized(pageObject.registerErrorMessage);
            expect(actualText).toBe(pageObject.normalizeText(data.message));
        });
    });
});
