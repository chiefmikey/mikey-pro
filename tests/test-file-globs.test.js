/**
 * Test-File Glob Recognition (10.3.6 regression guard)
 *
 * Before 10.3.6, the `import-x/no-extraneous-dependencies` devDependencies
 * allowlist and the `jestJs`/`jestTs` override `files` globs (base-config.js,
 * overrides.js) only matched `*.test.{js,ts}` / `*.spec.{js,ts}`. A React/Vue
 * test file like `*.test.tsx` or `*.spec.jsx`, a file under `__tests__/` or
 * `__mocks__/`, or a config file like `vitest.config.*` was NOT recognized as
 * a test file — so importing `vitest`/`@testing-library/react` (devDeps) from
 * one of those files produced a false-positive `import-x/no-extraneous-dependencies`
 * error in every consumer project. The fix broadened both glob sets.
 *
 * These tests actually lint real content through the published config
 * (`configs/eslint-config/index.js`) rather than asserting against the glob
 * strings in isolation, so a future narrowing of the allowlist is caught the
 * same way a consumer project would hit it.
 */

import { randomBytes } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { baseConfig } from '@mikey-pro/eslint-config/base-config.js';
import { jestTs } from '@mikey-pro/eslint-config/overrides.js';
import { ESLint } from 'eslint';
import minimatch from 'minimatch';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const EXTRANEOUS_DEPS_RULE = 'import-x/no-extraneous-dependencies';

const rootDir = join(import.meta.dirname, '..');
const configPath = join(rootDir, 'configs', 'eslint-config', 'index.js');

const vitestImportContent = [
  "import { describe, expect, it } from 'vitest';",
  '',
  "describe('probe', () => {",
  "  it('passes', () => {",
  '    expect(true).toBe(true);',
  '  });',
  '});',
  '',
].join('\n');

// A non-test file that still imports a devDependency — used for the negative
// case. Doesn't need real JSX to be valid TSX/JSX; only the extension matters.
const nonTestContent = [
  "import { expect } from 'vitest';",
  '',
  'export const assertion = expect;',
  '',
].join('\n');

function getExtraneousDepsErrors(messages) {
  return messages.filter((m) => m.ruleId === EXTRANEOUS_DEPS_RULE);
}

function getFatalErrors(messages) {
  return messages.filter((m) => m.fatal);
}

describe('test-file glob recognition (import-x/no-extraneous-dependencies)', () => {
  let eslint;
  let temporaryDirectory;

  function writeTemporaryFile(relativePath, content) {
    const filePath = join(temporaryDirectory, relativePath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content, 'utf8');
    return filePath;
  }

  async function lintVirtual(relativePath, content = vitestImportContent) {
    const results = await eslint.lintText(content, {
      filePath: join(rootDir, relativePath),
    });
    return results[0].messages;
  }

  async function lintRealFile(relativePath, content = vitestImportContent) {
    const filePath = writeTemporaryFile(relativePath, content);
    try {
      const results = await eslint.lintFiles([filePath]);
      return results[0].messages;
    } finally {
      rmSync(filePath, { force: true });
    }
  }

  beforeAll(async () => {
    eslint = new ESLint({ cwd: rootDir, overrideConfigFile: configPath });
    temporaryDirectory = join(
      rootDir,
      `test-file-globs-tmp-${randomBytes(6).toString('hex')}`,
    );
    mkdirSync(temporaryDirectory, { recursive: true });

    // Importing configs/eslint-config/index.js registers 25+ plugins, and the
    // FIRST .ts-family lint in this process makes typescript-eslint build a
    // full TypeScript Program from the repo's tsconfig.json. Both are one-time,
    // process-level costs (observed 150-200s on this machine) that have nothing
    // to do with the rule under test. Pay it once here, under hookTimeout (180s
    // in vitest.config.js), rather than letting it blow a per-test testTimeout.
    const warmupFile = writeTemporaryFile(
      'warmup.ts',
      'export const warmup = 1;\n',
    );
    await eslint.lintFiles([warmupFile]);
    rmSync(warmupFile, { force: true });
  }, 240_000);

  afterAll(() => {
    rmSync(temporaryDirectory, { force: true, recursive: true });
  });

  describe('recognized as test files — non type-aware extensions', () => {
    it.each([
      ['src/util.test.js'],
      ['src/Component.test.jsx'],
      ['src/util.test.mjs'],
      ['src/util.test.cjs'],
      ['src/util.spec.js'],
    ])(
      '%s importing vitest does not trigger import-x/no-extraneous-dependencies',
      async (relativePath) => {
        const messages = await lintVirtual(relativePath);

        expect(getFatalErrors(messages)).toHaveLength(0);
        expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
      },
    );
  });

  describe('recognized via *.config.* patterns', () => {
    it('vitest.config.js importing vitest does not trigger import-x/no-extraneous-dependencies', async () => {
      const messages = await lintVirtual('vitest.config.js');

      expect(getFatalErrors(messages)).toHaveLength(0);
      expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
    });

    it('jest.config.ts importing vitest does not trigger import-x/no-extraneous-dependencies', async () => {
      const messages = await lintRealFile('jest.config.ts');

      expect(getFatalErrors(messages)).toHaveLength(0);
      expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
    }, 60_000);
  });

  describe('recognized as test files — TypeScript-family extensions (real on-disk lint)', () => {
    it('test.ts (baseline) importing vitest does not trigger import-x/no-extraneous-dependencies', async () => {
      const messages = await lintRealFile('src/util.test.ts');

      expect(getFatalErrors(messages)).toHaveLength(0);
      expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
    }, 60_000);

    it('test.tsx importing vitest does not trigger import-x/no-extraneous-dependencies', async () => {
      const messages = await lintRealFile('src/Component.test.tsx');

      expect(getFatalErrors(messages)).toHaveLength(0);
      expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
    }, 60_000);

    it('spec.tsx importing vitest does not trigger import-x/no-extraneous-dependencies', async () => {
      const messages = await lintRealFile('src/Component.spec.tsx');

      expect(getFatalErrors(messages)).toHaveLength(0);
      expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
    }, 60_000);

    it('__tests__/*.ts importing vitest does not trigger import-x/no-extraneous-dependencies', async () => {
      const messages = await lintRealFile('__tests__/foo.ts');

      expect(getFatalErrors(messages)).toHaveLength(0);
      expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
    }, 60_000);
  });

  // This repo's own tsconfig.json `include` is
  // ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"] — it does not cover .mts/.cts
  // (a pre-existing gap, unrelated to this fix, and orthogonal to how a
  // consumer project's own tsconfig would be set up). Actually linting a real
  // .mts/.cts file here — even one on disk — makes typescript-eslint's
  // `parserOptions.project: true` throw a FATAL "TSConfig does not include this
  // file" error before import-x/no-extraneous-dependencies ever runs. A
  // "zero extraneousDepsErrors" assertion in that scenario would pass for the
  // wrong reason (parsing failed, not "correctly recognized as a test file").
  // Instead, assert the same way eslint-plugin-import-x's rule does internally
  // (minimatch against the raw glob strings), reading the arrays straight from
  // the real config modules so a future narrowing of the patterns still fails
  // this test.
  describe('recognized as test files — .mts/.cts (glob assertion; real lint blocked by a pre-existing, unrelated tsconfig gap)', () => {
    const developmentDependencyPatterns =
      baseConfig.rules[EXTRANEOUS_DEPS_RULE][1].devDependencies;

    it.each([['src/util.test.mts'], ['src/util.test.cts']])(
      '%s matches an import-x/no-extraneous-dependencies devDependencies pattern',
      (relativePath) => {
        const matched = developmentDependencyPatterns.some((pattern) =>
          minimatch(relativePath, pattern),
        );

        expect(matched).toBe(true);
      },
    );

    it.each([['src/util.test.mts'], ['src/util.test.cts']])(
      '%s matches a jestTs override files pattern',
      (relativePath) => {
        const matched = jestTs.files.some((pattern) =>
          minimatch(relativePath, pattern),
        );

        expect(matched).toBe(true);
      },
    );
  });

  describe('negative case — allowlist stays narrow', () => {
    it('a non-test .jsx file importing a devDependency still triggers import-x/no-extraneous-dependencies', async () => {
      const messages = await lintVirtual('src/Component.jsx', nonTestContent);

      expect(getExtraneousDepsErrors(messages)).toHaveLength(1);
    });

    it('a non-test .tsx file importing a devDependency still triggers import-x/no-extraneous-dependencies', async () => {
      const messages = await lintRealFile('src/Component.tsx', nonTestContent);

      expect(getExtraneousDepsErrors(messages)).toHaveLength(1);
    }, 60_000);

    it('a non-test .ts path does not match the .mts/.cts-style devDependencies glob', () => {
      const developmentDependencyPatterns =
        baseConfig.rules[EXTRANEOUS_DEPS_RULE][1].devDependencies;
      const matched = developmentDependencyPatterns.some((pattern) =>
        minimatch('src/util.ts', pattern),
      );

      expect(matched).toBe(false);
    });
  });
});
