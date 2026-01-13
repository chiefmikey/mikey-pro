#!/usr/bin/env node
/**
 * Comprehensive validation script that verifies all aspects of the project
 * Run with: node tests/validate-all.js
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

async function validateAll() {
  console.log('Running comprehensive validation...\n');

  // 1. Config Loading
  console.log('=== Configuration Loading ===');
  await test('Core config loads', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Invalid config format');
    }
  });

  await test('React config loads', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-react', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Invalid config format');
    }
  });

  await test('Vue config loads', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-vue', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Invalid config format');
    }
  });

  await test('Svelte config loads', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-svelte', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Invalid config format');
    }
  });

  await test('Angular config loads', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-angular', 'index.js')
    );
    if (!config.default || !Array.isArray(config.default)) {
      throw new Error('Invalid config format');
    }
  });

  // 2. ESLint Functionality
  console.log('\n=== ESLint Functionality ===');
  const configPath = join(rootDir, 'eslint.config.js');

  await test('ESLint lints JavaScript', async () => {
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const results = await eslint.lintFiles([join(testFilesDir, 'test.js')]);
    if (results.length === 0) {
      throw new Error('No results returned');
    }
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    if (fatalErrors.length > 0) {
      throw new Error(`Fatal errors: ${fatalErrors.length}`);
    }
  });

  await test('ESLint lints TypeScript', async () => {
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const results = await eslint.lintFiles([join(testFilesDir, 'test.ts')]);
    if (results.length === 0) {
      throw new Error('No results returned');
    }
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    if (fatalErrors.length > 0) {
      throw new Error(`Fatal errors: ${fatalErrors.length}`);
    }
  });

  // 3. Prettier Functionality
  console.log('\n=== Prettier Functionality ===');
  const prettierConfig = (await import('@mikey-pro/prettier-config')).default;

  await test('Prettier formats JavaScript', async () => {
    const content = readFileSync(join(testFilesDir, 'test.js'), 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'babel',
    });
    if (!formatted || typeof formatted !== 'string') {
      throw new Error('Formatting failed');
    }
  });

  await test('Prettier formats TypeScript', async () => {
    const content = readFileSync(join(testFilesDir, 'test.ts'), 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'typescript',
    });
    if (!formatted || typeof formatted !== 'string') {
      throw new Error('Formatting failed');
    }
  });

  // 4. Test Files Exist
  console.log('\n=== Test Files ===');
  const requiredTestFiles = [
    'test.js',
    'test.ts',
    'test-react.jsx',
    'test-vue.vue',
    'test-svelte.svelte',
    'test-angular.ts',
    'test.json',
    'test.yaml',
    'test.md',
    'test.html',
    'test.toml',
    'test.css',
    'test.scss',
  ];

  for (const file of requiredTestFiles) {
    test(`Test file exists: ${file}`, () => {
      if (!existsSync(join(testFilesDir, file))) {
        throw new Error(`Missing: ${file}`);
      }
    });
  }

  // 5. Test Suite Files
  console.log('\n=== Test Suite Files ===');
  const requiredTestSuites = [
    'configs.test.js',
    'linting.test.js',
    'formatting.test.js',
    'integration.test.js',
    'file-types.test.js',
    'rules.test.js',
  ];

  for (const file of requiredTestSuites) {
    test(`Test suite exists: ${file}`, () => {
      if (!existsSync(join(__dirname, file))) {
        throw new Error(`Missing: ${file}`);
      }
    });
  }

  // Summary
  console.log(`\n${passed} passed, ${failed} failed`);

  if (failed > 0) {
    console.log('\nFailures:');
    for (const { error, name } of failures) {
      console.log(`  - ${name}: ${error}`);
    }
    process.exit(1);
  } else {
    console.log('\n✅ All validations passed!');
    console.log('\n🎉 Project is ready for production!');
    process.exit(0);
  }
}

validateAll().catch((error) => {
  console.error('Validation error:', error);
  process.exit(1);
});
