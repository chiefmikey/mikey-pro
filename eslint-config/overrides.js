import path from 'node:path';
import { fileURLToPath } from 'node:url';

import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import markdownPlugin from 'eslint-plugin-markdownlint';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const ts = {
  files: ['*.ts', '*.tsx'],
  languageOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue', '.svelte'],
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: path.join(currentDirectory, '../../..'),
  },
  plugins: {
    '@typescript-eslint': typeScriptPlugin,
    import: importPlugin,
  },
  rules: {
    ...typeScriptPlugin.configs.all.rules,
    ...typeScriptPlugin.configs['recommended-requiring-type-checking'].rules,
    ...importPlugin.configs.typescript.rules,
    '@typescript-eslint/class-methods-use-this': 'off',
    '@typescript-eslint/consistent-generic-constructors': [
      'error',
      'constructor',
    ],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
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
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
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
      {
        format: ['PascalCase'],
        selector: ['typeLike'],
      },
      {
        format: ['PascalCase'],
        prefix: ['T'],
        selector: ['typeParameter'],
      },
      {
        custom: {
          match: false,
          message: 'Interface name should not be prefixed with "I"',
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
      {
        checksVoidReturn: false,
      },
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
    '@typescript-eslint/no-useless-template-literals': 'error',
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
    'deprecation/deprecation': 'warn',
    'prettier/prettier': ['warn', { parser: 'typescript' }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};

const css = {
  files: ['*.css'],
  rules: {
    'prettier/prettier': ['warn', { parser: 'css' }],
  },
};

const scss = {
  files: ['*.scss'],
  rules: {
    'prettier/prettier': ['warn', { parser: 'scss' }],
  },
};

const less = {
  files: ['*.less'],
  rules: {
    'prettier/prettier': ['warn', { parser: 'less' }],
  },
};

const yaml = {
  extends: ['plugin:yml/standard'],
  files: ['*.yaml', '*.yml'],
  parser: 'yaml-eslint-parser',
  rules: {
    'prettier/prettier': ['warn', { parser: 'yaml', singleQuote: false }],
    'yml/quotes': ['warn', { avoidEscape: true, prefer: 'double' }],
  },
};

const toml = {
  extends: ['plugin:toml/standard'],
  files: ['*.toml'],
  parser: 'toml-eslint-parser',
  rules: {
    'prettier/prettier': 'off',
  },
};

const md = {
  files: ['*.md'],
  plugins: {
    markdownlint: markdownPlugin,
  },
  rules: {
    ...markdownPlugin.configs.recommended.rules,
    'markdownlint/md033': 'off',
    'markdownlint/md041': 'off',
    'prettier/prettier': ['warn', { parser: 'markdown' }],
  },
};

const packageJson = {
  files: ['package.json'],
  rules: {
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

const mdJson = {
  files: ['*.md.json'],
  rules: {
    'prettier/prettier': ['warn', { parser: 'json' }],
  },
};

const html = {
  extends: ['plugin:@html-eslint/recommended'],
  files: ['*.html'],
  parser: '@html-eslint/parser',
  plugins: ['@html-eslint'],
  rules: {
    '@html-eslint/element-newline': 'off',
    '@html-eslint/indent': 'off',
    '@html-eslint/no-extra-spacing-attrs': 'off',
    '@html-eslint/require-closing-tags': 'off',
    'disable-autofix/@html-eslint/require-closing-tags': [
      'warn',
      { selfClosing: 'always' },
    ],
    'prettier/prettier': ['warn', { parser: 'html' }],
    'spaced-comment': 'off',
    strict: 'off',
  },
};

const jsonc = {
  extends: ['plugin:jsonc/recommended-with-jsonc'],
  files: ['*.jsonc', '*rc'],
  parser: 'jsonc-eslint-parser',
  rules: {
    'prettier/prettier': ['warn', { parser: 'json' }],
  },
};

const json5 = {
  extends: ['plugin:jsonc/recommended-with-json5'],
  files: ['*.json5'],
  parser: 'jsonc-eslint-parser',
  rules: {
    'prettier/prettier': ['warn', { parser: 'json5' }],
  },
};

const jestJs = {
  env: {
    jest: true,
  },
  extends: ['plugin:jest/all'],
  files: ['*.test.js', '**/__tests__/**/*.js'],
  plugins: {
    jest: jestPlugin,
  },
  rules: {
    'jest/prefer-spy-on': 'warn',
    'jest/require-top-level-describe': 'error',
    'jest/unbound-method': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        ignore: [/e2e/],
      },
    ],
  },
};

const jestTs = {
  env: {
    jest: true,
  },
  extends: ['plugin:jest/all'],
  files: ['*.test.ts', '**/__tests__/**/*.ts'],
  parser: '@typescript-eslint/parser',
  plugins: {
    '@typescript-eslint': typeScriptPlugin,
    jest: jestPlugin,
  },
  rules: {
    'jest/prefer-spy-on': 'warn',
    'jest/require-top-level-describe': 'error',
    'jest/unbound-method': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        ignore: [/e2e/],
      },
    ],
  },
};

const cypress = {
  extends: ['plugin:cypress/recommended'],
  files: ['*.cy.*'],
  mdJson,
  plugins: ['cypress'],
};

export const baseOverrides = [
  ts,
  css,
  scss,
  less,
  yaml,
  toml,
  md,
  packageJson,
  mdJson,
  html,
  jsonc,
  json5,
  jestJs,
  jestTs,
  cypress,
];
