module.exports = {
    preset: 'jest-playwright-preset',
    testEnvironmentOptions: {
        'jest-playwright': {
            browsers: ['chromium', 'firefox', 'webkit'],
            launchOptions: {
                headless: false,
                // devtools: true,
            },
        },
    },
};
