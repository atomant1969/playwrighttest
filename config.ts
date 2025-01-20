/**
 * @file config.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To define environment variables (ENV) and CSS selectors (SELECTORS) used throughout the test framework.
 * 
 * @alterations
 * - 2025-01-20: Initial version for handling environment configuration and CSS selectors.
 * - 2025-01-20: Updated DEBUG parsing and added fallback for TIMEOUT value.
 */

export const ENV = {
    /**
     * Base URL for the website under test.
     * Defaults to 'https://gymlog.ru' if not set in environment variables.
     */
    BASE_URL: process.env.BASE_URL || 'https://gymlog.ru',

    /**
     * Boolean flag to indicate if the tests should run in headless mode.
     * Reads from the 'HEADLESS' environment variable. Defaults to 'false' if not set.
     */
    HEADLESS: process.env.HEADLESS === 'true', // Read from environment variable

    /**
     * Timeout value for waiting operations in milliseconds.
     * Reads from the 'TIMEOUT' environment variable, with a fallback to 5000ms if not set.
     */
    TIMEOUT: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 5000, // Use fallback

    /**
     * Boolean flag to enable/disable debugging.
     * Set to 'false' by default to disable debug logs.
     */
    DEBUG: false  // Correctly parse the DEBUG environment variable
};

export const SELECTORS = {
    LOGIN: {
        /**
         * CSS selector for the email input field on the login page.
         */
        EMAIL_INPUT: '#email',

        /**
         * CSS selector for the password input field on the login page.
         */
        PASSWORD_INPUT: '#password',

        /**
         * CSS selector for the login button.
         */
        LOGIN_BUTTON: '.login-button',

        /**
         * CSS selector for the 'Apply Data' button.
         */
        APPLY_DATA_BUTTON: '.btn.btn-primary.pull-right',

        /**
         * CSS selector for the error message displayed on the login page.
         */
        ERROR_MESSAGE: '.alert.result.alert-danger',
    },
    
    REGISTRATION: {
        /**
         * CSS selector for the email input field on the registration page.
         */
        EMAIL_INPUT: '.form-wrapper.registration input[name="email"]',

        /**
         * CSS selector for the register button on the registration page.
         */
        REGISTER_BUTTON: '.registration-button.scroll',

        /**
         * CSS selector for the error message displayed on the registration page.
         */
        ERROR_MESSAGE: '.description.result.error',

        /**
         * Text content for the 'Free Work' button.
         */
        FREE_WORK_BUTTON_TEXT: 'Начать работу бесплатно',
    },
};
