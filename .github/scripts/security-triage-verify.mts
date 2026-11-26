/**
 * Check the dependency diff that Claude produced in the security triage workflow.
 *
 * The publish job of .github/workflows/security-triage.yml runs this script after it
 * applies Claude's patch to the index. The patch is untrusted, so the script rejects
 * anything that is not a plain dependency update:
 *
 * - package.json files: only dependency fields change, no keys are added or removed
 *   (except new root `resolutions` for packages named in an open alert), and every
 *   changed value is an exact version.
 * - yarn.lock: every entry resolves to the npm registry, a workspace or a Yarn
 *   built-in patch, under its own package name. Every new or changed npm entry
 *   exists in the registry, lists the same dependencies as the registry, and is at
 *   least MIN_RELEASE_AGE_DAYS old (except the patched package of a critical alert
 *   that Claude chose to fix).
 * - The changeset: only patch bumps of published packages, and present for every
 *   published package.json that changed (as .github/scripts/check-changeset.cjs
 *   requires).
 *
 * It uses only Node built-ins and never runs repository code, so it needs no
 * `yarn install`. Node 24 runs it directly by stripping the types:
 * `node .github/scripts/security-triage-verify.mts`. Use only erasable TypeScript
 * syntax (no enums, namespaces or parameter properties).
 *
 * Environment: ALERTS (open alerts JSON array), DECISIONS (Claude's decisions JSON
 * array), CHANGESET (the allowed changeset path), MIN_RELEASE_AGE_DAYS.
 * Exit code 1 and `::error::` lines when a check fails.
 */

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

type DependencyMap = Record<string, string>;

interface Alert {
  number: number;
  dependency: { package: { name: string } };
  security_advisory: { ghsa_id: string; severity?: string };
}

interface Decision {
  number?: unknown;
  package?: unknown;
  ghsa?: unknown;
  decision?: unknown;
}

interface LockEntry {
  fields: Record<string, string>;
  deps: DependencyMap;
}

interface RegistryVersion {
  dependencies?: DependencyMap;
  optionalDependencies?: DependencyMap;
}

interface RegistryDoc {
  versions?: Record<string, RegistryVersion>;
  time?: Record<string, string>;
}

const DEP_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'resolutions'];
const EXACT_VERSION = /^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$/;
const PUBLISHED: Record<string, string> = {
  'packages/design-system/package.json': '@strapi/design-system',
  'packages/icons/package.json': '@strapi/icons',
  'packages/primitives/package.json': '@strapi/ui-primitives',
};
const NAME = '(?:@[^/@"]+/)?[^/@"]+';
const ALLOWED_RESOLUTION = new RegExp(
  `^${NAME}@(?:npm:[^"/:@]+|workspace:[^":@]+` +
    `|patch:${NAME}@npm%3A[^"/#]+#~builtin<[^">]+>::[^"]*)$`
);
const REGISTRY = 'https://registry.npmjs.org/';
const DAY_MS = 24 * 60 * 60 * 1000;

const errors: string[] = [];

function fail(message: string): void {
  errors.push(message);
  console.log(`::error::${message}`);
}

function git(...args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
}

function gitShowHead(path: string): string | null {
  const result = spawnSync('git', ['show', `HEAD:${path}`], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  return result.status === 0 ? result.stdout : null;
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every(
    (key) =>
      Object.hasOwn(b, key) &&
      isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
  );
}

/** Package name of a descriptor, following `npm:` aliases. */
function packageName(descriptor: string): string | null {
  const match = descriptor.match(new RegExp(`^${NAME}`));
  if (!match) return null;
  const name = match[0];
  const rest = descriptor.slice(name.length + 1);
  const alias = rest.match(new RegExp(`^npm:(${NAME})@`));
  return alias ? alias[1] : name;
}

/** Package that a root `resolutions` key overrides: `pkg`, `parent/pkg`, `pkg@npm:1`. */
function resolutionTarget(key: string): string {
  const parts = key.split('/');
  const names: string[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i].startsWith('@') && i + 1 < parts.length) {
      names.push(`${parts[i]}/${parts[i + 1]}`);
      i += 1;
    } else {
      names.push(parts[i]);
    }
  }
  const last = names.at(-1) ?? '';
  const at = last.indexOf('@', 1);
  return at === -1 ? last : last.slice(0, at);
}

/** Minimal parser for the Yarn Berry lockfile format. */
function parseLockfile(text: string): Map<string, LockEntry> {
  const entries = new Map<string, LockEntry>();
  let current: LockEntry | null = null;
  let section: string | null = null;

  for (const line of text.split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    if (!line.startsWith(' ')) {
      const key = line.replace(/:$/, '').replace(/^"|"$/g, '');
      current = key === '__metadata' ? null : { fields: {}, deps: {} };
      if (current) entries.set(key, current);
      section = null;
      continue;
    }
    if (!current) continue;

    const stripped = line.trim();
    if (line.startsWith('    ')) {
      if (section === 'dependencies' && !line.startsWith('      ')) {
        const [name, value] = splitPair(stripped);
        current.deps[name] = value;
      }
      continue;
    }
    if (stripped.endsWith(':')) {
      section = stripped.slice(0, -1);
    } else {
      const [name, value] = splitPair(stripped);
      current.fields[name] = value;
      section = null;
    }
  }
  return entries;
}

function splitPair(text: string): [string, string] {
  const index = text.indexOf(': ');
  const name = index === -1 ? text : text.slice(0, index);
  const value = index === -1 ? '' : text.slice(index + 2);
  return [name.replace(/^"|"$/g, ''), value.replace(/^"|"$/g, '')];
}

const registryCache = new Map<string, RegistryDoc | null>();

async function registryDoc(name: string): Promise<RegistryDoc | null> {
  if (!registryCache.has(name)) {
    const url = REGISTRY + encodeURIComponent(name).replace(/^%40/, '@');
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      registryCache.set(name, (await response.json()) as RegistryDoc);
    } catch (error) {
      // Any failure means "not verified".
      fail(`Could not read ${name} from the npm registry: ${String(error)}`);
      registryCache.set(name, null);
    }
  }
  return registryCache.get(name) ?? null;
}

async function main(): Promise<number> {
  const alerts = readJson<Alert[]>(process.env.ALERTS ?? '');
  const decisions = readJson<unknown>(process.env.DECISIONS ?? '');
  const changeset = process.env.CHANGESET ?? '';
  const minAgeDays = Number(process.env.MIN_RELEASE_AGE_DAYS ?? '7');

  const openAlerts = new Map(alerts.map((alert) => [alert.number, alert]));
  const alertPackages = new Set(alerts.map((alert) => alert.dependency.package.name));

  // Only the patched package of a CRITICAL alert that Claude chose to FIX may skip
  // the release-age check, and only when the decision matches the live alert.
  const criticalFixes = new Set<string>();
  for (const decision of Array.isArray(decisions) ? (decisions as Decision[]) : []) {
    const alert = openAlerts.get(decision.number as number);
    if (
      alert &&
      decision.decision === 'FIX' &&
      decision.package === alert.dependency.package.name &&
      decision.ghsa === alert.security_advisory.ghsa_id &&
      alert.security_advisory.severity === 'critical'
    ) {
      criticalFixes.add(alert.dependency.package.name);
    }
  }

  const changed = git('diff', '--cached', '--name-only').split('\n').filter(Boolean);

  // --- package.json files -------------------------------------------------------
  const changedPublished = new Set<string>();
  for (const path of changed.filter((p) => p === 'package.json' || p.endsWith('/package.json'))) {
    const beforeText = gitShowHead(path);
    if (beforeText === null) {
      fail(`${path} is a new file. Triage may only edit existing manifests.`);
      continue;
    }
    const before = JSON.parse(beforeText) as Record<string, unknown>;
    const after = readJson<Record<string, unknown>>(path);

    for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
      if (!DEP_FIELDS.includes(key) && !isEqual(before[key], after[key])) {
        fail(`${path}: \`${key}\` changed. Only dependency fields may change.`);
      }
    }

    for (const field of DEP_FIELDS) {
      const oldDeps = (before[field] ?? {}) as DependencyMap;
      const newDeps = (after[field] ?? {}) as DependencyMap;
      for (const key of Object.keys(oldDeps).sort()) {
        if (!Object.hasOwn(newDeps, key)) fail(`${path}: \`${field}.${key}\` was removed.`);
      }
      for (const key of Object.keys(newDeps).sort()) {
        if (Object.hasOwn(oldDeps, key)) continue;
        if (path === 'package.json' && field === 'resolutions') {
          if (!alertPackages.has(resolutionTarget(key))) {
            fail(`${path}: new resolution \`${key}\` is not for a package in an open alert.`);
          }
        } else {
          fail(`${path}: \`${field}.${key}\` was added.`);
        }
      }
      for (const [key, value] of Object.entries(newDeps)) {
        if (oldDeps[key] !== value && !EXACT_VERSION.test(String(value))) {
          fail(`${path}: \`${field}.${key}\` is \`${value}\`, which is not an exact version.`);
        }
      }
    }

    if (Object.hasOwn(PUBLISHED, path) && !isEqual(before, after)) {
      changedPublished.add(PUBLISHED[path]);
    }
  }

  // --- changeset ----------------------------------------------------------------
  const bumped = new Set<string>();
  if (existsSync(changeset)) {
    const frontmatter = readFileSync(changeset, 'utf8').match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatter) {
      fail(`${changeset} has no frontmatter.`);
    } else {
      const publishedNames = new Set(Object.values(PUBLISHED));
      for (const line of frontmatter[1].split('\n').map((l) => l.trim()).filter(Boolean)) {
        const match = line.match(/^['"]?([^'":]+)['"]?\s*:\s*(\S+)$/);
        if (!match || !publishedNames.has(match[1]) || match[2] !== 'patch') {
          fail(`${changeset}: \`${line}\` must be a patch bump of a published package.`);
        } else {
          bumped.add(match[1]);
        }
      }
    }
  }
  for (const name of [...changedPublished].sort()) {
    if (!bumped.has(name)) {
      fail(`${name}/package.json changed, so ${changeset} must bump \`${name}\` (patch).`);
    }
  }

  // --- yarn.lock ----------------------------------------------------------------
  if (changed.includes('yarn.lock')) {
    const oldLock = parseLockfile(gitShowHead('yarn.lock') ?? '');
    const newLock = parseLockfile(readFileSync('yarn.lock', 'utf8'));
    const now = Date.now();

    for (const [key, entry] of newLock) {
      const resolution = entry.fields.resolution ?? '';
      if (!ALLOWED_RESOLUTION.test(resolution)) {
        fail(`yarn.lock: \`${resolution}\` does not resolve to the npm registry.`);
        continue;
      }
      const target = packageName(resolution);
      for (const descriptor of key.split(', ')) {
        if (packageName(descriptor) !== target) {
          fail(`yarn.lock: \`${descriptor}\` resolves to another package (\`${resolution}\`).`);
        }
      }

      const old = oldLock.get(key);
      if (old && old.fields.resolution === resolution && isEqual(old.deps, entry.deps)) continue;

      const npm = resolution.match(new RegExp(`^(${NAME})@npm:(.+)$`));
      if (!npm) continue; // workspace and built-in patch entries carry no new code
      const [, name, version] = npm;
      const doc = await registryDoc(name);
      if (!doc) continue;
      const manifest = doc.versions?.[version];
      if (!manifest) {
        fail(`yarn.lock: ${name}@${version} is not in the npm registry.`);
        continue;
      }

      const expected = { ...manifest.dependencies, ...manifest.optionalDependencies };
      if (!isEqual(expected, entry.deps)) {
        fail(`yarn.lock: the dependencies of ${name}@${version} differ from the npm registry.`);
      }

      const published = doc.time?.[version];
      if (!published) {
        fail(`yarn.lock: no publish date for ${name}@${version}.`);
        continue;
      }
      const ageMs = now - Date.parse(published);
      if (ageMs < minAgeDays * DAY_MS && !criticalFixes.has(name)) {
        fail(
          `yarn.lock: ${name}@${version} was published ${published.slice(0, 10)}, ` +
            `less than ${minAgeDays} days ago.`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.log(`${errors.length} check(s) failed. The triage diff was not published.`);
    return 1;
  }
  console.log('The triage diff passed every check.');
  return 0;
}

process.exitCode = await main();
