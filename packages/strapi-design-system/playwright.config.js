const { devices } = require('@playwright/test');

const config = {
  testMatch: '**/__tests__/*.e2e.js',
  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:6006',
    headless: true,
    contextOptions: {
      locale: 'en-US',
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

module.exports = config;
