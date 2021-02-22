const DEBUG = process.env.DEBUG;

module.exports = {
    testRegex: 'src/.*\\.e2e\\.js$',
    preset: 'jest-playwright-preset',
    testEnvironmentOptions: {
        'jest-playwright': {
            browsers: ['chromium', 'firefox', 'webkit'],
            launchOptions: {
                headless: DEBUG !== 'true',
                // devtools: true,
            },
        },
    },
};
