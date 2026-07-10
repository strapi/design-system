import { readFileSync } from 'fs';
import { resolve } from 'path';

import contract from '../../bundle-contract.config.json';

const externalImportPattern = (pkg: string) =>
  new RegExp(`(?:from|require\\()\\s*["']${pkg.replace('/', '\\/')}["']`);

/**
 * Regression guard for design-system #2032 / strapi/strapi #26951.
 *
 * Singleton deps used across package boundaries must stay external in the
 * published bundle. Inlined copies break instanceof checks in production admin.
 */
describe('published bundle contract', () => {
  const packageRoot = resolve(__dirname, '../..');

  describe.each(contract.distFiles)('%s', (relPath) => {
    const content = readFileSync(resolve(packageRoot, relPath), 'utf-8');

    it.each(contract.mustNotContain)('does not inline forbidden marker: %s', (marker) => {
      expect(content).not.toContain(marker);
    });

    it.each(contract.mustBeExternal)('imports %s externally', (pkg) => {
      expect(content).toMatch(externalImportPattern(pkg));
    });
  });
});
