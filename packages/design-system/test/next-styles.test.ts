import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import packageJson from '../package.json';

// These tests read the built stylesheet, not the source. The emitted file name, the exports map and the
// published file list are only real in the build output, so the test task depends on the build

const packageRoot = join(__dirname, '..');
const stylesheet = readFileSync(join(packageRoot, 'dist', 'next', 'styles.css'), 'utf8');

describe('the prebuilt stylesheet', () => {
  it('leaves the utilities unlayered, so they beat the global rules of the old system', () => {
    expect(stylesheet).toContain('.bg-primary');
    expect(stylesheet).not.toMatch(/@layer\s+utilities/);
  });

  it('does not import preflight, because the old system ships its own reset', () => {
    // Preflight sets these two properties, and nothing else in the file sets them
    expect(stylesheet).not.toContain('text-size-adjust');
    expect(stylesheet).not.toContain('tab-size');
  });

  it('sets the root font size, so a size comes out the same as in the old system', () => {
    expect(stylesheet).toMatch(/html\s*{[^}]*font-size:\s*62\.5%/);
  });

  it('defines every design token that it uses', () => {
    const used = [...new Set([...stylesheet.matchAll(/var\(\s*(--[a-z\d-]+)/g)].map(([, name]) => name))].filter(
      // The --tw- properties belong to Tailwind, which declares them with @property
      (name) => !name.startsWith('--tw-'),
    );

    expect(used.length).toBeGreaterThan(0);
    expect(used.filter((name) => !new RegExp(`[;{\\s]${name}\\s*:`).test(stylesheet))).toEqual([]);
  });

  // A build can emit a large file that holds no utility, if nothing expands the Tailwind import. A
  // check on size would not find that fault
  it('contains the generated utility classes that the Button uses', () => {
    expect(stylesheet).toContain('.bg-primary');
    expect(stylesheet).toContain('.h-9');
  });
});

describe('the exports map', () => {
  it('points the new paths at files that the build wrote', () => {
    const code = packageJson.exports['./next'];
    const targets = [code.types, code.import, code.require, code.default, packageJson.exports['./next/styles.css']];

    expect(targets.filter((target) => !existsSync(join(packageRoot, target)))).toEqual([]);
  });
});
