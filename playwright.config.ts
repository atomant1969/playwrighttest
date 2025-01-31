import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'D:/Work/playwrighttest', // Directory where your test files are located
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
  },
});
