import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ESLint } from 'eslint';

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

  it('should have prettier as a direct dependency of @mikey-pro/eslint-config', () => {
    // eslint-plugin-prettier uses synckit to run prettier in a worker thread.
    // If prettier is not installed, the synckit worker hangs indefinitely with
    // no error output, causing ESLint to freeze for all consumers.
    // prettier must be a direct dependency so npm installs it automatically.
    const pkgJsonPath = join(rootDir, 'configs', 'eslint-config', 'package.json');
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
    const deps = pkgJson.dependencies ?? {};

    expect(
      deps.prettier,
      'prettier must be in @mikey-pro/eslint-config dependencies — ' +
        'eslint-plugin-prettier requires it via synckit worker and hangs if missing',
    ).toBeDefined();
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

  it('should not use detect for react version (ESLint 10 removed getFilename)', () => {
    const content = readFileSync(
      join(rootDir, 'configs', 'eslint-config-react', 'index.js'),
      'utf8',
    );
    expect(content).not.toContain("version: 'detect'");
    expect(content).not.toContain('version: "detect"');
  });

  it('should have compatible peer dependency eslint ranges for all plugins', async () => {
    // Plugins that haven't updated their peerDependencies for ESLint 10 yet
    // but are verified to work correctly at runtime.
    const knownExceptions = new Set([
      'eslint-plugin-import-x', // peer: ^8.57.0 || ^9.0.0 — works on ESLint 10
      'eslint-plugin-jest-dom', // peer: ^6.8.0 || ^7.0.0 || ^8.0.0 || ^9.0.0 — works on ESLint 10
      'eslint-plugin-promise', // peer: ^7.0.0 || ^8.0.0 || ^9.0.0 — works on ESLint 10
      'eslint-plugin-sonarjs', // peer: ^8.0.0 || ^9.0.0 — works on ESLint 10
    ]);

    // Load semver — it is a transitive dependency available in root node_modules
    const semverMod = await import(
      join(rootDir, 'node_modules', 'semver', 'semver.js')
    );
    const semver = semverMod.default;

    const eslintConfigPkgJson = JSON.parse(
      readFileSync(
        join(rootDir, 'configs', 'eslint-config', 'package.json'),
        'utf8',
      ),
    );

    // Collect the ESLint plugin dependencies to check
    const allDeps = Object.keys(eslintConfigPkgJson.dependencies ?? {});
    const pluginsToCheck = allDeps.filter(
      (dep) =>
        dep.startsWith('eslint-plugin-') ||
        dep.startsWith('@html-eslint/eslint-plugin') ||
        dep.startsWith('@typescript-eslint/eslint-plugin'),
    );

    // Determine the installed ESLint version
    const eslintPkgJsonPath = join(
      rootDir,
      'configs',
      'eslint-config',
      'node_modules',
      'eslint',
      'package.json',
    );
    const eslintVersion = JSON.parse(readFileSync(eslintPkgJsonPath, 'utf8'))
      .version;

    const pluginNodeModulesDir = join(
      rootDir,
      'configs',
      'eslint-config',
      'node_modules',
    );

    for (const pluginName of pluginsToCheck) {
      const pluginPkgJsonPath = join(
        pluginNodeModulesDir,
        pluginName,
        'package.json',
      );

      if (!existsSync(pluginPkgJsonPath)) {
        // Plugin may be hoisted to root node_modules; skip if not found locally
        continue;
      }

      const pluginPkgJson = JSON.parse(readFileSync(pluginPkgJsonPath, 'utf8'));
      const peerEslintRange = pluginPkgJson.peerDependencies?.eslint;

      if (!peerEslintRange) {
        // No ESLint peer dep declared — nothing to check
        continue;
      }

      const satisfies = semver.satisfies(eslintVersion, peerEslintRange);

      if (!satisfies && knownExceptions.has(pluginName)) {
        // Known mismatch — log for visibility but do not fail
        console.warn(
          `[peer dep warning] ${pluginName} declares eslint peer "${peerEslintRange}" ` +
            `but ESLint ${eslintVersion} is installed. ` +
            `This plugin is a known exception and works correctly at runtime.`,
        );
        continue;
      }

      expect(
        satisfies,
        `${pluginName} peer dep "eslint": "${peerEslintRange}" is not satisfied by installed ESLint ${eslintVersion}`,
      ).toBe(true);
    }
  });

  it('should enforce noInlineConfig (inline disable comments should be reported)', async () => {
    // When noInlineConfig is true, eslint-disable comments are ignored by ESLint,
    // so the rules they attempt to suppress still fire.
    const eslint = new ESLint({
      overrideConfigFile: join(
        rootDir,
        'configs',
        'eslint-config',
        'index.js',
      ),
    });

    const results = await eslint.lintText(
      '/* eslint-disable no-var */\nvar x = 1;\nexport default x;\n',
      { filePath: 'test-noinline.js' },
    );

    // With noInlineConfig, the disable comment is ignored, so no-var still fires
    const noVarMessages = results[0].messages.filter(
      (m) => m.ruleId === 'no-var',
    );
    expect(noVarMessages.length).toBeGreaterThan(0);
  });
});
