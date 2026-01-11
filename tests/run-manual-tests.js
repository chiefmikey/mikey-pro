#!/usr/bin/env node
/**
 * Manual test runner that doesn't require vitest to be installed
 * This can be used to verify tests work before vitest is installed
 * Run with: node tests/run-manual-tests.js
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { format } from 'prettier';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');
const testFilesDir = join(rootDir, 'test-files');

let passed = 0;
let failed = 0;
const failures = [];

function test(name, function_) {
  try {
    const result = function_();
    if (result instanceof Promise) {
      return result
        .then(() => {
          console.log(`✅ ${name}`);
          passed++;
        })
        .catch((error) => {
          console.log(`❌ ${name}: ${error.message}`);
          failures.push({ error: error.message, name });
          failed++;
        });
    }
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    failures.push({ error: error.message, name });
    failed++;
  }
}

async function runTests() {
  console.log('Running manual tests...\n');

  // Test 1: Configs can be imported
  await test('Core config can be imported', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Config is not a valid array');
    }
  });

  await test('React config can be imported', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-react', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Config is not a valid array');
    }
  });

  await test('Vue config can be imported', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-vue', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Config is not a valid array');
    }
  });

  await test('Svelte config can be imported', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-svelte', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Config is not a valid array');
    }
  });

  await test('Angular config can be imported', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-angular', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Config is not a valid array');
    }
  });

  // Test 2: ESLint can lint files
  await test('ESLint can lint JavaScript files', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.js');
    const results = await eslint.lintFiles([testFile]);
    if (results.length === 0) {
      throw new Error('No results returned');
    }
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    if (fatalErrors.length > 0) {
      throw new Error(`Fatal errors found: ${fatalErrors.length}`);
    }
  });

  await test('ESLint can lint TypeScript files', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.ts');
    const results = await eslint.lintFiles([testFile]);
    if (results.length === 0) {
      throw new Error('No results returned');
    }
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    if (fatalErrors.length > 0) {
      throw new Error(`Fatal errors found: ${fatalErrors.length}`);
    }
  });

  // Test 3: Prettier can format files
  await test('Prettier can format JavaScript', async () => {
    const testFile = join(testFilesDir, 'test.js');
    const content = readFileSync(testFile, 'utf-8');
    const prettierConfig = (await import(join(rootDir, '.prettierrc.js')))
      .default;
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'babel',
    });
    if (!formatted || typeof formatted !== 'string') {
      throw new Error('Formatting failed');
    }
  });

  await test('Prettier can format TypeScript', async () => {
    const testFile = join(testFilesDir, 'test.ts');
    const content = readFileSync(testFile, 'utf-8');
    const prettierConfig = (await import(join(rootDir, '.prettierrc.js')))
      .default;
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'typescript',
    });
    if (!formatted || typeof formatted !== 'string') {
      throw new Error('Formatting failed');
    }
  });

  // Test 4: Real-world usage simulation (install/run test)
  console.log('\n=== Install/Run Tests (Real Project Simulation) ===');

  await test('Config works when used as installed package (core)', async () => {
    // Simulate importing config as user would: export { default } from '@mikey-pro/eslint-config'
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Config is not a valid array');
    }

    // Verify it can be used to lint files
    const eslint = new ESLint({
      overrideConfigFile: join(
        rootDir,
        'configs',
        'eslint-config',
        'index.js',
      ),
    });
    const testFile = join(testFilesDir, 'test.js');
    const results = await eslint.lintFiles([testFile]);
    if (results.length === 0) {
      throw new Error('No results returned');
    }
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    if (fatalErrors.length > 0) {
      throw new Error(`Fatal errors found: ${fatalErrors.length}`);
    }
  });

  await test('Config works when used as installed package (React)', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-react', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Config is not a valid array');
    }

    const eslint = new ESLint({
      overrideConfigFile: join(
        rootDir,
        'configs',
        'eslint-config-react',
        'index.js',
      ),
    });
    const testFile = join(testFilesDir, 'test-react.jsx');
    const results = await eslint.lintFiles([testFile]);
    if (results.length === 0) {
      throw new Error('No results returned');
    }
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    if (fatalErrors.length > 0) {
      throw new Error(`Fatal errors found: ${fatalErrors.length}`);
    }
  });

  await test('Linting and formatting work together in project scenario', async () => {
    // Simulate a real project: lint then format
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.js');

    // Step 1: Lint
    const lintResults = await eslint.lintFiles([testFile]);
    if (lintResults.length === 0) {
      throw new Error('No lint results');
    }
    const fatalErrors = lintResults[0].messages.filter((m) => m.fatal);
    if (fatalErrors.length > 0) {
      throw new Error(`Fatal lint errors: ${fatalErrors.length}`);
    }

    // Step 2: Format
    const content = readFileSync(testFile, 'utf-8');
    const prettierConfig = (await import(join(rootDir, '.prettierrc.js')))
      .default;
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'babel',
    });
    if (!formatted || typeof formatted !== 'string') {
      throw new Error('Formatting failed');
    }

    // Both should work without errors
  });

  console.log(`\n${passed} passed, ${failed} failed`);

  if (failed > 0) {
    console.log('\nFailures:');
    for (const { error, name } of failures) {
      console.log(`  - ${name}: ${error}`);
    }
    process.exit(1);
  } else {
    console.log('\n✅ All manual tests passed!');
    process.exit(0);
  }
}

runTests().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});
