import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:6006',
    contextOptions: {
      locale: 'en-US',
    },
  },
  timeout: 10000,
  testMatch: '**/__tests__/*.e2e.js',
};

export default config
