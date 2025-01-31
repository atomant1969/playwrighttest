/**
 * @file Page.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To handle common actions and utilities across all pages, including interacting with input fields, buttons, and handling errors.
 * 
 * @alterations
 * - 2025-01-20: Initial version of the PageObject class to handle reusable page interactions.
 * - 2025-01-20: Added logging, text normalization, and error message handling methods.
 */

import { Page } from '@playwright/test'; // Import Playwright's Page class
import { AbstractPage } from './AbstractPage'; // Import the base AbstractPage class
import { ENV, SELECTORS } from '../config'; // Import environment and selector configurations
import { Input } from './Input'; // Import the Input helper class for handling input fields
import { Button } from './Button'; // Import the Button helper class for handling button clicks
import logger from './logger'; // Import logger utility for logging messages

/**
 * PageObject class that provides common page actions, such as interacting with inputs, buttons, and retrieving text.
 * Inherits from the AbstractPage class for basic page handling functionality.
 */
export class PageObject extends AbstractPage {
    protected button: Button; // Button helper instance
    protected input: Input;   // Input helper instance

    constructor(page: Page) {
        super(page); // Initialize the base AbstractPage with the page object
        this.button = new Button(page); // Initialize the button helper
        this.input = new Input(page);   // Initialize the input helper
    }

    /**
     * Gets the text content of a specified selector.
     * @param selector - The CSS selector for the element to retrieve text from.
     * @returns The text content of the element or null if the element doesn't exist.
     */
    async getText(selector: string): Promise<string | null> {
        return await this.page.textContent(selector); // Return the text content of the element
    }

    /**
     * Normalizes a string by removing extra spaces and normalizing Unicode characters.
     * @param text - The text string to normalize.
     * @returns The normalized text string.
     */
    normalizeText(text: string): string {
        return text.normalize('NFC').replace(/\s+/g, ' ').trim(); // Normalize text by trimming spaces and standardizing unicode characters
    }

    /**
     * Retrieves and normalizes the text content of a specified selector.
     * @param selector - The CSS selector for the element to retrieve text from.
     * @returns The normalized text content of the element or null if the element doesn't exist.
     */
    async getTextNormalized(selector: string): Promise<string | null> {
        const text = await this.getText(selector); // Get the raw text
        return text ? this.normalizeText(text) : null; // Return normalized text if available
    }

    /**
     * Retrieves the error message or any other message and returns the normalized text.
     * @param selector - The CSS selector for the element containing the error message.
     * @returns The normalized error message or null if no message is found.
     */
    async getErrorMessage(selector: string): Promise<string | null> {
        return await this.getTextNormalized(selector); // Use the getTextNormalized method to fetch and normalize the error message
    }

    /**
     * Opens the specified URL or the default base URL if none is provided.
     * @param url - The URL to navigate to. Defaults to BASE_URL from ENV if not provided.
     */
    async open(url: string = ENV.BASE_URL): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' }); // Navigate to the provided URL and wait until the DOM content is loaded
    }

    /**
     * Pauses the test execution for a specified amount of time (in milliseconds).
     * @param ms - The duration in milliseconds to pause the execution. Defaults to 1000ms.
     */
    async waitForTimeout(ms: number = 1000): Promise<void> {
        if (ENV.DEBUG) {
            logger.info(`Page Class: Pausing for ${ms} milliseconds...`); // Log the pause action for debugging purposes
        }
        await this.page.waitForTimeout(ms); // Wait for the specified timeout duration
        if (ENV.DEBUG) {
            logger.info('Page Class: Pause complete'); // Log after the pause is complete
        }
    }
}
