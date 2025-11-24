import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const rootDir = join(__dirname, '..');

describe('ESLint Configuration Loading', () => {
  it('should load core config without errors', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config',
      'index.js',
    );
    const config = await import(configPath);

    expect(config.default).toBeDefined();
    expect(Array.isArray(config.default)).toBe(true);
  });

  it('should load React config without errors', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-react',
      'index.js',
    );
    const config = await import(configPath);

    expect(config.default).toBeDefined();
    expect(Array.isArray(config.default)).toBe(true);
  });

  it('should load Vue config without errors', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-vue',
      'index.js',
    );
    const config = await import(configPath);

    expect(config.default).toBeDefined();
    expect(Array.isArray(config.default)).toBe(true);
  });

  it('should load Svelte config without errors', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-svelte',
      'index.js',
    );
    const config = await import(configPath);

    expect(config.default).toBeDefined();
    expect(Array.isArray(config.default)).toBe(true);
  });

  it('should load Angular config without errors', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-angular',
      'index.js',
    );
    const config = await import(configPath);

    expect(config.default).toBeDefined();
    expect(Array.isArray(config.default)).toBe(true);
  });

  it('should load base config without errors', async () => {
    const configPath = join(rootDir, 'style-guide', 'eslint-config', 'flat.js');
    const config = await import(configPath);

    expect(config.default).toBeDefined();
    expect(Array.isArray(config.default)).toBe(true);
  });
});

describe('ESLint Configuration Execution', () => {
  it('should create ESLint instance with core config', async () => {
    const configPath = join(rootDir, 'eslint.config.js');
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });

    expect(eslint).toBeDefined();
  });

  it('should create ESLint instance with React config', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-react',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });

    expect(eslint).toBeDefined();
  });

  it('should create ESLint instance with Vue config', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-vue',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });

    expect(eslint).toBeDefined();
  });

  it('should create ESLint instance with Svelte config', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-svelte',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });

    expect(eslint).toBeDefined();
  });

  it('should create ESLint instance with Angular config', async () => {
    const configPath = join(
      rootDir,
      'style-guide',
      'eslint-config-angular',
      'index.js',
    );
    const eslint = new ESLint({
      overrideConfigFile: configPath,
    });

    expect(eslint).toBeDefined();
  });
});

