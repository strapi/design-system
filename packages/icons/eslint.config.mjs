import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// eslint-disable-next-line import/no-default-export
export default defineConfig([
  globalIgnores(['**/dist', '**/src', '!src/index.ts', '!src/symbols.ts']),
  {
    extends: compat.extends('@strapi/eslint-config/front/typescript'),
  },
]);
