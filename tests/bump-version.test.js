/**
 * Version bump script: package-lock.json handling
 *
 * Before this guard, scripts/bump-version.js bumped every package.json and the
 * ruff pyproject.toml but not package-lock.json, so the lockfile's own-package
 * version (top-level `version` and `packages[""].version`) drifted behind
 * package.json after every release. These tests cover:
 *
 *   - setLockfileVersion (pure function): only the two root fields change,
 *     for both the JSON round-trip fast path and the regex fallback used when
 *     the file is not 2-space/LF/trailing-newline formatted.
 *   - the real script, run against a temp copy of the repo layout (the repo
 *     itself is never bumped): lockfile updated, nothing else unintended,
 *     and a missing lockfile is skipped rather than fatal.
 */

import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { setLockfileVersion } from '../scripts/lockfile-version.js';

const rootDir = join(import.meta.dirname, '..');

// Files bump-version.js reads/writes, mirrored into the temp tree.
const BUMPED_FILES = [
  'package.json',
  'configs/package.json',
  'configs/eslint-config/package.json',
  'configs/eslint-config-react/package.json',
  'configs/eslint-config-vue/package.json',
  'configs/eslint-config-svelte/package.json',
  'configs/eslint-config-angular/package.json',
  'configs/prettier-config/package.json',
  'configs/stylelint-config/package.json',
  'configs/ruff-config/package.json',
  'configs/ruff-config/pyproject.toml',
];
const SCRIPT_FILES = ['scripts/bump-version.js', 'scripts/lockfile-version.js'];

// Minimal lockfile in npm's layout: own root entry, a workspace entry whose
// version matches the OLD version, and a third-party dep that also does.
const makeLockfile = (
  version,
  { indent = 2, eol = '\n', trailing = true } = {},
) => {
  const lock = {
    name: 'mikey-pro',
    version,
    lockfileVersion: 3,
    requires: true,
    packages: {
      '': {
        name: 'mikey-pro',
        version,
        license: 'MIT',
        devDependencies: {
          '@mikey-pro/eslint-config': 'file:./configs/eslint-config',
        },
      },
      configs: { name: 'mikey-pro', version, license: 'MIT' },
      'node_modules/third-party': {
        version,
        resolved: 'https://example.test/x.tgz',
      },
    },
  };
  const text = JSON.stringify(lock, null, indent).replaceAll('\n', eol);
  return trailing ? text + eol : text;
};

const changedLines = (before, after) => {
  const a = before.split('\n');
  const b = after.split('\n');
  expect(b).toHaveLength(a.length);
  return a.flatMap((line, index) =>
    line === b[index] ? [] : [{ line: index + 1, from: line, to: b[index] }],
  );
};

describe('setLockfileVersion', () => {
  it('updates exactly the two root fields on a canonical lockfile', () => {
    const before = makeLockfile('10.3.9');
    const after = setLockfileVersion(before, '10.3.10');

    expect(changedLines(before, after)).toStrictEqual([
      {
        line: 3,
        from: '  "version": "10.3.9",',
        to: '  "version": "10.3.10",',
      },
      {
        line: 9,
        from: '      "version": "10.3.9",',
        to: '      "version": "10.3.10",',
      },
    ]);
  });

  it('leaves the real repo lockfile byte-identical except the two root lines', () => {
    const before = readFileSync(join(rootDir, 'package-lock.json'), 'utf8');
    const after = setLockfileVersion(before, '99.0.0');
    const diff = changedLines(before, after);

    expect(diff).toHaveLength(2);
    expect(diff.map((d) => d.line)).toStrictEqual([3, 9]);
    expect(diff.every((d) => d.to.includes('"99.0.0"'))).toBe(true);
    expect(JSON.parse(after).packages['configs/eslint-config'].version).toBe(
      JSON.parse(before).packages['configs/eslint-config'].version,
    );
  });

  it('is idempotent', () => {
    const once = setLockfileVersion(makeLockfile('10.3.9'), '10.3.10');

    expect(setLockfileVersion(once, '10.3.10')).toBe(once);
  });

  it.each([
    ['4-space indent', { indent: 4 }],
    ['CRLF line endings', { eol: '\r\n' }],
    ['no trailing newline', { trailing: false }],
    ['tab indent', { indent: '\t' }],
  ])('falls back to targeted replacement for %s', (_name, format) => {
    const before = makeLockfile('10.3.9', format);
    const after = setLockfileVersion(before, '10.3.10');
    const eol = format.eol ?? '\n';
    const diff = changedLines(
      before.split(eol).join('\n'),
      after.split(eol).join('\n'),
    );

    // Only the two root version lines changed; formatting is preserved.
    expect(diff).toHaveLength(2);
    expect(diff.map((d) => d.line)).toStrictEqual([3, 9]);
    expect(after.endsWith(before.endsWith(eol) ? eol : '}')).toBe(true);

    const parsed = JSON.parse(after);

    expect(parsed.version).toBe('10.3.10');
    expect(parsed.packages[''].version).toBe('10.3.10');
    expect(parsed.packages.configs.version).toBe('10.3.9');
    expect(parsed.packages['node_modules/third-party'].version).toBe('10.3.9');
  });

  it('does not add fields that the lockfile lacks', () => {
    const before =
      JSON.stringify({ name: 'x', lockfileVersion: 3 }, null, 2) + '\n';

    expect(setLockfileVersion(before, '1.2.3')).toBe(before);
  });
});

describe('scripts/bump-version.js against a temp copy of the repo', () => {
  let temporaryRoot;

  const setUp = ({ withLockfile }) => {
    temporaryRoot = mkdtempSync(join(tmpdir(), 'bump-version-test-'));
    for (const file of [...BUMPED_FILES, ...SCRIPT_FILES]) {
      mkdirSync(dirname(join(temporaryRoot, file)), { recursive: true });
      copyFileSync(join(rootDir, file), join(temporaryRoot, file));
    }
    if (withLockfile) {
      writeFileSync(
        join(temporaryRoot, 'package-lock.json'),
        makeLockfile('10.3.9'),
        'utf8',
      );
    }
  };

  const run = (version) =>
    execFileSync(
      'node',
      [join(temporaryRoot, 'scripts/bump-version.js'), version],
      {
        cwd: temporaryRoot,
        encoding: 'utf8',
        env: { ...process.env, GITHUB_OUTPUT: '' },
      },
    );

  afterEach(() => {
    rmSync(temporaryRoot, { force: true, recursive: true });
  });

  it('bumps the lockfile root version alongside the package.json files', () => {
    setUp({ withLockfile: true });
    const before = readFileSync(
      join(temporaryRoot, 'package-lock.json'),
      'utf8',
    );
    const output = run('10.3.10');
    const after = readFileSync(
      join(temporaryRoot, 'package-lock.json'),
      'utf8',
    );

    expect(output).toContain('Updated package-lock.json → 10.3.10');
    expect(changedLines(before, after).map((d) => d.line)).toStrictEqual([
      3, 9,
    ]);
    expect(
      JSON.parse(readFileSync(join(temporaryRoot, 'package.json'), 'utf8'))
        .version,
    ).toBe('10.3.10');
    expect(JSON.parse(after).version).toBe('10.3.10');
    expect(JSON.parse(after).packages[''].version).toBe('10.3.10');
  });

  it('skips a missing lockfile without failing or creating one', () => {
    setUp({ withLockfile: false });
    const output = run('10.3.10');

    expect(output).toContain('Skipped package-lock.json (not found)');
    expect(output).toContain('Successfully bumped version to 10.3.10');
    expect(() =>
      readFileSync(join(temporaryRoot, 'package-lock.json')),
    ).toThrow(/ENOENT/);
  });
});
