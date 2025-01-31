/**
 * @file main.spec.ts
 * @date 2025-01-20
 * @author Robert Joyce
 * @purpose To perform end-to-end tests for various functionalities.
 * 
 * @alterations
 * - 2025-01-20: Initial version for testing login and registration features.
 * - 2025-01-20: Refactored repetitive logic and improved error handling.
 * - 2025-01-30: Updated to allow running individual test cases, groups of test cases, or specific test cases for a page.
 */

import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { ENV } from './config'; // Import environment configuration
import { testSuites } from './testSuiteConfig'; // Import the test suite configuration

// Read the suite name from the config file
const suiteName = ENV.TEST_SUITE;

// Function to get the test files based on suite name
function getTestFiles(suiteName: string): string[] {
    return testSuites[suiteName] || [];
}

// Configure Playwright to run in headless mode based on the environment configuration
test.use({ headless: ENV.HEADLESS });

test.describe('Website Testing', () => {
    let runId: number;

    /**
     * Create the test run in TestRail
     */
    test.beforeAll(async () => {
        runId = await createTestRun();
    });

    /**
     * Discover and run all test files based on the specified suite.
     */
    const files = suiteName === 'all' ? Object.values(testSuites).flat() : getTestFiles(suiteName);

    files.forEach((file) => {
        if (file.endsWith('.ts')) {
            require(file);
        }
    });

});
