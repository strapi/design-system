import { compile } from '@tailwindcss/node';
import { Scanner } from '@tailwindcss/oxide';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { parse, type AtRule, type Container, type Root, type Rule } from 'postcss';

import { darkColorTokenObject } from '../themes/darkTheme/dark-colors';
import { darkShadowTokenObject } from '../themes/darkTheme/dark-shadows';
import { lightColorTokenObject } from '../themes/lightTheme/light-colors';
import { lightShadowTokenObject } from '../themes/lightTheme/light-shadows';

const ROOT_FONT_SIZE_FACTOR = 1.6;

const properties = (container: Container, pattern: RegExp) => {
  const result = new Map<string, string>();

  container.walkDecls(({ prop, value }) => {
    if (pattern.test(prop)) result.set(prop, value);
  });

  return result;
};

// `:root`, `.dark` and the `@theme` blocks all sit at the top level of their stylesheet
const find = (root: Root, name: string) => {
  const result = root.nodes.find(
    (node): node is AtRule | Rule =>
      (node.type === 'rule' && node.selector === name) ||
      (node.type === 'atrule' && `@${node.name} ${node.params}` === name),
  );

  if (!result) throw new Error(`Could not find ${name}`);
  return result;
};

const rem = (value: string) => {
  const match = value.match(/^([\d.]+)rem$/);
  if (!match) throw new Error(`Expected a rem value, received ${value}`);
  return Number(match[1]);
};

const round = (value: number) => Math.round(value * 1e4) / 1e4;

// `neutral100` → `--neutral-100`, `buttonPrimary600` → `--button-primary-600`
const variable = (token: string) =>
  `--${token
    .replace(/(?<=[a-zA-Z])(?=\d)/g, '-')
    .replace(/(?<=[a-z])(?=[A-Z])/g, '-')
    .toLowerCase()}`;

const legacy = (tokens: Record<string, string>) =>
  Object.fromEntries(Object.entries(tokens).map(([token, value]) => [variable(token), value]));

let stylesheet: Root;
let source: Root;
let tokens: Root;
let runtime: Root;
let tailwindTheme: Root;

beforeAll(async () => {
  const sourceCss = await readFile(join(__dirname, 'styles.css'), 'utf8');
  const dependencies: string[] = [];
  const compiler = await compile(sourceCss, { base: __dirname, onDependency: (path) => dependencies.push(path) });
  // Jest maps every .css request to a style mock, so require.resolve cannot find the stock theme
  const tailwindThemePath = dependencies.find((path) => path.endsWith('/tailwindcss/theme.css'));

  if (!tailwindThemePath) throw new Error('Tailwind did not resolve its theme stylesheet');

  const [tokensCss, runtimeCss, tailwindThemeCss] = await Promise.all([
    readFile(join(__dirname, 'theme.css'), 'utf8'),
    readFile(join(__dirname, 'tokens.css'), 'utf8'),
    readFile(tailwindThemePath, 'utf8'),
  ]);

  stylesheet = parse(compiler.build(['bg-primary', 'bg-neutral-50', 'bg-neutral-100', 'shadow-popup', 'medium:flex']));
  source = parse(sourceCss);
  tokens = parse(tokensCss);
  runtime = parse(runtimeCss);
  tailwindTheme = parse(tailwindThemeCss);
});

describe('the compiled stylesheet', () => {
  it('leaves utilities unlayered, so they beat the global rules of the old system', () => {
    const utilities: Rule[] = [];
    stylesheet.walkRules('.bg-primary', (rule) => {
      utilities.push(rule);
    });

    expect(utilities).toHaveLength(1);
    expect(utilities[0].parent?.type).toBe('root');
  });
});

describe('the source stylesheet', () => {
  it('does not import preflight, because the old system ships its own reset', () => {
    const imports: string[] = [];
    source.walkAtRules('import', ({ params }) => {
      imports.push(params);
    });

    expect(imports).toEqual(
      expect.arrayContaining([
        expect.stringContaining('tailwindcss/theme.css'),
        expect.stringContaining('tailwindcss/utilities.css'),
      ]),
    );
    expect(imports.some((value) => value.includes('preflight'))).toBe(false);
  });

  it('gives every semantic colour a light and a dark value', () => {
    const light = properties(find(runtime, ':root'), /^--/);
    const dark = properties(find(runtime, '.dark'), /^--/);
    // `initial` clears a stock Tailwind family, so it points at no variable
    const colours = new Map(
      [...properties(find(tokens, '@theme inline'), /^--color-/)].filter(([, value]) => value !== 'initial'),
    );
    const unresolved = [...colours].filter(([, value]) => {
      const reference = value.match(/^var\((--[a-z\d-]+)\)$/)?.[1];
      return !reference || !light.has(reference) || !dark.has(reference);
    });

    expect(colours.size).toBeGreaterThan(0);
    expect(unresolved.map(([name]) => name)).toEqual([]);
  });

  it.each([
    ['text', /^--text-[a-z\d]+$/],
    ['container', /^--container-[a-z\d]+$/],
  ])('rescales every Tailwind --%s-* step', (_, pattern) => {
    const stock = properties(tailwindTheme, pattern);
    const overrides = properties(find(tokens, '@theme static'), pattern);

    expect(stock.size).toBeGreaterThan(0);
    expect([...stock.keys()].filter((name) => !overrides.has(name))).toEqual([]);

    const actual = Object.fromEntries([...stock.keys()].map((name) => [name, round(rem(overrides.get(name)!))]));
    const expected = Object.fromEntries(
      [...stock].map(([name, value]) => [name, round(rem(value) * ROOT_FONT_SIZE_FACTOR)]),
    );

    expect(actual).toEqual(expected);
  });

  it('overrides every Tailwind --radius-* step', () => {
    const pattern = /^--radius-[a-z\d]+$/;
    const stock = properties(tailwindTheme, pattern);
    const overrides = properties(find(tokens, '@theme static'), pattern);

    expect(stock.size).toBeGreaterThan(0);
    expect([...stock.keys()].filter((name) => !overrides.has(name))).toEqual([]);
  });

  it('gives every --text-* step a line height', () => {
    const declarations = properties(find(tokens, '@theme static'), /^--text-/);
    const sizes = [...declarations.keys()].filter((name) => /^--text-[a-z\d]+$/.test(name));

    expect(sizes.length).toBeGreaterThan(0);
    expect(sizes.filter((name) => !declarations.has(`${name}--line-height`))).toEqual([]);
  });
});

describe('the legacy palette', () => {
  it.each([
    [':root', lightColorTokenObject.color],
    ['.dark', darkColorTokenObject.color],
  ])('gives %s the value of every old theme colour', (selector, colors) => {
    const declared = Object.fromEntries(properties(find(runtime, selector), /^--/));
    const expected = legacy({ ...colors });

    expect(Object.fromEntries(Object.keys(expected).map((name) => [name, declared[name]]))).toEqual(expected);
  });

  it.each([
    [':root', lightShadowTokenObject.shadow],
    ['.dark', darkShadowTokenObject.shadow],
  ])('gives %s the value of every old theme shadow', (selector, shadows) => {
    const declared = Object.fromEntries(properties(find(runtime, selector), /^--/));
    const expected = legacy({ ...shadows });

    expect(Object.fromEntries(Object.keys(expected).map((name) => [name, declared[name]]))).toEqual(expected);
  });

  it('maps every old theme colour to a Tailwind colour', () => {
    const colours = properties(find(tokens, '@theme inline'), /^--color-/);
    const missing = Object.keys(legacy({ ...lightColorTokenObject.color })).filter(
      (name) => colours.get(`--color-${name.slice(2)}`) !== `var(${name})`,
    );

    expect(missing).toEqual([]);
  });

  it('replaces the stock Tailwind neutral family', () => {
    const values = new Map<string, string>();
    stylesheet.walkRules(/^\.bg-neutral-/, (rule) => {
      rule.walkDecls('background-color', ({ value }) => {
        values.set(rule.selector, value);
      });
    });

    // `bg-neutral-50` is a stock Tailwind step with no legacy namesake, so it compiles to nothing
    expect(Object.fromEntries(values)).toEqual({ '.bg-neutral-100': 'var(--neutral-100)' });
  });

  it('compiles the legacy utilities', () => {
    const selectors: string[] = [];
    stylesheet.walkRules((rule) => {
      selectors.push(rule.selector);
    });

    expect(selectors).toEqual(expect.arrayContaining(['.bg-neutral-100', '.shadow-popup', '.medium\\:flex']));
  });
});

describe('the component classes', () => {
  // A side border with `border-solid` and no base width: Preflight is out, so the other sides keep the
  // browser default width (medium) and draw a box. `border-0` (or a full `border`) must come with it
  it('give every side border a base width', async () => {
    const folder = join(__dirname, 'components/ui');
    const files = (await readdir(folder)).filter((file) => file.endsWith('.tsx') && !file.endsWith('.test.tsx'));
    const sideBorder = /(?:^|\s)(?:[\w-]+:)*border-[trblxyse](?:-\d+|-\[[^\]]+\])?(?=\s|$)/;
    const baseWidth = /(?:^|\s)border(?:-0|-\d+|-\[[^\]]+\])?(?=\s|$)/;
    const offenders: string[] = [];

    for (const file of files) {
      const content = await readFile(join(folder, file), 'utf8');

      for (const [, classes] of content.matchAll(/['"`]([^'"`\n]*border-solid[^'"`\n]*)['"`]/g)) {
        if (sideBorder.test(classes) && !baseWidth.test(classes)) offenders.push(`${file}: ${classes}`);
      }
    }

    expect(offenders).toEqual([]);
  });
});

describe('the consumer entry (source.css)', () => {
  // The consumer compiles the classes of the components with its own, in one pass. Imported prebuilt
  // utilities came before the consumer ones, so a consumer `py-3` won over a component `medium:py-2`
  it('compiles the utilities of the components in the consumer build, not from the prebuilt stylesheet', async () => {
    const entry = await readFile(join(__dirname, 'source.css'), 'utf8');
    const imports: string[] = [];
    parse(entry).walkAtRules('import', ({ params }) => {
      imports.push(params);
    });

    expect(imports.some((value) => value.includes('styles.css'))).toBe(false);

    const compiler = await compile(entry, { base: __dirname, onDependency: () => {} });

    expect(compiler.sources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ base: __dirname, pattern: '../../dist/next', negated: false }),
      ]),
    );
  });

  it('orders a consumer utility before a component variant of the same property', async () => {
    const entry = await readFile(join(__dirname, 'source.css'), 'utf8');
    const compiler = await compile(entry, { base: __dirname, onDependency: () => {} });
    // The classes of the components, as the consumer build finds them in dist/next
    const components = new Scanner({
      sources: [{ base: join(__dirname, 'components'), pattern: '**/*.tsx', negated: false }],
    }).scan();
    const css = compiler.build([...components, 'py-3']);

    expect(css.match(/\.py-3 \{/g)).toHaveLength(1);
    expect(css.indexOf('.py-3 {')).toBeLessThan(css.indexOf('.medium\\:py-2'));
  });
});

describe('the shadcn style', () => {
  it.each([
    [':root', ':root.theme-shadcn'],
    ['.dark', ':root.theme-shadcn.dark'],
  ])('gives every token of %s a value in %s', async (base, selector) => {
    const shadcn = parse(await readFile(join(__dirname, 'theme-shadcn.css'), 'utf8'));
    const tokenNames = [...properties(find(runtime, base), /^--/).keys()].filter((name) => name !== '--radius');
    const shadcnTokens = properties(find(shadcn, selector), /^--/);

    expect(tokenNames.filter((name) => !shadcnTokens.has(name))).toEqual([]);
  });

  it('is part of both entries', async () => {
    for (const entry of ['styles.css', 'source.css']) {
      const imports: string[] = [];
      parse(await readFile(join(__dirname, entry), 'utf8')).walkAtRules('import', ({ params }) => {
        imports.push(params);
      });

      expect(imports).toContain("'./theme-shadcn.css'");
    }
  });
});
