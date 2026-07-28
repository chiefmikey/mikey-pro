import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { format } from 'prettier';
import { describe, expect, it } from 'vitest';

import prettierConfigModule from '@mikey-pro/prettier-config';
import mikeyProConfig from '../configs/eslint-config/index.js';
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

/**
 * Regression guard for the defect fixed in 10.3.5.
 *
 * The tests above call the Prettier API directly with an explicit parser, so
 * they prove Prettier works — not that ESLint invokes it correctly. The
 * `prettier/prettier` rule does NOT infer a parser from the file extension: it
 * used the base config's `parser: 'babel'` for TypeScript, so any TS-only syntax
 * produced `Parsing error: Unexpected token` instead of a formatting comparison.
 *
 * That failure was a WARNING, so `eslint .` still exited 0 and Prettier
 * formatting was silently unenforced on every TypeScript file in every consumer
 * project.
 *
 * These assert the resolved parser per extension rather than linting real TS
 * text: the `ts` override sets `project: true`, so any real TS lint here builds
 * a full TypeScript program (~40s) and starves the other suites' workers. The
 * end-to-end behaviour is covered by `tests/consumer-simulation.test.js`.
 *
 * If a new file extension is added to the base `files` glob, add it here too.
 */
describe('prettier/prettier parser resolution', () => {
  // Bypass the repo's own eslint.config.js — it ignores test-files/ because most
  // fixtures there are intentionally invalid.
  const createLinter = () =>
    new ESLint({
      baseConfig: mikeyProConfig,
      cwd: rootDir,
      overrideConfigFile: true,
    });

  it.each([
    ['src/example.ts', 'typescript'],
    ['src/example.tsx', 'typescript'],
    ['src/example.mts', 'typescript'],
    ['src/example.cts', 'typescript'],
    ['src/example.js', 'babel'],
    ['src/example.jsx', 'babel'],
    ['src/example.css', 'css'],
    ['src/example.scss', 'scss'],
  ])('resolves %s to the %s parser', async (file, expectedParser) => {
    const config = await createLinter().calculateConfigForFile(
      join(rootDir, file),
    );

    expect(config.rules['prettier/prettier'][1].parser).toBe(expectedParser);
  });

  it('formats TypeScript-only syntax that a Babel parser rejects', async () => {
    const typeScriptOnlySource = [
      'import type {',
      '  Alpha,',
      '  Beta,',
      "} from './types.js';",
      '',
      'export type Both = Alpha | Beta;',
      '',
      'export const pick = (a: Alpha): Alpha => a;',
      '',
    ].join('\n');

    // The parser the config resolves for .ts must handle this source. Under the
    // old `parser: 'babel'` this call throws, which is what the rule surfaced as
    // "Parsing error: Unexpected token, expected \"from\"".
    const formatted = await format(typeScriptOnlySource, {
      ...prettierConfig,
      parser: 'typescript',
    });

    expect(formatted).toContain('import type {');
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
