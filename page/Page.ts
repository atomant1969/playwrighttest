import { Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

import { Input } from './Input';
import { Button } from './Button';

export class PageObject extends AbstractPage {
    private button: Button;
    private input: Input;

    // Selectors as constants for better maintainability
    private readonly emailInputSelector = '#email';
    private readonly passwordInputSelector = '#password';
    private readonly applyDataButtonSelector = '.btn.btn-primary.pull-right'; // Corrected the selector
    private readonly loginButtonSelector = '.login-button'; // Selector for the login button
    private readonly registerButtonSelector = '.registration-button.scroll'; // Selector for the login button
    private readonly registerErrorMessage = '.description.result.error'; // Error message below the registration email field
    private readonly displayErrorMessage = '.alert.result.alert-danger'; //error message field
    private readonly registerEmailInputSelector = 'input[name="email"]'; // registration page email (on the homepage)
    constructor(page: Page) {
        super(page);
        this.button = new Button(page);
        this.input = new Input(page);
    }

    // Open a specified URL
    async open(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    // Wait for the login button to appear in the DOM
    async waitForLoginButton(): Promise<boolean> {
        try {
            await this.page.waitForSelector(this.loginButtonSelector, { state: 'visible', timeout: 5000 });
            return true;
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(`Login button not found: ${e.message}`);
            } else {
                console.error('An unknown error occurred');
            }
            return false;
        }
    }
    
    // Method to click a button by text content
    async clickButtonByText(buttonText: string): Promise<void> {
        await this.page.click(`button:has-text("${buttonText}")`);
    }

    // Click the login button
    async clickLoginButton(): Promise<void> {
        await this.button.clickButton(this.loginButtonSelector);
    }
    // Click the register button
    async clickRegisterButton(): Promise<void> {
        await this.button.clickButton(this.registerButtonSelector);
    }

    // Fill in the email input
    async fillEmail(value: string): Promise<void> {
        await this.input.setInputValue(this.emailInputSelector, value);
    }
    // Fill in the email input for the registration field
    async fillRegisterEmail(value: string): Promise<void> {
        await this.page.fill(this.registerEmailInputSelector, value);
    }

    // Fill in the password input
    async fillPassword(value: string): Promise<void> {
        await this.input.setInputValue(this.passwordInputSelector, value);
    }

    // Click the "Apply Data" button
    async applyData(): Promise<void> {
        await this.button.clickButton(this.applyDataButtonSelector);
    }

    // Get the text content of a specified selector
    async getText(selector: string): Promise<string | null> {
        return await this.page.textContent(selector);
    }
    // Adding waitForTimeout method
    async waitForTimeout(ms: number): Promise<void> {
        await this.page.waitForTimeout(ms);
    }
    normalizeText(text: string): string {
        return text.normalize('NFC').replace(/\s+/g, ' ');
    }
    
    async getTextNormalized(selector: string): Promise<string | null> {
        const text = await this.getText(selector); // existing method to get text
        console.log(text);
        return text ? this.normalizeText(text) : null;
    }    
}
