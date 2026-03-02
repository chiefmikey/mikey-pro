# Design: Mikey Pro AI Agent Guardrails Pivot

_Created: 2026-03-02_
_Status: APPROVED_

## Overview

Pivot @mikey-pro from a personal style guide into AI agent guardrails — a tool that makes Claude coding agents write better code across all projects. Install once in global CLAUDE.md, auto-enforced everywhere.

## Architecture

```
configs/
  eslint-config/          # @mikey-pro/eslint-config (npm) — core JS/TS
  eslint-config-react/    # @mikey-pro/eslint-config-react (npm)
  eslint-config-vue/      # @mikey-pro/eslint-config-vue (npm)
  eslint-config-svelte/   # @mikey-pro/eslint-config-svelte (npm)
  eslint-config-angular/  # @mikey-pro/eslint-config-angular (npm)
  prettier-config/        # @mikey-pro/prettier-config (npm)
  stylelint-config/       # @mikey-pro/stylelint-config (npm)
  ruff-config/            # mikey-pro-ruff-config (PyPI) + @mikey-pro/ruff-config (npm) — NEW
```

## 1. Cleanup (Remove Redundancy, Keep All Opinions)

### Consolidate rules.js into base-config.js

- Merge any rules from `rules.js` (607 lines) not already in `base-config.js` into `base-config.js`
- Delete `rules.js` after consolidation
- Remove `baseRules` re-export from `index.js`
- Remove `./rules` export from `package.json` exports field
- Remove `rules.js` from `package.json` files array

### Remove unused dependencies from eslint-config/package.json

- `@babel/core`, `@babel/eslint-parser`, `@babel/eslint-plugin`, `@babel/preset-env` — ESLint 10 doesn't need Babel
- `@cypress/eslint-plugin-json` — replaced by `eslint-plugin-jsonc`
- `postcss`, `postcss-scss` — stylelint concerns, not ESLint
- `eslint-config-prettier` — we use `eslint-plugin-prettier` directly
- `@stylistic/eslint-plugin` — not imported or used in any config file
- `eslint-plugin-markdownlint` — we use `@eslint/markdown` instead; markdownlint rules never activated

### Remove from base-config.js

- Any import statements for removed packages
- `markdownlint` plugin registration in globalPlugins (keep `markdown` which is `@eslint/markdown`)

### Update docs

- Mark ESLint 10 upgrade plan as COMPLETED
- Delete stale research docs that reference pre-ESLint-10 state

## 2. AI Agent Rule Tuning

### Tightened limits (strict mode for AI agents)

- `max-lines`: 500 → 300 (AI tends to generate bloated files)
- `complexity`: 15 → 12 (force simpler branching)
- `max-depth`: 4 → 3 (prevent deep nesting)
- `max-params`: 4 → 3 (force options objects)
- `sonarjs/cognitive-complexity`: 15 → 12

### New rules to add to base-config.js

- `no-console: 'warn'` — AI agents scatter console.log everywhere
- `curly: ['error', 'all']` — force braces on all blocks
- `eqeqeq: ['error', 'always', { null: 'ignore' }]` — no loose equality
- `no-nested-ternary: 'error'` — AI generates unreadable nested ternaries
- `no-warning-comments: 'warn'` — catch TODO/FIXME/HACK left behind
- `no-restricted-syntax` for `ForInStatement` — AI uses for...in when it should use for...of
- `default-case: 'error'` — force default in switch statements
- `consistent-return: 'error'` — all paths return or none do
- `guard-for-in: 'error'` — if for-in is used, require hasOwnProperty check
- `grouped-accessor-pairs: 'error'` — keep getters/setters together
- `no-implicit-globals: 'error'` — no accidental globals
- `object-shorthand: 'warn'` — prefer `{ x }` over `{ x: x }`
- `one-var: ['error', 'never']` — one declaration per statement
- `require-unicode-regexp: 'error'` — use unicode-aware regex

### Keep unchanged

- `noInlineConfig: true` — critical for AI agents (no eslint-disable escape hatch)
- `reportUnusedDisableDirectives: true`
- All security rules (already strict)
- All import ordering rules (deterministic output)
- All perfectionist rules (consistent formatting)

## 3. Python Support (New Package)

### Package: configs/ruff-config/

**Files:**

- `pyproject.toml` — PyPI package metadata + embedded ruff config
- `ruff.toml` — standalone ruff config for projects using ruff directly
- `package.json` — npm package metadata (zero Node deps, just config files)
- `README.md`
- `LICENSE`

**PyPI:** `mikey-pro-ruff-config`
**npm:** `@mikey-pro/ruff-config`

### Ruff rules (strict, matching ESLint philosophy)

- `pycodestyle` (E, W) — PEP 8 style
- `pyflakes` (F) — logical errors
- `isort` (I) — import sorting (mirrors simple-import-sort)
- `flake8-bugbear` (B) — common bugs
- `flake8-comprehensions` (C4) — better comprehensions
- `flake8-simplify` (SIM) — code simplification
- `bandit` (S) — security (mirrors eslint-plugin-security)
- `mccabe` (C90) — complexity max 12 (matches ESLint)
- `pep8-naming` (N) — naming conventions
- `ruff-specific` (RUF) — modern Python idioms
- `pylint` (PL) — additional quality checks
- `flake8-return` (RET) — consistent returns (mirrors consistent-return)
- `flake8-pytest-style` (PT) — pytest best practices

**Line length:** 88 (Black default)
**Target Python:** 3.11+

### CI integration

- Add Python lint step to `.github/workflows/ci.yml`
- Validate ruff.toml parses correctly
- Run ruff check on a sample Python file

### Version sync

- Add `configs/ruff-config/pyproject.toml` and `configs/ruff-config/package.json` to `scripts/bump-version.js`

## 4. Global Claude Integration

### Add to ~/.claude/CLAUDE.md

```markdown
## Code Quality: Mikey Pro Guardrails

When working in any project, check if @mikey-pro code quality configs are installed.

### JavaScript/TypeScript Projects

- Check for `@mikey-pro/eslint-config` in package.json devDependencies
- If missing: `npm i -D @mikey-pro/eslint-config`
- Check for `eslint.config.js` — if missing or not using mikey-pro, create one:
  import config from '@mikey-pro/eslint-config';
  export default config;
- For React projects: use `@mikey-pro/eslint-config-react` instead
- For Vue: `@mikey-pro/eslint-config-vue`
- For Svelte: `@mikey-pro/eslint-config-svelte`
- For Angular: `@mikey-pro/eslint-config-angular`
- Always run `npx eslint .` after making changes to verify compliance
- NEVER use eslint-disable comments — the config has noInlineConfig: true

### Python Projects

- Check for mikey-pro-ruff-config or a ruff config referencing mikey-pro
- If missing: pip install mikey-pro-ruff-config and extend the config
- Always run ruff check . and ruff format --check . after changes

### Rules

- Never weaken or disable mikey-pro rules
- If a rule blocks valid code, refactor the code to comply
- Run linting as part of verification before claiming work is done
```

## 5. Test Updates

- Update `plugin-integrity.test.js` for removed plugins (markdownlint)
- Add violation tests for new rules (no-console, curly, eqeqeq, no-nested-ternary, etc.)
- Add ruff config validation test (ensure TOML parses correctly)
- Update project CLAUDE.md with new identity

## 6. Project CLAUDE.md Update

Rewrite to reflect:

- New identity as AI agent guardrails
- Updated package list (add ruff-config)
- Updated commands (add Python-related commands)
- Updated architecture description

## What Stays Unchanged

- All framework configs (React, Vue, Svelte, Angular)
- Prettier config
- Stylelint config
- CI pipeline structure (just add Python step)
- Version sync system
- npm publishing workflow
- All existing opinionated rules that add value
- `noInlineConfig: true`
- Test infrastructure (Vitest)

## Decision Log

- **Approach A chosen** over repo split or CLI orchestrator — monorepo keeps everything in one place
- **Dual publish** Python config to both PyPI and npm for maximum agent accessibility
- **Strict rule limits** chosen — forces Claude to write clean, small, focused code
- **Global CLAUDE.md** for integration — Claude IS the orchestrator, no need for a CLI tool
- **rules.js deleted** after consolidation — single source of truth in base-config.js
- **Ruff over pylint/flake8** — Ruff is the modern standard, 10-100x faster, single tool
