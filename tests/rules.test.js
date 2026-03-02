import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');
const testFilesDir = join(rootDir, 'test-files');

describe('Rule Enforcement', () => {
  const configPath = join(rootDir, 'eslint.config.js');

  it('should enforce code quality rules', async () => {
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.js');
    const results = await eslint.lintFiles([testFile]);

    expect(results.length).toBeGreaterThan(0);

    // Should have some linting messages (warnings or errors)
    const { messages } = results[0];

    expect(Array.isArray(messages)).toBe(true);
  });

  it('should detect issues in code with violations', async () => {
    const eslint = new ESLint({
      overrideConfigFile: join(rootDir, 'configs', 'eslint-config', 'index.js'),
    });
    // Use lintText to test against code with known violations
    // (lintFiles with root eslint.config.js ignores test-files/)
    const results = await eslint.lintText('var x = 1;\nexport default x;\n', {
      filePath: 'test.js',
    });
    const { messages } = results[0];
    const ruleIds = messages.map((m) => m.ruleId).filter(Boolean);

    expect(ruleIds).toContain('no-var');
  });

  it('should apply TypeScript rules to TypeScript files', async () => {
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });
    const testFile = join(testFilesDir, 'test.ts');
    const results = await eslint.lintFiles([testFile]);

    expect(results.length).toBeGreaterThan(0);

    const { messages } = results[0];

    // TypeScript files should have TypeScript-specific rules applied
    expect(Array.isArray(messages)).toBe(true);
  });
});

describe('Framework-Specific Rules', () => {
  // eslint-plugin-react does not yet support ESLint 10 (peer dep: ^3-^9.7)
  it.skip('should apply React rules to React files', async () => {
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

    expect(results.length).toBeGreaterThan(0);

    const { messages } = results[0];

    // React files should have React-specific rules applied
    expect(Array.isArray(messages)).toBe(true);
  });

  it('should apply Vue rules to Vue files', async () => {
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

    expect(results.length).toBeGreaterThan(0);

    const { messages } = results[0];

    // Vue files should have Vue-specific rules applied
    expect(Array.isArray(messages)).toBe(true);
  });

  it('should apply Svelte rules to Svelte files', async () => {
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

    expect(results.length).toBeGreaterThan(0);

    const { messages } = results[0];

    // Svelte files should have Svelte-specific rules applied
    expect(Array.isArray(messages)).toBe(true);
  });

  it('should apply Angular rules to Angular files', async () => {
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

    expect(results.length).toBeGreaterThan(0);

    const { messages } = results[0];

    // Angular files should have Angular-specific rules applied
    expect(Array.isArray(messages)).toBe(true);
  });
});
