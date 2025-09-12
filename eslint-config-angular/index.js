// Modern Angular ESLint configuration for Mikey Pro
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import { baseConfig } from '@mikey-pro/eslint-config/base-config.js';
import { baseOverrides } from '@mikey-pro/eslint-config/overrides.js';

// Angular-specific configuration
const angularConfig = {
  files: ['**/*.ts'],
  languageOptions: {
    parser: baseConfig.languageOptions.parser,
    parserOptions: {
      ...baseConfig.languageOptions.parserOptions,
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@angular-eslint': angular,
  },
  rules: {
    // Angular rules
    ...angular.configs.recommended.rules,

    // Basic Angular-specific overrides
    '@angular-eslint/component-class-suffix': [
      'error',
      { suffixes: ['Component', 'Page', 'View'] },
    ],
    '@angular-eslint/component-selector': [
      'error',
      {
        prefix: 'app',
        style: 'kebab-case',
        type: 'element',
      },
    ],
    '@angular-eslint/directive-class-suffix': [
      'error',
      { suffixes: ['Directive'] },
    ],
    '@angular-eslint/directive-selector': [
      'error',
      {
        prefix: 'app',
        style: 'camelCase',
        type: 'attribute',
      },
    ],
    '@angular-eslint/no-multiple-template-root': 'off', // Angular 17+ allows multiple roots
    '@angular-eslint/use-lifecycle-interface': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};

// Angular template configuration
const angularTemplateConfig = {
  files: ['**/*.html'],
  languageOptions: {
    parser: angularTemplateParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    '@angular-eslint/template': angularTemplate,
  },
  rules: {
    // Angular template rules
    ...angularTemplate.configs.recommended.rules,

    // Basic Angular template-specific overrides
    '@angular-eslint/template/alt-text': 'error',
    '@angular-eslint/template/click-events-have-key-events': 'error',
    '@angular-eslint/template/conditional-complexity': ['error', { max: 3 }],
    '@angular-eslint/template/cyclomatic-complexity': ['error', { max: 5 }],
    '@angular-eslint/template/eqeqeq': 'error',
    '@angular-eslint/template/iframe-title': 'error',
    '@angular-eslint/template/interactive-supports-focus': 'error',
    '@angular-eslint/template/label-has-associated-control': 'error',
    '@angular-eslint/template/mouse-events-have-key-events': 'error',
    '@angular-eslint/template/no-autofocus': 'error',
    '@angular-eslint/template/no-duplicate-attributes': 'error',
    '@angular-eslint/template/no-positive-tabindex': 'error',
    '@angular-eslint/template/use-track-by-function': 'error',
    '@angular-eslint/template/valid-aria': 'error',
  },
};

// Export the complete Angular configuration
export default [
  // Global ignores
  {
    ignores: [
      '**/dist/**/*',
      '**/vendor/**/*',
      '**/node_modules/**/*',
      '**/coverage/**/*',
      '**/.next/**/*',
      '**/.nuxt/**/*',
      '**/.output/**/*',
      '**/.vite/**/*',
      '**/build/**/*',
      '**/out/**/*',
      '*.properties',
      '*.cclibs',
      '*.svg',
      '*.png',
      '*.jpg',
      '*.jpeg',
      '*.gif',
      '*.ico',
      '*.webp',
      '*.aco',
      '*.psd',
      '*.ai',
      '*.ase',
      '*.sh',
      '*.bat',
      '*.cmd',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      'LICENSE',
      'CNAME',
      '*.min.js',
      '*.min.css',
    ],
  },

  // Base configuration
  baseConfig,

  // Angular-specific configuration
  angularConfig,

  // Angular template configuration
  angularTemplateConfig,

  // File-specific overrides
  ...baseOverrides,
];

// Export individual components for advanced usage
export { baseConfig } from '@mikey-pro/eslint-config/base-config.js';
export { baseOverrides } from '@mikey-pro/eslint-config/overrides.js';
