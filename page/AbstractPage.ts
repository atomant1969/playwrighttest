/**
 * @file AbstractPage.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To serve as a base class for page objects, providing common functionality for interacting with web pages.
 * 
 * @usage
 * 1. This is an abstract class meant to be extended by other page objects.
 * 2. Implement the `open` method in child classes to define the URL for the page:
 *    class RegistrationPage extends AbstractPage {
 *      async open(url: string) {
 *        // Open the registration page using the provided URL
 *      }
 *    }
 * 3. Use this as a base class for any page objects that require common behavior across different pages.
 *
 * @alterations
 * - 2025-01-20: Initial version to create a base abstract page class with the constructor and an abstract open method.
 */

import { Page } from '@playwright/test'; // Import the Page class from Playwright for handling page interactions

/**
 * AbstractPage serves as a base class for other page objects to inherit from.
 * It contains the common functionality for interacting with web pages.
 */
export abstract class AbstractPage {
    protected page: Page; // Declare the protected page instance to be used by child classes

    /**
     * Initializes the page object with a Playwright page instance.
     * @param page - The Playwright Page instance used to interact with the browser.
     */
    constructor(page: Page) {
        this.page = page; // Assign the page instance to the class property
    }

    /**
     * Abstract method for opening a page URL. 
     * This must be implemented by subclasses that inherit from AbstractPage.
     * @param url - The URL to open.
     */
    abstract open(url: string): Promise<void>; // Abstract method that must be implemented by subclasses
}
