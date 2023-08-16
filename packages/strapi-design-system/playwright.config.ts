import { resolve } from 'path';

import { devices, Config } from '@playwright/test';

const config: Config = {
  testMatch: '**/__tests__/*.e2e.{j,t}s',
  fullyParallel: true,
  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:6006',
    contextOptions: {
      locale: 'en', // set the locale
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
  webServer: {
    command: `npx serve -L -p 6006 ${resolve('..', '..', 'docs', 'storybook-static')}`,
    url: `http://127.0.0.1:6006`,
    timeout: 30 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
