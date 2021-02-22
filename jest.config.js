const DEBUG = process.env.DEBUG;

module.exports = {
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
