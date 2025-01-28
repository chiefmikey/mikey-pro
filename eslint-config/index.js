import babelParser from '@babel/eslint-parser';
import cypressJson from '@cypress/eslint-plugin-json';
import eslintJs from '@eslint/js';
import compatPlugin from 'eslint-plugin-compat';
import cssModules from 'eslint-plugin-css-modules';
import disableAutofix from 'eslint-plugin-disable-autofix';
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import prettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import securityPlugin from 'eslint-plugin-security';
import promisePlugin from 'eslint-plugin-promise';
import importSortPlugin from 'eslint-plugin-simple-import-sort';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';

import { baseOverrides } from './overrides.js';
import { baseRules } from './rules.js';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      '**/dist/**/*',
      '**/vendor/**/*',
      '*.properties',
      '*.cclibs',
      '*.svg',
      '*.png',
      '*.aco',
      '*.psd',
      '*.ai',
      '*.ase',
      '*.sh',
      '*.ico',
      'package-lock.json',
      'LICENSE',
      'CNAME',
    ],
  },
  eslintJs.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
          ],
        },
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2022,
        ...globals.es6,
        ...globals.node
      },
    },
    plugins: {
      prettier,
      unicorn,
      'css-modules': cssModules,
      'disable-autofix': disableAutofix,
      'only-warn': onlyWarn,
      '@cypress/json': cypressJson,
      import: importPlugin,
      security: securityPlugin,
      promise: promisePlugin,
      'simple-import-sort': importSortPlugin,
      perfectionist: perfectionistPlugin,
      'no-secrets': noSecretsPlugin,
      'no-only-tests': noOnlyTestsPlugin,
    },
    rules: {
      ...baseRules,
      ...unicorn.configs.all.rules,
      ...compatPlugin.configs.recommended.rules,
      ...cssModules.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      'prettier/prettier': ['warn', {
        parser: 'babel',
        endOfLine: 'lf',
        singleQuote: true,
        trailingComma: 'all'
      }],

      // Security
      'security/detect-object-injection': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-non-literal-regexp': 'warn',

      // Promises
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'warn',

      // Better import sorting
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Better code organization
      'perfectionist/sort-objects': ['warn', {
        type: 'natural',
        order: 'asc',
      }],
      'perfectionist/sort-named-imports': 'warn',

      // Security and testing
      'no-secrets/no-secrets': ['warn', { tolerance: 4.5 }],
      'no-only-tests/no-only-tests': 'warn',

      // Enhanced import rules
      'import/no-cycle': 'warn',
      'import/no-useless-path-segments': 'warn',
      'import/no-anonymous-default-export': 'warn',
    },
    settings: {
      'json/json-with-comments-files': [],
      polyfills: ['Promise', 'fetch', 'URLSearchParams'],
      jest: {
        version: 29,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']
        }
      },
    },
  },
  ...baseOverrides,
];

export default config;
export { baseRules } from './rules.js';
export { baseOverrides } from './overrides.js';
