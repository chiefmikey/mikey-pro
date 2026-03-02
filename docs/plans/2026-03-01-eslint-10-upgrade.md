# Plan: ESLint 10 Upgrade & Elite Quality

_Status: COMPLETED_
_LastCompletedStep: 8_
_TotalSteps: 8_
_Created: 2026-03-01_
_Completed: 2026-03-02_

## Objective

Upgrade mikey-pro from ESLint ^9.35.0 to ESLint ^10.0.0, replace dead/incompatible plugins, adopt modern config patterns, and make this the elite ESLint config package.

## Steps

### Step 1: Replace Dead Plugins

Remove dead/unmaintained plugins and replace with modern alternatives:

- **Drop `eslint-plugin-filenames`** (dead since 2018) → Replace with `eslint-plugin-check-file`
- **Drop `eslint-plugin-css-modules`** (NOT MAINTAINED) → Replace with `@css-modules-kit/eslint-plugin`
- **Drop `eslint-plugin-optimize-regex`** (dead since 2021) → Already have `eslint-plugin-regexp` which is superior
- **Drop `eslint-plugin-write-good-comments`** (dead since 2023) → No replacement needed, `write-good` analysis is niche
- **Drop `eslint-config-react-app-bump`** (CRA ecosystem dead, locked to ESLint 8) → Already using plugins directly
- **Drop `eslint-plugin-shell`** (v0.0.1, immature, peer dep blocks ESLint 10) → Shell linting is out of scope for ESLint

**Files:** `configs/eslint-config/package.json`, `configs/eslint-config/base-config.js`, `configs/eslint-config/overrides.js`, `configs/eslint-config-react/package.json`, `configs/eslint-config-react/index.js`

**Verify:** `cd configs/eslint-config && npm install` succeeds, no import errors

### Step 2: Migrate eslint-plugin-import to eslint-plugin-import-x

Replace the legacy `eslint-plugin-import` (doesn't support ESLint 10) with `eslint-plugin-import-x`:

- Remove `eslint-plugin-import` from peer dependencies
- Add `eslint-plugin-import-x` as direct dependency
- Update all import rule references (most rules have same names with `import-x/` prefix)
- Update resolver configuration to use `unrs-resolver` (Rust-based, faster)
- Remove `eslint-import-resolver-typescript` if import-x's built-in resolver handles it

**Files:** `configs/eslint-config/package.json`, `configs/eslint-config/base-config.js`, `configs/eslint-config/rules.js`, root `package.json`

**Verify:** `npm run eslint` works, import rules fire correctly on test files

### Step 3: Upgrade ESLint to v10 and Bump All Plugin Versions

- `eslint` → `^10.0.0`
- `@eslint/js` → `^10.0.0`
- `eslint-plugin-compat` → `^7.0.0` (major bump, ESLint 10 peer dep)
- `eslint-plugin-sort-destructure-keys` → `^3.0.0` (major bump)
- `eslint-plugin-cypress` → `^6.1.0` (major bump)
- `@eslint/markdown` → `^7.5.1` (major bump)
- `eslint-plugin-no-secrets` → `^2.3.3`
- `eslint-plugin-only-warn` → `^1.2.1`
- `eslint-plugin-boundaries` → `^5.4.0`
- `eslint-plugin-prettier` → `^5.5.5`
- `@typescript-eslint/parser` → `^8.56.0`
- `@typescript-eslint/eslint-plugin` → `^8.56.0`
- `eslint-plugin-unicorn` → `^62.0.0` (fix version mismatch)
- Update engine requirements: `node: ">=20.19.0"`
- Update all framework config package.json engine fields too

**Files:** All 9+ package.json files, `configs/eslint-config/base-config.js`

**Verify:** `npm run npm:install` succeeds for all packages, `npm run eslint` works

### Step 4: Adopt Modern ESLint 10 Patterns

- Use `defineConfig()` from `eslint/config` for the main config export
- Use `globalIgnores()` for the ignores pattern
- Add TypeScript type declarations using `defineConfig()` types
- Keep backward compatibility — consumers can still spread the array

**Files:** `configs/eslint-config/index.js`, `configs/eslint-config/flat.js`, framework config index.js files

**Verify:** `npm test` passes, config loads correctly in ESLint 10

### Step 5: Clean Up Architecture Issues

- Resolve `rules.js` / `base-config.js` rule duplication — `rules.js` should be the single source of truth imported by `base-config.js`
- Fix the unicorn version mismatch between root and config package.json
- Remove stale dependencies from root package.json that are already in config packages
- Clean up overrides.js — remove `shellConfig` and `envFilesConfig` (shell plugin dropped)
- Ensure `overrides.js` exports are consistent

**Files:** `configs/eslint-config/base-config.js`, `configs/eslint-config/rules.js`, `configs/eslint-config/overrides.js`, root `package.json`

**Verify:** `npm run eslint` passes, `npm test` passes

### Step 6: Update Tests for ESLint 10

- Update test expectations for ESLint 10 behavior changes
- Remove tests for dropped plugins (shell, filenames, css-modules)
- Add tests for new plugins (check-file, import-x)
- Verify all 16 test fixture files still work
- Update file-types.test.js for removed shell/env overrides

**Files:** All files in `tests/`

**Verify:** `npm test` passes with 0 failures

### Step 7: Update CI/CD and Documentation

- Update CI matrix Node.js versions (ensure >=20.19.0)
- Update `ci-local.sh` peer dependency installation
- Update `README.md` with ESLint 10 usage, new plugin list
- Update CLAUDE.md with current state

**Files:** `.github/workflows/*.yml`, `scripts/ci-local.sh`, `README.md`, `CLAUDE.md`

**Verify:** `npm run ci:local` passes (or at least the non-publish steps)

### Step 8: Final Verification and Version Bump

- Run full test suite: `npm test`
- Run linter: `npm run eslint`
- Run validation: `npm run test:validate`
- Dry-run publish all packages
- Bump version to 10.0.0 (major bump matching ESLint major)
- Commit all changes

**Verify:** All tests pass, lint passes, dry-run publish succeeds for all packages

## Verification Plan

- [ ] `npm run npm:install` — all packages install cleanly
- [ ] `npm test` — full Vitest suite passes
- [ ] `npm run eslint` — lints itself with zero errors
- [ ] `npm run test:validate` — validation checks pass
- [ ] All 16 test fixture files lint without fatal errors
- [ ] Each framework config loads without errors
- [ ] Dry-run `npm publish --dry-run` succeeds for all packages

## Risks

1. **Plugin compatibility cascade**: Upgrading ESLint 10 may surface hidden incompatibilities in plugins that claim support but haven't been thoroughly tested
2. **import-x rule name differences**: Some rules may have different names or behavior than eslint-plugin-import
3. **defineConfig() backward compatibility**: Consumers expecting raw arrays may need to adjust
4. **Major version bumps** (compat v7, sort-destructure-keys v3, cypress v6, markdown v7) may have breaking API changes

## Execution Journal

_(Updated as steps complete)_
