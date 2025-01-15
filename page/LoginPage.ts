import { PageObject } from './Page';
import { ENV, SELECTORS } from '../config'; // Import the selectors from config
import logger from '../lib/logger';

export class LoginPage extends PageObject {
    constructor(page: Page) {
        super(page);
    }

    async fillEmail(value: string): Promise<void> {
        await this.input.setInputValue(SELECTORS.LOGIN.EMAIL_INPUT, value);
        
    }

    async fillPassword(value: string): Promise<void> {
        await this.input.setInputValue(SELECTORS.LOGIN.PASSWORD_INPUT, value);
    }

    async clickLoginButton(): Promise<void> {
       await this.button.clickButton(SELECTORS.LOGIN.LOGIN_BUTTON);
       await this.page.waitForTimeout(4000);       
    }

    async clickLoginApplyButton(): Promise<void> {
        await this.button.clickButton(SELECTORS.LOGIN.APPLY_DATA_BUTTON);
    }

    // Now getErrorMessage uses the inherited method from PageObject
    async getErrorMessage(): Promise<string | null> {

        return super.getErrorMessage(SELECTORS.LOGIN.ERROR_MESSAGE); // Reuse the method from PageObject
    }
    async open(): Promise<string | null> {
        super.open(ENV.BASE_URL);
    }    
}
