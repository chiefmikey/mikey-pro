const baseConfig = require('@mikey-pro/eslint-config');
const overrides = require('@mikey-pro/eslint-config/overrides');

module.exports = {
  ...baseConfig,
  overrides: [
    ...baseConfig.overrides,
    {
      ...overrides.ts,
      extends: [
        ...overrides.ts.extends,
        'plugin:@angular-eslint/all',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      rules: {
        ...overrides.ts.rules,
        '@angular-eslint/component-selector': [
          'warn',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/consistent-component-styles': 'off',
        '@angular-eslint/directive-selector': [
          'warn',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/prefer-on-push-component-change-detection': 'off',
        '@angular-eslint/prefer-standalone': 'off',
        '@angular-eslint/prefer-standalone-component': 'off',
        'prettier/prettier': ['warn', { parser: 'typescript' }],
      },
    },
    {
      ...overrides.html,
      extends: [
        ...overrides.html.extends,
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      parser: '@angular-eslint/template-parser',
      rules: {
        ...overrides.html.rules,
        '@angular-eslint/template/alt-text': 'warn',
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
