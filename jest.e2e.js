module.exports = {
  testRegex: 'src/.*\\.e2e\\.ts$',
  preset: 'jest-playwright-preset',
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['firefox', 'chromium'],
      launchOptions: {
        // headless: false
        // devtools: true,
      },
    },
  },
};
