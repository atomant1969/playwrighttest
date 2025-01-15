import { PageObject } from './Page';
import { ENV, SELECTORS } from '../config'; // Import the selectors from config
import logger from '../lib/logger';

export class RegistrationPage extends PageObject {
    constructor(page: Page) {
        super(page);
    }

    async fillEmail(value: string): Promise<void> {
        // Selector for the first email input field
        if (ENV.DEBUG) {
            logger.info('RegistrationPage: '+`Setting email value for the first email input field...`);
        }    
        await this.input.setInputValue(SELECTORS.REGISTRATION.EMAIL_INPUT, value);
    }

    async clickRegisterButton(): Promise<void> {
        await this.button.clickButton(SELECTORS.REGISTRATION.REGISTER_BUTTON);
    }

    // Method to click a button by its text content (added from old code)
    async clickButtonByText(buttonText: string): Promise<void> {
        await this.page.click(`button:has-text("${buttonText}")`);
    }

    // Now getErrorMessage uses the inherited method from PageObject
    async getErrorMessage(): Promise<string | null> {
        return super.getErrorMessage(SELECTORS.REGISTRATION.ERROR_MESSAGE); // Reuse the method from PageObject
    }

    async open(): Promise<string | null> {
        super.open(ENV.BASE_URL);
    }

    // Method to click the "Начать работу бесплатно" button using the config value
    async clickFreeWorkButton(): Promise<void> {
        await this.clickButtonByText(SELECTORS.REGISTRATION.FREE_WORK_BUTTON_TEXT);
    }
    async waitForTimeout(ms: number = 1000): Promise<void> {
        if (ENV.DEBUG) {
            logger.info('RegistrationPage: '+'Pause intermediate');
        }    
        await super.waitForTimeout(ms);
    }      
}
