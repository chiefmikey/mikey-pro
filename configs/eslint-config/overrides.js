// Modern overrides for different file types and frameworks
import path from 'node:path';

import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import markdown from '@eslint/markdown';
import cypress from 'eslint-plugin-cypress';
import importX from 'eslint-plugin-import-x';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import jsoncPlugin from 'eslint-plugin-jsonc';
import testingLibrary from 'eslint-plugin-testing-library';
import tomlPlugin from 'eslint-plugin-toml';
import jsoncParser from 'jsonc-eslint-parser';
import tomlParser from 'toml-eslint-parser';
import yamlParser from 'yaml-eslint-parser';

const currentDirectory = import.meta.dirname;

// TypeScript configuration
export const ts = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    ecmaVersion: 'latest',
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      extraFileExtensions: ['.vue', '.svelte'],
      project: path.join(currentDirectory, '../../tsconfig.json'),
      tsconfigRootDir: path.join(currentDirectory, '../..'),
    },
    sourceType: 'module',
  },
  rules: {
    // TypeScript-specific rules
    ...tsPlugin.configs.all.rules,
    ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
    ...importX.flatConfigs.typescript.rules,

    // Override some rules for better developer experience
    '@typescript-eslint/class-methods-use-this': 'off',
    '@typescript-eslint/consistent-generic-constructors': [
      'error',
      'constructor',
    ],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          parameterProperties: 'explicit',
          properties: 'off',
        },
      },
    ],
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/max-params': 'off',
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          'public-static-field',
          'public-static-method',
          'protected-static-field',
          'protected-static-method',
          'private-static-field',
          'private-static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
      },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/naming-convention': [
      'error',
      { format: ['PascalCase'], selector: ['typeLike'] },
      { format: ['PascalCase'], prefix: ['T'], selector: ['typeParameter'] },
      {
        custom: {
          match: false,
          regex: '^I[A-Z]',
        },
        format: ['PascalCase'],
        selector: ['interface'],
      },
    ],
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extraneous-class': [
      'warn',
      {
        allowConstructorOnly: false,
        allowEmpty: true,
        allowStaticOnly: false,
        allowWithDecorator: false,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/no-unsafe-enum-comparison': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-unary-minus': 'error',
    '@typescript-eslint/parameter-properties': [
      'error',
      { prefer: 'parameter-property' },
    ],
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-find': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': [
      'error',
      {
        checkAny: true,
        checkBigInt: true,
        checkBoolean: true,
        checkNumber: true,
        checkString: true,
        checkUnknown: true,
      },
    ],
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-return-this-type': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/promise-function-async': [
      'error',
      {
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
      },
    ],
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      { ignoreStringArrays: true },
    ],
    '@typescript-eslint/sort-type-constituents': 'error',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowNullableObject: false,
        allowNumber: false,
        allowString: false,
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
  },
  settings: {
    'import-x/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import-x/resolver': {
      typescript: { alwaysTryTypes: true },
    },
  },
};

// CSS files
export const css = {
  files: ['**/*.css'],
  rules: {
    'prettier/prettier': ['warn', { parser: 'css' }],
  },
};

// SCSS files
export const scss = {
  files: ['**/*.scss'],
  rules: {
    'prettier/prettier': ['warn', { parser: 'scss' }],
  },
};

// Less files
export const less = {
  files: ['**/*.less'],
  rules: {
    'prettier/prettier': ['warn', { parser: 'less' }],
  },
};

// YAML files
export const yaml = {
  files: ['**/*.yaml', '**/*.yml'],
  languageOptions: {
    parser: yamlParser,
  },
  rules: {
    'yml/block-mapping': 'error',
    'yml/block-mapping-question-indicator-newline': 'error',
    'yml/block-sequence': 'error',
    'yml/block-sequence-hyphen-indicator-newline': 'error',
    'yml/flow-mapping-curly-newline': 'error',
    'yml/flow-mapping-curly-spacing': 'error',
    'yml/flow-sequence-bracket-newline': 'error',
    'yml/flow-sequence-bracket-spacing': 'error',
    'yml/indent': ['error', 2],
    'yml/key-spacing': 'error',
    'yml/no-empty-document': 'error',
    'yml/no-empty-key': 'error',
    'yml/no-empty-mapping-value': 'error',
    'yml/no-empty-sequence-entry': 'error',
    'yml/no-irregular-whitespace': 'error',
    'yml/no-tab-indent': 'error',
    'yml/quotes': ['warn', { avoidEscape: true, prefer: 'double' }],
    'yml/require-string-key': 'error',
  },
};

// TOML files
export const toml = {
  files: ['**/*.toml'],
  languageOptions: {
    parser: tomlParser,
  },
  rules: {
    ...tomlPlugin.configs['flat/recommended'].reduce(
      (accumulator, config) => ({ ...accumulator, ...config.rules }),
      {},
    ),
    'prettier/prettier': 'off',
  },
};

// Markdown files — uses @eslint/markdown language plugin
export const md = {
  files: ['**/*.md'],
  language: 'markdown/commonmark',
  rules: {
    'markdown/fenced-code-language': 'error',
    'markdown/heading-increment': 'error',
    'markdown/no-duplicate-headings': 'error',
    'markdown/no-empty-links': 'error',
    'markdown/no-html': 'off',
    'markdown/no-invalid-label-refs': 'error',
    'markdown/no-missing-label-refs': 'error',
  },
};

// Package.json files
export const packageJson = {
  files: ['**/package.json'],
  languageOptions: {
    parser: jsoncParser,
  },
  rules: {
    ...jsoncPlugin.configs['flat/recommended-with-json'].reduce(
      (accumulator, config) => ({ ...accumulator, ...config.rules }),
      {},
    ),
    'prettier/prettier': ['warn', { parser: 'json' }],
  },
  settings: {
    'json/package-json-sort-order': [
      'name',
      'version',
      'description',
      'private',
      'main',
      'type',
      'types',
      'typings',
      'browser',
      'engines',
      'scripts',
      'husky',
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'files',
      'bin',
      'productName',
      'homepage',
      'repository',
      'bugs',
      'license',
      'keywords',
      'author',
      'contributors',
      'funding',
    ],
  },
};

// HTML files
export const htmlConfig = {
  files: ['**/*.html'],
  languageOptions: {
    parser: htmlParser,
  },
  rules: {
    ...html.configs['flat/recommended'].rules,
    '@html-eslint/element-newline': 'off',
    '@html-eslint/indent': 'off',
    '@html-eslint/no-extra-spacing-attrs': 'off',
    '@html-eslint/require-closing-tags': 'off',
    'prettier/prettier': ['warn', { parser: 'html' }],
    'spaced-comment': 'off',
    strict: 'off',
  },
};

// JSONC files
export const jsonc = {
  files: [
    '**/*.jsonc',
    '**/.babelrc',
    '**/.eslintrc',
    '**/.prettierrc',
    '**/.stylelintrc',
  ],
  languageOptions: {
    parser: jsoncParser,
  },
  rules: {
    ...jsoncPlugin.configs['flat/recommended-with-jsonc'].reduce(
      (accumulator, config) => ({ ...accumulator, ...config.rules }),
      {},
    ),
    'prettier/prettier': ['warn', { parser: 'json' }],
  },
};

// JSON5 files
export const json5 = {
  files: ['**/*.json5'],
  languageOptions: {
    parser: jsoncParser,
  },
  rules: {
    ...jsoncPlugin.configs['flat/recommended-with-json5'].reduce(
      (accumulator, config) => ({ ...accumulator, ...config.rules }),
      {},
    ),
    'prettier/prettier': ['warn', { parser: 'json5' }],
  },
};

// Jest JavaScript files
export const jestJs = {
  files: ['**/*.test.js', '**/__tests__/**/*.js'],
  languageOptions: {
    globals: { jest: true },
  },
  rules: {
    ...jest.configs['flat/all'].rules,
    // Jest DOM rules for testing-library assertions
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-focus': 'error',
    'jest-dom/prefer-in-document': 'error',
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'jest-dom/prefer-to-have-class': 'error',
    'jest-dom/prefer-to-have-style': 'error',
    'jest-dom/prefer-to-have-text-content': 'error',
    'jest-dom/prefer-to-have-value': 'error',
    // Testing Library rules
    'testing-library/await-async-queries': 'error',
    'testing-library/await-async-utils': 'error',
    'testing-library/no-await-sync-queries': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/no-dom-import': 'error',
    'testing-library/no-manual-cleanup': 'error',
    'testing-library/no-render-in-lifecycle': 'error',
    'testing-library/no-unnecessary-act': 'error',
    'testing-library/no-wait-for-multiple-assertions': 'error',
    'testing-library/prefer-explicit-assert': 'warn',
    'testing-library/prefer-find-by': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'testing-library/prefer-query-by-disappearance': 'error',
    'testing-library/prefer-screen-queries': 'error',
    'testing-library/render-result-naming-convention': 'error',
    // Disable rules requiring TypeScript type checking (not available in JS files)
    'jest/no-error-equal': 'off',
    'jest/no-unnecessary-assertion': 'off',
    'jest/unbound-method': 'off',
    'jest/valid-expect-with-promise': 'off',
    'jest/prefer-spy-on': 'warn',
    'jest/require-top-level-describe': 'error',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prevent-abbreviations': ['warn', { ignore: [/e2e/] }],
  },
};

// Jest TypeScript files
export const jestTs = {
  files: ['**/*.test.ts', '**/__tests__/**/*.ts'],
  languageOptions: {
    globals: { jest: true },
    parser: tsParser,
  },
  rules: {
    ...jest.configs['flat/all'].rules,
    // Jest DOM rules for testing-library assertions
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-focus': 'error',
    'jest-dom/prefer-in-document': 'error',
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'jest-dom/prefer-to-have-class': 'error',
    'jest-dom/prefer-to-have-style': 'error',
    'jest-dom/prefer-to-have-text-content': 'error',
    'jest-dom/prefer-to-have-value': 'error',
    // Testing Library rules
    'testing-library/await-async-queries': 'error',
    'testing-library/await-async-utils': 'error',
    'testing-library/no-await-sync-queries': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/no-dom-import': 'error',
    'testing-library/no-manual-cleanup': 'error',
    'testing-library/no-render-in-lifecycle': 'error',
    'testing-library/no-unnecessary-act': 'error',
    'testing-library/no-wait-for-multiple-assertions': 'error',
    'testing-library/prefer-explicit-assert': 'warn',
    'testing-library/prefer-find-by': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'testing-library/prefer-query-by-disappearance': 'error',
    'testing-library/prefer-screen-queries': 'error',
    'testing-library/render-result-naming-convention': 'error',
    'jest/prefer-spy-on': 'warn',
    'jest/require-top-level-describe': 'error',
    'jest/unbound-method': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prevent-abbreviations': ['warn', { ignore: [/e2e/] }],
  },
};

// Cypress files
export const cypressConfig = {
  files: ['**/*.cy.*'],
  rules: {
    ...cypress.configs.recommended.rules,
  },
};

// Export all overrides
export const baseOverrides = [
  ts,
  css,
  scss,
  less,
  yaml,
  toml,
  md,
  packageJson,
  htmlConfig,
  jsonc,
  json5,
  jestJs,
  jestTs,
  cypressConfig,
];
