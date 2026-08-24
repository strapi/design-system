import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';

import packageJson from '../package.json';

const packageRoot = join(__dirname, '..');
const stylesheet = readFileSync(join(packageRoot, 'dist', 'next', 'styles.css'), 'utf8');
const source = readFileSync(join(packageRoot, 'src', 'next', 'styles.css'), 'utf8');
// A token rule reads this file, because it is the one the package publishes for a consumer to read
const tokens = readFileSync(join(packageRoot, 'src', 'next', 'theme.css'), 'utf8');
// Resolve through package.json, because a jest moduleNameMapper sends every .css path to a stub
const tailwindRoot = dirname(require.resolve('tailwindcss/package.json'));
const tailwindTheme = readFileSync(join(tailwindRoot, 'theme.css'), 'utf8');

// A comment inside the block names the other block, so the comments come out before the slice
const staticTokens = tokens.replace(/\/\*[\s\S]*?\*\//g, '').match(/@theme static\s*{([\s\S]*?)\n}/)![1];

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

  // `@theme static` makes this true. A consumer compiles a class against a token name and gets the value
  // from its own build as a var() fallback, so a name that this file omits leaves a stale value in place
  it('declares every token that theme.css names, and not only the ones it uses', () => {
    const named = [...staticTokens.matchAll(/^\s*(--[a-z\d-]+):/gm)].map(([, name]) => name);
    const declared = new Set([...stylesheet.matchAll(/(--[a-z\d-]+)\s*:/g)].map(([, name]) => name));

    expect(named.length).toBeGreaterThan(0);
    expect(named.filter((name) => !declared.has(name))).toEqual([]);
  });

  // The radius ladder was in `@theme inline`, which writes the multiplier into every consumer's own
  // stylesheet. Two consumers built at two times then give one class two different values
  it('points a radius utility at the token, so two consumers cannot disagree on one class', () => {
    expect(stylesheet).toMatch(/\.rounded-md\s*{\s*border-radius:\s*var\(--radius-md\)/);
  });
});

describe('the exports map', () => {
  it('points the new paths at files that the build wrote', () => {
    const code = packageJson.exports['./next'];
    const targets = [
      code.types,
      code.import,
      code.require,
      code.default,
      packageJson.exports['./next/styles.css'],
      packageJson.exports['./next/theme.css'],
    ];

    expect(targets.filter((target) => !existsSync(join(packageRoot, target)))).toEqual([]);
  });

  // theme.css ships from src and not from dist. An export outside `files` resolves in the repo, and it
  // is absent from the package that a consumer installs
  it('keeps every export inside the published file list', () => {
    const published = (target: string) =>
      packageJson.files.some((entry) => target === entry || target.startsWith(`${entry}/`));

    expect(published(packageJson.exports['./next/theme.css'].replace('./', ''))).toBe(true);
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
    const overrides = declarations(tokens, prefix);

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
    const overrides = declarations(tokens, 'radius');

    expect(stock.size).toBeGreaterThan(0);
    expect([...stock.keys()].filter((name) => !overrides.has(name))).toEqual(['--radius-xs']);
  });

  // Tailwind ships a stock line height for every step, but it emits only the ones a component uses.
  // A consumer needs them all, so a new step must not arrive without one
  it('gives every --text-* step a line height', () => {
    const sizes = [...declarations(tokens, 'text').keys()];
    const missing = sizes.filter((name) => !new RegExp(`${name}--line-height\\s*:`).test(tokens));

    expect(sizes).toHaveLength(14);
    expect(missing).toEqual([]);
  });

  // The rescale test reads the stock keys of theme.css, so it can never see a step that Tailwind lacks
  it('adds --text-2xs, which the Strapi sigma variant needs and Tailwind does not have', () => {
    expect(declarations(tokens, 'text').get('--text-2xs')).toBe('1.1rem');
  });

  // A ticket that reseeds --radius for a design reason must state its new ladder here first
  it('turns the radius seed into a whole pixel at every step', () => {
    const seed = source.match(/^\s*--radius:\s*([\d.]+)px;/m);

    expect(seed).not.toBeNull();

    const steps = [...declarations(tokens, 'radius')].map(([name, value]) => {
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
