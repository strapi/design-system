import { dirname } from 'path';
import { fileURLToPath } from 'url';

import jestBaseConfig from '../../jest.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line import/no-default-export
export default {
  ...jestBaseConfig,
  roots: [__dirname],
  displayName: '@strapi/ui-primitives',
};
