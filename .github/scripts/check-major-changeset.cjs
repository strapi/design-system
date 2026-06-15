'use strict';

const { execSync } = require('node:child_process');
const fs = require('node:fs');

const base = process.env.BASE_REF || 'main';
const range = `origin/${base}...HEAD`;

const addedChangesets = execSync(`git diff --name-only --diff-filter=A ${range}`, { encoding: 'utf8' })
  .split('\n')
  .filter((file) => file.startsWith('.changeset/') && file.endsWith('.md') && !file.endsWith('README.md'));

const offenders = [];

for (const file of addedChangesets) {
  const content = fs.readFileSync(file, 'utf8');
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) continue;

  for (const rawLine of frontmatter[1].split('\n')) {
    const line = rawLine.trim();
    const match = line.match(/^['"]?[^'":]+['"]?\s*:\s*(major|minor|patch)\s*$/);
    if (match && match[1] === 'major') {
      offenders.push({ file, line });
    }
  }
}

if (offenders.length > 0) {
  console.error('::error::Major version bump detected in the following changesets:');
  for (const offender of offenders) {
    console.error(`  ${offender.file}: ${offender.line}`);
  }
  console.error('');
  console.error("If this major bump is intentional, add the 'flag: allow-major' label to the PR.");
  process.exit(1);
}

console.log('No major bumps detected in new changesets.');
