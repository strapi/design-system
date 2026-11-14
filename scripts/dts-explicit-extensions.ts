import { writeFile } from 'fs/promises';

import ts from 'typescript';

const NODE16_ESM: ts.CompilerOptions = {
  module: ts.ModuleKind.Node16,
  moduleResolution: ts.ModuleResolutionKind.Node16,
};

/**
 * Module specifier literals in a declaration file: `import … from`, `export … from`,
 * `import x = require()` and `import('…')` types. Comments are never visited.
 */
const getModuleSpecifiers = (sourceFile: ts.SourceFile) => {
  const specifiers: ts.StringLiteral[] = [];
  const visit = (node: ts.Node) => {
    const literal =
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier
        ? node.moduleSpecifier
        : ts.isExternalModuleReference(node)
          ? node.expression
          : ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)
            ? node.argument.literal
            : undefined;
    if (literal && ts.isStringLiteral(literal)) specifiers.push(literal);
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return specifiers;
};

const resolvesAsEsm = (specifier: string, containingFile: string) =>
  ts.resolveModuleName(specifier, containingFile, NODE16_ESM, ts.sys, undefined, undefined, ts.ModuleKind.ESNext)
    .resolvedModule !== undefined;

/**
 * `vite-plugin-dts` `afterBuild` hook. Our packages are `"type": "module"`, so their `.d.ts` files
 * are ESM, and `moduleResolution: node16`/`nodenext` consumers can't resolve the extensionless
 * paths TypeScript emits (`./themes`, `styled-components/dist/types`). Give each specifier that
 * doesn't resolve as ESM the explicit path it needs (`./themes/index.js`, `…/dist/types.js`),
 * which `bundler` resolution accepts too.
 */
export const addExplicitDtsExtensions = async (emittedFiles: Map<string, string>) => {
  await Promise.all(
    [...emittedFiles].map(async ([filePath, content]) => {
      if (!filePath.endsWith('.d.ts')) return;

      const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest);
      let rewritten = content;

      // Back to front, so earlier positions stay valid.
      for (const literal of getModuleSpecifiers(sourceFile).toReversed()) {
        const specifier = literal.text;
        if (resolvesAsEsm(specifier, filePath)) continue;

        const resolved = [`${specifier}.js`, `${specifier.replace(/\/$/, '')}/index.js`].find((candidate) =>
          resolvesAsEsm(candidate, filePath),
        );
        if (!resolved) {
          throw new Error(`"${specifier}" in ${filePath} doesn't resolve under moduleResolution node16`);
        }

        // Inside the quotes, which are kept as emitted.
        rewritten = rewritten.slice(0, literal.getStart(sourceFile) + 1) + resolved + rewritten.slice(literal.end - 1);
      }

      if (rewritten !== content) await writeFile(filePath, rewritten);
    }),
  );
};
