/**
 * Check the dependency diff that Claude produced in the security triage workflow.
 *
 * The publish job of .github/workflows/security-triage.yml runs this script after it
 * applies Claude's patch to the index. The patch is untrusted, so the script rejects
 * anything that is not a plain dependency update:
 *
 * - package.json files: only dependency fields change, and no keys are added or
 *   removed, except a new root `resolutions` key for a package whose open alerts are
 *   all development-scope. Every changed value is an exact version, no lower than the
 *   old one, and the old value was a registry version range (an `npm:` alias or a
 *   `workspace:` range names another package or source).
 * - yarn.lock: only the line shapes that Yarn writes, so YAML tricks cannot show this
 *   script one value and Yarn another, and the same `__metadata`. It locks every
 *   dependency of every workspace and every entry, so no install resolves anything
 *   unchecked. Every entry resolves to the npm registry, a workspace or a Yarn
 *   built-in patch, under its own package name. Every new or changed npm entry exists
 *   in the registry, lists the same dependencies, satisfies the ranges it is locked
 *   for, and is at least MIN_RELEASE_AGE_DAYS old (except the first patched version of
 *   a critical alert that Claude chose to fix).
 * - The changeset: one quoted `patch` line for each published package whose
 *   package.json changed, and no other line (as .github/scripts/check-changeset.cjs
 *   requires), in a frontmatter that @changesets/parse reads the same way.
 *
 * It uses only Node built-ins and never runs repository code, so it needs no
 * `yarn install`. Node 24 runs it directly by stripping the types:
 * `node .github/scripts/security-triage-verify.mts`. Use only erasable TypeScript
 * syntax (no enums, namespaces or parameter properties).
 *
 * Environment: ALERTS (open alerts JSON array), DECISIONS (Claude's decisions JSON
 * array), CHANGESET (the allowed changeset path), MIN_RELEASE_AGE_DAYS, and optionally
 * FIXED_ALERTS (a file to write the numbers of the alerts that the diff fixes to).
 * Exit code 1 and `::error::` lines when a check fails.
 */

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

type DependencyMap = Record<string, string>;
type Identifier = string | number;

interface Alert {
  number: number;
  dependency: { package: { name: string }; scope?: string | null };
  security_advisory: { ghsa_id: string; severity?: string };
  security_vulnerability?: {
    vulnerable_version_range?: string;
    first_patched_version?: { identifier?: string } | null;
  };
}

interface Decision {
  number?: unknown;
  package?: unknown;
  ghsa?: unknown;
  decision?: unknown;
}

interface LockEntry {
  /** The entry's lines, to tell unchanged entries apart. */
  block: string;
  fields: Record<string, string>;
  /** dependencies, peerDependencies and bin. */
  maps: Record<string, DependencyMap>;
  /** dependenciesMeta and peerDependenciesMeta. */
  meta: Record<string, Record<string, DependencyMap>>;
}

interface Lockfile {
  metadata: Record<string, string>;
  entries: Map<string, LockEntry>;
}

interface Workspace {
  name: string;
  version: string;
  manifest: Record<string, unknown>;
}

interface RegistryVersion {
  dependencies?: DependencyMap;
  optionalDependencies?: DependencyMap;
  peerDependencies?: DependencyMap;
  scripts?: Record<string, unknown>;
}

interface RegistryDoc {
  versions?: Record<string, RegistryVersion>;
  time?: Record<string, string>;
}

interface SemVer {
  major: number;
  minor: number;
  patch: number;
  pre: Identifier[];
}

/** One comparison of a range. `=` also stands for a bare version. */
interface Comparator {
  op: string;
  version: SemVer;
}

/** A version in a range, where null stands for `x`, `*` or a missing part. */
interface PartialVersion {
  major: number | null;
  minor: number | null;
  patch: number | null;
  pre: Identifier[];
}

const DEP_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'resolutions'];
const INSTALLED_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'];
const EXACT_VERSION = /^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$/;
const PUBLISHED: Record<string, string> = {
  'packages/design-system/package.json': '@strapi/design-system',
  'packages/icons/package.json': '@strapi/icons',
  'packages/primitives/package.json': '@strapi/ui-primitives',
};
const NAME = '(?:@[^/@"]+/)?[^/@"]+';
const VERSION = '[0-9]+\\.[0-9]+\\.[0-9]+(?:-[0-9A-Za-z.-]+)?';
const NPM_RESOLUTION = new RegExp(`^(${NAME})@npm:(${VERSION})$`);
const WORKSPACE_RESOLUTION = new RegExp(`^(${NAME})@workspace:([^":@]+)$`);
// Yarn rebuilds built-in patch entries on every install, so only their shape matters.
const PATCH_RESOLUTION = new RegExp(
  `^(${NAME})@patch:\\1@npm%3A(${VERSION})#~builtin<compat/\\1>::version=\\2&hash=[0-9a-f]+$`,
);
const RESOLUTION_KEY = new RegExp(`^(?:${NAME}/)?${NAME}$`);
// Yarn adds `node-gyp: latest` to a package whose scripts run one of these.
const NODE_GYP_SCRIPT = /\b(node-gyp|prebuild-install)\b/;
const CHANGESET_FRONTMATTER = /^---\n([\s\S]*?\n)---(?:\n|$)/;
const CHANGESET_LINE = /^(['"])(@strapi\/[a-z-]+)\1: patch$/;
const REGISTRY = 'https://registry.npmjs.org/';
const DAY_MS = 24 * 60 * 60 * 1000;

// yarn.lock: the only line shapes that Yarn 3 writes. Yarn reads the file as YAML, so
// anything else (a multi-line, escaped or single-quoted scalar, a duplicate or `?`
// key, a flow collection, other indentation, a CR or a tab) could show this script one
// value and Yarn another.
const LOCK_KEY = /^(?:"([^"\\]+)"|(__metadata)):$/;
const LOCK_FIELD = /^ {2}(version|resolution|checksum|languageName|linkType|conditions|cacheKey): (.+)$/;
const LOCK_SECTION = /^ {2}(dependencies|peerDependencies|bin|dependenciesMeta|peerDependenciesMeta):$/;
const LOCK_PAIR = /^ {4}("[^"\\]+"|[A-Za-z0-9_][A-Za-z0-9._-]*): (.+)$/;
const LOCK_META_NAME = /^ {4}("[^"\\]+"|[A-Za-z0-9_][A-Za-z0-9._-]*):$/;
const LOCK_META_FLAG = /^ {6}(optional|built|unplugged): (true|false)$/;
const LOCK_QUOTED = /^"([^"\\]*)"$/;
const LOCK_PLAIN = /^[A-Za-z0-9^~._][A-Za-z0-9^~._*+<=>|&/ -]*$/;

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
    (key) => Object.hasOwn(b, key) && isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
  );
}

/** A manifest dependency field as a map of strings, {} when absent, null when malformed. */
function dependencyMap(value: unknown): DependencyMap | null {
  if (value === undefined) return {};
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
  return Object.values(value).every((range) => typeof range === 'string') ? (value as DependencyMap) : null;
}

/** Package name of a descriptor or locator, following `npm:` aliases. */
function packageName(descriptor: string): string | null {
  const name = descriptor.match(new RegExp(`^${NAME}`))?.[0];
  if (!name || descriptor[name.length] !== '@') return null;
  const alias = descriptor.slice(name.length + 1).match(new RegExp(`^npm:(${NAME})@`));
  return alias ? alias[1] : name;
}

/** The semver range of an npm descriptor (following an `npm:` alias), or null. */
function npmRange(descriptor: string): string | null {
  const name = descriptor.match(new RegExp(`^${NAME}`))?.[0];
  if (!name || descriptor[name.length] !== '@') return null;
  const rest = descriptor.slice(name.length + 1);
  if (!rest.startsWith('npm:')) return null;
  const alias = rest.match(new RegExp(`^npm:${NAME}@(.*)$`));
  return alias ? alias[1] : rest.slice('npm:'.length);
}

/** The parts of a root `resolutions` key: `pkg`, `pkg@range` or `parent/pkg`. */
function parseResolutionKey(key: string): { parent?: string; name: string; range?: string } {
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
  const split = (text: string): { name: string; range?: string } => {
    const at = text.indexOf('@', 1);
    return at === -1 ? { name: text } : { name: text.slice(0, at), range: text.slice(at + 1) };
  };
  const target = split(names.at(-1) ?? '');
  return names.length > 1 ? { parent: split(names.at(-2) ?? '').name, ...target } : target;
}

// --- semver: node-semver's range rules (no `loose`, no `includePrerelease`) ---------

const SEMVER =
  /^v?(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-((?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
const PARTIAL =
  /^v?(0|[1-9][0-9]*|[xX*])(?:\.(0|[1-9][0-9]*|[xX*])(?:\.(0|[1-9][0-9]*|[xX*])(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?)?)?$/;
// `-0` is the lowest prerelease: `<2.0.0-0` also keeps out the prereleases of 2.0.0.
const LOWEST: Identifier[] = [0];

function identifiers(text: string | undefined): Identifier[] {
  return text ? text.split('.').map((id) => (/^[0-9]+$/.test(id) ? Number(id) : id)) : [];
}

function semver(major: number, minor: number, patch: number, pre: Identifier[] = []): SemVer {
  return { major, minor, patch, pre };
}

function parseVersion(text: string): SemVer | null {
  const match = SEMVER.exec(text.trim());
  if (!match) return null;
  return semver(Number(match[1]), Number(match[2]), Number(match[3]), identifiers(match[4]));
}

function compareVersions(a: SemVer, b: SemVer): number {
  const release = a.major - b.major || a.minor - b.minor || a.patch - b.patch;
  if (release !== 0) return Math.sign(release);
  // A prerelease comes before its release.
  if (a.pre.length === 0 || b.pre.length === 0) return Math.sign(b.pre.length - a.pre.length);
  for (let i = 0; i < Math.max(a.pre.length, b.pre.length); i += 1) {
    const x = a.pre[i];
    const y = b.pre[i];
    if (x === y) continue;
    if (x === undefined) return -1;
    if (y === undefined) return 1;
    if (typeof x === 'number' && typeof y === 'number') return x < y ? -1 : 1;
    if (typeof x === 'number') return -1;
    if (typeof y === 'number') return 1;
    return x < y ? -1 : 1;
  }
  return 0;
}

function parsePartial(text: string): PartialVersion | null {
  const match = PARTIAL.exec(text);
  if (!match) return null;
  const part = (value: string | undefined) => (value === undefined || /^[xX*]$/.test(value) ? null : Number(value));
  return { major: part(match[1]), minor: part(match[2]), patch: part(match[3]), pre: identifiers(match[4]) };
}

/** A version with optional operator: `1.2.3`, `>=1.2`, `<1`, `1.x`, `*`. */
function xRange(op: string, x: PartialVersion): Comparator[] {
  const { major, minor, patch } = x;
  if (major === null) return op === '<' || op === '>' ? [{ op: '<', version: semver(0, 0, 0, LOWEST) }] : [];
  if (minor !== null && patch !== null) return [{ op: op || '=', version: semver(major, minor, patch, x.pre) }];
  if (op === '' || op === '=') {
    return minor === null
      ? [
          { op: '>=', version: semver(major, 0, 0) },
          { op: '<', version: semver(major + 1, 0, 0, LOWEST) },
        ]
      : [
          { op: '>=', version: semver(major, minor, 0) },
          { op: '<', version: semver(major, minor + 1, 0, LOWEST) },
        ];
  }
  let [bound, M, m] = [op, major, minor ?? 0];
  if (op === '>') {
    bound = '>=';
    [M, m] = minor === null ? [major + 1, 0] : [major, minor + 1];
  } else if (op === '<=') {
    bound = '<';
    [M, m] = minor === null ? [major + 1, 0] : [major, minor + 1];
  }
  return [{ op: bound, version: semver(M, m, 0, bound === '<' ? LOWEST : []) }];
}

/** `~1.2.3`: patch updates. */
function tildeRange(x: PartialVersion): Comparator[] {
  const { major, minor, patch } = x;
  if (major === null) return [];
  if (minor === null) {
    return [
      { op: '>=', version: semver(major, 0, 0) },
      { op: '<', version: semver(major + 1, 0, 0, LOWEST) },
    ];
  }
  return [
    { op: '>=', version: semver(major, minor, patch ?? 0, patch === null ? [] : x.pre) },
    { op: '<', version: semver(major, minor + 1, 0, LOWEST) },
  ];
}

/** `^1.2.3`: updates that keep the left-most non-zero part. */
function caretRange(x: PartialVersion): Comparator[] {
  const { major, minor, patch } = x;
  if (major === null) return [];
  if (minor === null) {
    return [
      { op: '>=', version: semver(major, 0, 0) },
      { op: '<', version: semver(major + 1, 0, 0, LOWEST) },
    ];
  }
  const lower: Comparator = { op: '>=', version: semver(major, minor, patch ?? 0, patch === null ? [] : x.pre) };
  if (major > 0) return [lower, { op: '<', version: semver(major + 1, 0, 0, LOWEST) }];
  if (patch === null || minor > 0) return [lower, { op: '<', version: semver(0, minor + 1, 0, LOWEST) }];
  return [lower, { op: '<', version: semver(0, 0, patch + 1, LOWEST) }];
}

/** `1.2.3 - 2.3.4`. */
function hyphenRange(from: PartialVersion, to: PartialVersion): Comparator[] {
  const set: Comparator[] = [];
  if (from.major !== null) {
    const exact = from.minor !== null && from.patch !== null;
    set.push({ op: '>=', version: semver(from.major, from.minor ?? 0, from.patch ?? 0, exact ? from.pre : []) });
  }
  if (to.major !== null) {
    if (to.minor === null) set.push({ op: '<', version: semver(to.major + 1, 0, 0, LOWEST) });
    else if (to.patch === null) set.push({ op: '<', version: semver(to.major, to.minor + 1, 0, LOWEST) });
    else set.push({ op: '<=', version: semver(to.major, to.minor, to.patch, to.pre) });
  }
  return set;
}

/** A range as sets of comparators (any set may match), or null when it is not a range. */
function parseRange(range: string): Comparator[][] | null {
  const sets: Comparator[][] = [];
  for (const part of range.split('||')) {
    const text = part.trim();
    const hyphen = text.match(/^(\S+)\s+-\s+(\S+)$/);
    if (hyphen) {
      const from = parsePartial(hyphen[1]);
      const to = parsePartial(hyphen[2]);
      if (!from || !to) return null;
      sets.push(hyphenRange(from, to));
      continue;
    }
    const set: Comparator[] = [];
    const tokens = text
      .replace(/(<=|>=|<|>|=|~>|~|\^)\s+/g, '$1')
      .split(/\s+/)
      .filter(Boolean);
    for (const token of tokens) {
      const [, op = '', rest = ''] = token.match(/^(<=|>=|<|>|=|~>|~|\^)?(.*)$/) ?? [];
      const x = parsePartial(rest);
      if (!x) return null;
      set.push(...(op === '^' ? caretRange(x) : op.startsWith('~') ? tildeRange(x) : xRange(op, x)));
    }
    sets.push(set);
  }
  return sets;
}

function testSet(set: Comparator[], version: SemVer): boolean {
  for (const { op, version: bound } of set) {
    const order = compareVersions(version, bound);
    const ok =
      op === '<'
        ? order < 0
        : op === '<='
          ? order <= 0
          : op === '>'
            ? order > 0
            : op === '>='
              ? order >= 0
              : order === 0;
    if (!ok) return false;
  }
  // A prerelease only matches a set that names a prerelease of the same version.
  return (
    version.pre.length === 0 ||
    set.some(
      ({ version: bound }) =>
        bound.pre.length > 0 &&
        bound.major === version.major &&
        bound.minor === version.minor &&
        bound.patch === version.patch,
    )
  );
}

function satisfies(version: string, range: string): boolean {
  const parsed = parseVersion(version);
  const sets = parseRange(range);
  return !!parsed && !!sets && sets.some((set) => testSet(set, parsed));
}

/** The lowest version that a range allows, or null. */
function minVersion(range: string): SemVer | null {
  const sets = parseRange(range);
  if (!sets) return null;
  for (const candidate of [semver(0, 0, 0), semver(0, 0, 0, LOWEST)]) {
    if (sets.some((set) => testSet(set, candidate))) return candidate;
  }
  let lowest: SemVer | null = null;
  for (const set of sets) {
    let floor: SemVer | null = null;
    for (const { op, version } of set) {
      let candidate: SemVer | null = null;
      if (op === '>') {
        candidate = version.pre.length
          ? { ...version, pre: [...version.pre, 0] }
          : { ...version, patch: version.patch + 1 };
      } else if (op === '>=' || op === '=') {
        candidate = version;
      }
      if (candidate && (!floor || compareVersions(candidate, floor) > 0)) floor = candidate;
    }
    if (floor && (!lowest || compareVersions(lowest, floor) > 0)) lowest = floor;
  }
  const result = lowest;
  return result && sets.some((set) => testSet(set, result)) ? result : null;
}

/** Whether a locked version is allowed by a range. A dist-tag such as `latest` moves. */
function matchesRange(version: string, range: string): boolean {
  return parseRange(range) ? satisfies(version, range) : /^[A-Za-z][0-9A-Za-z._-]*$/.test(range);
}

// --- yarn.lock ---------------------------------------------------------------------

function lockScalar(raw: string): string | null {
  const quoted = raw.match(LOCK_QUOTED);
  if (quoted) return quoted[1];
  return LOCK_PLAIN.test(raw) && !raw.endsWith(' ') ? raw : null;
}

function lockName(raw: string): string {
  return raw.startsWith('"') ? raw.slice(1, -1) : raw;
}

/** Strict parser for the Yarn 3 lockfile. Throws on any line that Yarn would not write. */
function parseLockfile(text: string): Lockfile {
  const lines = text.split('\n');
  if (lines.pop() !== '') throw new Error('the file must end with a newline');
  const metadata: Record<string, string> = {};
  const entries = new Map<string, LockEntry>();
  let entry: LockEntry | null = null;
  let fields: Record<string, string> | null = null; // the current entry or __metadata
  let block: string[] = [];
  let map: DependencyMap | null = null;
  let metaSection: Record<string, DependencyMap> | null = null;
  let flags: DependencyMap | null = null;
  let blank = false;
  let started = false;

  for (const [index, line] of lines.entries()) {
    const where = `line ${index + 1}`;
    if (/[^\x20-\x7e]/.test(line)) throw new Error(`${where} has a character that is not printable ASCII`);
    if (line === '') {
      blank = true;
      map = null;
      metaSection = null;
      flags = null;
      continue;
    }
    if (line.startsWith('#')) {
      if (started) throw new Error(`${where} is a comment outside the header`);
      continue;
    }
    let match = line.match(LOCK_KEY);
    if (match) {
      if (started && !blank) throw new Error(`${where} starts an entry without a blank line before it`);
      if (entry) entry.block = block.join('\n');
      blank = false;
      map = null;
      metaSection = null;
      flags = null;
      block = [line];
      if (match[2]) {
        if (started) throw new Error(`${where}: __metadata must come first`);
        entry = null;
        fields = metadata;
      } else {
        const key = match[1];
        if (key === '__metadata' || entries.has(key)) throw new Error(`${where} repeats the key "${key}"`);
        entry = { block: '', fields: {}, maps: {}, meta: {} };
        entries.set(key, entry);
        fields = entry.fields;
      }
      started = true;
      continue;
    }
    if (blank || !fields) throw new Error(`${where} is outside an entry`);
    block.push(line);
    if ((match = line.match(LOCK_FIELD))) {
      const [, name, raw] = match;
      const value = lockScalar(raw);
      const allowed = entry ? name !== 'cacheKey' : name === 'version' || name === 'cacheKey';
      if (value === null || !allowed || Object.hasOwn(fields, name)) {
        throw new Error(`${where} is not a field in the format Yarn writes`);
      }
      fields[name] = value;
      map = null;
      metaSection = null;
      flags = null;
    } else if ((match = line.match(LOCK_SECTION)) && entry) {
      const name = match[1];
      if (Object.hasOwn(entry.maps, name) || Object.hasOwn(entry.meta, name)) {
        throw new Error(`${where} repeats the section "${name}"`);
      }
      flags = null;
      if (name.endsWith('Meta')) {
        map = null;
        metaSection = entry.meta[name] = {};
      } else {
        metaSection = null;
        map = entry.maps[name] = {};
      }
    } else if ((match = line.match(LOCK_PAIR)) && map) {
      const name = lockName(match[1]);
      const value = lockScalar(match[2]);
      if (value === null || Object.hasOwn(map, name)) {
        throw new Error(`${where} is not a dependency in the format Yarn writes`);
      }
      map[name] = value;
    } else if ((match = line.match(LOCK_META_NAME)) && metaSection) {
      const name = lockName(match[1]);
      if (Object.hasOwn(metaSection, name)) throw new Error(`${where} repeats "${name}"`);
      flags = metaSection[name] = {};
    } else if ((match = line.match(LOCK_META_FLAG)) && flags) {
      if (Object.hasOwn(flags, match[1])) throw new Error(`${where} repeats "${match[1]}"`);
      flags[match[1]] = match[2];
    } else {
      throw new Error(`${where} is not in the format Yarn writes`);
    }
  }
  if (entry) entry.block = block.join('\n');

  if (!Object.hasOwn(metadata, 'version') || !Object.hasOwn(metadata, 'cacheKey')) {
    throw new Error('__metadata must have a version and a cacheKey');
  }
  for (const [key, item] of entries) {
    for (const name of ['version', 'resolution', 'languageName', 'linkType']) {
      if (!Object.hasOwn(item.fields, name)) throw new Error(`"${key}" has no ${name}`);
    }
    const sections = [
      ...Object.values(item.maps),
      ...Object.values(item.meta),
      ...Object.values(item.meta).flatMap((section) => Object.values(section)),
    ];
    if (sections.some((section) => Object.keys(section).length === 0)) {
      throw new Error(`"${key}" has an empty section`);
    }
  }
  return { metadata, entries };
}

/** The workspaces that the root package.json declares, by path ('.' for the root). */
function readWorkspaces(): Map<string, Workspace> {
  const declared = readJson<Record<string, unknown>>('package.json').workspaces;
  const patterns = Array.isArray(declared) ? declared : (declared as { packages?: unknown } | undefined)?.packages;
  const paths = ['.'];
  for (const pattern of Array.isArray(patterns) ? patterns : []) {
    if (typeof pattern !== 'string') continue;
    if (pattern.endsWith('/*')) {
      const parent = pattern.slice(0, -2);
      for (const name of existsSync(parent) ? readdirSync(parent).toSorted() : []) {
        if (existsSync(`${parent}/${name}/package.json`)) paths.push(`${parent}/${name}`);
      }
    } else if (existsSync(`${pattern}/package.json`)) {
      paths.push(pattern);
    }
  }
  const workspaces = new Map<string, Workspace>();
  for (const path of paths) {
    const manifest = readJson<Record<string, unknown>>(path === '.' ? 'package.json' : `${path}/package.json`);
    workspaces.set(path, {
      name: String(manifest.name ?? ''),
      version: String(manifest.version ?? '0.0.0'),
      manifest,
    });
  }
  return workspaces;
}

/** The range that the root `resolutions` give a dependency, or its own range. */
function resolvedRange(parent: string, name: string, range: string, resolutions: DependencyMap): string {
  for (const [key, value] of Object.entries(resolutions)) {
    const target = parseResolutionKey(key);
    if (target.name === name && (target.parent ?? parent) === parent && (target.range ?? range) === range) {
      return value;
    }
  }
  return range;
}

/** Fails for every dependency that yarn.lock does not lock: an install would resolve it unchecked. */
function checkCoverage(lock: Lockfile, workspaces: Map<string, Workspace>, resolutions: DependencyMap): void {
  const locked = new Set([...lock.entries.keys()].flatMap((key) => key.split(', ')));
  const wanted: [string, string, string][] = [];
  for (const workspace of workspaces.values()) {
    for (const field of INSTALLED_FIELDS) {
      for (const [name, range] of Object.entries(dependencyMap(workspace.manifest[field]) ?? {})) {
        wanted.push([workspace.name, name, range]);
      }
    }
  }
  for (const entry of lock.entries.values()) {
    // Yarn rebuilds workspace entries from the manifests, which are covered above.
    if (WORKSPACE_RESOLUTION.test(entry.fields.resolution)) continue;
    const parent = packageName(entry.fields.resolution) ?? '';
    for (const [name, range] of Object.entries(entry.maps.dependencies ?? {})) {
      wanted.push([parent, name, range]);
    }
  }
  const missing = new Set<string>();
  for (const [parent, name, range] of wanted) {
    const resolved = resolvedRange(parent, name, range, resolutions);
    const keys = /^[a-z]+:/.test(resolved)
      ? [`${name}@${resolved}`]
      : [`${name}@npm:${resolved}`, `${name}@${resolved}`];
    if (!keys.some((key) => locked.has(key))) missing.add(`${name}@${range}`);
  }
  for (const descriptor of [...missing].toSorted()) {
    fail(`yarn.lock does not lock \`${descriptor}\`, so an install would resolve it unchecked.`);
  }
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

/** The dependencies that Yarn records for a registry manifest. */
function registryDependencies(manifest: RegistryVersion): DependencyMap {
  const dependencies: DependencyMap = { ...manifest.dependencies, ...manifest.optionalDependencies };
  const scripts = Object.values(manifest.scripts ?? {});
  if (
    !Object.hasOwn(dependencies, 'node-gyp') &&
    !Object.hasOwn(manifest.peerDependencies ?? {}, 'node-gyp') &&
    scripts.some((script) => typeof script === 'string' && NODE_GYP_SCRIPT.test(script))
  ) {
    dependencies['node-gyp'] = 'latest';
  }
  return dependencies;
}

async function checkNpmEntry(
  name: string,
  version: string,
  descriptors: string[],
  entry: LockEntry,
  minAgeDays: number,
  criticalPatches: Set<string>,
): Promise<void> {
  const id = `${name}@${version}`;
  if (entry.fields.version !== version || entry.fields.languageName !== 'node' || entry.fields.linkType !== 'hard') {
    fail(`yarn.lock: the fields of ${id} do not match its resolution.`);
  }
  for (const descriptor of descriptors) {
    const range = npmRange(descriptor);
    if (range === null) {
      fail(`yarn.lock: \`${descriptor}\` is not an npm range, but resolves to ${id}.`);
    } else if (!matchesRange(version, range)) {
      fail(`yarn.lock: ${id} does not satisfy \`${descriptor}\`.`);
    }
  }

  const doc = await registryDoc(name);
  if (!doc) return;
  const manifest = doc.versions && Object.hasOwn(doc.versions, version) ? doc.versions[version] : undefined;
  if (!manifest) {
    fail(`yarn.lock: ${id} is not in the npm registry.`);
    return;
  }
  if (!isEqual(registryDependencies(manifest), entry.maps.dependencies ?? {})) {
    fail(`yarn.lock: the dependencies of ${id} differ from the npm registry.`);
  }
  const meta = entry.meta.dependenciesMeta ?? {};
  if (
    !isEqual(Object.keys(meta).toSorted(), Object.keys(manifest.optionalDependencies ?? {}).toSorted()) ||
    Object.values(meta).some((metaFlags) => !isEqual(metaFlags, { optional: 'true' }))
  ) {
    fail(`yarn.lock: the dependenciesMeta of ${id} differ from its optional dependencies.`);
  }

  const published = doc.time && Object.hasOwn(doc.time, version) ? doc.time[version] : '';
  const ageMs = Date.now() - Date.parse(published);
  if (!Number.isFinite(ageMs)) {
    fail(`yarn.lock: no publish date for ${id}.`);
  } else if (ageMs < minAgeDays * DAY_MS && !criticalPatches.has(id)) {
    fail(`yarn.lock: ${id} was published ${published.slice(0, 10)}, less than ${minAgeDays} days ago.`);
  }
}

function checkWorkspaceEntry(
  name: string,
  path: string,
  descriptors: string[],
  workspaces: Map<string, Workspace>,
): void {
  const workspace = workspaces.get(path);
  if (!workspace || workspace.name !== name) {
    fail(`yarn.lock: \`${name}@workspace:${path}\` is not a workspace of this repository.`);
    return;
  }
  for (const descriptor of descriptors) {
    const range = descriptor.slice(name.length + 1).replace(/^npm:/, '');
    if (!range.startsWith('workspace:') && !satisfies(workspace.version, range)) {
      fail(`yarn.lock: \`${descriptor}\` does not match the workspace ${name}@${workspace.version}.`);
    }
  }
}

async function checkLockEntries(
  oldLock: Lockfile,
  newLock: Lockfile,
  workspaces: Map<string, Workspace>,
  minAgeDays: number,
  criticalPatches: Set<string>,
): Promise<void> {
  if (!isEqual(oldLock.metadata, newLock.metadata)) {
    fail('yarn.lock: `__metadata` changed, so Yarn would re-resolve the whole lockfile.');
  }
  for (const [key, entry] of newLock.entries) {
    const resolution = entry.fields.resolution;
    const target = packageName(resolution);
    // Yarn splits keys on commas with any spaces around them.
    const descriptors = key.split(', ');
    for (const descriptor of descriptors) {
      if (!target || /^ | $|,/.test(descriptor) || packageName(descriptor) !== target) {
        fail(`yarn.lock: \`${descriptor}\` resolves to another package (\`${resolution}\`).`);
      }
    }
    const old = oldLock.entries.get(key);
    if (old && old.block === entry.block) continue; // unchanged since main

    const npm = resolution.match(NPM_RESOLUTION);
    const workspace = resolution.match(WORKSPACE_RESOLUTION);
    if (npm) {
      await checkNpmEntry(npm[1], npm[2], descriptors, entry, minAgeDays, criticalPatches);
    } else if (workspace) {
      checkWorkspaceEntry(workspace[1], workspace[2], descriptors, workspaces);
    } else if (!PATCH_RESOLUTION.test(resolution)) {
      fail(`yarn.lock: \`${resolution}\` does not resolve to the npm registry.`);
    }
  }
}

/** Open alerts that had a vulnerable version in the old yarn.lock and have none in the new one. */
function fixedAlerts(alerts: Alert[], oldLock: Lockfile, newLock: Lockfile): number[] {
  const versions = (lock: Lockfile, name: string): string[] =>
    [...lock.entries.values()]
      .map((entry) => entry.fields.resolution.match(NPM_RESOLUTION))
      .filter((match): match is RegExpMatchArray => match !== null && match[1] === name)
      .map((match) => match[2]);
  return alerts
    .filter((alert) => {
      const range = (alert.security_vulnerability?.vulnerable_version_range ?? '').replace(/,/g, ' ');
      if (!range.trim() || !parseRange(range)) return false;
      const vulnerable = (lock: Lockfile) =>
        versions(lock, alert.dependency.package.name).some((version) => satisfies(version, range));
      return vulnerable(oldLock) && !vulnerable(newLock);
    })
    .map((alert) => alert.number);
}

// --- package.json files --------------------------------------------------------------

function checkNewResolution(key: string, value: string, alertsByPackage: Map<string, Alert[]>): void {
  const where = `package.json: new resolution \`${key}\``;
  if (!RESOLUTION_KEY.test(key)) {
    fail(`${where} must be \`<package>\` or \`<parent>/<package>\`.`);
    return;
  }
  const name = parseResolutionKey(key).name;
  const related = alertsByPackage.get(name) ?? [];
  if (related.length === 0) {
    fail(`${where} is not for a package in an open alert.`);
  } else if (related.some((alert) => alert.dependency.scope !== 'development')) {
    // Root resolutions apply to this repository only: one would close the alert while
    // npm users of the published packages still install the vulnerable version.
    fail(`${where}: the package has an alert that is not development-scope.`);
  }
  for (const alert of related) {
    const patched = parseVersion(alert.security_vulnerability?.first_patched_version?.identifier ?? '');
    const pinned = parseVersion(value);
    if (patched && pinned && compareVersions(pinned, patched) < 0) {
      fail(`${where} pins ${value}, below the first patched version.`);
    }
  }
}

async function main(): Promise<number> {
  const alerts = readJson<Alert[]>(process.env.ALERTS ?? '');
  const decisions = readJson<unknown>(process.env.DECISIONS ?? '');
  const changeset = process.env.CHANGESET ?? '';
  const minAge = process.env.MIN_RELEASE_AGE_DAYS ?? '';
  if (!/^[0-9]+$/.test(minAge)) {
    fail(`MIN_RELEASE_AGE_DAYS is \`${minAge}\`, not a whole number of days.`);
    return 1;
  }
  const minAgeDays = Number(minAge);

  const openAlerts = new Map(alerts.map((alert) => [String(alert.number), alert]));
  const alertsByPackage = new Map<string, Alert[]>();
  for (const alert of alerts) {
    const name = alert.dependency.package.name;
    alertsByPackage.set(name, [...(alertsByPackage.get(name) ?? []), alert]);
  }

  // Only the FIRST PATCHED version of a CRITICAL alert that Claude chose to FIX may
  // skip the release-age check, and only when the decision matches the live alert.
  const criticalPatches = new Set<string>();
  for (const decision of Array.isArray(decisions) ? (decisions as Decision[]) : []) {
    if (typeof decision !== 'object' || decision === null) continue;
    const alert = openAlerts.get(String(decision.number));
    const patched = alert?.security_vulnerability?.first_patched_version?.identifier;
    if (
      alert &&
      typeof patched === 'string' &&
      decision.decision === 'FIX' &&
      decision.package === alert.dependency.package.name &&
      decision.ghsa === alert.security_advisory.ghsa_id &&
      alert.security_advisory.severity === 'critical'
    ) {
      criticalPatches.add(`${alert.dependency.package.name}@${patched}`);
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
    // Any edit needs a changeset, even formatting: check-changeset.cjs works per file.
    if (Object.hasOwn(PUBLISHED, path)) changedPublished.add(PUBLISHED[path]);

    for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
      if (!DEP_FIELDS.includes(key) && !isEqual(before[key], after[key])) {
        fail(`${path}: \`${key}\` changed. Only dependency fields may change.`);
      }
    }

    for (const field of DEP_FIELDS) {
      const oldDeps = dependencyMap(before[field]);
      const newDeps = dependencyMap(after[field]);
      if (!oldDeps || !newDeps) {
        fail(`${path}: \`${field}\` must map package names to version strings.`);
        continue;
      }
      for (const key of Object.keys(oldDeps).toSorted()) {
        if (!Object.hasOwn(newDeps, key)) fail(`${path}: \`${field}.${key}\` was removed.`);
      }
      for (const key of Object.keys(newDeps).toSorted()) {
        const value = newDeps[key];
        const old = Object.hasOwn(oldDeps, key) ? oldDeps[key] : undefined;
        if (value === old) continue;
        const where = `${path}: \`${field}.${key}\``;
        if (!EXACT_VERSION.test(value)) {
          fail(`${where} is \`${value}\`, which is not an exact version.`);
        } else if (old === undefined) {
          if (path === 'package.json' && field === 'resolutions') {
            checkNewResolution(key, value, alertsByPackage);
          } else {
            fail(`${where} was added.`);
          }
        } else {
          // A protocol or a path (`npm:other@^1`, `workspace:*`, `file:…`) names another
          // package or source, so it must not become a registry version.
          const floor = /[:/]/.test(old) ? null : minVersion(old);
          const next = parseVersion(value);
          if (!floor) {
            fail(`${where} was \`${old}\`, which is not a registry version range.`);
          } else if (!next || compareVersions(next, floor) < 0) {
            fail(`${where} goes from \`${old}\` down to \`${value}\`.`);
          }
        }
      }
    }
  }

  // --- changeset ----------------------------------------------------------------
  const publishedNames = new Set(Object.values(PUBLISHED));
  const bumped = new Set<string>();
  if (existsSync(changeset)) {
    const frontmatter = readFileSync(changeset, 'utf8').match(CHANGESET_FRONTMATTER);
    if (!frontmatter) {
      fail(`${changeset} must start with a frontmatter between two \`---\` lines.`);
    } else {
      for (const line of frontmatter[1].slice(0, -1).split('\n')) {
        const match = line.match(CHANGESET_LINE);
        if (!match || !publishedNames.has(match[2]) || bumped.has(match[2])) {
          fail(`${changeset}: \`${line}\` must be a quoted patch bump of a published package, listed once.`);
        } else {
          bumped.add(match[2]);
        }
      }
    }
  }
  for (const name of [...bumped].toSorted()) {
    if (!changedPublished.has(name)) {
      fail(`${changeset} bumps \`${name}\`, but its package.json did not change.`);
    }
  }
  for (const name of [...changedPublished].toSorted()) {
    if (!bumped.has(name)) {
      fail(`The package.json of \`${name}\` changed, so ${changeset} must bump it (patch).`);
    }
  }

  // --- yarn.lock ----------------------------------------------------------------
  // Checked even when unchanged: a manifest edit without a lockfile update leaves the
  // new version to an unchecked install.
  let oldLock: Lockfile | null = null;
  let newLock: Lockfile | null = null;
  try {
    oldLock = parseLockfile(gitShowHead('yarn.lock') ?? '');
  } catch (error) {
    fail(`yarn.lock on main cannot be checked: ${(error as Error).message}.`);
  }
  try {
    newLock = parseLockfile(readFileSync('yarn.lock', 'utf8'));
  } catch (error) {
    fail(`yarn.lock: ${(error as Error).message}.`);
  }
  if (oldLock && newLock) {
    const workspaces = readWorkspaces();
    const resolutions = dependencyMap(readJson<Record<string, unknown>>('package.json').resolutions) ?? {};
    checkCoverage(newLock, workspaces, resolutions);
    await checkLockEntries(oldLock, newLock, workspaces, minAgeDays, criticalPatches);
    if (process.env.FIXED_ALERTS) {
      writeFileSync(process.env.FIXED_ALERTS, JSON.stringify(fixedAlerts(alerts, oldLock, newLock)));
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
