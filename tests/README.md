# Test Suite

This directory contains comprehensive tests for the Mikey Pro style guide configurations.

## Test Files

- `configs.test.js` - Tests that all ESLint configurations can be loaded without errors
- `linting.test.js` - Tests that ESLint can lint all file types without breaking
- `formatting.test.js` - Tests that Prettier can format all file types
- `integration.test.js` - End-to-end integration tests for complete workflows
- `file-types.test.js` - Comprehensive tests for all supported file types
- `rules.test.js` - Tests that rules are properly enforced
- `install-run.test.js` - **NEW** Tests real-world usage after npm install (simulates project setup)
- `verify-setup.js` - Quick verification script to check test setup

## Running Tests

### Full Test Suite (Requires Vitest)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Manual Tests (No Dependencies)

If you can't install dependencies, use manual tests:

```bash
# Run manual tests
npm run test:manual
# or
node tests/run-manual-tests.js
```

### Quick Verification

```bash
# Verify test setup
node tests/verify-setup.js

# Comprehensive validation
npm run test:validate
# or
node tests/validate-all.js
```

See [QUICK_START.md](QUICK_START.md) for more details.

## Test Coverage

The test suite verifies:

- ✅ All configs load without syntax errors
- ✅ All framework configs work (React, Vue, Svelte, Angular)
- ✅ All language variations work (TypeScript, JavaScript)
- ✅ All file types work (JS, TS, JSX, Vue, Svelte, JSON, YAML, Markdown, CSS, SCSS)
- ✅ Linting doesn't break
- ✅ Formatting doesn't break
- ✅ Integration workflows work correctly
- ✅ **Real-world usage** - Configs work when installed and used in a project (install-run.test.js)

