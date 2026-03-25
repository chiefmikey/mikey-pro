# Local CI Reproduction

This directory contains scripts to reproduce CI behavior locally, helping catch issues before pushing.

## Usage

Run the local CI reproduction script to mirror what happens in GitHub Actions:

```bash
npm run ci:local
```

Or directly:

```bash
./scripts/ci-local.sh
```

## What It Does

The script replicates the CI workflow steps:

1. **Install root dependencies** - Runs `npm ci` (falls back to `npm install` if needed)
2. **Install peer dependencies** - Installs test dependencies
3. **Install config package dependencies** - Installs dependencies for all config packages
4. **Run validation checks** - Runs `npm run test:validate`
5. **Run manual tests** - Runs `npm run test:manual`
6. **Run full test suite** - Runs `npm test`
7. **Verify ESLint configs** - Tests all configs can lint
8. **Check code formatting** - Runs Prettier checks
9. **Run ESLint** - Lints all JS/TS files

## Benefits

- Catch CI failures before pushing
- Faster feedback loop
- No need to wait for GitHub Actions
- Identical environment to CI (same steps)

## Requirements

- Node.js 20+ (matches CI)
- npm 9+ (matches CI)
