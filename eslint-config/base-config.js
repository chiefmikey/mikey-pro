// Base configuration for Mikey Pro ESLint
import js from '@eslint/js';
import html from '@html-eslint/eslint-plugin';
import boundaries from 'eslint-plugin-boundaries';
import compat from 'eslint-plugin-compat';
import cssModules from 'eslint-plugin-css-modules';
import cypress from 'eslint-plugin-cypress';
import filenames from 'eslint-plugin-filenames';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import jsonc from 'eslint-plugin-jsonc';
import markdownlint from 'eslint-plugin-markdownlint';
import nPlugin from 'eslint-plugin-n';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import noSecrets from 'eslint-plugin-no-secrets';
import onlyWarn from 'eslint-plugin-only-warn';
import optimizeRegex from 'eslint-plugin-optimize-regex';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import promise from 'eslint-plugin-promise';
import regexp from 'eslint-plugin-regexp';
import security from 'eslint-plugin-security';
import importSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import testingLibrary from 'eslint-plugin-testing-library';
import toml from 'eslint-plugin-toml';
import unicorn from 'eslint-plugin-unicorn';
import writeGoodComments from 'eslint-plugin-write-good-comments';
import yml from 'eslint-plugin-yml';
import globals from 'globals';

export const baseConfig = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.es2022,
    },
    sourceType: 'module',
  },
  linterOptions: {
    noInlineConfig: true,
    reportUnusedDisableDirectives: true,
  },
  plugins: {
    boundaries,
    compat,
    'css-modules': cssModules,
    cypress,
    filenames,
    html,
    import: importPlugin,
    jest,
    'jest-dom': jestDom,
    jsonc,
    markdownlint,
    n: nPlugin,
    'no-only-tests': noOnlyTests,
    'no-secrets': noSecrets,
    'only-warn': onlyWarn,
    'optimize-regex': optimizeRegex,
    perfectionist,
    prettier,
    promise,
    regexp,
    security,
    'simple-import-sort': importSort,
    sonarjs,
    'sort-destructure-keys': sortDestructureKeys,
    testing: testingLibrary,
    toml,
    unicorn,
    'write-good-comments': writeGoodComments,
    yml,
  },
  rules: {
    // Core ESLint rules
    ...js.configs.recommended.rules,

    // Import/Export rules
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/default': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    'import/first': 'error',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-absolute-path': 'error',
    'import/no-cycle': ['error', { ignoreExternal: true, maxDepth: 1 }],
    'import/no-duplicates': ['error', { 'prefer-inline': true }],
    'import/no-dynamic-require': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{js,ts}',
          '**/*.spec.{js,ts}',
          '**/test/**',
        ],
      },
    ],
    'import/no-import-module-exports': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-namespace': 'error',
    'import/no-relative-packages': 'error',
    'import/no-relative-parent-imports': [
      'error',
      { ignore: ['@/components', '@/utils', '@/types'] },
    ],
    'import/no-self-import': 'error',
    'import/no-unresolved': [
      'error',
      { amd: true, commonjs: true, ignore: ['^node:'] },
    ],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'builtin',
            pattern: 'node:*',
            position: 'before',
          },
          {
            group: 'external',
            pattern: '@*',
            position: 'after',
          },
          {
            group: 'internal',
            pattern: '@/**',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',

    // Unicorn rules for modern JavaScript
    ...unicorn.configs.all.rules,
    // Code quality rules
    complexity: ['error', { max: 15 }],
    'max-classes-per-file': ['error', 1],
    'max-depth': ['error', 4],
    'max-lines': [
      'error',
      { max: 500, skipBlankLines: true, skipComments: true },
    ],
    'max-lines-per-function': [
      'error',
      { max: 50, skipBlankLines: true, skipComments: true },
    ],
    'max-params': ['error', 4],
    'no-array-constructor': 'error',
    'no-await-in-loop': 'warn',
    'no-caller': 'warn',
    'no-constant-binary-expression': 'error',
    'no-constant-condition': 'error',
    'no-constructor-return': 'error',

    'no-duplicate-imports': 'error',
    'no-else-return': 'warn',
    'no-empty': 'off',
    'no-empty-pattern': 'off',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'warn',
    'no-floating-decimal': 'warn',

    'no-implicit-coercion': [
      'error',
      { boolean: false, number: true, string: true },
    ],
    'no-iterator': 'warn',
    'no-lonely-if': 'warn',
    'no-multi-str': 'warn',
    'no-new-object': 'error',
    'no-new-wrappers': 'warn',
    'no-octal-escape': 'error',
    // Other quality rules
    'no-only-tests/no-only-tests': 'warn',
    'no-param-reassign': 'warn',
    'no-promise-executor-return': ['error', { allowVoid: true }],
    'no-proto': 'warn',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-secrets/no-secrets': ['warn', { tolerance: 4.5 }],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-expressions': 'error',
    'no-unused-private-class-members': 'warn',
    'no-useless-call': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-rename': 'warn',
    'no-useless-return': 'warn',
    'no-var': 'error',
    'no-void': 'error',
    'no-with': 'warn',
    'optimize-regex/optimize-regex': 'warn',
    // Perfectionist rules for consistent ordering
    'perfectionist/sort-named-imports': [
      'error',
      {
        ignoreCase: true,
        order: 'asc',
        type: 'natural',
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        order: 'asc',
        type: 'natural',
      },
    ],
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-destructuring': ['warn', { array: false, object: true }],
    'prefer-exponentiation-operator': 'error',
    'prefer-object-has-own': 'error',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    // Prettier integration
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'lf',
        parser: 'babel',
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    // Promise rules
    'promise/always-return': 'warn',
    'promise/catch-or-return': 'warn',
    'promise/no-multiple-resolved': 'error',
    'promise/no-nesting': 'warn',
    'promise/no-return-wrap': 'warn',
    'promise/param-names': 'warn',
    'promise/prefer-await-to-callbacks': 'warn',
    'promise/prefer-await-to-then': 'warn',
    radix: 'warn',
    'regexp/no-missing-g-flag': 'error',
    'require-atomic-updates': ['error', { allowProperties: false }],
    // Security rules
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-unsafe-regex': 'error',
    'sonarjs/cognitive-complexity': ['warn', 15],

    'sonarjs/max-switch-cases': ['warn', 10],
    'sonarjs/no-duplicate-string': ['warn', { threshold: 5 }],
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-redundant-boolean': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 'warn',
    'sort-imports': 'off',

    'sort-vars': 'warn',
    strict: ['error', 'never'],

    'unicorn/expiring-todo-comments': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: { camelCase: true, pascalCase: true },
        ignore: ['.*.md'],
      },
    ],
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-useless-undefined': ['error', { checkArguments: true }],
    'unicorn/prefer-array-flat': ['error', { functions: ['flatten'] }],
    'unicorn/prefer-at': 'error',
    'unicorn/prefer-blob-reading-methods': 'error',
    'unicorn/prefer-string-replace-all': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        allowList: { e2e: true, params: true, props: true, ref: true },
        ignore: [/e2e/],
      },
    ],
    'unicorn/require-post-message-target-origin': 'error',
    'write-good-comments/write-good-comments': 'warn',

    yoda: 'error',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
    },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'] },
    },
    jest: { version: 29 },
    'json/json-with-comments-files': [],
    polyfills: [
      'Promise',
      'fetch',
      'URLSearchParams',
      'Array.prototype.includes',
    ],
  },
};
