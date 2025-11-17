# CI/CD Workflow Documentation

## Overview

The project includes a comprehensive GitHub Actions workflow that automatically runs tests on push, pull requests, and manual dispatch.

## Workflow Triggers

### 1. Push to Main Branch
- **Trigger**: Any push to the `main` branch
- **Runs**: Full test suite on Node.js 18.x and 20.x
- **Purpose**: Verify all changes work correctly before merging

### 2. Pull Requests
- **Trigger**: Any pull request targeting the `main` branch
- **Runs**: Full test suite on Node.js 18.x and 20.x
- **Purpose**: Verify PR changes don't break existing functionality

### 3. Manual Dispatch (workflow_dispatch)
- **Trigger**: Manual trigger from GitHub Actions UI
- **Options**:
  - `all` - Run all tests (default)
  - `manual` - Run only manual tests (no dependencies)
  - `validate` - Run only comprehensive validation
- **Purpose**: Allow manual testing on-demand

## Workflow Steps

### 1. Checkout Code
- Checks out the repository code

### 2. Setup Node.js
- Sets up Node.js using the matrix strategy (18.x and 20.x)
- Enables npm caching for faster builds

### 3. Install Dependencies
- Runs `npm ci` (preferred) or falls back to `npm install`
- Ensures all dependencies are available

### 4. Determine Test Type
- For `workflow_dispatch`: Uses the selected test type
- For `push`/`pull_request`: Runs all tests

### 5. Run Manual Tests (Conditional)
- **Runs when**: `all` or `manual` test type selected
- **Command**: `npm run test:manual`
- **Purpose**: Quick verification without full dependencies
- **Error handling**: Continues on error (fallback)

### 6. Run Comprehensive Validation (Conditional)
- **Runs when**: `all` or `validate` test type selected
- **Command**: `npm run test:validate`
- **Purpose**: 28-point comprehensive validation
- **Error handling**: Continues on error (fallback)

### 7. Run Full Test Suite (Conditional)
- **Runs when**: `all` test type selected
- **Command**: `npm test`
- **Purpose**: Complete test suite with Vitest
- **Error handling**: Fails on error (required)

### 8. Verify ESLint Configs Can Lint
- Tests all framework configs (Core, React, Vue, Svelte, Angular)
- Verifies configs can lint test files
- **Error handling**: Continues on error (informational)

## Test Matrix

The workflow runs on multiple Node.js versions:
- **Node.js 18.x** - Maintenance LTS (for backward compatibility)
- **Node.js 20.x** - Maintenance LTS ("Iron")
- **Node.js 22.x** - Maintenance LTS ("Jod")
- **Node.js 24.x** - Active LTS ("Krypton") - Current LTS

This ensures compatibility across all current LTS versions up to the latest active LTS.

## Manual Dispatch Usage

### How to Trigger Manually

1. Go to GitHub repository
2. Click on **Actions** tab
3. Select **Tests** workflow from the left sidebar
4. Click **Run workflow** button
5. Select test type:
   - **all** - Full test suite (recommended)
   - **manual** - Quick manual tests only
   - **validate** - Comprehensive validation only
6. Click **Run workflow**

### When to Use Manual Dispatch

- **Before publishing**: Run full test suite to verify everything works
- **After dependency updates**: Verify tests still pass
- **Quick validation**: Use `validate` option for fast checks
- **Debugging**: Use `manual` option if full suite has issues

## Workflow Status Badge

The README includes a workflow status badge that shows the current test status:

```markdown
[![Tests](https://github.com/chiefmikey/mikey-pro/workflows/Tests/badge.svg)](https://github.com/chiefmikey/mikey-pro/actions)
```

## Test Coverage

The workflow verifies:

- ✅ All configs load without errors
- ✅ All framework configs work (React, Vue, Svelte, Angular)
- ✅ All file types work (JS, TS, JSX, Vue, Svelte, JSON, YAML, MD, HTML, TOML, CSS, SCSS)
- ✅ Linting doesn't break
- ✅ Formatting doesn't break
- ✅ Integration workflows work correctly
- ✅ Install/run tests pass (real-world usage)

## Workflow File Location

`.github/workflows/test.yml`

## Summary

The CI/CD workflow ensures:

1. **Automated Testing**: All changes are tested automatically
2. **Multi-Version Support**: Tests run on Node.js 18.x and 20.x
3. **Flexible Testing**: Manual dispatch allows on-demand testing
4. **Comprehensive Coverage**: Multiple test types ensure quality
5. **Error Handling**: Graceful fallbacks for optional tests

**The workflow is production-ready and ensures code quality on every change!**

