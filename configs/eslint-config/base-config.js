// Base configuration for Mikey Pro ESLint
import js from '@eslint/js';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import markdown from '@eslint/markdown';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundaries from 'eslint-plugin-boundaries';
import compat from 'eslint-plugin-compat';
import cypress from 'eslint-plugin-cypress';
import importX from 'eslint-plugin-import-x';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import jsonc from 'eslint-plugin-jsonc';
import nPlugin from 'eslint-plugin-n';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import noSecrets from 'eslint-plugin-no-secrets';

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
import yml from 'eslint-plugin-yml';
import globals from 'globals';

// Global plugin registration — available to all config objects
// No `files` restriction so plugins are accessible everywhere
export const globalPlugins = {
  plugins: {
    '@html-eslint': html,
    '@typescript-eslint': tsPlugin,
    boundaries,
    compat,
    cypress,
    'import-x': importX,
    jest,
    'jest-dom': jestDom,
    jsonc,
    markdown,
    n: nPlugin,
    'no-only-tests': noOnlyTests,
    'no-secrets': noSecrets,
    perfectionist,
    prettier,
    promise,
    regexp,
    security,
    'simple-import-sort': importSort,
    sonarjs,
    'sort-destructure-keys': sortDestructureKeys,
    'testing-library': testingLibrary,
    toml,
    unicorn,
    yml,
  },
};

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
  rules: {
    // Core ESLint rules
    ...js.configs.recommended.rules,

    // Core ESLint best practices
    'accessor-pairs': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'consistent-return': 'error',
    curly: ['error', 'all'],
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-notation': 'warn',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',

    // Import/Export rules
    'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import-x/default': 'off',
    'import-x/export': 'error',
    'import-x/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    'import-x/first': 'error',
    'import-x/named': 'off',
    'import-x/namespace': 'off',
    'import-x/newline-after-import': 'error',
    'import-x/no-absolute-path': 'error',
    'import-x/no-cycle': ['error', { ignoreExternal: true, maxDepth: 1 }],
    'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
    'import-x/no-dynamic-require': 'error',
    'import-x/no-empty-named-blocks': 'error',
    'import-x/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{js,ts}',
          '**/*.spec.{js,ts}',
          '**/test/**',
        ],
      },
    ],
    'import-x/no-import-module-exports': 'error',
    'import-x/no-mutable-exports': 'error',
    'import-x/no-named-as-default-member': 'off',
    'import-x/no-named-default': 'error',
    'import-x/no-namespace': 'error',
    'import-x/no-relative-packages': 'error',
    'import-x/no-relative-parent-imports': [
      'error',
      { ignore: ['@/components', '@/utils', '@/types'] },
    ],
    'import-x/no-self-import': 'error',
    'import-x/no-unresolved': [
      'error',
      { amd: true, commonjs: true, ignore: ['^node:'] },
    ],
    'import-x/no-useless-path-segments': 'error',
    'import-x/no-webpack-loader-syntax': 'error',
    'import-x/order': [
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
    // Compatibility rules
    'compat/compat': 'warn',

    // Code quality rules
    complexity: ['error', { max: 12 }],
    'max-classes-per-file': ['error', 1],
    'max-depth': ['error', 3],
    'max-lines': [
      'error',
      { max: 300, skipBlankLines: true, skipComments: true },
    ],
    'max-lines-per-function': [
      'error',
      { max: 50, skipBlankLines: true, skipComments: true },
    ],
    'max-params': ['error', 3],
    // Node.js rules
    'n/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules', 'dynamicImport'],
        version: '>=20.0.0',
      },
    ],

    'no-alert': 'warn',
    'no-array-constructor': 'error',
    'no-await-in-loop': 'warn',
    'no-bitwise': 'error',
    'no-caller': 'warn',
    'no-console': 'warn',
    'no-constant-binary-expression': 'error',
    'no-constant-condition': 'error',
    'no-constructor-return': 'error',
    'no-continue': 'error',
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'warn',
    'no-empty': 'off',
    'no-empty-pattern': 'off',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'warn',
    'no-floating-decimal': 'warn',
    'no-implicit-coercion': [
      'error',
      { boolean: false, number: true, string: true },
    ],
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'warn',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'warn',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'warn',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'warn',
    'no-octal-escape': 'error',
    // Other quality rules
    'no-only-tests/no-only-tests': 'warn',
    'no-param-reassign': 'warn',
    'no-promise-executor-return': ['error', { allowVoid: true }],
    'no-proto': 'warn',
    'no-restricted-syntax': [
      'warn',
      {
        message:
          'for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries} instead.',
        selector: 'ForInStatement',
      },
      {
        message:
          'Labels are a form of GOTO; using them makes code confusing.',
        selector: 'LabeledStatement',
      },
      {
        message: '`with` is disallowed in strict mode.',
        selector: 'WithStatement',
      },
      {
        message: 'Provide initialValue to reduce.',
        selector:
          "CallExpression[callee.property.name='reduce'][arguments.length<2]",
      },
    ],
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-secrets/no-secrets': ['warn', { tolerance: 4.5 }],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
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
    'no-warning-comments': 'warn',
    'no-with': 'warn',
    'object-shorthand': 'warn',
    'one-var': ['error', 'never'],
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
    'promise/no-callback-in-promise': 'warn',
    'promise/no-multiple-resolved': 'error',
    'promise/no-nesting': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-return-in-finally': 'warn',
    'promise/no-return-wrap': 'warn',
    'promise/param-names': 'warn',
    'promise/prefer-await-to-callbacks': 'warn',
    'promise/prefer-await-to-then': 'warn',
    'promise/valid-params': 'warn',
    radix: 'warn',
    'regexp/no-missing-g-flag': 'error',
    'regexp/no-useless-flag': 'error',
    'regexp/prefer-d': 'error',
    'regexp/prefer-plus-quantifier': 'error',
    'regexp/prefer-question-quantifier': 'error',
    'regexp/prefer-star-quantifier': 'error',
    'require-atomic-updates': ['error', { allowProperties: false }],
    'require-unicode-regexp': 'error',
    // Security rules
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'warn',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-new-buffer': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-object-injection': 'warn',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error',
    'security/detect-unsafe-regex': 'error',
    'sonarjs/cognitive-complexity': ['warn', 12],
    'sonarjs/max-switch-cases': ['warn', 10],
    'sonarjs/no-all-duplicated-branches': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-collection-size-mischeck': 'warn',
    'sonarjs/no-duplicate-string': ['warn', { threshold: 5 }],
    'sonarjs/no-duplicated-branches': 'warn',
    'sonarjs/no-identical-conditions': 'warn',
    'sonarjs/no-identical-expressions': 'warn',
    'sonarjs/no-inverted-boolean-check': 'warn',
    'sonarjs/no-nested-switch': 'warn',
    'sonarjs/no-nested-template-literals': 'warn',
    'sonarjs/no-redundant-boolean': 'warn',
    'sonarjs/no-redundant-jump': 'warn',
    'sonarjs/no-small-switch': 'warn',
    'sonarjs/no-unused-collection': 'warn',
    'sonarjs/no-use-of-empty-return-value': 'warn',
    'sonarjs/no-useless-catch': 'warn',
    'sonarjs/prefer-immediate-return': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'sonarjs/prefer-single-boolean-return': 'warn',
    'sonarjs/prefer-while': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 'warn',
    'sort-imports': 'off',

    'sort-vars': 'warn',
    'spaced-comment': ['warn', 'always'],
    strict: ['error', 'never'],
    'symbol-description': 'error',

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

    yoda: 'error',
  },
  settings: {
    'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
    'import-x/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
    },
    'import-x/resolver': {
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
