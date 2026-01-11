import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { format } from 'prettier';
import { describe, expect, it } from 'vitest';

import prettierConfigModule from '../.prettierrc.js';
const prettierConfig = prettierConfigModule.default || prettierConfigModule;

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');
const testFilesDir = join(rootDir, 'test-files');

describe('Prettier Formatting', () => {
  it('should format JavaScript files without errors', async () => {
    const testFile = join(testFilesDir, 'test.js');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'babel',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should format TypeScript files without errors', async () => {
    const testFile = join(testFilesDir, 'test.ts');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'typescript',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should format JSON files without errors', async () => {
    const testFile = join(testFilesDir, 'test.json');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'json',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should format CSS files without errors', async () => {
    const testFile = join(testFilesDir, 'test.css');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'css',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should format SCSS files without errors', async () => {
    const testFile = join(testFilesDir, 'test.scss');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'scss',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should format Markdown files without errors', async () => {
    const testFile = join(testFilesDir, 'test.md');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'markdown',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should format YAML files without errors', async () => {
    const testFile = join(testFilesDir, 'test.yaml');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'yaml',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });

  it('should format HTML files without errors', async () => {
    const testFile = join(testFilesDir, 'test.html');
    const content = readFileSync(testFile, 'utf-8');
    const formatted = await format(content, {
      ...prettierConfig,
      parser: 'html',
    });

    expect(formatted).toBeDefined();
    expect(typeof formatted).toBe('string');
  });
});

describe('Prettier Configuration', () => {
  it('should load Prettier config without errors', () => {
    expect(prettierConfig).toBeDefined();
    expect(typeof prettierConfig).toBe('object');
  });

  it('should have required Prettier options', () => {
    expect(prettierConfig.singleQuote).toBeDefined();
    expect(prettierConfig.semi).toBeDefined();
    expect(prettierConfig.tabWidth).toBeDefined();
    expect(prettierConfig.trailingComma).toBeDefined();
  });
});
