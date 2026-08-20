import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';

import packageJson from '../package.json';

const packageRoot = join(__dirname, '..');
const stylesheet = readFileSync(join(packageRoot, 'dist', 'next', 'styles.css'), 'utf8');
// A token rule reads the source, because Tailwind drops a token that nothing uses yet
const source = readFileSync(join(packageRoot, 'src', 'next', 'styles.css'), 'utf8');
// Resolve through package.json, because a jest moduleNameMapper sends every .css path to a stub
const tailwindRoot = dirname(require.resolve('tailwindcss/package.json'));
const tailwindTheme = readFileSync(join(tailwindRoot, 'theme.css'), 'utf8');

const ROOT_FONT_SIZE_FACTOR = 1.6;

// A capture of [^}]* would stop at a nested block, so count the braces
const ruleBody = (css: string, opener: RegExp) => {
  const match = opener.exec(css);
  if (!match) return null;

  let depth = 1;
  let index = match.index + match[0].length;
  while (depth > 0 && index < css.length) {
    if (css[index] === '{') depth += 1;
    if (css[index] === '}') depth -= 1;
    index += 1;
  }

  // Unbalanced input gives no answer, because a slice would look like a parsed body
  return depth === 0 ? css.slice(match.index + match[0].length, index - 1) : null;
};

// A factor of 1.6 has no exact binary form, and a seed can do the same to a multiplier
const round = (value: number) => Math.round(value * 1e4) / 1e4;

// Anchored at the colon, so --text-xs--line-height and the bare --radius do not match
const declarations = (css: string, prefix: string) =>
  new Map(
    [...css.matchAll(new RegExp(`^\\s*(--${prefix}-[a-z\\d]+):\\s*([^;]+);`, 'gm'))].map(([, name, value]) => [
      name,
      value,
    ]),
  );

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
    // The check finds a declaration anywhere in the file, so a token in .dark alone passes
    // A stronger check must require a colour token in :root and in .dark
    expect(used.filter((name) => !new RegExp(`[;{\\s]${name}\\s*:`).test(stylesheet))).toEqual([]);
  });

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

describe('the source stylesheet', () => {
  it('makes every form control transparent, so a dark page does not keep the browser white', () => {
    const body = ruleBody(source, /button,\s*input,\s*select,\s*textarea\s*{/);

    expect(body).not.toBeNull();
    expect(body!).toMatch(/background-color:\s*transparent/);
  });

  it('does not zero the border on every element, because a v4 width utility carries its own style', () => {
    const body = ruleBody(source, /\*,\s*::before,\s*::after\s*{/);

    expect(body).not.toBeNull();
    expect(body!).not.toMatch(/border:/);
  });

  // A missed step is silent: no error, only a size 1.6 times too small
  it.each(['text', 'container'])('rescales every Tailwind --%s-* step', (prefix) => {
    const stock = declarations(tailwindTheme, prefix);
    const overrides = declarations(source, prefix);

    expect(stock.size).toBeGreaterThan(0);
    expect([...stock.keys()].filter((name) => !overrides.has(name))).toEqual([]);

    // Compare the numbers, because '1.25rem' and '2rem' are equal after the multiply and unequal as text
    const actual = Object.fromEntries([...stock.keys()].map((name) => [name, round(parseFloat(overrides.get(name)!))]));
    const expected = Object.fromEntries(
      [...stock].map(([name, value]) => [name, round(parseFloat(value) * ROOT_FONT_SIZE_FACTOR)]),
    );

    expect(actual).toEqual(expected);
  });

  // Coverage only, because shadcn derives this ladder from --radius rather than rescaling a stock value
  // shadcn's ladder runs sm to 4xl, so --radius-xs keeps the Tailwind stock 0.125rem, which our 62.5%
  // root renders at 1.25px and not 2px — accepted, not overlooked
  it('overrides every Tailwind --radius-* step that shadcn defines', () => {
    const stock = declarations(tailwindTheme, 'radius');
    const overrides = declarations(source, 'radius');

    expect(stock.size).toBeGreaterThan(0);
    expect([...stock.keys()].filter((name) => !overrides.has(name))).toEqual(['--radius-xs']);
  });

  // The rescale test reads the stock keys of theme.css, so it can never see a step that Tailwind lacks
  it('adds --text-2xs, which the Strapi sigma variant needs and Tailwind does not have', () => {
    expect(declarations(source, 'text').get('--text-2xs')).toBe('1.1rem');
  });

  // A ticket that reseeds --radius for a design reason must state its new ladder here first
  it('turns the radius seed into a whole pixel at every step', () => {
    const seed = source.match(/^\s*--radius:\s*([\d.]+)px;/m);

    expect(seed).not.toBeNull();

    const steps = [...declarations(source, 'radius')].map(([name, value]) => {
      const multiplier = value.match(/\*\s*([\d.]+)/);

      return [name, round(parseFloat(seed![1]) * (multiplier ? parseFloat(multiplier[1]) : 1))];
    });

    expect(Object.fromEntries(steps)).toEqual({
      '--radius-sm': 3,
      '--radius-md': 4,
      '--radius-lg': 5,
      '--radius-xl': 7,
      '--radius-2xl': 9,
      '--radius-3xl': 11,
      '--radius-4xl': 13,
    });
  });
});
