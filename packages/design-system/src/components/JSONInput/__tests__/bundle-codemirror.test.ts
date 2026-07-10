import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Regression guard for design-system #2032 / strapi/strapi #26951.
 *
 * JSONInput builds a StateField from @codemirror/state and passes it to
 * @uiw/react-codemirror. If design-system inlines @codemirror/state into dist
 * while react-codemirror resolves the package from node_modules, instanceof
 * checks fail in production and the edit view crashes.
 */
describe('JSONInput bundle output', () => {
  const distPath = resolve(__dirname, '../../../../dist/index.mjs');

  it('does not inline @codemirror/state into the published bundle', () => {
    const content = readFileSync(distPath, 'utf-8');

    expect(content).not.toContain(
      'Unrecognized extension value in extension set',
    );
    expect(content).toMatch(/from ["']@codemirror\/state["']/);
    expect(content).toMatch(/from ["']@codemirror\/view["']/);
  });
});
