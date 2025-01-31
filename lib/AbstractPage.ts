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

import { Page } from '@playwright/test'; // Импортируем класс Page из Playwright для работы с взаимодействиями на странице
import logger from './logger';

/**
 * AbstractPage serves as a base class for other page objects to inherit from.
 * It contains the common functionality for interacting with web pages.
 */
export abstract class AbstractPage {
    protected page: Page; // Объявляем защищенный экземпляр Page для использования дочерними классами

    /**
     * Initializes the page object with a Playwright page instance.
     * @param page - Экземпляр Playwright Page для взаимодействия с браузером.
     */
    constructor(page: Page) {
        this.page = page; // Присваиваем экземпляр page свойству класса
    }

    /**
     * Abstract method for opening a page URL. 
     * This must be implemented by subclasses that inherit from AbstractPage.
     * @param url - URL для открытия.
     */
    abstract open(url: string): Promise<void>; // Абстрактный метод, который должен быть реализован дочерними классами

    /**
     * Simulate mouseover and read tooltip.
     * @param hoverSelector - CSS селектор элемента, на который нужно навести курсор.
     * @param tooltipSelector - CSS селектор тултипа, который появляется при наведении.
     * @returns Текст тултипа.
     */
    async readTooltip(hoverSelector: string, tooltipSelector: string): Promise<string | null> {
        await this.page.hover(hoverSelector); // Наводим курсор на элемент
        await this.page.waitForSelector(tooltipSelector); // Ожидаем появления тултипа
        const tooltipText = await this.page.locator(tooltipSelector).textContent(); // Читаем текст тултипа
        return tooltipText;
    }

    /**
     * Navigate to the specified selector or URL.
     * @param selector - Селектор или часть URL для навигации.
     */
    async nav(selector: string): Promise<void> {
        const url = `${ENV.BASE_URL}/${selector}`;

        try {
            const elementHandle = await this.page.$(`[data-testid="${selector}"]`);
            if (elementHandle) {
                await elementHandle.click();
            } else {
                await this.page.goto(url);
            }

            await this.page.waitForLoadState('load');
            const pageUrl = this.page.url();
            const pageTitle = await this.page.title();
            const pageBreadcrumb = await this.page.innerText('.breadcrumb');

            logger.info(`Navigated to: ${pageUrl}`);
            logger.info(`Page Title: ${pageTitle}`);
            logger.info(`Breadcrumb: ${pageBreadcrumb}`);
        } catch (error) {
            logger.error(`Navigation failed: ${error.message}`);
        }
    }

    /**
     * Verify that the current URL matches the expected URL.
     * @param expectedURL - Ожидаемый URL.
     */
    async verifyURL(expectedURL: string): Promise<void> {
        const actualURL = this.page.url();
        if (actualURL !== expectedURL) {
            throw new Error(`URL does not match. Expected: ${expectedURL}, Actual: ${actualURL}`);
        }
    }

    /**
     * Verify that the page title matches the expected title.
     * @param expectedTitle - Ожидаемый заголовок.
     */
    async verifyTitle(expectedTitle: string): Promise<void> {
        const actualTitle = await this.page.title();
        if (actualTitle !== expectedTitle) {
            throw new Error(`Title does not match. Expected: ${expectedTitle}, Actual: ${actualTitle}`);
        }
    }

    /**
     * Verify that the breadcrumb matches the expected breadcrumb.
     * @param expectedBreadcrumb - Ожидаемый хлебный крошка.
     */
    async verifyBreadcrumb(expectedBreadcrumb: string): Promise<void> {
        const actualBreadcrumb = await this.page.innerText('.breadcrumb');
        if (actualBreadcrumb !== expectedBreadcrumb) {
            throw new Error(`Breadcrumb does not match. Expected: ${expectedBreadcrumb}, Actual: ${actualBreadcrumb}`);
        }
    }

    /**
     * Capture a screenshot.
     * @param filename - Имя файла для сохранения скриншота.
     */
    async captureScreenshot(filename: string): Promise<void> {
        logger.info(`Capturing screenshot: ${filename}`);
        await this.page.screenshot({ path: filename });
    }
}
