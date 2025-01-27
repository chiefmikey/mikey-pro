import baseConfig from '@mikey-pro/eslint-config';
import angularPlugin from '@angular-eslint/eslint-plugin';
import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularAll from '@angular-eslint/eslint-plugin/dist/configs/all';
import angularTemplateRecommended from '@angular-eslint/eslint-plugin-template/dist/configs/recommended';
import angularTemplateAccessibility from '@angular-eslint/eslint-plugin-template/dist/configs/accessibility';
import angularTemplateProcessInline from '@angular-eslint/eslint-plugin/dist/configs/template/process-inline-templates';
import overrides from '@mikey-pro/eslint-config/overrides';

const angularConfig = [
  ...baseConfig,
  {
    files: ['*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...overrides.ts.languageOptions.parserOptions,
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': typeScriptPlugin,
    },
    rules: {
      ...angularAll.rules,
      ...angularTemplateProcessInline.rules,
      ...overrides.ts.rules,
      'unicorn/filename-case': 'off',
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
          prefix: '',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/consistent-type-imports': 'off',
      'import/extensions': ['warn', 'ignorePackages', { ts: 'never' }],
      'prettier/prettier': ['warn', { parser: 'typescript' }],
    },
    settings: {
      ...baseConfig.settings,
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ['*.html'],
    languageOptions: {
      parser: '@angular-eslint/template-parser',
      parserOptions: {
        ...overrides.html.languageOptions.parserOptions,
      },
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplateRecommended.rules,
      ...angularTemplateAccessibility.rules,
      ...overrides.html.rules,
      '@angular-eslint/template/alt-text': 'warn',
      '@html-eslint/element-newline': 'off',
      'prettier/prettier': [
        'warn',
        {
          parser: 'angular',
        },
      ],
    },
  },
];

export default angularConfig;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = angularConfig;
}
