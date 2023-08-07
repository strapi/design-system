import jestConfig from './jest.config.js';

/**
 * @type {import('jest').Config}
 */
const config = {
  ...jestConfig,
  globalSetup: '<rootDir>/test/no-tz.js',
};

export default config;
