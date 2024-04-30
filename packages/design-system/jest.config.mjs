import { dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/no-relative-packages
import jestBaseConfig from '../../jest.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type {import('jest').Config}
 */
const config = {
  ...jestBaseConfig,
  moduleNameMapper: {
    ...jestBaseConfig.moduleNameMapper,
    '^@test/(.*)$': '<rootDir>/packages/design-system/test/$1',
  },
  roots: [__dirname],
  displayName: '@strapi/design-system',
  testTimeout: 5000 * 4,
};

export default config;
