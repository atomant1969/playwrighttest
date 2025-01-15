import { Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
import { ENV, SELECTORS } from '../config'; // Import the selectors
import { Input } from './Input';
import { Button } from './Button';
import logger from '../lib/logger';

export class PageObject extends AbstractPage {
    protected button: Button;
    protected input: Input;

    constructor(page: Page) {
        super(page);
        this.button = new Button(page);
        this.input = new Input(page);
    }

    // Get the text content of a specified selector
    async getText(selector: string): Promise<string | null> {
        return await this.page.textContent(selector);
    }

    // Normalize text by removing extra spaces and normalizing unicode
    normalizeText(text: string): string {
        return text.normalize('NFC').replace(/\s+/g, ' ').trim();
    }

    // Get the normalized text content of a specified selector
    async getTextNormalized(selector: string): Promise<string | null> {
        const text = await this.getText(selector);
        return text ? this.normalizeText(text) : null;
    }

    // Get error message (or any other message) and return normalized text
    async getErrorMessage(selector: string): Promise<string | null> {
        return await this.getTextNormalized(selector); // Reuse the method from PageObject
    }
    // Open a specified URL
    async open(url: string = ENV.BASE_URL): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }    
    async waitForTimeout(ms: number = 1000): Promise<void> {
        if (ENV.DEBUG) {
            logger.info('Page Class: '+`Pausing for ${ms} milliseconds...`);
        }
        await this.page.waitForTimeout(ms);
        if (ENV.DEBUG) {
            logger.info('Page Class: '+'Pause complete');
        }
    }
}
