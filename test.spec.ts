import { test, expect } from '@playwright/test';
import { LoginPage } from './page/LoginPage';
import { RegistrationPage } from './page/RegistrationPage';
import loginTestData from './loginTestData.json';
import registrationTestData from './registrationTestData.json';
import { ENV } from './config';
import logger from './lib/logger';

test.use({ headless: ENV.HEADLESS });

test.describe('Website Testing', () => {
    let loginPage: LoginPage;
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registrationPage = new RegistrationPage(page);

        // Ensure the base URL is opened before each test

        
        
        
    });
    loginTestData.forEach((data) => {
        test(data.testName, async () => {
            await loginPage.open();
            await loginPage.clickLoginButton();
            await loginPage.fillEmail(data.email);
            await loginPage.fillPassword(data.password);
            await loginPage.clickLoginApplyButton();

            const actualText = await loginPage.getErrorMessage();

            expect(actualText).toBe(data.message);
        });
    });

    registrationTestData.forEach((data) => {
        
        test(data.testName, async () => {
            await registrationPage.open();
            // Open registration page if necessary
            await registrationPage.clickRegisterButton();

            await registrationPage.fillEmail(data.email);
            await registrationPage.clickFreeWorkButton();

            const actualText = await registrationPage.getErrorMessage();
            if (ENV.DEBUG) {
                logger.info('Main Actual text: '+actualText);
                logger.info('Main Expected Text: '+data.message);
                logger.info('Main Expected Text: '+data.altmessage);
            }    
            expect(
                actualText.includes(data.message) || actualText.includes(data.altmessage)
            ).toBeTruthy();
        });
    });
});
