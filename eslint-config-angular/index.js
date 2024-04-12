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
        'prettier/prettier': ['warn', { parser: 'angular' }],
      },
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: [
        'plugin:@angular-eslint/template/all',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': [
          'warn',
          {
            parser: 'angular',
          },
        ],
        '@angular-eslint/template/alt-text': 'warn',
      },
    },
  ],
};
