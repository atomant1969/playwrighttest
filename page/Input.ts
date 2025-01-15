// Input.ts
import { Page } from '@playwright/test';
import { ENV, SELECTORS } from '../config'; // Import the selectors from config
import logger from '../lib/logger';

export class Input {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async setInputValue(selector: string, value: string, type: 'input' | 'textarea' = 'input'): Promise<void> {
        const element = await this.page.locator(selector);
        if (type === 'textarea') {
            await element.fill(value);
        } else {
            // Ensure the element is visible before filling
            if (ENV.DEBUG) {
                logger.info('Input Class: '+`Attempting to set value for selector: ${selector}`);
            }
            await this.page.waitForSelector(selector, { state: 'visible' }); // Ensure it's visible
            await element.fill(value);
            if (ENV.DEBUG) {
                logger.info('Input Class: '+value);
                logger.info('Input Class: '+'Setting inside input class value...');
            }
        }
    }
}
