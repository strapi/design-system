module.exports = {
  testRegex: 'src/.*\\.e2e\\.js$',
  preset: 'jest-playwright-preset',
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium', 'firefox', 'webkit'],
      launchOptions: {
        // headless: true,
        // devtools: true,
      },
    },
  },
};
