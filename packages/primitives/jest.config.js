import { dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/no-relative-packages
import jestBaseConfig from '../../jest.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  ...jestBaseConfig,
  roots: [__dirname],
  displayName: '@strapi/ui-primitives',
};
