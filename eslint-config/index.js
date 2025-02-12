import cypressJson from '@cypress/eslint-plugin-json';
import eslintJs from '@eslint/js';
import boundariesPlugin from 'eslint-plugin-boundaries';
import compatPlugin from 'eslint-plugin-compat';
import cssModules from 'eslint-plugin-css-modules';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import onlyWarn from 'eslint-plugin-only-warn';
import optimizeRegexPlugin from 'eslint-plugin-optimize-regex';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
import securityPlugin from 'eslint-plugin-security';
import importSortPlugin from 'eslint-plugin-simple-import-sort';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import unicorn from 'eslint-plugin-unicorn';
import writeGoodCommentsPlugin from 'eslint-plugin-write-good-comments';
import globals from 'globals';

import { baseOverrides } from './overrides.js';
import { baseRules } from './rules.js';

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
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2022,
        ...globals.es6,
        ...globals.node,
      },
      sourceType: 'module',
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@cypress/json': cypressJson,
      boundaries: boundariesPlugin,
      compat: compatPlugin,
      'css-modules': cssModules,
      import: importPlugin,
      n: nPlugin,
      'no-only-tests': noOnlyTestsPlugin,
      'no-secrets': noSecretsPlugin,
      'only-warn': onlyWarn,
      'optimize-regex': optimizeRegexPlugin,
      perfectionist: perfectionistPlugin,
      prettier: eslintPluginPrettier,
      promise: promisePlugin,
      regexp: regexpPlugin,
      security: securityPlugin,
      'simple-import-sort': importSortPlugin,
      sonarjs: sonarjsPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      unicorn,
      'write-good-comments': writeGoodCommentsPlugin,
    },
    rules: {
      ...baseRules,
      ...unicorn.configs.all.rules,
      ...compatPlugin.configs.recommended.rules,
      ...cssModules.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...sonarjsPlugin.configs.recommended.rules,
      'import/no-anonymous-default-export': 'warn',
      'import/no-cycle': 'warn',
      'import/no-useless-path-segments': 'warn',
      'no-only-tests/no-only-tests': 'warn',
      'no-secrets/no-secrets': ['warn', { tolerance: 4.5 }],
      'perfectionist/sort-named-imports': 'warn',
      'perfectionist/sort-objects': [
        'warn',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'lf',
          parser: 'babel',
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
      'promise/always-return': 'warn',
      'promise/catch-or-return': 'warn',
      'promise/no-return-wrap': 'warn',
      'promise/param-names': 'error',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-object-injection': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': 'warn',
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/max-switch-cases': ['warn', 10],
      'sonarjs/no-duplicate-string': ['error', { threshold: 5 }],
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-small-switch': 'warn',
      'sonarjs/prefer-immediate-return': 'error',
      'unicorn/expiring-todo-comments': 'off',
    },
    settings: {
      boundaries: {
        elements: [
          { pattern: 'app/*', type: 'app' },
          { pattern: 'pages/*', type: 'pages' },
          { pattern: 'components/*', type: 'components' },
          { pattern: 'hooks/*', type: 'hooks' },
          { pattern: 'utils/*', type: 'utils' },
          { pattern: 'services/*', type: 'services' },
          { pattern: 'types/*', type: 'types' },
          { pattern: 'config/*', type: 'config' },
        ],
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
        },
      },
      jest: {
        version: 29,
      },
      'json/json-with-comments-files': [],
      polyfills: [
        'Promise',
        'fetch',
        'URLSearchParams',
        'Array.prototype.includes',
      ],
    },
  },
  ...baseOverrides,
];

export default config;

export { baseOverrides } from './overrides.js';
export { baseRules } from './rules.js';
