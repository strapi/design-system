'use strict';

const { execSync } = require('node:child_process');
const fs = require('node:fs');

// folder name under packages/ -> published npm package name
const PUBLISHED_PACKAGES = {
  'design-system': '@strapi/design-system',
  icons: '@strapi/icons',
  primitives: '@strapi/ui-primitives',
};

const base = process.env.BASE_REF || 'main';
const range = `origin/${base}...HEAD`;

function git(args) {
  return execSync(`git diff --name-only ${args} ${range}`, { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
}

const changed = git('');
const added = git('--diff-filter=A');

const changedPackages = new Set();

for (const file of changed) {
  for (const [folder, pkgName] of Object.entries(PUBLISHED_PACKAGES)) {
    if (
      file.startsWith(`packages/${folder}/src/`) ||
      file.startsWith(`packages/${folder}/assets/`) ||
      file === `packages/${folder}/package.json`
    ) {
      changedPackages.add(pkgName);
    }
  }
}

if (changedPackages.size === 0) {
  console.log('No published-package changes detected. Skipping changeset check.');
  process.exit(0);
}

const newChangesets = added.filter((file) => {
  return file.startsWith('.changeset/') && file.endsWith('.md') && !file.endsWith('README.md');
});

// collect package names bumped by the new changesets
const bumpedPackages = new Set();

for (const file of newChangesets) {
  const content = fs.readFileSync(file, 'utf8');
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) continue;

  for (const rawLine of frontmatter[1].split('\n')) {
    const match = rawLine.trim().match(/^['"]?([^'":]+)['"]?\s*:\s*(?:major|minor|patch)\s*$/);
    if (match) {
      bumpedPackages.add(match[1].trim());
    }
  }
}

const missing = [...changedPackages].filter((pkg) => !bumpedPackages.has(pkg));

if (missing.length > 0) {
  console.error(`::error::The following changed packages have no matching changeset: ${missing.join(', ')}.`);
  console.error('Run `yarn release:add` and select every package you modified.');
  process.exit(1);
}

console.log(`Changed packages: ${[...changedPackages].join(', ')}`);
console.log(`All covered by ${newChangesets.length} new changeset(s):`);
for (const file of newChangesets) {
  console.log(`  - ${file}`);
}
