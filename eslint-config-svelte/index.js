import baseConfig from '@mikey-pro/eslint-config';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteAll from 'eslint-plugin-svelte/configs/all';
import typescriptParser from '@typescript-eslint/parser';
import path from 'path';

/** @type {import('eslint').Linter.Config[]} */
const svelteConfig = [
  ...baseConfig,
  {
    files: ['*.svelte'],
    languageOptions: {
      parser: 'svelte-eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.*.json'],
        tsconfigRootDir: path.join(__dirname, '../../..'),
        extraFileExtensions: ['.svelte'],
        parser: {
          js: '@babel/eslint-parser',
          ts: typescriptParser,
          typescript: typescriptParser,
        },
      },
    },
    plugins: {
      svelte: sveltePlugin,
    },
    rules: {
      ...svelteAll.rules,
      // Core Svelte rules
      'svelte/valid-compile': 'error',
      'svelte/no-dupe-style-properties': 'error',
      'svelte/no-unused-svelte-ignore': 'error',
      'svelte/html-quotes': ['error', { prefer: 'double' }],
      'svelte/html-self-closing': 'error',
      'svelte/no-at-html-tags': 'warn',
      'svelte/no-reactive-functions': 'error',
      'svelte/no-reactive-literals': 'error',
      'svelte/no-unused-class-bindings': 'warn',
      'svelte/require-store-callbacks-use-set-param': 'error',
      'svelte/valid-prop-names-in-kit-pages': 'error',

      // Accessibility
      'svelte/button-has-type': 'error',
      'svelte/no-target-blank': 'error',
      'svelte/require-alt': 'error',

      // Style
      'svelte/first-attribute-linebreak': ['error', { multiline: 'below' }],
      'svelte/shorthand-attribute': ['error', { prefer: 'always' }],
      'svelte/sort-attributes': ['warn', { order: ['scripts', 'markup', 'styles'] }],

      // TypeScript
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // Imports
      'import/first': 'off',
      'import/no-duplicates': 'off',
      'import/no-mutable-exports': 'off',
      'import/no-unresolved': 'off',
      'prettier/prettier': 'off'
    },
    settings: {
      ...baseConfig.settings,
      'svelte3/typescript': true,
      'svelte3/ignore-styles': false,
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.*.json']
        }
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.svelte']
      }
    }
  },
];

export default svelteConfig;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = svelteConfig;
}
