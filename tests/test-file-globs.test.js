/**
 * Test-File Glob Recognition (10.3.6 regression guard, full-matrix coverage)
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
 * These tests actually lint real content through the repo config
 * (`configs/eslint-config/index.js`) rather than asserting against the glob
 * strings in isolation, so a future narrowing of the allowlist is caught the
 * same way a consumer project would hit it. They are table-driven:
 *
 *   - testFileCases: claimed by BOTH the allowlist and a jest override
 *     (`*.{test,spec}.<every ext>`, `__tests__/**`, `__mocks__/**`).
 *   - devDependencyOnlyCases: claimed by the allowlist but not the jest
 *     override (`test/`, `tests/`, setup files, tool configs, `*.cy.*`).
 *   - nonTestCases: must STILL error and must NOT get jest rules; includes
 *     look-alike names (latest.ts, contest.tsx, my__tests__x/, ...) so a
 *     sloppy substring glob (anything like `*test*`) fails here.
 *
 * Note: only devDependencies declared in this repo's package.json can be used
 * as the probe import (`vitest`); `@testing-library/react` is exercised in
 * consumer-simulation.test.js where the consumer package.json is controlled.
 */

import { randomBytes } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { ESLint } from 'eslint';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const EXTRANEOUS_DEPS_RULE = 'import-x/no-extraneous-dependencies';
// Any rule from eslint-plugin-jest's `flat/all` set works as a probe for "the
// jestJs/jestTs override applied to this file". It is absent from the base
// config, so its presence in the calculated config means a jest block matched.
const JEST_PROBE_RULE = 'jest/no-focused-tests';

const rootDir = join(import.meta.dirname, '..');
const configPath = join(rootDir, 'configs', 'eslint-config', 'index.js');

const TEST_KINDS = ['test', 'spec'];
const EXTENSIONS = ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx', 'mts', 'cts'];

// `vitest` is a devDependency of this repo's package.json, so importing it
// from a file the allowlist does NOT claim is exactly the consumer bug.
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
// case. Doesn't need real JSX to be valid TSX/JSX; only the path matters.
const nonTestContent = [
  "import { expect } from 'vitest';",
  '',
  'export const assertion = expect;',
  '',
].join('\n');

// ---------------------------------------------------------------------------
// Case tables. Paths are relative to the temp fixture directory.
//   [relativePath, jestOverrideApplies]
// "jestOverrideApplies" is only true where the jestJs/jestTs `files` globs
// claim the path; the devDependencies allowlist is broader (test/, tests/,
// setup and config files), so those rows expect `false`.
// ---------------------------------------------------------------------------

const crossProduct = (kinds, extensions) =>
  kinds.flatMap((kind) =>
    extensions.map((extension) => [`src/util.${kind}.${extension}`, true]),
  );

const testFileCases = [
  // *.test.* / *.spec.* across the whole extension matrix
  ...crossProduct(TEST_KINDS, EXTENSIONS),
  // multi-dot, root-level and deeply nested basenames
  ['src/components/deep/Button.test.tsx', true],
  ['src/components/deep/Button.stories.test.tsx', true],
  ['Component.spec.jsx', true],
  // __tests__ / __mocks__, including nested dirs and non-test-named files
  ['__tests__/foo.ts', true],
  ['__tests__/helpers.js', true],
  ['src/components/deep/__tests__/x.tsx', true],
  ['src/__tests__/utils/nested/fixture.jsx', true],
  ['src/__tests__/Thing.test.tsx', true],
  ['src/__tests__/runner.mjs', true],
  ['src/__tests__/runner.cjs', true],
  ['src/__tests__/types.mts', true],
  ['src/__tests__/types.cts', true],
  ['__mocks__/api.ts', true],
  ['src/deep/__mocks__/fs.js', true],
  ['src/__mocks__/service.mjs', true],
  ['src/__mocks__/Widget.tsx', true],
];

const developmentDependencyOnlyCases = [
  // test/ and tests/ directories (allowlist only; no jest override claimed)
  ['test/helpers/util.ts', false],
  ['tests/integration/app.js', false],
  ['src/test/fixture.tsx', false],
  ['packages/app/tests/e2e/flow.mjs', false],
  // setup files
  ['vitest.setup.ts', false],
  ['vitest.setup.mts', false],
  ['jest.setup.js', false],
  ['test.setup.mjs', false],
  ['setupTests.ts', false],
  ['src/setupTests.js', false],
  ['testSetup.ts', false],
  ['src/testSetup.tsx', false],
  // tool config files
  ['vitest.config.js', false],
  ['vitest.config.ts', false],
  ['vitest.config.mts', false],
  ['vite.config.ts', false],
  ['apps/web/vite.config.js', false],
  ['jest.config.ts', false],
  ['jest.config.cjs', false],
  ['playwright.config.ts', false],
  ['cypress.config.mjs', false],
  // Cypress specs: the `cypressConfig` override claims **/*.cy.* as test
  // files, so the allowlist has to as well.
  ['cypress/e2e/login.cy.ts', false],
  ['cypress/e2e/login.cy.js', false],
  ['src/Button.cy.tsx', false],
  ['src/Button.cy.mts', false],
];

// Non-test files must keep erroring and must not pick up the jest override.
// The look-alikes each resemble one of the claimed patterns without matching.
const nonTestCases = [
  // ordinary source across the extension matrix
  ...EXTENSIONS.map((extension) => [`src/util.${extension}`]),
  ['src/Component.tsx'],
  ['src/Component.jsx'],
  // basenames that merely contain "test"/"spec"
  ['src/latest.ts'],
  ['src/contest.tsx'],
  ['src/attest.js'],
  ['src/tests-util.ts'],
  ['src/spec-helper.ts'],
  ['src/test.ts'],
  ['src/spec.tsx'],
  ['src/tests.ts'],
  ['src/util.tests.ts'],
  ['src/util.specs.js'],
  ['src/util.testing.js'],
  ['src/util.test-helpers.ts'],
  ['src/__tests__.ts'],
  ['src/__mocks__.js'],
  // directories that merely resemble test dirs
  ['src/my__tests__x/foo.ts'],
  ['src/x__tests__/foo.ts'],
  ['src/__tests__x/foo.ts'],
  ['src/my__mocks__x/foo.js'],
  ['src/mytests/foo.js'],
  ['src/contest/foo.ts'],
  ['src/testing/foo.ts'],
  ['src/tests-helpers/foo.tsx'],
  // setup/config look-alikes
  ['src/mysetupTests.ts'],
  ['src/setup.ts'],
  ['src/vitest.setup-helper.ts'],
  ['src/myvitest.config.ts'],
  ['src/vitest-config.ts'],
  ['src/vite-config.js'],
  ['src/app.config.ts'],
  ['src/cy.ts'],
];

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

  // Lints `content` as if it lived at `relativePath` (inside the fixture dir).
  // The file is written to disk first so typescript-eslint's `project: true`
  // can find it in the fixture tsconfig; the text is still what gets linted.
  async function lintFixture(relativePath, content) {
    const filePath = writeTemporaryFile(relativePath, content);
    try {
      const results = await eslint.lintText(content, { filePath });
      return results[0].messages;
    } finally {
      rmSync(filePath, { force: true });
    }
  }

  async function jestOverrideApplies(relativePath) {
    const config = await eslint.calculateConfigForFile(
      join(temporaryDirectory, relativePath),
    );
    const hasJestRule = config.rules?.[JEST_PROBE_RULE] !== undefined;
    const hasJestGlobal = config.languageOptions?.globals?.jest !== undefined;

    // Both signals come from the same override block; if they ever disagree
    // the glob/override wiring is inconsistent.
    expect(hasJestGlobal).toBe(hasJestRule);

    return hasJestRule;
  }

  beforeAll(async () => {
    eslint = new ESLint({ cwd: rootDir, overrideConfigFile: configPath });
    temporaryDirectory = join(
      rootDir,
      `test-file-globs-tmp-${randomBytes(6).toString('hex')}`,
    );
    mkdirSync(temporaryDirectory, { recursive: true });

    // The repo tsconfig.json `include` covers .ts/.tsx/.js/.jsx but not
    // .mts/.cts/.mjs/.cjs, so typescript-eslint throws a FATAL "TSConfig does
    // not include this file" for those before the rule under test can run (a
    // "zero errors" assertion would then pass for the wrong reason). `project:
    // true` resolves the nearest tsconfig.json per file, so a fixture tsconfig
    // that extends the repo's and includes everything lets us lint the full
    // extension matrix for real.
    writeFileSync(
      join(temporaryDirectory, 'tsconfig.json'),
      JSON.stringify({ extends: '../tsconfig.json', include: ['**/*'] }),
      'utf8',
    );

    // Importing configs/eslint-config/index.js registers 25+ plugins, and the
    // FIRST .ts-family lint in this process makes typescript-eslint build a
    // full TypeScript Program from the fixture tsconfig. Both are one-time,
    // process-level costs (observed 150-200s on a loaded machine) that have
    // nothing to do with the rule under test. Pay it once here, under
    // hookTimeout (180s in vitest.config.js), rather than letting it blow a
    // per-test testTimeout.
    await lintFixture('warmup.ts', 'export const warmup = 1;\n');
  }, 240_000);

  afterAll(() => {
    rmSync(temporaryDirectory, { force: true, recursive: true });
  });

  describe('recognized as test files (allowlist + jest override)', () => {
    it.each(testFileCases)(
      '%s: devDependency import is allowed (jest override applies: %s)',
      async (relativePath, expectJest) => {
        const messages = await lintFixture(relativePath, vitestImportContent);

        expect(getFatalErrors(messages)).toHaveLength(0);
        expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
        await expect(jestOverrideApplies(relativePath)).resolves.toBe(
          expectJest,
        );
      },
      60_000,
    );
  });

  describe('recognized by the allowlist only (test dirs, setup files, tool configs)', () => {
    it.each(developmentDependencyOnlyCases)(
      '%s: devDependency import is allowed (jest override applies: %s)',
      async (relativePath, expectJest) => {
        const messages = await lintFixture(relativePath, vitestImportContent);

        expect(getFatalErrors(messages)).toHaveLength(0);
        expect(getExtraneousDepsErrors(messages)).toHaveLength(0);
        await expect(jestOverrideApplies(relativePath)).resolves.toBe(
          expectJest,
        );
      },
      60_000,
    );
  });

  describe('negative cases — allowlist and jest overrides stay narrow', () => {
    it.each(nonTestCases)(
      '%s: devDependency import still triggers import-x/no-extraneous-dependencies',
      async (relativePath) => {
        const messages = await lintFixture(relativePath, nonTestContent);

        expect(getFatalErrors(messages)).toHaveLength(0);
        expect(getExtraneousDepsErrors(messages)).toHaveLength(1);
        await expect(jestOverrideApplies(relativePath)).resolves.toBe(false);
      },
      60_000,
    );
  });
});
