// Button.ts
import { Page } from '@playwright/test';

export class Button {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickButton(selector: string): Promise<void> {
        try {
            await this.page.click(selector);
        } catch (error) {
            console.error(`Error clicking button with selector: ${selector}`, error);
            throw error;
        }
    }
}
