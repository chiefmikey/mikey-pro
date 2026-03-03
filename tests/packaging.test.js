import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = join(import.meta.dirname, '..');

const eslintConfigPkgs = [
  'eslint-config',
  'eslint-config-react',
  'eslint-config-vue',
  'eslint-config-svelte',
  'eslint-config-angular',
];

const allPublishablePkgs = [
  'eslint-config',
  'eslint-config-react',
  'eslint-config-vue',
  'eslint-config-svelte',
  'eslint-config-angular',
  'prettier-config',
  'stylelint-config',
  'ruff-config',
];

const frameworkConfigs = [
  'eslint-config-react',
  'eslint-config-vue',
  'eslint-config-svelte',
  'eslint-config-angular',
];

describe('Packaging & Publishing', () => {
  it('should not use import.meta.dirname to construct relative paths in published config files', () => {
    const filesToCheck = [
      join(rootDir, 'configs', 'eslint-config', 'overrides.js'),
      join(rootDir, 'configs', 'eslint-config', 'base-config.js'),
    ];

    for (const filePath of filesToCheck) {
      const content = readFileSync(filePath, 'utf8');

      // import.meta.dirname combined with ../ path traversal breaks when the
      // config is installed in node_modules — the relative path escapes the package
      const hasDirnameThenTraversal =
        /import\.meta\.dirname[^;]*\.\.\//u.test(content) ||
        /join\(import\.meta\.dirname[^)]*,\s*['"][^'"]*\.\.\//u.test(content);

      expect(hasDirnameThenTraversal, `${filePath} uses import.meta.dirname with ../ traversal`).toBe(false);
    }
  });

  it('should not have file: references in dependencies of publishable packages', () => {
    for (const pkgName of allPublishablePkgs) {
      const pkgJsonPath = join(rootDir, 'configs', pkgName, 'package.json');
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));

      const deps = pkgJson.dependencies ?? {};
      const peerDeps = pkgJson.peerDependencies ?? {};

      const allDeps = { ...deps, ...peerDeps };

      for (const [name, version] of Object.entries(allDeps)) {
        expect(
          String(version).startsWith('file:'),
          `${pkgName}/package.json: dep "${name}" uses file: reference "${version}" — this breaks npm installs`,
        ).toBe(false);
      }
    }
  });

  it('should not use relative sibling package imports in framework configs', () => {
    for (const pkgName of frameworkConfigs) {
      const indexPath = join(rootDir, 'configs', pkgName, 'index.js');
      const content = readFileSync(indexPath, 'utf8');

      // Relative imports like ../eslint-config/ break when installed in node_modules
      // because the sibling package is not at that relative path
      const hasRelativeSiblingImport =
        content.includes("from '../eslint-config/") ||
        content.includes('from "../eslint-config/');

      expect(
        hasRelativeSiblingImport,
        `${pkgName}/index.js uses relative sibling import (../eslint-config/). Use @mikey-pro/eslint-config instead.`,
      ).toBe(false);
    }
  });

  it('should only export recognized Prettier options', async () => {
    const { getSupportInfo } = await import('prettier');
    const prettierConfigPath = join(rootDir, 'configs', 'prettier-config', 'index.js');
    const { default: prettierConfig } = await import(prettierConfigPath);

    const supportInfo = await getSupportInfo();
    const validOptionNames = new Set(supportInfo.options.map((opt) => opt.name));

    // These top-level keys are meta-keys, not Prettier formatting options
    const metaKeys = new Set(['overrides', 'plugins']);

    for (const key of Object.keys(prettierConfig)) {
      if (metaKeys.has(key)) {
        continue;
      }

      expect(
        validOptionNames.has(key),
        `Prettier config key "${key}" is not a recognized Prettier option`,
      ).toBe(true);
    }
  });

  it('should have consistent versions across all packages', () => {
    const versions = allPublishablePkgs.map((pkgName) => {
      const pkgJsonPath = join(rootDir, 'configs', pkgName, 'package.json');
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
      return { pkgName, version: pkgJson.version };
    });

    const firstVersion = versions[0].version;

    for (const { pkgName, version } of versions) {
      expect(
        version,
        `${pkgName} has version "${version}" but expected "${firstVersion}"`,
      ).toBe(firstVersion);
    }
  });

  it('should have correct eslint version in keywords', () => {
    for (const pkgName of eslintConfigPkgs) {
      const pkgJsonPath = join(rootDir, 'configs', pkgName, 'package.json');
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
      const keywords = pkgJson.keywords ?? [];

      expect(
        keywords.includes('eslint-10'),
        `${pkgName}/package.json keywords should contain "eslint-10"`,
      ).toBe(true);

      expect(
        keywords.includes('eslint-9'),
        `${pkgName}/package.json keywords should NOT contain "eslint-9" (stale version reference)`,
      ).toBe(false);
    }
  });
});
