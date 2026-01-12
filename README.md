# Mikey Pro Style Guide

ESLint 9 compatible style guide with modern flat configuration. Supports JavaScript, TypeScript, React, Vue, Svelte, and Angular.

[![Tests](https://github.com/chiefmikey/mikey-pro/workflows/CI/badge.svg)](https://github.com/chiefmikey/mikey-pro/actions)
[![npm version](https://img.shields.io/npm/v/@mikey-pro/eslint-config.svg)](https://www.npmjs.com/package/@mikey-pro/eslint-config)

## Features

- ✅ **50+ ESLint plugins** for comprehensive code quality
- ✅ **Auto-fixing** for formatting and common issues
- ✅ **TypeScript first-class support** with strict type checking
- ✅ **Framework optimized** configs for React, Vue, Svelte, Angular
- ✅ **Security focused** with built-in vulnerability detection
- ✅ **Performance oriented** with complexity and efficiency rules
- ✅ **Accessibility ready** with a11y rules for React
- ✅ **CI/CD ready** with automated testing and publishing

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
    files: ['**/*.test.{js,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
```

## Rule Categories

### Code Quality

- Import/export organization and validation
- Unused variable detection
- Code complexity limits (15 max)
- Function length restrictions (50 lines max)

### TypeScript

- Strict type checking with project-aware rules
- Consistent type imports and exports
- Proper TypeScript patterns enforcement
- TypeScript-specific best practices

### Security

- Unsafe regex pattern detection
- Child process security validation
- Buffer overflow prevention
- SQL injection protection

### Performance

- Efficient regex optimization
- Large file detection
- Memory leak prevention
- Bundle size awareness

### Frameworks

- **React**: Hooks rules, prop validation, JSX best practices
- **Vue**: Composition API patterns, template validation
- **Svelte**: Component structure, reactivity rules
- **Angular**: Dependency injection, lifecycle management

### Formatting

- Consistent import sorting
- Object/array key ordering
- Destructuring consistency
- Prettier integration for code formatting

## Packages

| Package                            | Description                   |
| ---------------------------------- | ----------------------------- |
| `@mikey-pro/eslint-config`         | Core ESLint configuration     |
| `@mikey-pro/eslint-config-react`   | React-specific rules + core   |
| `@mikey-pro/eslint-config-vue`     | Vue-specific rules + core     |
| `@mikey-pro/eslint-config-svelte`  | Svelte-specific rules + core  |
| `@mikey-pro/eslint-config-angular` | Angular-specific rules + core |
| `@mikey-pro/prettier-config`       | Prettier configuration        |
| `@mikey-pro/stylelint-config`      | Stylelint configuration       |

## Supported File Types

- **JavaScript**: `.js`, `.mjs`, `.cjs`
- **TypeScript**: `.ts`, `.tsx`
- **Frameworks**: `.jsx`, `.vue`, `.svelte`
- **Web**: `.html`, `.css`, `.scss`
- **Config**: `.json`, `.jsonc`, `.yaml`, `.toml`

## Commands

```bash
npm run eslint        # Lint all files
npm run fix           # Auto-fix linting issues
npm test              # Run test suite
npm run test:validate # Run validation checks
```

## Development

```bash
# Install all dependencies
npm run npm:install

# Run tests across all packages
npm test

# Update dependencies
npm run ncu

# Publish all packages
npm run publish:all
```

## License

MIT
