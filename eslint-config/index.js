import cypressJson from '@cypress/eslint-plugin-json';
import eslintJs from '@eslint/js';
import compatPlugin from 'eslint-plugin-compat';
import cssModules from 'eslint-plugin-css-modules';
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import securityPlugin from 'eslint-plugin-security';
import promisePlugin from 'eslint-plugin-promise';
import importSortPlugin from 'eslint-plugin-simple-import-sort';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import regexpPlugin from 'eslint-plugin-regexp';
import etcPlugin from 'eslint-plugin-etc';
import typescriptSortKeysPlugin from 'eslint-plugin-typescript-sort-keys';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import writeGoodCommentsPlugin from 'eslint-plugin-write-good-comments';
import boundariesPlugin from 'eslint-plugin-boundaries';
import nPlugin from 'eslint-plugin-n';
import radarPlugin from 'eslint-plugin-radar';
import optimizeRegexPlugin from 'eslint-plugin-optimize-regex';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

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
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2022,
        ...globals.es6,
        ...globals.node
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      unicorn,
      'css-modules': cssModules,
      'only-warn': onlyWarn,
      '@cypress/json': cypressJson,
      import: importPlugin,
      security: securityPlugin,
      promise: promisePlugin,
      'simple-import-sort': importSortPlugin,
      perfectionist: perfectionistPlugin,
      'no-secrets': noSecretsPlugin,
      'no-only-tests': noOnlyTestsPlugin,
      sonarjs: sonarjsPlugin,
      regexp: regexpPlugin,
      etc: etcPlugin,
      'typescript-sort-keys': typescriptSortKeysPlugin,
      'sort-destructure-keys': sortDestructureKeysPlugin,
      'write-good-comments': writeGoodCommentsPlugin,
      boundaries: boundariesPlugin,
      n: nPlugin,
      radar: radarPlugin,
      'optimize-regex': optimizeRegexPlugin,
      compat: compatPlugin,
    },
    rules: {
      ...baseRules,
      ...unicorn.configs.all.rules,
      ...compatPlugin.configs.recommended.rules,
      ...cssModules.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...sonarjsPlugin.configs.recommended.rules,
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

      // SonarJS rules
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': ['error', { threshold: 5 }],
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/no-small-switch': 'warn',
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/max-switch-cases': ['warn', 10],
    },
    settings: {
      'json/json-with-comments-files': [],
      polyfills: ['Promise', 'fetch', 'URLSearchParams', 'Array.prototype.includes'],
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
      boundaries: {
        elements: [
          { type: 'app', pattern: 'app/*' },
          { type: 'pages', pattern: 'pages/*' },
          { type: 'components', pattern: 'components/*' },
          { type: 'hooks', pattern: 'hooks/*' },
          { type: 'utils', pattern: 'utils/*' },
          { type: 'services', pattern: 'services/*' },
          { type: 'types', pattern: 'types/*' },
          { type: 'config', pattern: 'config/*' }
        ]
      }
    },
  },
  ...baseOverrides,
];

export default config;
export { baseRules, baseOverrides };
