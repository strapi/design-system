import { compile } from '@tailwindcss/node';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse, type AtRule, type Container, type Root, type Rule } from 'postcss';

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

let stylesheet: Root;
let source: Root;
let tokens: Root;
let tailwindTheme: Root;

beforeAll(async () => {
  const sourceCss = await readFile(join(__dirname, 'styles.css'), 'utf8');
  const dependencies: string[] = [];
  const compiler = await compile(sourceCss, { base: __dirname, onDependency: (path) => dependencies.push(path) });
  // Jest maps every .css request to a style mock, so require.resolve cannot find the stock theme
  const tailwindThemePath = dependencies.find((path) => path.endsWith('/tailwindcss/theme.css'));

  if (!tailwindThemePath) throw new Error('Tailwind did not resolve its theme stylesheet');

  const [tokensCss, tailwindThemeCss] = await Promise.all([
    readFile(join(__dirname, 'theme.css'), 'utf8'),
    readFile(tailwindThemePath, 'utf8'),
  ]);

  stylesheet = parse(compiler.build(['bg-primary']));
  source = parse(sourceCss);
  tokens = parse(tokensCss);
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
    const light = properties(find(source, ':root'), /^--/);
    const dark = properties(find(source, '.dark'), /^--/);
    const colours = properties(find(tokens, '@theme inline'), /^--color-/);
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
