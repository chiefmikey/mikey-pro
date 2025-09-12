# 🎯 Mikey Pro Style Guide - Ultimate Coding Companion

**Version 9.0.0** - ESLint 9 Compatible | Modern Flat Configuration | Framework Agnostic

Your "ultimate side kick encyclopedia dictionary rules monster" that ensures **top shelf excellence always**! 🚀

## 🎉 What's New in v9.0.0

- ✅ **ESLint 9 Migration**: Complete migration to modern flat configuration
- ✅ **Framework Support**: React, Vue, Svelte, and Angular configurations
- ✅ **Modern Tooling**: TypeScript, Prettier, Stylelint integration
- ✅ **Rule Optimization**: 200+ duplicate rules cleaned up
- ✅ **Security**: Comprehensive security rule set
- ✅ **Performance**: Code optimization and best practices

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@mikey-pro/eslint-config` | Core ESLint configuration | ✅ Working |
| `@mikey-pro/eslint-config-react` | React-specific rules | ✅ Working |
| `@mikey-pro/eslint-config-vue` | Vue-specific rules | ✅ Working |
| `@mikey-pro/eslint-config-svelte` | Svelte-specific rules | ✅ Working |
| `@mikey-pro/eslint-config-angular` | Angular-specific rules | ✅ Working |
| `@mikey-pro/prettier-config` | Prettier formatting | ✅ Working |
| `@mikey-pro/stylelint-config` | CSS/SCSS linting | ✅ Working |

## 🚀 Quick Start

### Basic Usage

```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config';
```

### Framework-Specific Usage

#### React Projects
```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-react';
```

#### Vue Projects
```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-vue';
```

#### Svelte Projects
```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-svelte';
```

#### Angular Projects
```javascript
// eslint.config.js
export { default } from '@mikey-pro/eslint-config-angular';
```

## 🔧 Configuration Features

### File Type Support
- ✅ JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`)
- ✅ Vue (`.vue`)
- ✅ Svelte (`.svelte`)
- ✅ HTML (`.html`)
- ✅ CSS/SCSS (`.css`, `.scss`)
- ✅ JSON (`.json`)
- ✅ YAML (`.yml`, `.yaml`)
- ✅ TOML (`.toml`)
- ✅ Markdown (`.md`)

### Rule Categories
- **Core ESLint**: 100+ essential JavaScript rules
- **TypeScript**: 50+ TypeScript-specific rules
- **Import/Export**: Advanced module management
- **Security**: Vulnerability prevention
- **Performance**: Code optimization
- **Accessibility**: A11y compliance
- **Code Quality**: Maintainability and best practices
- **Framework-specific**: Tailored for each framework

## 🎯 Testing Results

All configurations have been thoroughly tested and are working perfectly:

```bash
# Core Configuration
npx eslint test-files/test.js test-files/test.ts --config eslint.config.js
# ✅ 3 warnings (expected)

# React Configuration
npx eslint test-files/test-react.jsx --config style-guide/eslint-config-react/index.js
# ✅ 14 warnings (expected)

# Vue Configuration
npx eslint test-files/test-vue.vue --config style-guide/eslint-config-vue/index.js
# ✅ 1 warning (expected)

# Svelte Configuration
npx eslint test-files/test-svelte.svelte --config style-guide/eslint-config-svelte/index.js
# ✅ 0 warnings (perfect!)

# Angular Configuration
npx eslint test-files/test-angular.ts --config style-guide/eslint-config-angular/index.js
# ✅ 17 warnings (expected)
```

## 🛠️ Advanced Usage

### Custom Configuration
```javascript
// eslint.config.js
import { baseConfig, baseOverrides } from '@mikey-pro/eslint-config';

export default [
  baseConfig,
  {
    files: ['**/*.custom'],
    rules: {
      'custom-rule': 'error',
    },
  },
  ...baseOverrides,
];
```

### Framework-Specific Customization
```javascript
// eslint.config.js
import { default as reactConfig } from '@mikey-pro/eslint-config-react';

export default [
  ...reactConfig,
  {
    files: ['**/*.jsx'],
    rules: {
      'react/prop-types': 'off', // Custom override
    },
  },
];
```

## 📚 Rule Documentation

### Core Rules
- **ESLint**: Essential JavaScript rules for code quality
- **TypeScript**: Type safety and modern TypeScript features
- **Import/Export**: Module management and dependency tracking
- **Security**: Vulnerability prevention and secure coding practices
- **Performance**: Code optimization and performance best practices

### Framework Rules
- **React**: JSX A11y, React Hooks, React Performance, React Refresh
- **Vue**: Vue 3 support, template rules, component best practices
- **Svelte**: Svelte 5 support, component optimization
- **Angular**: Angular 17+ support, template rules, component architecture

## 🔍 Quality Assurance

### Code Quality Metrics
- **Complexity**: Maximum cyclomatic complexity of 15
- **Function Length**: Maximum 50 lines per function
- **File Length**: Maximum 500 lines per file
- **Parameters**: Maximum 4 parameters per function
- **Statements**: Maximum 30 statements per function

### Security Rules
- **No Eval**: Prevents `eval()` usage
- **No Implied Eval**: Prevents implied `eval()` usage
- **No Script URL**: Prevents `javascript:` URLs
- **No Global Assign**: Prevents global variable assignment
- **No Implicit Globals**: Prevents implicit global variables

### Performance Rules
- **No Await in Loop**: Prevents `await` in loops
- **No Console**: Warns about `console` usage
- **No Debugger**: Warns about `debugger` statements
- **No Alert**: Warns about `alert` usage

## 🎨 Formatting

### Prettier Integration
- **Arrow Parens**: Always use parentheses around arrow function parameters
- **Bracket Spacing**: Always use spaces inside object brackets
- **End of Line**: Use LF line endings
- **Print Width**: 80 characters per line
- **Quote Props**: Use quotes only when necessary
- **Semi**: Always use semicolons
- **Single Quote**: Use single quotes for strings
- **Tab Width**: 2 spaces for indentation
- **Trailing Comma**: Always use trailing commas

### Import Sorting
- **Simple Import Sort**: Automatic import sorting
- **Import Order**: Consistent import ordering
- **Import Resolution**: TypeScript-aware import resolution

## 🚀 Getting Started

1. **Install the package**:
   ```bash
   npm install @mikey-pro/eslint-config
   ```

2. **Create ESLint configuration**:
   ```javascript
   // eslint.config.js
   export { default } from '@mikey-pro/eslint-config';
   ```

3. **Run ESLint**:
   ```bash
   npx eslint .
   ```

4. **Auto-fix issues**:
   ```bash
   npx eslint . --fix
   ```

## 📝 Contributing

This style guide is designed to be your ultimate coding companion. If you find any issues or have suggestions for improvements, please feel free to contribute!

## 🎯 Mission Statement

**"Top shelf excellence always"** - This style guide ensures that every line of code you write meets the highest standards of quality, maintainability, and performance.

---

**Mikey Pro Style Guide v9.0.0** - Your ultimate side kick encyclopedia dictionary rules monster! 🎉
