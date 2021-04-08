module.exports = {
  setupFilesAfterEnv: ['expect-playwright'],
  testRegex: 'src/.*\\.e2e\\.js$',
  preset: 'jest-playwright-preset',
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium', 'firefox', 'webkit'],
      launchOptions: {
        // headless: false,
        // devtools: true,
      },
    },
  },
};
