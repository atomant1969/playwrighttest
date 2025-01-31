/**
 * @file config.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To define environment variables (ENV) and CSS selectors (SELECTORS) used throughout the test framework.
 * 
 * @alterations
 * - 2025-01-20: Initial version for handling environment configuration and CSS selectors.
 * - 2025-01-20: Updated DEBUG parsing and added fallback for TIMEOUT value.
 *  Module requirements:
 *     npm install winston
 *     npm install playwright
 *     npm install winston-daily-rotate-file
 */

export const ENV = {
    BASE_URL: process.env.BASE_URL || 'http://dev.npoamotiv.ru/',
    HEADLESS: process.env.HEADLESS === 'true', // Read from environment variable
    TIMEOUT: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 5000, // Use fallback
    DEBUG: false  // Correctly parse the DEBUG environment variable
    TEST_SUITE: 'regression' // Default suite to run, can be changed as needed
};
export const SELECTORS = {
    MAINMENU: {
        PRODUCT: {
            URL: 'product',
            TEXT_RUS: 'продукция НПО Автомотив',
            TEXT_ENG: 'Product',
            DATA_TESTID: 'menu-product'
        },
        RESULTS: {
            URL: 'results',
            TEXT_RUS: 'Результаты работы',
            TEXT_ENG: 'Results',
            DATA_TESTID: 'menu-results'
        },
        LIBRARY: {
            URL: 'library',
            TEXT_RUS: 'Библиотека',
            TEXT_ENG: 'Library',
            DATA_TESTID: 'menu-library'
        },
        TASKS: {
            URL: 'tasks',
            TEXT_RUS: 'Задачи',
            TEXT_ENG: 'Tasks',
            DATA_TESTID: 'menu-tasks'
        },
        ASSEMBLY_UNITS: {
            URL: 'assembly-units',
            TEXT_RUS: 'База сборочных единиц',
            TEXT_ENG: 'Assembly Units',
            DATA_TESTID: 'menu-assembly-units'
        },
        PARTS: {
            URL: 'parts',
            TEXT_RUS: 'База деталей',
            TEXT_ENG: 'Parts',
            DATA_TESTID: 'menu-parts'
        },
        MATERIALS: {
            URL: 'materials',
            TEXT_RUS: 'База материалов',
            TEXT_ENG: 'Materials',
            DATA_TESTID: 'menu-materials'
        },
        TOOLS: {
            URL: 'tools',
            TEXT_RUS: 'База инструмента и оснастки',
            TEXT_ENG: 'Tools',
            DATA_TESTID: 'menu-tools'
        },
        EQUIPMENT: {
            URL: 'equipment',
            TEXT_RUS: 'База оборудования',
            TEXT_ENG: 'Equipment',
            DATA_TESTID: 'menu-equipment'
        },
        OPERATIONS: {
            URL: 'operations',
            TEXT_RUS: 'База техники и инвентаря',
            TEXT_ENG: 'Operations',
            DATA_TESTID: 'menu-operations'
        },
        SUPPLIERS: {
            URL: 'suppliers',
            TEXT_RUS: 'База поставщиков',
            TEXT_ENG: 'Suppliers',
            DATA_TESTID: 'menu-suppliers'
        },
        BUYERS: {
            URL: 'buyers',
            TEXT_RUS: 'База покупателей',
            TEXT_ENG: 'Buyers',
            DATA_TESTID: 'menu-buyers'
        },
        FILES: {
            URL: 'files',
            TEXT_RUS: 'База файлов',
            TEXT_ENG: 'Files',
            DATA_TESTID: 'menu-files'
        },
        SHIPPING_TASKS: {
            URL: 'shipping-tasks',
            TEXT_RUS: 'Задачи на отгрузку',
            TEXT_ENG: 'Shipping Tasks',
            DATA_TESTID: 'menu-shipping-tasks'
        },
        WAREHOUSE: {
            URL: 'warehouse',
            TEXT_RUS: 'Склад',
            TEXT_ENG: 'Warehouse',
            DATA_TESTID: 'menu-warehouse'
        },
        PRODUCTION: {
            URL: 'production',
            TEXT_RUS: 'Производство',
            TEXT_ENG: 'Production',
            DATA_TESTID: 'menu-production'
        },
        ACTIONS: {
            URL: 'actions',
            TEXT_RUS: 'Действия',
            TEXT_ENG: 'Actions',
            DATA_TESTID: 'menu-actions'
        },
        REJECT: {
            URL: 'reject',
            TEXT_RUS: 'Брак',
            TEXT_ENG: 'Reject',
            DATA_TESTID: 'menu-reject'
        },
        WASTE: {
            URL: 'waste',
            TEXT_RUS: 'Отходы',
            TEXT_ENG: 'Waste',
            DATA_TESTID: 'menu-waste'
        },
        WRITE_OFF: {
            URL: 'write-off',
            TEXT_RUS: 'Списание',
            TEXT_ENG: 'Write Off',
            DATA_TESTID: 'menu-write-off'
        },
        REPORTS: {
            URL: 'reports',
            TEXT_RUS: 'Отчеты',
            TEXT_ENG: 'Reports',
            DATA_TESTID: 'menu-reports'
        },
        COMPLAINT: {
            URL: 'complaint',
            TEXT_RUS: 'Рекламация',
            TEXT_ENG: 'Complaint',
            DATA_TESTID: 'menu-complaint'
        },
        ARCHIVE: {
            URL: 'archive',
            TEXT_RUS: 'Архив',
            TEXT_ENG: 'Archive',
            DATA_TESTID: 'menu-archive'
        }
    }
};
