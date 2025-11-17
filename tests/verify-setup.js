#!/usr/bin/env node
/**
 * Quick verification script to check test setup without running full test suite
 * Run with: node tests/verify-setup.js
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');

console.log('Verifying test setup...\n');

const checks = [
  {
    check: () => existsSync(__dirname),
    name: 'Test directory exists',
  },
  {
    check: () => existsSync(join(__dirname, 'configs.test.js')),
    name: 'Config tests exist',
  },
  {
    check: () => existsSync(join(__dirname, 'linting.test.js')),
    name: 'Linting tests exist',
  },
  {
    check: () => existsSync(join(__dirname, 'formatting.test.js')),
    name: 'Formatting tests exist',
  },
  {
    check: () => existsSync(join(__dirname, 'integration.test.js')),
    name: 'Integration tests exist',
  },
  {
    check: () => existsSync(join(rootDir, 'vitest.config.js')),
    name: 'Vitest config exists',
  },
  {
    check: () => existsSync(join(rootDir, 'test-files')),
    name: 'Test files directory exists',
  },
  {
    check: async () => {
      try {
        const config = await import(
          join(rootDir, 'style-guide', 'eslint-config', 'index.js')
        );
        return config.default && Array.isArray(config.default);
      } catch {
        return false;
      }
    },
    name: 'Core config can be imported',
  },
];

let passed = 0;
let failed = 0;

for (const { check, name } of checks) {
  try {
    const result = await check();
    if (result) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('\n✅ Test setup verified successfully!');
  process.exit(0);
} else {
  console.log('\n❌ Some checks failed');
  process.exit(1);
}
