import path from 'node:path';
import typescriptParser from '@typescript-eslint/parser';
import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import markdownPlugin from 'eslint-plugin-markdownlint';

const ts = {
  files: ['*.ts', '*.tsx'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      extraFileExtensions: ['.vue', '.svelte'],
      sourceType: 'module',
      project: 'tsconfig.json',
      tsconfigRootDir: path.join(__dirname, '../../..'),
    },
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
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
        disallowTypeAnnotations: false,
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
          properties: 'off',
          parameterProperties: 'explicit',
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
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-extraneous-class': [
      'warn',
      {
        allowEmpty: true,
        allowConstructorOnly: false,
        allowStaticOnly: false,
        allowWithDecorator: false,
      },
    ],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/parameter-properties': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
    'prettier/prettier': ['warn', { parser: 'typescript' }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
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
    'yml/quotes': ['warn', { prefer: 'double', avoidEscape: true }],
    'prettier/prettier': ['warn', { parser: 'yaml', singleQuote: false }],
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
  languageOptions: {
    parser: 'eslint-plugin-markdownlint/parser',
  },
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
  files: ['*.html'],
  extends: ['plugin:@html-eslint/recommended'],
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
    'spaced-comment': 'off',
    strict: 'off',
    'prettier/prettier': ['warn', { parser: 'html' }],
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
  files: ['*.test.js'],
  plugins: ['jest'],
  extends: ['plugin:jest/all'],
  env: {
    jest: true,
  },
  rules: {
    'unicorn/no-array-callback-reference': 'off',
    'jest/unbound-method': 'off',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        ignore: [/e2e/],
      }
    ],
  },
};

const jestTs = {
  files: ['*.test.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['plugin:jest/all'],
  env: {
    jest: true,
  },
  rules: {
    'unicorn/no-array-callback-reference': 'off',
    'jest/unbound-method': 'off',
    'unicorn/prevent-abbreviations': [
      'warn',
      {
        ignore: [/e2e/],
      }
    ],
  },
};

const cypress = {
  files: ['*.cy.*'],
  plugins: ['cypress'],
  extends: ['plugin:cypress/recommended'],
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
