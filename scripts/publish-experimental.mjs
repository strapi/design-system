#!/usr/bin/env node
/* eslint-disable no-console */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const version = process.env.VERSION;
const distTag = process.env.DIST_TAG;
const dryRun = 'DRY_RUN' in process.env;

// a fixed path, so a writable PATH entry cannot swap in another npm
const npm = join(dirname(process.execPath), 'npm');

if (!version || !distTag) {
  console.error('Set VERSION and DIST_TAG. Example: VERSION=0.0.0-experimental.<sha> DIST_TAG=experimental');
  process.exit(1);
}

// only the workflow gets the OIDC token that trusted publishing needs
if (!dryRun && !process.env.GITHUB_ACTIONS) {
  console.error('A real publish runs in GitHub Actions only. Set DRY_RUN=1 for a local check');
  process.exit(1);
}

const packagesDir = join(import.meta.dirname, '..', 'packages');

// dependency order: a consumer never gets a package before its dependencies
const publishOrder = ['primitives', 'icons', 'design-system'];

const packages = publishOrder.map((folder) => {
  const dir = join(packagesDir, folder);
  return { dir, manifest: JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) };
});

// npm packs a tarball with no build output and that published version stays forever
if (!dryRun) {
  for (const { dir, manifest } of packages) {
    if (!existsSync(join(dir, manifest.main))) {
      console.error(`No build output for ${manifest.name} at ${manifest.main}. Run the build before a real publish`);
      process.exit(1);
    }
  }
}

const publicNames = new Set(packages.map(({ manifest }) => manifest.name));

for (const { dir, manifest } of packages) {
  manifest.version = version;

  for (const field of ['dependencies', 'devDependencies', 'peerDependencies']) {
    for (const name of Object.keys(manifest[field] ?? {})) {
      if (publicNames.has(name)) {
        manifest[field][name] = version;
      }
    }
  }

  writeFileSync(join(dir, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`stamped ${manifest.name}@${version}`);
}

// npm, not yarn: npm needs no secret with trusted publishing
const onNpm = packages.filter(({ manifest }) => npmView(`${manifest.name}@${version}`));
const missing = packages.filter((pkg) => !onNpm.includes(pkg));
// OIDC permits a publish only, so the script cannot move a tag back
const moved = onNpm.filter(({ manifest }) => npmView(`${manifest.name}@${distTag}`) !== version);
const names = (list) => list.map(({ manifest }) => manifest.name).join(', ');

if (missing.length > 0 && moved.length > 0) {
  console.error(
    `The ${distTag} tag of ${names(moved)} points at another version, and ${names(missing)} would publish now. That splits the tag over two commits. Repair with a new commit, which gives a new version`,
  );
  process.exit(1);
}

for (const { manifest } of onNpm) {
  console.log(`skipped ${manifest.name}@${version}, it is on npm already`);
}

for (const { dir, manifest } of missing) {
  console.log(`publishing ${manifest.name}@${version}`);
  const args = ['publish', '--tag', distTag, '--access', 'public', ...(dryRun ? ['--dry-run'] : [])];
  execFileSync(npm, args, { cwd: dir, stdio: 'inherit' });
}

function npmView(spec) {
  try {
    return execFileSync(npm, ['view', spec, 'version'], { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    // a failed view counts as absent, so a network error can hide a moved tag, we accept this rare risk
    return null;
  }
}
