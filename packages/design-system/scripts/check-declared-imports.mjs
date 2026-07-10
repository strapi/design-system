import { readFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const packageRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const srcRoot = join(packageRoot, 'src');

const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
const declared = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]);

/** Resolved via workspace / bundler without a package.json entry. */
const IGNORE = new Set(['@test/utils']);

const IMPORT_RE = /(?:import|export)[^'"]*from ['"]([^'"]+)['"]|import\(['"]([^'"]+)['"]\)/g;

const walk = (dir, acc = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '__tests__') {
        continue;
      }
      walk(path, acc);
    } else if (/\.(tsx?)$/.test(entry.name)) {
      acc.push(path);
    }
  }

  return acc;
};

const rootPackage = (mod) =>
  mod.startsWith('@') ? mod.split('/').slice(0, 2).join('/') : mod.split('/')[0];

const missing = [];

for (const file of walk(srcRoot)) {
  const source = readFileSync(file, 'utf8');
  let match;

  while ((match = IMPORT_RE.exec(source))) {
    const mod = match[1] ?? match[2];
    if (!mod || mod.startsWith('.') || mod.startsWith('/')) continue;

    const pkgName = rootPackage(mod);
    if (IGNORE.has(pkgName) || IGNORE.has(mod)) continue;
    if (pkgName.startsWith('@strapi/')) continue;
    if (declared.has(pkgName) || declared.has(mod)) continue;

    missing.push({ file: relative(packageRoot, file), mod });
  }
}

if (missing.length > 0) {
  console.error('Undeclared production imports (add to package.json dependencies):');
  for (const { file, mod } of missing) {
    console.error(`  ${file}: "${mod}"`);
  }
  process.exit(1);
}

console.log('All production imports are declared in package.json');
