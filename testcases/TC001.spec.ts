import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage'; // Import the page class for the LoginPage
import loginTestData from '../testdata/loginTestData.json'; // Import test data
import { ENV } from '../config'; // Import environment configuration
import logger from '../lib/logger'; // Import logger

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); // Initialize the LoginPage with the current page
    });

    loginTestData.forEach((data) => {
        test(data.testName, async ({ page }) => {
            try {
                await loginPage.open();
                await loginPage.clickLoginButton();
                await loginPage.fillEmail(data.email);
                await loginPage.fillPassword(data.password);
                await loginPage.clickLoginApplyButton();

                const actualText = await loginPage.getErrorMessage();
                expect(actualText).toBe(data.message);

                // Submit test result to TestRail (if integrated)
                await submitTestResults(runId, [
                    {
                        case_id: data.caseId,
                        status_id: 1, // 1 = Passed
                        comment: 'Test passed successfully',
                    },
                ]);
            } catch (error) {
                // Submit test result to TestRail in case of failure
                await submitTestResults(runId, [
                    {
                        case_id: data.caseId,
                        status_id: 5, // 5 = Failed
                        comment: `Test failed: ${error.message}`,
                    },
                ]);
                throw error;
            }
        });
    });
});
