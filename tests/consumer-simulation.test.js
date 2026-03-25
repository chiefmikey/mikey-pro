/**
 * Consumer Simulation Test
 *
 * Simulates a real npm consumer installing @mikey-pro/eslint-config (and the
 * React variant) from the actual packed .tgz artifact — the exact artifact
 * that `npm publish` would upload to the registry.
 *
 * This catches bugs that static analysis and unit tests miss:
 *   - `file:` references in peerDependencies (broken for npm consumers)
 *   - Relative `../eslint-config/` imports (only work in the monorepo)
 *   - tsconfig resolution using import.meta.dirname (resolves to node_modules/)
 *   - Prettier unknown options (silent in API, only warns in CLI)
 *   - Missing runtime dependencies (e.g. `prettier` not bundled with eslint-plugin-prettier)
 *
 * Each test suite:
 *   1. Packs the package into a .tgz via `npm pack`
 *   2. Creates an isolated temp directory simulating a fresh consumer project
 *   3. Installs the .tgz (+ required peer deps) via `npm install`
 *   4. Runs a Node.js child process to load the config and verify no import errors
 *   5. Runs ESLint via subprocess to verify rules fire
 *   6. Cleans up the temp dir and .tgz in afterAll
 *
 * HOW TO READ FAILURES:
 *   - "npm install failed" → broken dep chain (file: refs, bad semver, etc.)
 *   - "Node script failed" → config can't be imported (bad relative imports,
 *     tsconfig path issues, etc.)
 *   - "ESLint timed out" → a plugin is hanging (missing peer dep like prettier,
 *     network call, or blocking I/O in a worker thread)
 *   - "ESLint fatal error" → config crash at lint time (broken rule config, etc.)
 *   - "no-var messages empty" → rules aren't loading/executing
 */

import { execFileSync, execSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const rootDir = join(import.meta.dirname, '..');
const baseConfigDir = join(rootDir, 'configs', 'eslint-config');
const reactConfigDir = join(rootDir, 'configs', 'eslint-config-react');
const mikeyProConfigDir = join(rootDir, 'configs');

// Use a longer timeout for beforeAll hooks since npm install is slow.
// Passed as the second argument to beforeAll().
const HOOK_TIMEOUT = 120_000; // 2 minutes per suite

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Run `npm pack` in `pkgDir`, returning the absolute path to the produced .tgz.
 * The .tgz is placed inside `pkgDir` by npm.
 */
function packPackage(pkgDir) {
  execSync('npm pack', { cwd: pkgDir, stdio: 'pipe' });

  const tarballs = readdirSync(pkgDir).filter((f) => f.endsWith('.tgz'));

  if (tarballs.length === 0) {
    throw new Error(`npm pack produced no .tgz in ${pkgDir}`);
  }

  tarballs.sort();
  return join(pkgDir, tarballs.at(-1));
}

/**
 * Create an isolated consumer project directory under the OS temp dir.
 */
function createConsumerDir(suffix) {
  const dir = join(tmpdir(), `mikey-pro-consumer-${suffix}-${Date.now()}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Install one or more package specs into `consumerDir` using --legacy-peer-deps.
 * Throws with npm's stderr on failure.
 */
function npmInstall(consumerDir, ...specs) {
  const args = specs.join(' ');
  try {
    execSync(`npm install ${args} --legacy-peer-deps`, {
      cwd: consumerDir,
      stdio: 'pipe',
    });
  } catch (error) {
    const stderr = error.stderr?.toString() ?? '';
    const stdout = error.stdout?.toString() ?? '';
    throw new Error(
      `npm install failed in ${consumerDir}:\nstderr: ${stderr}\nstdout: ${stdout}`,
    );
  }
}

/**
 * Verify that the installed config can be imported by running a small Node.js
 * script as a child process.  This avoids Vite/Vitest's module resolver
 * interfering with dynamic imports from outside the project root.
 *
 * Returns the stdout of the script.  Throws if the script exits with non-zero.
 */
function runNodeScript(consumerDir, script, { timeout = 30_000 } = {}) {
  const scriptPath = join(consumerDir, '_verify.mjs');
  writeFileSync(scriptPath, script);

  try {
    const output = execFileSync(process.execPath, [scriptPath], {
      cwd: consumerDir,
      stdio: 'pipe',
      timeout,
    });
    return output.toString().trim();
  } catch (error) {
    const stderr = error.stderr?.toString() ?? '';
    const stdout = error.stdout?.toString() ?? '';
    const code = error.code === 'ETIMEDOUT' ? 'TIMEOUT' : `exit ${error.status}`;
    throw new Error(
      `Node script failed (${code}):\n--- script ---\n${script}\n--- stderr ---\n${stderr}\n--- stdout ---\n${stdout}`,
    );
  } finally {
    try {
      unlinkSync(scriptPath);
    } catch {
      // Best-effort cleanup
    }
  }
}

/**
 * Run ESLint from the consumer's node_modules as a subprocess and return the
 * parsed JSON results array.
 *
 * ESLint exits with code 1 when lint violations exist (normal); code >= 2 means
 * a fatal error (config load failure, parse error, etc.).
 */
function runESLintInConsumer(consumerDir, filePath, { timeout = 60_000 } = {}) {
  // Find eslint binary — it may be hoisted to top-level or nested inside
  // @mikey-pro/eslint-config's own node_modules.
  const candidates = [
    join(consumerDir, 'node_modules', 'eslint', 'bin', 'eslint.js'),
    join(
      consumerDir,
      'node_modules',
      '@mikey-pro',
      'eslint-config',
      'node_modules',
      'eslint',
      'bin',
      'eslint.js',
    ),
    join(
      consumerDir,
      'node_modules',
      'mikey-pro',
      'node_modules',
      'eslint',
      'bin',
      'eslint.js',
    ),
  ];

  const eslintBin = candidates.find((p) => existsSync(p));

  if (!eslintBin) {
    throw new Error(
      `Could not find eslint binary in consumer node_modules.\nChecked:\n${candidates.join('\n')}`,
    );
  }

  let stdout = '';
  try {
    stdout = execFileSync(
      process.execPath,
      [eslintBin, '--format', 'json', filePath],
      {
        cwd: consumerDir,
        stdio: 'pipe',
        timeout,
      },
    ).toString();
  } catch (error) {
    const exitCode = error.status ?? 0;
    const errStdout = error.stdout?.toString() ?? '';
    const errStderr = error.stderr?.toString() ?? '';

    if (error.code === 'ETIMEDOUT') {
      throw new Error(
        `ESLint timed out after ${timeout}ms while linting ${filePath}.\n` +
          `This usually means a plugin is blocking (e.g. 'prettier' not installed, ` +
          `synckit worker hanging, or a network call in a plugin).`,
      );
    }

    if (exitCode > 1) {
      throw new Error(
        `ESLint exited with fatal code ${exitCode}.\nstdout: ${errStdout}\nstderr: ${errStderr}`,
      );
    }

    // exit code 1 = lint violations found (normal) — stdout has JSON
    stdout = errStdout || errStdout;
    // execFileSync throws on non-zero but puts stdout in error.stdout
    stdout = error.stdout?.toString() ?? '';
  }

  try {
    return JSON.parse(stdout);
  } catch {
    throw new Error(`ESLint output was not valid JSON:\n${stdout}`);
  }
}

// ---------------------------------------------------------------------------
// Base config consumer suite
// ---------------------------------------------------------------------------

describe('Consumer Simulation — @mikey-pro/eslint-config', { timeout: 30_000 }, () => {
  let consumerDir;
  let tgzPath;

  beforeAll(async () => {
    // 1. Pack the base config
    tgzPath = packPackage(baseConfigDir);

    // 2. Create isolated consumer project
    consumerDir = createConsumerDir('base');

    // 3. Write consumer project files
    writeFileSync(
      join(consumerDir, 'package.json'),
      JSON.stringify(
        { name: 'test-consumer', private: true, type: 'module' },
        null,
        2,
      ),
    );

    // eslint.config.js — exactly how a real consumer would write it
    writeFileSync(
      join(consumerDir, 'eslint.config.js'),
      `export { default } from '@mikey-pro/eslint-config';\n`,
    );

    // Minimal tsconfig so TypeScript-aware rules can find project config
    writeFileSync(
      join(consumerDir, 'tsconfig.json'),
      JSON.stringify(
        {
          compilerOptions: {
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
            module: 'ESNext',
            moduleResolution: 'node',
            skipLibCheck: true,
            strict: true,
            target: 'ES2022',
          },
          include: ['*.ts'],
        },
        null,
        2,
      ),
    );

    // JS test file — uses `var` so the no-var rule should fire
    writeFileSync(
      join(consumerDir, 'test.js'),
      ['var x = 1;', 'export default x;', ''].join('\n'),
    );

    // TS test file — clean enough to parse
    writeFileSync(
      join(consumerDir, 'test.ts'),
      [
        'interface Config {',
        '  value: number;',
        '}',
        '',
        'const config: Config = { value: 42 };',
        '',
        'export default config;',
        '',
      ].join('\n'),
    );

    // 4. Install the packed .tgz + typescript + prettier
    //    - typescript: needed by @typescript-eslint parser
    //    - eslint: peer dep of @mikey-pro/eslint-config
    //    - prettier: peer dep, needed by eslint-plugin-prettier (via synckit worker)
    //      Without prettier installed, the prettier/prettier rule will hang
    //      indefinitely because the synckit worker fails silently.
    npmInstall(consumerDir, `"${tgzPath}"`, 'eslint', 'prettier', 'typescript');
  }, HOOK_TIMEOUT);

  afterAll(() => {
    try {
      if (consumerDir) {
        rmSync(consumerDir, { force: true, recursive: true });
      }
    } finally {
      if (tgzPath) {
        try {
          unlinkSync(tgzPath);
        } catch {
          // Best-effort
        }
      }
    }
  });

  it('installs without errors and the package.json is present', () => {
    const req = createRequire(import.meta.url);
    const installedPkgJson = join(
      consumerDir,
      'node_modules',
      '@mikey-pro',
      'eslint-config',
      'package.json',
    );
    const pkg = req(installedPkgJson);

    expect(pkg.name).toBe('@mikey-pro/eslint-config');
    expect(pkg.version).toBeDefined();
  });

  it('config module loads without import errors (no file: refs, no bad relative imports)', () => {
    // Run a Node.js script in the consumer dir that imports the installed config.
    // If there are file: deps, broken relative imports, or tsconfig path issues,
    // this will throw and the test fails with a clear error.
    const result = runNodeScript(
      consumerDir,
      `
import config from '@mikey-pro/eslint-config';
if (!Array.isArray(config)) throw new Error('Expected default export to be an array, got: ' + typeof config);
if (config.length === 0) throw new Error('Config array is empty');
console.log(JSON.stringify({ ok: true, entries: config.length }));
`,
      { timeout: 30_000 },
    );

    const parsed = JSON.parse(result);
    expect(parsed.ok).toBe(true);
    expect(parsed.entries).toBeGreaterThan(0);
  });

  it('lints a JS file with no fatal errors and fires no-var rule', () => {
    const results = runESLintInConsumer(consumerDir, 'test.js', {
      timeout: 60_000,
    });

    expect(results).toHaveLength(1);

    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    expect(
      fatalErrors,
      `Fatal errors: ${JSON.stringify(fatalErrors)}`,
    ).toHaveLength(0);

    // Verify the no-var rule actually fired — proves rules are loaded
    const noVarMessages = results[0].messages.filter(
      (m) => m.ruleId === 'no-var',
    );
    expect(
      noVarMessages,
      'Expected no-var to report on `var x = 1` — no messages means rules are not loading',
    ).not.toHaveLength(0);
  });

  it('lints a TS file with no fatal errors', () => {
    const results = runESLintInConsumer(consumerDir, 'test.ts', {
      timeout: 60_000,
    });

    expect(results).toHaveLength(1);

    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    expect(
      fatalErrors,
      `Fatal errors: ${JSON.stringify(fatalErrors)}`,
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Unified mikey-pro package consumer suite
// ---------------------------------------------------------------------------

describe(
  'Consumer Simulation — mikey-pro (unified package)',
  { timeout: 30_000 },
  () => {
    let consumerDir;
    let tgzPath;

    beforeAll(async () => {
      tgzPath = packPackage(mikeyProConfigDir);
      consumerDir = createConsumerDir('mikey-pro');

      writeFileSync(
        join(consumerDir, 'package.json'),
        JSON.stringify(
          { name: 'test-consumer-mikey-pro', private: true, type: 'module' },
          null,
          2,
        ),
      );

      writeFileSync(
        join(consumerDir, 'eslint.config.js'),
        `export { default } from 'mikey-pro';\n`,
      );

      writeFileSync(
        join(consumerDir, 'tsconfig.json'),
        JSON.stringify(
          {
            compilerOptions: {
              allowSyntheticDefaultImports: true,
              esModuleInterop: true,
              module: 'ESNext',
              moduleResolution: 'node',
              skipLibCheck: true,
              strict: true,
              target: 'ES2022',
            },
            include: ['*.ts'],
          },
          null,
          2,
        ),
      );

      writeFileSync(
        join(consumerDir, 'test.js'),
        ['var x = 1;', 'export default x;', ''].join('\n'),
      );

      // eslint, prettier, stylelint are peer deps of mikey-pro
      npmInstall(consumerDir, `"${tgzPath}"`, 'eslint', 'prettier', 'stylelint');
    }, HOOK_TIMEOUT);

    afterAll(() => {
      try {
        if (consumerDir) {
          rmSync(consumerDir, { force: true, recursive: true });
        }
      } finally {
        if (tgzPath) {
          try {
            unlinkSync(tgzPath);
          } catch {
            // Best-effort
          }
        }
      }
    });

    it('installs without errors and the package.json is present', () => {
      const req = createRequire(import.meta.url);
      const installedPkgJson = join(
        consumerDir,
        'node_modules',
        'mikey-pro',
        'package.json',
      );
      const pkg = req(installedPkgJson);

      expect(pkg.name).toBe('mikey-pro');
      expect(pkg.version).toBeDefined();
    });

    it('default import loads the ESLint flat config array', () => {
      const result = runNodeScript(
        consumerDir,
        `
import config from 'mikey-pro';
if (!Array.isArray(config)) throw new Error('Expected default export to be an array, got: ' + typeof config);
if (config.length === 0) throw new Error('Config array is empty');
console.log(JSON.stringify({ ok: true, entries: config.length }));
`,
        { timeout: 30_000 },
      );

      const parsed = JSON.parse(result);
      expect(parsed.ok).toBe(true);
      expect(parsed.entries).toBeGreaterThan(0);
    });

    it('subpath imports resolve correctly', () => {
      const result = runNodeScript(
        consumerDir,
        `
import { baseConfig } from 'mikey-pro/eslint/base-config.js';
import { baseOverrides } from 'mikey-pro/eslint/overrides.js';
const prettierConfig = await import('mikey-pro/prettier');
const stylelintConfig = await import('mikey-pro/stylelint');

const checks = {
  baseConfig: typeof baseConfig === 'object' && baseConfig !== null,
  baseOverrides: Array.isArray(baseOverrides),
  prettier: typeof prettierConfig.default === 'object',
  stylelint: typeof stylelintConfig.default === 'object',
};

console.log(JSON.stringify(checks));
`,
        { timeout: 30_000 },
      );

      const checks = JSON.parse(result);
      expect(checks.baseConfig).toBe(true);
      expect(checks.baseOverrides).toBe(true);
      expect(checks.prettier).toBe(true);
      expect(checks.stylelint).toBe(true);
    });

    it('lints a JS file with no fatal errors and fires no-var rule', () => {
      const results = runESLintInConsumer(consumerDir, 'test.js', {
        timeout: 60_000,
      });

      expect(results).toHaveLength(1);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);
      expect(
        fatalErrors,
        `Fatal errors: ${JSON.stringify(fatalErrors)}`,
      ).toHaveLength(0);

      const noVarMessages = results[0].messages.filter(
        (m) => m.ruleId === 'no-var',
      );
      expect(
        noVarMessages,
        'Expected no-var to report on `var x = 1` — no messages means rules are not loading',
      ).not.toHaveLength(0);
    });
  },
);

// ---------------------------------------------------------------------------
// React config consumer suite
// ---------------------------------------------------------------------------

describe(
  'Consumer Simulation — @mikey-pro/eslint-config-react',
  { timeout: 30_000 },
  () => {
    let consumerDir;
    let mikeyProTgzPath;
    let reactTgzPath;

    beforeAll(async () => {
      // 1. Pack both packages (react config depends on mikey-pro base)
      mikeyProTgzPath = packPackage(mikeyProConfigDir);
      reactTgzPath = packPackage(reactConfigDir);

      // 2. Create isolated consumer project
      consumerDir = createConsumerDir('react');

      // 3. Write consumer project files
      writeFileSync(
        join(consumerDir, 'package.json'),
        JSON.stringify(
          { name: 'test-consumer-react', private: true, type: 'module' },
          null,
          2,
        ),
      );

      writeFileSync(
        join(consumerDir, 'eslint.config.js'),
        `export { default } from '@mikey-pro/eslint-config-react';\n`,
      );

      // JSX test file with a simple arrow-function component
      writeFileSync(
        join(consumerDir, 'App.jsx'),
        [
          "import React from 'react';",
          '',
          'const App = () => <div>Hello</div>;',
          '',
          'export default App;',
          '',
        ].join('\n'),
      );

      // 4. Install both .tgz files + peer deps
      npmInstall(
        consumerDir,
        `"${mikeyProTgzPath}"`,
        `"${reactTgzPath}"`,
        'eslint',
        'prettier',
      );
    }, HOOK_TIMEOUT);

    afterAll(() => {
      try {
        if (consumerDir) {
          rmSync(consumerDir, { force: true, recursive: true });
        }
      } finally {
        for (const p of [mikeyProTgzPath, reactTgzPath]) {
          if (p) {
            try {
              unlinkSync(p);
            } catch {
              // Best-effort
            }
          }
        }
      }
    });

    it('installs without errors and the package.json is present', () => {
      const req = createRequire(import.meta.url);
      const installedPkgJson = join(
        consumerDir,
        'node_modules',
        '@mikey-pro',
        'eslint-config-react',
        'package.json',
      );
      const pkg = req(installedPkgJson);

      expect(pkg.name).toBe('@mikey-pro/eslint-config-react');
      expect(pkg.version).toBeDefined();
    });

    it('config module loads without import errors (no broken relative imports to base config)', () => {
      // This catches bugs where index.js uses broken import paths.
      // The correct import path is 'mikey-pro/eslint/base-config.js'.
      const result = runNodeScript(
        consumerDir,
        `
import config from '@mikey-pro/eslint-config-react';
if (!Array.isArray(config)) throw new Error('Expected default export to be an array');
if (config.length === 0) throw new Error('Config array is empty');
const hasReact = config.some(c => c.plugins && c.plugins.react !== undefined);
if (!hasReact) throw new Error('React plugin not found in config array');
console.log(JSON.stringify({ ok: true, entries: config.length, hasReact }));
`,
        { timeout: 30_000 },
      );

      const parsed = JSON.parse(result);
      expect(parsed.ok).toBe(true);
      expect(parsed.entries).toBeGreaterThan(0);
      expect(parsed.hasReact).toBe(true);
    });

    it('lints a JSX file with no fatal errors', () => {
      const results = runESLintInConsumer(consumerDir, 'App.jsx', {
        timeout: 60_000,
      });

      expect(results).toHaveLength(1);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);
      expect(
        fatalErrors,
        `Fatal errors: ${JSON.stringify(fatalErrors)}`,
      ).toHaveLength(0);
    });
  },
);
