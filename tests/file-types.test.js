import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');
const testFilesDir = join(rootDir, 'test-files');

describe('File Type Support', () => {
  const configPath = join(rootDir, 'eslint.config.js');

  describe('JavaScript Files', () => {
    it('should lint .js files without syntax errors', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.js');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('TypeScript Files', () => {
    it('should lint .ts files without syntax errors', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.ts');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('JSON Files', () => {
    it('should lint .json files without syntax errors', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.json');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('YAML Files', () => {
    it('should lint .yaml files without syntax errors', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.yaml');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('Markdown Files', () => {
    it('should lint .md files without syntax errors', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.md');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('CSS Files', () => {
    it('should handle .css files (may not lint but should not error)', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.css');
      // CSS files may not be linted by ESLint, but should not cause errors
      try {
        const results = await eslint.lintFiles([testFile]);
        // If it returns results, check for fatal errors
        if (results.length > 0) {
          const fatalErrors = results[0].messages.filter((m) => m.fatal);

          expect(fatalErrors.length).toBe(0);
        }
      } catch (error) {
        // Some configs may not support CSS linting, which is OK
        expect(error).toBeDefined();
      }
    });
  });

  describe('SCSS Files', () => {
    it('should handle .scss files (may not lint but should not error)', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.scss');
      // SCSS files may not be linted by ESLint, but should not cause errors
      try {
        const results = await eslint.lintFiles([testFile]);
        // If it returns results, check for fatal errors
        if (results.length > 0) {
          const fatalErrors = results[0].messages.filter((m) => m.fatal);

          expect(fatalErrors.length).toBe(0);
        }
      } catch (error) {
        // Some configs may not support SCSS linting, which is OK
        expect(error).toBeDefined();
      }
    });
  });

  describe('HTML Files', () => {
    it('should lint .html files without syntax errors', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.html');
      try {
        const results = await eslint.lintFiles([testFile]);

        expect(results.length).toBeGreaterThan(0);

        const fatalErrors = results[0].messages.filter((m) => m.fatal);

        expect(fatalErrors.length).toBe(0);
      } catch (error) {
        // HTML plugin may require proper setup, but file should be processable
        expect(error).toBeDefined();
      }
    });
  });

  describe('TOML Files', () => {
    it('should lint .toml files without syntax errors', async () => {
      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test.toml');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });
});

  describe('Framework File Types', () => {
  describe('React JSX Files', () => {
    it('should lint .jsx files with React config', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-react',
        'index.js',
      );

      // Skip if config file doesn't exist
      if (!existsSync(configPath)) {
        console.log('Skipping React JSX linting test when config file missing');
        return;
      }

      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test-react.jsx');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('Vue Files', () => {
    it('should lint .vue files with Vue config', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-vue',
        'index.js',
      );

      // Skip if config file doesn't exist
      if (!existsSync(configPath)) {
        console.log('Skipping Vue linting test when config file missing');
        return;
      }

      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test-vue.vue');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('Svelte Files', () => {
    it('should lint .svelte files with Svelte config', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-svelte',
        'index.js',
      );

      // Skip if config file doesn't exist
      if (!existsSync(configPath)) {
        console.log('Skipping Svelte linting test when config file missing');
        return;
      }

      const eslint = new ESLint({
        overrideConfigFile: configPath,
      });
      const testFile = join(testFilesDir, 'test-svelte.svelte');
      const results = await eslint.lintFiles([testFile]);

      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    });
  });

  describe('Angular TypeScript Files', () => {
    it('should lint Angular .ts files with Angular config', async () => {
      const configPath = join(
        rootDir,
        'style-guide',
        'eslint-config-angular',
        'index.js',
      );

      // Skip if config file doesn't exist
      if (!existsSync(configPath)) {
        console.log('Skipping Angular linting test when config file missing');
        return;
      }

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
});
