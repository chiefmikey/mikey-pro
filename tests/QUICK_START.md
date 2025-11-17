# Quick Start Guide for Testing

## Running Tests

### Option 1: Full Test Suite (Requires Vitest)

```bash
# Install dependencies first
npm install

# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Option 2: Manual Tests (No Dependencies Required)

If you can't install dependencies, you can run manual tests:

```bash
# Run manual tests (doesn't require vitest)
npm run test:manual
# or
node tests/run-manual-tests.js
```

### Option 3: Verify Setup

Quick verification that everything is set up correctly:

```bash
node tests/verify-setup.js
```

## What Gets Tested

### Configuration Tests
- All configs can be imported
- All configs are valid ES module arrays
- ESLint instances can be created

### Linting Tests
- JavaScript files lint without errors
- TypeScript files lint without errors
- React, Vue, Svelte, Angular files lint correctly
- JSON, YAML, Markdown files are handled

### Formatting Tests
- Prettier can format all file types
- No formatting errors occur

### Integration Tests
- Complete workflows work
- Multiple file types together
- Error handling

## Troubleshooting

### npm install fails
- Try: `npm install --legacy-peer-deps`
- Or use manual tests: `npm run test:manual`

### Tests timeout
- Check network connection (vitest downloads on first run)
- Try manual tests instead

### Config errors
- Run: `node tests/verify-setup.js`
- Check that all config files exist

## CI/CD

Tests run automatically in GitHub Actions on:
- Every push to main
- Every pull request

No action needed - tests run automatically!








