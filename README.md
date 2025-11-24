# Mikey Pro Style Guide

ESLint 9 compatible style guide with modern flat configuration. Supports JavaScript, TypeScript, React, Vue, Svelte, and Angular.

[![Tests](https://github.com/chiefmikey/mikey-pro/workflows/Tests/badge.svg)](https://github.com/chiefmikey/mikey-pro/actions)
[![npm version](https://img.shields.io/npm/v/@mikey-pro/eslint-config.svg)](https://www.npmjs.com/package/@mikey-pro/eslint-config)

## Installation

```bash
npm install @mikey-pro/eslint-config
```

## Usage

### Basic Configuration

```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config';
```

### Framework-Specific Configurations

**React:**
```bash
npm install @mikey-pro/eslint-config-react
```

```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-react';
```

**Vue:**
```bash
npm install @mikey-pro/eslint-config-vue
```

```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-vue';
```

**Svelte:**
```bash
npm install @mikey-pro/eslint-config-svelte
```

```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-svelte';
```

**Angular:**
```bash
npm install @mikey-pro/eslint-config-angular
```

```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-angular';
```

### Custom Configuration

```javascript
// eslint.config.js
import { default as reactConfig } from '@mikey-pro/eslint-config-react';

export default [
  ...reactConfig,
  {
    files: ['**/*.jsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
];
```

## Packages

- `@mikey-pro/eslint-config` - Core ESLint configuration
- `@mikey-pro/eslint-config-react` - React-specific rules
- `@mikey-pro/eslint-config-vue` - Vue-specific rules
- `@mikey-pro/eslint-config-svelte` - Svelte-specific rules
- `@mikey-pro/eslint-config-angular` - Angular-specific rules
- `@mikey-pro/prettier-config` - Prettier configuration
- `@mikey-pro/stylelint-config` - Stylelint configuration

## Supported File Types

JavaScript, TypeScript, JSX, TSX, Vue, Svelte, HTML, CSS, SCSS, JSON, YAML, TOML, Markdown

## Commands

```bash
npm run eslint    # Lint all files
npm run fix       # Auto-fix linting issues
npm test          # Run test suite
npm run test:validate  # Run validation checks
```

## License

MIT
