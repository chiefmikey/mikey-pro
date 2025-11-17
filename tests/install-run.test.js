#!/usr/bin/env node
/**
 * Install/Run Test - Simulates real-world usage after npm install
 *
 * This test verifies that the configs work correctly when used
 * as installed npm packages in a real project scenario.
 *
 * It simulates:
 * 1. Installing the package (using file: protocol as local package)
 * 2. Creating an eslint.config.js that imports the package
 * 3. Running ESLint and Prettier as a user would
 * 4. Verifying linting and formatting work correctly
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { format } from 'prettier';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');
const testFilesDir = join(rootDir, 'test-files');

// Create a temporary test project directory
const testProjectDir = join(rootDir, '.test-project');

describe('Install/Run Tests - Real Project Simulation', () => {
  beforeAll(() => {
    // Create test project directory
    mkdirSync(testProjectDir, { recursive: true });
  });

  afterAll(() => {
    // Clean up test project directory
    rmSync(testProjectDir, { force: true, recursive: true });
  });

  describe('Core Config - Basic Usage', () => {
    it('should work when imported as npm package in eslint.config.js', async () => {
      // Create eslint.config.js as a user would
      const eslintConfigContent = `export { default } from '@mikey-pro/eslint-config';`;
      const eslintConfigPath = join(testProjectDir, 'eslint.config.js');
      writeFileSync(eslintConfigPath, eslintConfigContent);

      // Create a test file to lint
      const testFileContent = `const x = 1;
const y = 2;
console.log(x + y);
`;
      const testFilePath = join(testProjectDir, 'test.js');
      writeFileSync(testFilePath, testFileContent);

      // Use ESLint with the config (simulating user running: npx eslint .)
      const eslint = new ESLint({
        cwd: testProjectDir,
        overrideConfigFile: eslintConfigPath,
      });

      const results = await eslint.lintFiles([testFilePath]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });

    it('should lint and format files correctly in a project', async () => {
      // Create eslint.config.js
      const eslintConfigPath = join(testProjectDir, 'eslint.config.js');
      writeFileSync(
        eslintConfigPath,
        `export { default } from '@mikey-pro/eslint-config';`,
      );

      // Create a messy test file
      const messyFile = `const a=1;const b=2;console.log(a+b);
`;
      const testFilePath = join(testProjectDir, 'messy.js');
      writeFileSync(testFilePath, messyFile);

      // Lint the file
      const eslint = new ESLint({
        cwd: testProjectDir,
        overrideConfigFile: eslintConfigPath,
      });
      const lintResults = await eslint.lintFiles([testFilePath]);

      expect(lintResults.length).toBeGreaterThan(0);
      expect(lintResults[0].messages.filter((m) => m.fatal).length).toBe(0);

      // Format the file with Prettier
      const prettierConfig = (await import(join(rootDir, '.prettierrc.js')))
        .default;
      const formatted = await format(messyFile, {
        ...prettierConfig,
        parser: 'babel',
      });

      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
      expect(formatted).not.toBe(messyFile); // Should have changed
    });
  });

  describe('React Config - Framework Usage', () => {
    it('should work when imported in a React project', async () => {
      // Create eslint.config.js for React project
      const eslintConfigPath = join(testProjectDir, 'eslint.config.js');
      writeFileSync(
        eslintConfigPath,
        `export { default } from '@mikey-pro/eslint-config-react';`,
      );

      // Create a React test file
      const reactFile = `import React from 'react';

function Component() {
  return <div>Hello</div>;
}

export default Component;
`;
      const testFilePath = join(testProjectDir, 'Component.jsx');
      writeFileSync(testFilePath, reactFile);

      // Lint the React file
      const eslint = new ESLint({
        cwd: testProjectDir,
        overrideConfigFile: eslintConfigPath,
      });
      const results = await eslint.lintFiles([testFilePath]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('Vue Config - Framework Usage', () => {
    it('should work when imported in a Vue project', async () => {
      // Create eslint.config.js for Vue project
      const eslintConfigPath = join(testProjectDir, 'eslint.config.js');
      writeFileSync(
        eslintConfigPath,
        `export { default } from '@mikey-pro/eslint-config-vue';`,
      );

      // Create a Vue test file
      const vueFile = `<template>
  <div>Hello</div>
</template>

<script setup>
const message = 'Hello Vue';
</script>
`;
      const testFilePath = join(testProjectDir, 'Component.vue');
      writeFileSync(testFilePath, vueFile);

      // Lint the Vue file
      const eslint = new ESLint({
        cwd: testProjectDir,
        overrideConfigFile: eslintConfigPath,
      });
      const results = await eslint.lintFiles([testFilePath]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('TypeScript Config - Language Usage', () => {
    it('should lint TypeScript files correctly', async () => {
      // Create eslint.config.js
      const eslintConfigPath = join(testProjectDir, 'eslint.config.js');
      writeFileSync(
        eslintConfigPath,
        `export { default } from '@mikey-pro/eslint-config';`,
      );

      // Create a TypeScript test file
      const tsFile = `interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'John',
  age: 30,
};

console.log(user);
`;
      const testFilePath = join(testProjectDir, 'user.ts');
      writeFileSync(testFilePath, tsFile);

      // Lint the TypeScript file
      const eslint = new ESLint({
        cwd: testProjectDir,
        overrideConfigFile: eslintConfigPath,
      });
      const results = await eslint.lintFiles([testFilePath]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });

    it('should format TypeScript files correctly', async () => {
      // Create a messy TypeScript file
      const messyTs = `interface User{name:string;age:number}const user:User={name:'John',age:30};
`;
      const testFilePath = join(testProjectDir, 'messy.ts');
      writeFileSync(testFilePath, messyTs);

      // Format with Prettier
      const prettierConfig = (await import(join(rootDir, '.prettierrc.js')))
        .default;
      const formatted = await format(messyTs, {
        ...prettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
      expect(formatted).not.toBe(messyTs); // Should have changed
    });
  });

  describe('Multiple Files - Real Project Scenario', () => {
    it('should lint multiple files in a project structure', async () => {
      // Create eslint.config.js
      const eslintConfigPath = join(testProjectDir, 'eslint.config.js');
      writeFileSync(
        eslintConfigPath,
        `export { default } from '@mikey-pro/eslint-config';`,
      );

      // Create multiple test files
      const files = [
        { content: 'export const x = 1;', path: 'src/index.js' },
        {
          content: 'export function add(a, b) { return a + b; }',
          path: 'src/utils.js',
        },
        { content: 'const test = true;', path: 'test.js' },
      ];

      for (const file of files) {
        const filePath = join(testProjectDir, file.path);
        mkdirSync(dirname(filePath), { recursive: true });
        writeFileSync(filePath, file.content);
      }

      // Lint all files
      const eslint = new ESLint({
        cwd: testProjectDir,
        overrideConfigFile: eslintConfigPath,
      });
      const results = await eslint.lintFiles(['**/*.js']);

      expect(results.length).toBeGreaterThanOrEqual(files.length);

      // All files should lint without fatal errors
      for (const result of results) {
        const fatalErrors = result.messages.filter((m) => m.fatal);

        expect(fatalErrors.length).toBe(0);
      }
    });
  });

  describe('Configuration Validation', () => {
    it('should load config correctly when used as installed package', async () => {
      // Simulate importing the config as a user would
      const coreConfig = await import(
        join(rootDir, 'style-guide', 'eslint-config', 'index.js')
      );

      expect(coreConfig.default).toBeDefined();
      expect(Array.isArray(coreConfig.default)).toBe(true);

      // Verify it can be used in ESLint
      const eslint = new ESLint({
        overrideConfigFile: join(
          rootDir,
          'style-guide',
          'eslint-config',
          'index.js',
        ),
      });

      // Should be able to create ESLint instance without errors
      expect(eslint).toBeDefined();
    });
  });
});
