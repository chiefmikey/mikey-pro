# Project CLAUDE.md - Mikey Pro

## Project Overview

Mikey Pro is an AI agent code quality guardrails suite — ESLint 10 flat config, Ruff config for Python, Prettier config, and Stylelint config. Designed to make Claude and other AI coding agents write better, safer, more maintainable code. The unscoped `mikey-pro` npm package is the unified base (ESLint + Prettier + Stylelint). Framework variants (`@mikey-pro/eslint-config-react`, `-vue`, `-svelte`, `-angular`) depend on `mikey-pro` transitively. Python guardrails are in `@mikey-pro/ruff-config` (npm) / `mikey-pro-ruff-config` (PyPI).

## Tech Stack

- **Language:** JavaScript (ESM modules, `"type": "module"`)
- **Runtime:** Node.js >= 20
- **Package Manager:** npm (`.npmrc` has `package-lock=false` for sub-packages)
- **Testing:** Vitest (v4) with V8 coverage
- **Linting:** ESLint 10 flat config (self-hosted — uses its own config)
- **Python Linting:** Ruff via `@mikey-pro/ruff-config` (also published to PyPI as `mikey-pro-ruff-config`)
- **Formatting:** Prettier via `@mikey-pro/prettier-config`
- **CSS Linting:** Stylelint via `@mikey-pro/stylelint-config`
- **CI/CD:** GitHub Actions (ci, code-quality, security, release, auto-merge)
- **TypeScript:** tsconfig for type checking (ES2022 target, strict mode), but source is plain JS

## Architecture

```
configs/                  # Published packages (each has own package.json + node_modules)
  eslint-config/          # @mikey-pro/eslint-config — core ESLint 10 flat config (25+ plugins)
  eslint-config-react/    # @mikey-pro/eslint-config-react — extends core + React rules
  eslint-config-vue/      # @mikey-pro/eslint-config-vue — extends core + Vue rules
  eslint-config-svelte/   # @mikey-pro/eslint-config-svelte — extends core + Svelte rules
  eslint-config-angular/  # @mikey-pro/eslint-config-angular — extends core + Angular rules
  prettier-config/        # @mikey-pro/prettier-config
  stylelint-config/       # @mikey-pro/stylelint-config
  ruff-config/            # @mikey-pro/ruff-config + mikey-pro-ruff-config (PyPI) — Python guardrails
  index.js                # mikey-pro entry point — re-exports ESLint flat config from eslint-config/
  package.json            # mikey-pro unified base package (ESLint + Prettier + Stylelint)
tests/                    # Vitest test suite
  plugin-integrity.test.js # Plugin registration & config structure tests
  violations.test.js      # Rule violation detection tests
  linting.test.js         # Linting behavior tests
  formatting.test.js      # Formatting tests
  integration.test.js     # Integration tests
  file-types.test.js      # File type handling tests
  install-run.test.js     # Installation/runtime tests
test-files/               # Sample files for testing linting rules
scripts/                  # Release & CI utilities
  bump-version.js         # Version bumping across all packages
  generate-release-notes.js
  ci-local.sh             # Local CI runner
theme/                    # @mikey-pro/theme package (separate)
.github/workflows/        # CI: ci.yml, code-quality.yml, security.yml, release.yml, auto-merge.yml
```

## Commands

```bash
npm test                  # Run Vitest test suite
npm run test:watch        # Vitest in watch mode
npm run test:coverage     # Vitest with V8 coverage
npm run test:validate     # Run validation checks (node tests/validate-all.js)
npm run eslint            # Lint all files with project's own config
npm run fix               # Auto-fix linting issues across all files
npm run npm:install       # Install dependencies in all sub-packages
npm run ncu               # Check for dependency updates across all packages
npm run publish:all       # Publish all packages to npm
npm run publish:eslint    # Publish just @mikey-pro/eslint-config
npm run release:bump      # Bump version across all packages
npm run release:notes     # Generate release notes
npm run ci:local          # Run CI checks locally
```

## Conventions

- **ESM only** — all files use `import`/`export`, `"type": "module"` everywhere
- **Named exports** from config modules (e.g., `{ baseConfig }`, `{ baseOverrides }`)
- **Default exports** for the final assembled config arrays (e.g., `export default [...]`)
- **Config files** are arrays of flat config objects (ESLint 10 pattern)
- **Framework configs** extend the base config by spreading its array and adding framework-specific entries
- **Tests** use Vitest's `describe`/`it`/`expect`, with `globals: true` in vitest config
- **Test files** use `import.meta.dirname` / `import.meta.filename` for path resolution
- **Commit style:** conventional commits — `feat:`, `fix:`, `chore:`, `ci:`, `refactor:`, `test:`, `docs:`
- **Version:** all packages share a single version (currently 10.0.4), bumped together via `scripts/bump-version.js`
- **Publishing:** `mikey-pro` (unified base) published first, then framework configs and other scoped packages; ruff-config also published to PyPI
- **Framework config imports:** framework configs import base components from `mikey-pro/eslint/base-config.js` and `mikey-pro/eslint/overrides.js` (NOT from `@mikey-pro/eslint-config/*`)
- **Single source of truth:** all ESLint rules live in `base-config.js` (no separate rules.js)
- **noInlineConfig:** `true` — prevents AI agents from using `// eslint-disable` escape hatches

## Common Mistakes to Avoid

- **Don't confuse the two package.json files** — root `package.json` is for development; `configs/package.json` is the publishable `mikey-pro` unified base package
- **Framework configs depend on `mikey-pro`** not `@mikey-pro/eslint-config` — imports use `mikey-pro/eslint/*` subpath exports
- **Sub-packages have their own node_modules** — each config in `configs/` manages its own dependencies separately. `npm run npm:install` handles all of them
- **The project lints itself** — `eslint.config.js` at root imports from `./configs/eslint-config/index.js` directly (not the published package), so changes to the config are immediately reflected when linting

## Testing

- **Framework:** Vitest v4 with `environment: 'node'`
- **Test location:** `tests/**/*.test.js`
- **Timeout:** 10s per test (ESLint config loading can be slow)
- **Run:** `npm test` (or `npx vitest run`)
- **Coverage:** `npm run test:coverage` — V8 provider, outputs text + JSON + HTML
