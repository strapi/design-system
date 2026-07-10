import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Regression guard for design-system #2032 / strapi/strapi #26951.
 *
 * Singleton deps used across package boundaries must be external in dist — not
 * inlined — or production admin builds can load two copies and break instanceof
 * checks (CodeMirror) or shared runtime state (react-virtual).
 */
describe('published bundle contract', () => {
  const distPath = resolve(__dirname, '../../../../dist/index.mjs');

  it('does not inline singleton deps into the published bundle', () => {
    const content = readFileSync(distPath, 'utf-8');

    expect(content).not.toContain(
      'Unrecognized extension value in extension set',
    );
    expect(content).toMatch(/from ["']@codemirror\/state["']/);
    expect(content).toMatch(/from ["']@codemirror\/view["']/);
    expect(content).toMatch(/from ["']@tanstack\/react-virtual["']/);
  });
});
