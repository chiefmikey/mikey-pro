import baseConfig from '@mikey-pro/eslint-config';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
import * as typeScriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
const angularConfig = [
  ...baseConfig,
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: typeScriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.*.json'],
        createDefaultProgram: false
      }
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': typeScriptPlugin,
    },
    rules: {
      ...angularAll.rules,
      ...angularTemplateProcessInline.rules,
      ...overrides.ts.rules,
      // Angular specific (deduplicated, only last occurrence kept)
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'warn',
      '@angular-eslint/use-injectable-provided-in': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/template/accessibility-valid-aria': 'error',
      '@angular-eslint/template/no-duplicate-attributes': 'error',
      '@angular-eslint/template/use-track-by-function': ['error', { trackByPrefix: 'trackBy' }],
      'unicorn/filename-case': 'off',
      '@angular-eslint/component-selector': [
        'warn',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/consistent-component-styles': 'off',
      '@angular-eslint/directive-selector': [
        'warn',
        { type: 'attribute', prefix: '', style: 'kebab-case' },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/consistent-type-imports': 'off',
      'import/extensions': ['warn', 'ignorePackages', { ts: 'never' }],
      'prettier/prettier': ['warn', { parser: 'typescript' }],
      '@angular-eslint/no-forward-ref': 'error',
      '@angular-eslint/no-output-native': ['error', { allowSignals: true }],
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/prefer-output-readonly': ['error', { allowProtected: true, allowSignals: true }],
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/relative-url-prefix': 'error',
      '@angular-eslint/rxjs-prefer-angular-takeuntil': 'error',
      '@angular-eslint/rxjs-prefer-angular-async-pipe': 'warn',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/no-call-expression': 'error',
      '@angular-eslint/prefer-standalone-component': ['error', { checkProviders: true, checkStyles: true }],
      '@angular-eslint/no-host-metadata-property': ['error', { allowStatic: true }],
      '@angular-eslint/prefer-on-push-component-change-detection': ['error', { allowDefault: false }],
      '@angular-eslint/use-component-selector': ['error', { checkCustomElements: true }]
    },
    settings: {
      ...baseConfig.settings,
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
      },
      'import/internal-regex': '^@(core|shared|features)/',
    },
  },
  {
    files: ['*.component.html'],
    languageOptions: {
      parser: angularTemplateParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.*.json'],
        templateParser: {
          checkAttributes: true,
          checkElements: true
        }
      }
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
