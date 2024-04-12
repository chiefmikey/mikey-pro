const path = require('node:path');

const baseConfig = require('@mikey-pro/eslint-config');

module.exports = {
  ...baseConfig,
  overrides: [
    ...baseConfig.overrides,
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/all',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'plugin:@angular-eslint/all',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: path.join(__dirname, '../../..'),
      },
      rules: {
        '@angular-eslint/directive-selector': [
          'warn',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'warn',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/prefer-standalone': 'off',
        '@angular-eslint/prefer-standalone-component': 'off',
        '@angular-eslint/consistent-component-styles': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/parameter-properties': 'off',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'warn',
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'explicit',
              constructors: 'no-public',
              methods: 'no-public',
              properties: 'off',
              parameterProperties: 'explicit',
            },
          },
        ],
        'prettier/prettier': ['warn', { parser: 'typescript' }],
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@html-eslint/recommended',
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
        'plugin:prettier/recommended',
      ],
      parser: '@angular-eslint/template-parser',
      plugins: ['@html-eslint'],
      rules: {
        '@html-eslint/indent': 'off',
        '@html-eslint/no-extra-spacing-attrs': 'off',
        '@html-eslint/require-closing-tags': 'off',
        '@html-eslint/element-newline': 'off',
        'disable-autofix/@html-eslint/require-closing-tags': [
          'warn',
          { selfClosing: 'always' },
        ],
        'spaced-comment': 'off',
        '@angular-eslint/template/alt-text': 'warn',
        strict: 'off',
        'prettier/prettier': [
          'warn',
          {
            parser: 'angular',
          },
        ],
      },
    },
  ],
};
