# Research: Latest ESLint vs Current Project Configuration

_Date: 2026-03-01_

## Overview

ESLint 10.0.0 was released February 6, 2026. This project currently pins ESLint `^9.35.0` across all packages. This document maps the gap between the current configuration and the latest ESLint ecosystem, including breaking changes, new features, and plugin compatibility.

## Current State

### Versions Pinned

| Package                            | Current Version                       | Latest Available     |
| ---------------------------------- | ------------------------------------- | -------------------- |
| `eslint`                           | `^9.35.0`                             | `10.0.0`             |
| `@eslint/js`                       | `^9.35.0`                             | Ships with ESLint 10 |
| `@typescript-eslint/parser`        | `^8.43.0`                             | `^8.56.1`            |
| `@typescript-eslint/eslint-plugin` | `^8.43.0`                             | `^8.56.1`            |
| `eslint-plugin-unicorn`            | `^61.0.2` (config) / `^62.0.0` (root) | Needs verification   |
| `@stylistic/eslint-plugin`         | `^5.3.1`                              | Needs verification   |
| `eslint-plugin-sonarjs`            | `^3.0.5`                              | Needs verification   |

### Config Architecture

The project uses ESLint 9 flat config correctly:

- **Entry point**: `configs/eslint-config/index.js` exports a flat config array
- **Structure**: `[ignoresObject, baseConfig, ...baseOverrides]`
- **Framework configs** extend by spreading `[ignoresObject, baseConfig, frameworkConfig, ...baseOverrides]`
- **30+ plugins** loaded in `base-config.js`
- **File-type overrides** in `overrides.js` (TypeScript, CSS, YAML, JSON, HTML, TOML, Shell, .env)
- **Modular exports**: consumers can import `./base-config`, `./rules`, `./overrides`, `./flat` individually

### Plugin Count

49 direct dependencies in `configs/eslint-config/package.json`, including:

- 24+ ESLint plugins
- Multiple parsers (TypeScript, Vue, Svelte, Angular, HTML, YAML, TOML, JSONC)
- Babel toolchain for legacy JS parsing

## ESLint 10.0.0 Breaking Changes — Impact Assessment

### High Impact

| Change                                | Current Code                        | Required Action                                                                                   |
| ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Node.js >= 20.19.0**                | `engines.node: ">=20.0.0"`          | Bump engine requirement to `>=20.19.0`                                                            |
| **eslintrc fully removed**            | Not used (already flat config)      | No action — already compliant                                                                     |
| **`eslint:recommended` updated**      | Uses `js.configs.recommended.rules` | Review new rules added to recommended set; some may conflict with existing overrides              |
| **Config lookup from file directory** | Currently works from CWD            | Monorepo behavior may change — each config in `configs/` could get its own lookup. Test carefully |

### Medium Impact

| Change                                                | Current Code                                                | Required Action                                                                                                                                                                    |
| ----------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plugin API removals**                               | 30+ third-party plugins                                     | Each plugin must be compatible with ESLint 10's removed context methods (`context.getSourceCode()` → `context.sourceCode`, etc.). Plugins using removed APIs will crash at runtime |
| **`@eslint/compat`**                                  | Not currently used                                          | May need to add as dependency if any plugins haven't updated                                                                                                                       |
| **`/* eslint-env */` comments trigger errors**        | `noInlineConfig: true` already set in base-config           | Minimal impact — inline config already blocked                                                                                                                                     |
| **SourceCode method removals**                        | Custom rules unlikely (this is a config package, not rules) | No custom rules to update                                                                                                                                                          |
| **`radix` rule changes**                              | Need to check if rule is configured                         | Verify current `radix` rule options                                                                                                                                                |
| **`no-shadow-restricted-names` reports `globalThis`** | Need to check                                               | May cause new warnings                                                                                                                                                             |

### Low Impact

| Change                                    | Details                                                |
| ----------------------------------------- | ------------------------------------------------------ |
| AST `Program` node range change           | Only affects custom rule authors, not config consumers |
| CLI flags removed (`--no-eslintrc`, etc.) | Project doesn't use any removed flags                  |
| `LegacyESLint` removed                    | Not used                                               |

## New ESLint Features Available

### `defineConfig()` (available since ESLint 9.x, March 2025)

```javascript
import { defineConfig } from 'eslint/config';
```

- Provides type safety and auto-flattening of config arrays
- The project currently exports raw arrays; could adopt `defineConfig()` for better DX
- Available in both ESLint 9 and 10

### `extends` property in config objects

```javascript
export default defineConfig({
  files: ['**/*.js'],
  extends: ['js/recommended', reactPlugin.configs.flat.recommended],
});
```

- Normalizes the inconsistent ways plugins expose flat configs
- Could simplify how framework configs compose base + framework rules

### `globalIgnores()`

```javascript
import { globalIgnores } from 'eslint/config';
export default defineConfig([globalIgnores(['dist', 'build'])]);
```

- Replaces the current pattern of a standalone `{ ignores: [...] }` object
- Clearer distinction between global and per-config ignores

### Multithreaded Linting (ESLint 9.34.0+)

- 30-300% performance improvement via parallel file linting
- Automatic — no config changes needed
- Already available in `^9.35.0`

### Official CSS Plugin (`@eslint/css`)

- Released February 2025
- Could replace the current Prettier-based CSS formatting in overrides
- Separate from stylelint — provides ESLint-native CSS linting

### Official HTML Plugin

- `html-eslint` became official in May 2025
- Already used in this project (`@html-eslint/eslint-plugin` + `@html-eslint/parser`)

## Plugin Compatibility Risks

### Known Risk Areas

These plugins are most likely to have compatibility issues with ESLint 10 due to using deprecated/removed APIs:

| Plugin                              | Risk Level | Reason                                           |
| ----------------------------------- | ---------- | ------------------------------------------------ |
| `eslint-plugin-shell`               | **High**   | Version `^0.0.1`, extremely low maintenance      |
| `eslint-plugin-filenames`           | **High**   | Version `^1.3.2`, legacy plugin                  |
| `eslint-plugin-css-modules`         | **Medium** | Version `^2.12.0`, niche plugin                  |
| `eslint-plugin-write-good-comments` | **Medium** | Version `^0.2.0`, low version number             |
| `eslint-plugin-optimize-regex`      | **Medium** | Version `^1.2.1`, may not be actively maintained |
| `eslint-plugin-no-secrets`          | **Medium** | Version `^2.2.1`                                 |
| `eslint-plugin-only-warn`           | **Low**    | Simple wrapper, likely compatible                |

### Known Safe Plugins

These are actively maintained and have confirmed ESLint 10 support:

- `@typescript-eslint/*` v8.x
- `eslint-plugin-unicorn`
- `eslint-plugin-sonarjs`
- `eslint-plugin-promise`
- `eslint-plugin-regexp`
- `eslint-plugin-perfectionist`
- `@stylistic/eslint-plugin`
- `eslint-plugin-vue`
- `eslint-plugin-svelte`
- `@angular-eslint/*`
- `eslint-plugin-jsonc`
- `eslint-plugin-yml`
- `eslint-plugin-toml`

## Test Coverage Observations

The project has solid test coverage for validating the upgrade:

- **7 test files** covering config loading, linting, formatting, integration, file types, rules, and install/run
- **~45 individual test cases** across all files
- **CI matrix** tests Node.js 25, 22, and 20
- **`install-run.test.js`** simulates real npm package usage — critical for verifying consumer experience post-upgrade
- **`validate-all.js`** and **`run-manual-tests.js`** provide fallback validation without vitest

Key gap: tests assert "no fatal errors" but don't assert specific rule behavior. A plugin that crashes on ESLint 10 would show up as a fatal error, which the tests would catch.

## CI/CD Observations

- **`ci.yml`**: Matrix tests on Node 25/22/20, runs manual tests + validation + vitest + per-config linting + dry-run publish
- **`code-quality.yml`**: Prettier format check, ESLint with `--max-warnings 0`, depcheck, package.json validation
- **`release.yml`**: Atomic version bumping across 9 package.json files via `scripts/bump-version.js`
- **`security.yml`**: Needs verification for relevant content

## Dependencies

### Internal Dependencies

- Framework configs (`eslint-config-react`, `-vue`, `-svelte`, `-angular`) depend on `eslint-config` via `file:` links in `configs/package.json`
- Root `eslint.config.js` imports directly from `./configs/eslint-config/index.js`
- Root `package.json` references published packages (`@mikey-pro/*`) as devDependencies

### External Dependencies Critical to ESLint 10 Migration

- `@eslint/compat` — needed if any plugin uses removed APIs
- `eslint-plugin-import` — peer dependency; `eslint-plugin-import` v2.x has known flat config issues; `eslint-plugin-import-x` is the community fork with better support
- `eslint-import-resolver-typescript` — needs ESLint 10 compatibility check

## Gotchas

1. **Version mismatch**: Root `package.json` pins `eslint-plugin-unicorn: ^62.0.0` while `configs/eslint-config/package.json` pins `^61.0.2`. This could cause resolution conflicts.

2. **`eslint-plugin-import` is problematic**: It's a peer dependency and has been slow to adopt flat config. The community fork `eslint-plugin-import-x` has better ESLint 9/10 support. Migration would be a significant change.

3. **`noInlineConfig: true`**: Set in base-config.js. This is aggressive — consumers cannot override any rules with inline comments. This is an intentional design choice but may surprise users.

4. **Babel parser still in use**: `@babel/eslint-parser` is loaded for JS files alongside TypeScript parser for TS files. With ESLint's native ES2025/2026 support, Babel parsing may be unnecessary for modern projects.

5. **Test timeout of 10s**: ESLint config loading tests need 10s timeout. This suggests the 30+ plugin initialization is heavy — worth noting for ESLint 10 where plugin loading behavior may change.

6. **`eslint-plugin-shell` at v0.0.1**: Extremely early version. Likely unmaintained and high risk for ESLint 10 breakage.

7. **Config lookup change in ESLint 10**: Config discovery starts from each linted file's directory. The `configs/` sub-packages each have their own directory structure — this could affect how configs are resolved when linting test files or sub-package files.

## Open Questions

1. **Which plugins have confirmed ESLint 10 compatibility?** The high-risk plugins (`shell`, `filenames`, `css-modules`, `write-good-comments`, `optimize-regex`) need individual verification against ESLint 10's removed APIs.

2. **Should `eslint-plugin-import` be replaced with `eslint-plugin-import-x`?** The original plugin has persistent flat config issues. The fork is actively maintained and ESLint 10-ready.

3. **Is Babel parsing still needed?** ESLint's native parser (Espree) now supports ES2025/2026. If the config targets modern JS only, `@babel/eslint-parser` and its dependencies could be dropped.

4. **How does the config lookup change affect monorepo consumers?** ESLint 10 searches for config from the file directory upward. This is positive for monorepos but needs testing with the `configs/` directory structure.

5. **Should `defineConfig()` be adopted?** It's available in ESLint 9.x already. Adopting it would improve type safety for TypeScript consumers and simplify the config composition pattern. The `extends` feature could significantly clean up how framework configs compose the base.

6. **What's the upgrade path?** Stay on ESLint 9 (stable, everything works) vs. upgrade to ESLint 10 (latest features, but plugin compatibility risks). The `^9.35.0` range won't auto-upgrade to 10 — it would be an intentional major version bump.
