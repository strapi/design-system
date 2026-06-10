'use strict';

const { execSync } = require('node:child_process');

const PUBLISHED_PACKAGES = ['design-system', 'icons', 'primitives'];

const base = process.env.BASE_REF || 'main';
const range = `origin/${base}...HEAD`;

function git(args) {
  return execSync(`git diff --name-only ${args} ${range}`, { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
}

const changed = git('');
const added = git('--diff-filter=A');

const touchesPublishedPackage = changed.some((file) => {
  return PUBLISHED_PACKAGES.some((pkg) => {
    return (
      file.startsWith(`packages/${pkg}/src/`) ||
      file.startsWith(`packages/${pkg}/assets/`) ||
      file === `packages/${pkg}/package.json`
    );
  });
});

if (!touchesPublishedPackage) {
  console.log('No published-package changes detected. Skipping changeset check.');
  process.exit(0);
}

const newChangesets = added.filter((file) => {
  return file.startsWith('.changeset/') && file.endsWith('.md') && !file.endsWith('README.md');
});

if (newChangesets.length === 0) {
  console.error(
    '::error::Published-package files changed but no changeset was added. Run `yarn release:add` to create one.',
  );
  process.exit(1);
}

console.log(`Found ${newChangesets.length} new changeset(s):`);
for (const file of newChangesets) {
  console.log(`  - ${file}`);
}
