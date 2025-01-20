/**
 * @file main.spec.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To perform end-to-end tests for login and registration functionalities.
 * 
 * @alterations
 * - 2025-01-20: Initial version for testing login and registration features.
 * - 2025-01-20: Refactored repetitive logic and improved error handling.
 */

import { test, expect } from '@playwright/test'; // Import Playwright's testing module
import { LoginPage } from './page/LoginPage'; // Import the LoginPage class for login interactions
import { RegistrationPage } from './page/RegistrationPage'; // Import the RegistrationPage class for registration interactions
import loginTestData from './loginTestData.json'; // Load test data for login scenarios
import registrationTestData from './registrationTestData.json'; // Load test data for registration scenarios
import { ENV } from './config'; // Import environment configuration (e.g., base URL, debug settings)
import logger from './lib/logger'; // Import the logger utility for logging messages

// Configure Playwright to run in headless mode based on the environment configuration
test.use({ headless: ENV.HEADLESS });

test.describe('Website Testing', () => {
    let loginPage: LoginPage; // Declare an instance of LoginPage
    let registrationPage: RegistrationPage; // Declare an instance of RegistrationPage

    /**
     * Setup before each test
     * Initializes the LoginPage and RegistrationPage instances before each test run.
     * This includes opening the login page and setting up page elements.
     */
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); // Initialize the LoginPage with the current page
        registrationPage = new RegistrationPage(page); // Initialize the RegistrationPage with the current page
    });

    /**
     * Login Test Cases
     * Loop through each login test case, fill in the credentials, submit, and verify the error message.
     */
    loginTestData.forEach((data) => {
        test(data.testName, async () => {
            await performLoginTest(data); // Call a helper function to avoid repetition
        });
    });

    /**
     * Registration Test Cases
     * Loop through each registration test case, fill in the registration details, submit, and verify the error message.
     */
    registrationTestData.forEach((data) => {
        test(data.testName, async () => {
            await performRegistrationTest(data); // Call a helper function to avoid repetition
        });
    });

    /**
     * Helper function to perform login tests
     * @param data - Test data for login (email, password, expected message).
     */
    async function performLoginTest(data: any) {
        await loginPage.open(); // Open the login page
        await loginPage.clickLoginButton();
        await loginPage.fillEmail(data.email);
        await loginPage.fillPassword(data.password);
        await loginPage.clickLoginApplyButton();

        const actualText = await loginPage.getErrorMessage();
        expect(actualText).toBe(data.message); // Assert that the actual error message matches the expected message
    }

    /**
     * Helper function to perform registration tests
     * @param data - Test data for registration (email, expected message, etc.).
     */
    async function performRegistrationTest(data: any) {
        await registrationPage.open(); // Open the registration page
        await registrationPage.clickRegisterButton(); // Click on the register button

        await registrationPage.fillEmail(data.email); // Fill email field
        await registrationPage.clickFreeWorkButton(); // Click the free work button for registration

        const actualText = await registrationPage.getErrorMessage();

        if (ENV.DEBUG) {
            // Log actual and expected text for debugging if debug mode is enabled
            logger.info('Registration Actual text: ' + actualText);
            logger.info('Registration Expected Text: ' + data.message);
            logger.info('Registration Alt Expected Text: ' + data.altmessage);
        }

        // Assert that the error message matches either of the expected messages
        expect(
            actualText.includes(data.message) || actualText.includes(data.altmessage)
        ).toBeTruthy();
    }
});
