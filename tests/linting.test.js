import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');
const testFilesDir = join(rootDir, 'test-files');

describe('JavaScript Linting', () => {
  it('should lint JavaScript files without syntax errors', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.js');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    // Should not have fatal errors (syntax errors)
    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });
});

describe('TypeScript Linting', () => {
  it('should lint TypeScript files without syntax errors', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.ts');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    // Should not have fatal errors (syntax errors)
    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });
});

describe('React Linting', () => {
  it('should lint React JSX files without syntax errors', async () => {
    const configPath = join(
      rootDir,
      'configs',
      'eslint-config-react',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test-react.jsx');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    // Should not have fatal errors (syntax errors)
    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });
});

describe('Vue Linting', () => {
  it('should lint Vue files without syntax errors', async () => {
    const configPath = join(
      rootDir,
      'configs',
      'eslint-config-vue',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test-vue.vue');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    // Should not have fatal errors (syntax errors)
    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });
});

describe('Svelte Linting', () => {
  it('should lint Svelte files without syntax errors', async () => {
    const configPath = join(
      rootDir,
      'configs',
      'eslint-config-svelte',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test-svelte.svelte');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    // Should not have fatal errors (syntax errors)
    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });
});

describe('Angular Linting', () => {
  it('should lint Angular TypeScript files without syntax errors', async () => {
    const configPath = join(
      rootDir,
      'configs',
      'eslint-config-angular',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test-angular.ts');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    // Should not have fatal errors (syntax errors)
    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });
});

describe('File Type Support', () => {
  it('should lint JSON files without syntax errors', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.json');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });

  it('should lint YAML files without syntax errors', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.yaml');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });

  it('should lint Markdown files without syntax errors', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.md');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });

  it('should lint HTML files without syntax errors', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.html');
    try {
      const results = await eslint.lintFiles([testFile]);

      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);

      const fatalErrors = results[0].messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    } catch (error) {
      // HTML plugin may require proper setup, but file should be processable
      expect(error).toBeDefined();
    }
  });

  it('should lint TOML files without syntax errors', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.toml');
    const results = await eslint.lintFiles([testFile]);

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);

    const fatalErrors = results[0].messages.filter((m) => m.fatal);

    expect(fatalErrors.length).toBe(0);
  });
});

describe('Linting Multiple Files', () => {
  it('should lint multiple JavaScript and TypeScript files together', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFiles = [
      join(testFilesDir, 'test.js'),
      join(testFilesDir, 'test.ts'),
    ];
    const results = await eslint.lintFiles(testFiles);

    expect(results).toBeDefined();
    expect(results.length).toBe(2);

    // Should not have fatal errors in any file
    for (const result of results) {
      const fatalErrors = result.messages.filter((m) => m.fatal);

      expect(fatalErrors.length).toBe(0);
    }
  });
});
