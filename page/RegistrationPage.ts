/**
 * @file RegistrationPage.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To handle interactions with the registration page, including filling out forms, clicking buttons, and handling errors.
 * 
 * @usage
 * 1. Instantiate the `RegistrationPage` class with the `page` instance from Playwright:
 *    const registrationPage = new RegistrationPage(page);
 * 2. Use the provided methods to interact with the registration page:
 *    await registrationPage.fillEmail('example@example.com');
 *    await registrationPage.clickRegisterButton();
 * 3. The class is designed to be used in automated tests for filling out and submitting the registration form.
 *
 * @alterations
 * - 2025-01-20: Initial version for handling registration page interactions.
 * - 2025-01-20: Refactored code for better maintainability, added logging.
 */

import { PageObject } from './Page'; // Import the base PageObject class
import { ENV, SELECTORS } from '../config'; // Import environment and selector configurations
import logger from '../lib/logger'; // Import logger utility for logging messages

export class RegistrationPage extends PageObject {
    constructor(page: Page) {
        super(page); // Pass the page instance to the base PageObject class
    }

    /**
     * Fills the email input field with the provided value for registration.
     * @param value - The email address to fill in the email input field.
     */
    async fillEmail(value: string): Promise<void> {
        if (ENV.DEBUG) {
            logger.info('RegistrationPage: Setting email value for the first email input field...'); // Log the email input action
        }    
        await this.input.setInputValue(SELECTORS.REGISTRATION.EMAIL_INPUT, value); // Fill in the email field using the Input helper
    }

    /**
     * Clicks the register button to submit the registration form.
     */
    async clickRegisterButton(): Promise<void> {
        await this.button.clickButton(SELECTORS.REGISTRATION.REGISTER_BUTTON); // Click the register button
    }

    /**
     * Clicks a button by its text content (added from old code).
     * @param buttonText - The text content of the button to click.
     */
    async clickButtonByText(buttonText: string): Promise<void> {
        await this.page.click(`button:has-text("${buttonText}")`); // Click the button by matching its text
    }

    /**
     * Retrieves the error message displayed on the registration page, if any.
     * Reuses the inherited method from the PageObject class.
     * @returns The error message or null if no error is found.
     */
    async getErrorMessage(): Promise<string | null> {
        return super.getErrorMessage(SELECTORS.REGISTRATION.ERROR_MESSAGE); // Reuse the inherited method to get the error message
    }

    /**
     * Opens the registration page using the base URL from the environment config.
     * @returns A string indicating the URL or null if opening the URL fails.
     */
    async open(): Promise<string | null> {
        return super.open(ENV.BASE_URL); // Open the base URL using the inherited method from PageObject
    }

    /**
     * Clicks the "Начать работу бесплатно" button using the configured text for the button.
     */
    async clickFreeWorkButton(): Promise<void> {
        await this.clickButtonByText(SELECTORS.REGISTRATION.FREE_WORK_BUTTON_TEXT); // Click the "free work" button using the text selector
    }

    /**
     * Waits for a specified amount of time (used for pauses between actions).
     * @param ms - The duration in milliseconds to pause the execution.
     */
    async waitForTimeout(ms: number = 1000): Promise<void> {
        if (ENV.DEBUG) {
            logger.info('RegistrationPage: Pause intermediate'); // Log the pause action
        }    
        await super.waitForTimeout(ms); // Call the inherited waitForTimeout method
    }      
}
