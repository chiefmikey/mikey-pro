import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { format } from 'prettier';
import { describe, expect, it } from 'vitest';

import prettierConfigModule from '../.prettierrc.js';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');
const testFilesDir = join(rootDir, 'test-files');
const prettierConfig = prettierConfigModule.default || prettierConfigModule;

describe('End-to-End Integration Tests', () => {
  describe('JavaScript + TypeScript Workflow', () => {
    it('should lint and format JavaScript files in sequence', async () => {
      const configPath = join(rootDir, 'eslint.config.js');
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.js');

      // Lint
      const lintResults = await eslint.lintFiles([testFile]);

      expect(lintResults.length).toBeGreaterThan(0);

      const fatalErrors = lintResults[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);

      // Format
      const content = readFileSync(testFile, 'utf-8');
      const formatted = await format(content, {
        ...prettierConfig,
        parser: 'babel',
      });

      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
    });

    it('should lint and format TypeScript files in sequence', async () => {
      const configPath = join(rootDir, 'eslint.config.js');
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.ts');

      // Lint
      const lintResults = await eslint.lintFiles([testFile]);

      expect(lintResults.length).toBeGreaterThan(0);

      const fatalErrors = lintResults[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);

      // Format
      const content = readFileSync(testFile, 'utf-8');
      const formatted = await format(content, {
        ...prettierConfig,
        parser: 'typescript',
      });

      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
    });
  });

  describe('Framework-Specific Workflows', () => {
    it('should lint React files without breaking', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-react',
        'index.js',
      );
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test-react.jsx');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });

    it('should lint Vue files without breaking', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-vue',
        'index.js',
      );
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test-vue.vue');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });

    it('should lint Svelte files without breaking', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-svelte',
        'index.js',
      );
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test-svelte.svelte');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });

    it('should lint Angular files without breaking', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-angular',
        'index.js',
      );
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test-angular.ts');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('Multiple File Types Workflow', () => {
    it('should handle multiple file types in one linting session', async () => {
      const configPath = join(rootDir, 'eslint.config.js');
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFiles = [
        join(testFilesDir, 'test.js'),
        join(testFilesDir, 'test.ts'),
        join(testFilesDir, 'test.json'),
        join(testFilesDir, 'test.yaml'),
        join(testFilesDir, 'test.md'),
      ];
      const results = await eslint.lintFiles(testFiles);

      expect(results.length).toBe(testFiles.length);

      for (const result of results) {
        const fatalErrors = result.messages.filter((m) => m.fatal);

        expect(fatalErrors.length).toBe(0);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid file paths gracefully', async () => {
      const configPath = join(rootDir, 'eslint.config.js');
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const invalidFile = join(testFilesDir, 'nonexistent.js');
      const results = await eslint.lintFiles([invalidFile]);

      // Should return empty results or handle gracefully
      expect(Array.isArray(results)).toBe(true);
    });
  });
});

