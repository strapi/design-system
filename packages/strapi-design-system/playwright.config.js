import { devices } from '@playwright/test';

export default {
  testMatch: '**/__tests__/*.e2e.js',
  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:6006',
    headless: true,
    contextOptions: {
      locale: 'en-US', // set the locale
    },
    actionTimeout: 0,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
};
