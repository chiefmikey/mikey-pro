# @mikey-pro/eslint-config

Core ESLint configuration for the Mikey Pro style guide.

## Installation

```bash
npm install @mikey-pro/eslint-config
```

## Usage

```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config';
```

## Features

- 50+ ESLint plugins for comprehensive code quality
- TypeScript first-class support
- Security-focused rules
- Performance optimizations
- Import/export organization
- Auto-fixable formatting rules

## Supported File Types

JavaScript, TypeScript, JSON, YAML, TOML, HTML, CSS, SCSS

## Customization

```javascript
// eslint.config.js
import { default as baseConfig } from '@mikey-pro/eslint-config';

export default [
  ...baseConfig,
  {
    files: ['**/*.test.{js,ts}'],
    rules: {
      'no-console': 'off',
    },
  },
];
```

See [Mikey Pro](https://github.com/chiefmikey/mikey-pro) for full documentation.
