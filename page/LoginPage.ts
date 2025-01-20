/**
 * @file LoginPage.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To handle interactions with the login page, including filling out forms and clicking buttons.
 * 
 * @alterations
 * - 2025-01-20: Initial version for handling login page interactions.
 * - 2025-01-20: Refactored code to improve reusability and maintainability.
 */

import { PageObject } from './Page'; // Import the base PageObject class
import { ENV, SELECTORS } from '../config'; // Import environment and selector configurations
import logger from '../lib/logger'; // Import logger utility for logging messages

export class LoginPage extends PageObject {
    constructor(page: Page) {
        super(page); // Pass the page instance to the base PageObject class
    }

    /**
     * Fills the email input field with the provided value.
     * @param value - The email address to fill in the email input field.
     */
    async fillEmail(value: string): Promise<void> {
        await this.input.setInputValue(SELECTORS.LOGIN.EMAIL_INPUT, value); // Fill in the email field using the Input helper
    }

    /**
     * Fills the password input field with the provided value.
     * @param value - The password to fill in the password input field.
     */
    async fillPassword(value: string): Promise<void> {
        await this.input.setInputValue(SELECTORS.LOGIN.PASSWORD_INPUT, value); // Fill in the password field using the Input helper
    }

    /**
     * Clicks the login button to submit the login form.
     */
    async clickLoginButton(): Promise<void> {
        await this.button.clickButton(SELECTORS.LOGIN.LOGIN_BUTTON); // Click the login button
        await this.page.waitForTimeout(1000); // Optional: wait for some time to ensure login is processed
    }

    /**
     * Clicks the apply data button after the login form is filled.
     */
    async clickLoginApplyButton(): Promise<void> {
        await this.button.clickButton(SELECTORS.LOGIN.APPLY_DATA_BUTTON); // Click the apply data button
    }

    /**
     * Retrieves the error message displayed on the login page, if any.
     * Reuses the inherited method from the PageObject class.
     * @returns The error message or null if no error is found.
     */
    async getErrorMessage(): Promise<string | null> {
        return super.getErrorMessage(SELECTORS.LOGIN.ERROR_MESSAGE); // Reuse the inherited method to get the error message
    }

    /**
     * Opens the login page using the base URL from the environment config.
     * @returns A string indicating the URL or null if opening the URL fails.
     */
    async open(): Promise<string | null> {
        return super.open(ENV.BASE_URL); // Open the base URL using the inherited method from PageObject
    }
}
