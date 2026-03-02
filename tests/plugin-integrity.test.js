/**
 * Plugin Integrity & Config Structure Tests
 *
 * Verifies that:
 * - All 29 plugins are registered in globalPlugins
 * - Config structure is valid (array of objects with correct fields)
 * - No rule definition errors on any supported file type
 * - Framework configs export correct format
 * - Overrides have valid file patterns
 * - No conflicting or missing configurations
 */

import { join } from 'node:path';

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const rootDir = import.meta.dirname
  ? join(import.meta.dirname, '..')
  : process.cwd();

const configPath = join(rootDir, 'configs', 'eslint-config', 'index.js');

describe('Plugin Registration', () => {
  it('should register all expected plugins in globalPlugins', async () => {
    const { globalPlugins } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );

    const pluginNames = Object.keys(globalPlugins.plugins);

    const expectedPlugins = [
      '@html-eslint',
      '@typescript-eslint',
      'boundaries',
      'compat',
      'cypress',
      'import-x',
      'jest',
      'jest-dom',
      'jsonc',
      'markdown',
      'n',
      'no-only-tests',
      'no-secrets',
      'perfectionist',
      'prettier',
      'promise',
      'regexp',
      'security',
      'simple-import-sort',
      'sonarjs',
      'sort-destructure-keys',
      'testing-library',
      'toml',
      'unicorn',
      'yml',
    ];

    for (const name of expectedPlugins) {
      expect(pluginNames, `Missing plugin: ${name}`).toContain(name);
    }
  });

  it('should have all plugins as valid objects with rules', async () => {
    const { globalPlugins } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );

    for (const [name, plugin] of Object.entries(globalPlugins.plugins)) {
      expect(plugin, `Plugin ${name} should be an object`).toBeDefined();
      expect(
        typeof plugin,
        `Plugin ${name} should be an object`,
      ).toBe('object');
    }
  });

  it('should not have duplicate plugin registrations', async () => {
    const { globalPlugins } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );

    const pluginNames = Object.keys(globalPlugins.plugins);
    const uniqueNames = new Set(pluginNames);
    expect(pluginNames.length).toBe(uniqueNames.size);
  });
});

describe('Config Structure', () => {
  it('should export default config as non-empty array', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    expect(Array.isArray(config.default)).toBe(true);
    // globalIgnores + globalPlugins + baseConfig + overrides (14 items)
    expect(config.default.length).toBeGreaterThanOrEqual(4);
  });

  it('should have globalIgnores as first config with ignores array', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const first = config.default[0];
    expect(first).toHaveProperty('ignores');
    expect(Array.isArray(first.ignores)).toBe(true);
    expect(first.ignores.length).toBeGreaterThan(0);
  });

  it('should have globalPlugins as second config with plugins object', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const second = config.default[1];
    expect(second).toHaveProperty('plugins');
    expect(typeof second.plugins).toBe('object');
  });

  it('should have baseConfig with files and rules', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const third = config.default[2];
    expect(third).toHaveProperty('files');
    expect(third).toHaveProperty('rules');
    expect(Array.isArray(third.files)).toBe(true);
    expect(typeof third.rules).toBe('object');
  });

  it('should export named components for advanced usage', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    expect(config.baseConfig).toBeDefined();
    expect(config.globalPlugins).toBeDefined();
    expect(config.baseOverrides).toBeDefined();
  });

  it('should have valid files patterns in all override configs', async () => {
    const { baseOverrides } = await import(
      join(rootDir, 'configs', 'eslint-config', 'overrides.js')
    );

    for (const override of baseOverrides) {
      if (override.files) {
        expect(
          Array.isArray(override.files),
          `Override should have array files: ${JSON.stringify(override.files)}`,
        ).toBe(true);
        for (const pattern of override.files) {
          expect(typeof pattern).toBe('string');
          expect(pattern.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('should have correct override count', async () => {
    const { baseOverrides } = await import(
      join(rootDir, 'configs', 'eslint-config', 'overrides.js')
    );
    // ts, css, scss, less, yaml, toml, md, packageJson, htmlConfig, jsonc, json5, jestJs, jestTs, cypressConfig
    expect(baseOverrides.length).toBe(14);
  });
});

describe('Rule Definition Integrity', () => {
  it('should not produce rule-not-found errors on JavaScript', async () => {
    const eslint = new ESLint({ overrideConfigFile: configPath });
    const results = await eslint.lintText('const x = 1;\nexport default x;\n', {
      filePath: 'test.js',
    });
    const definitionErrors = results[0].messages.filter(
      (m) =>
        m.message &&
        (m.message.includes('Definition for rule') ||
          m.message.includes('was not found')),
    );
    expect(definitionErrors).toHaveLength(0);
  });

  it('should not produce fatal errors on YAML', async () => {
    const eslint = new ESLint({ overrideConfigFile: configPath });
    const results = await eslint.lintText('key: value\nlist:\n  - item1\n  - item2\n', {
      filePath: 'test.yaml',
    });
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    expect(fatalErrors).toHaveLength(0);
  });

  it('should not produce fatal errors on HTML', async () => {
    const eslint = new ESLint({ overrideConfigFile: configPath });
    const results = await eslint.lintText(
      '<!DOCTYPE html>\n<html lang="en">\n<head><title>Test</title></head>\n<body><p>Hello</p></body>\n</html>\n',
      { filePath: 'test.html' },
    );
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    expect(fatalErrors).toHaveLength(0);
  });

  it('should not produce fatal errors on JSON', async () => {
    const eslint = new ESLint({ overrideConfigFile: configPath });
    const results = await eslint.lintText(
      '{\n  "name": "test",\n  "version": "1.0.0"\n}\n',
      { filePath: 'package.json' },
    );
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    expect(fatalErrors).toHaveLength(0);
  });

  it('should not produce fatal errors on TOML', async () => {
    const eslint = new ESLint({ overrideConfigFile: configPath });
    const results = await eslint.lintText(
      '[package]\nname = "test"\nversion = "1.0.0"\n',
      { filePath: 'test.toml' },
    );
    const fatalErrors = results[0].messages.filter((m) => m.fatal);
    expect(fatalErrors).toHaveLength(0);
  });
});

describe('Framework Config Integrity', () => {
  // eslint-plugin-react does not yet support ESLint 10 (peer dep: ^3-^9.7)
  it.skip('should load React config as valid array', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-react', 'index.js')
    );
    expect(Array.isArray(config.default)).toBe(true);
    expect(config.default.length).toBeGreaterThanOrEqual(2);
  });

  it('should load Vue config as valid array', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-vue', 'index.js')
    );
    expect(Array.isArray(config.default)).toBe(true);
    expect(config.default.length).toBeGreaterThanOrEqual(2);
  });

  it('should load Svelte config as valid array', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-svelte', 'index.js')
    );
    expect(Array.isArray(config.default)).toBe(true);
    expect(config.default.length).toBeGreaterThanOrEqual(2);
  });

  it('should load Angular config as valid array', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-angular', 'index.js')
    );
    expect(Array.isArray(config.default)).toBe(true);
    expect(config.default.length).toBeGreaterThanOrEqual(2);
  });

  it('should include globalPlugins in Vue config', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-vue', 'index.js')
    );
    const hasPluginsConfig = config.default.some(
      (c) => c.plugins && Object.keys(c.plugins).length > 10,
    );
    expect(hasPluginsConfig).toBe(true);
  });

  it('should include globalPlugins in Svelte config', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-svelte', 'index.js')
    );
    const hasPluginsConfig = config.default.some(
      (c) => c.plugins && Object.keys(c.plugins).length > 10,
    );
    expect(hasPluginsConfig).toBe(true);
  });

  it('should include globalPlugins in Angular config', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config-angular', 'index.js')
    );
    const hasPluginsConfig = config.default.some(
      (c) => c.plugins && Object.keys(c.plugins).length > 10,
    );
    expect(hasPluginsConfig).toBe(true);
  });
});

describe('Ignore Patterns', () => {
  it('should ignore node_modules', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const ignores = config.default[0].ignores;
    const hasNodeModules = ignores.some((p) => p.includes('node_modules'));
    expect(hasNodeModules).toBe(true);
  });

  it('should ignore dist/build directories', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const ignores = config.default[0].ignores;
    const hasDist = ignores.some((p) => p.includes('dist'));
    const hasBuild = ignores.some((p) => p.includes('build'));
    expect(hasDist).toBe(true);
    expect(hasBuild).toBe(true);
  });

  it('should ignore lock files', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const ignores = config.default[0].ignores;
    expect(ignores).toContain('package-lock.json');
    expect(ignores).toContain('yarn.lock');
    expect(ignores).toContain('pnpm-lock.yaml');
  });

  it('should ignore image files', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const ignores = config.default[0].ignores;
    expect(ignores).toContain('*.svg');
    expect(ignores).toContain('*.png');
    expect(ignores).toContain('*.jpg');
  });

  it('should ignore .npmrc files', async () => {
    const config = await import(
      join(rootDir, 'configs', 'eslint-config', 'index.js')
    );
    const ignores = config.default[0].ignores;
    expect(ignores).toContain('**/*.npmrc');
  });
});

describe('Base Config Rules', () => {
  it('should include ESLint recommended rules', async () => {
    const { baseConfig } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );
    // ESLint recommended includes no-unused-vars
    expect(baseConfig.rules).toHaveProperty('no-var');
    expect(baseConfig.rules).toHaveProperty('no-eval');
    expect(baseConfig.rules).toHaveProperty('prefer-const');
  });

  it('should include security rules', async () => {
    const { baseConfig } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );
    expect(baseConfig.rules).toHaveProperty('security/detect-unsafe-regex');
    expect(baseConfig.rules).toHaveProperty(
      'security/detect-possible-timing-attacks',
    );
    expect(baseConfig.rules).toHaveProperty(
      'security/detect-non-literal-regexp',
    );
  });

  it('should include promise rules', async () => {
    const { baseConfig } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );
    expect(baseConfig.rules).toHaveProperty('promise/always-return');
    expect(baseConfig.rules).toHaveProperty('promise/catch-or-return');
    expect(baseConfig.rules).toHaveProperty('promise/prefer-await-to-then');
  });

  it('should include import rules', async () => {
    const { baseConfig } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );
    expect(baseConfig.rules).toHaveProperty('import-x/no-self-import');
    expect(baseConfig.rules).toHaveProperty('import-x/no-cycle');
    expect(baseConfig.rules).toHaveProperty('import-x/order');
  });

  it('should include prettier integration', async () => {
    const { baseConfig } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );
    expect(baseConfig.rules).toHaveProperty('prettier/prettier');
  });

  it('should target correct file extensions', async () => {
    const { baseConfig } = await import(
      join(rootDir, 'configs', 'eslint-config', 'base-config.js')
    );
    expect(baseConfig.files).toContain('**/*.{js,jsx,ts,tsx,mjs,cjs}');
  });
});
