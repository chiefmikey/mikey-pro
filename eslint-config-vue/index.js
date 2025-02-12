import baseConfig from '@mikey-pro/eslint-config';
import vuePlugin from 'eslint-plugin-vue';
import vueRecommended from 'eslint-plugin-vue/lib/configs/vue3-recommended.js';

const vueConfig = [
  ...baseConfig,
  {
    files: ['*.vue'],
    languageOptions: {
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: {
          js: '@babel/eslint-parser',
          ts: '@typescript-eslint/parser',
          '<template>': 'espree'
        },
        babelOptions: {
          plugins: [
            [
              '@babel/plugin-transform-react-jsx',
              {
                pragma: 'h',
                pragmaFrag: 'Fragment',
                runtime: 'automatic',
              },
            ],
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
              },
            ],
          ],
        },
        ecmaVersion: 'latest',
        requireConfigFile: false,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        vueFeatures: {
          filter: true,
          interpolationAsNonHTML: false,
          styleCSSVariableInjection: true
        }
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      ...vueRecommended.rules,

      // Vue 3 Composition API
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/no-ref-object-destructure': 'error',
      'vue/no-setup-props-destructure': 'error',

      // Best Practices
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-separate-static-class': 'error',

      // Performance
      'vue/no-async-in-computed-properties': 'error',
      'vue/no-static-inline-styles': 'warn',

      // Type Safety
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/match-component-file-name': ['error', {
        extensions: ['vue'],
        shouldMatchCase: true
      }],
      'vue/component-options-name-casing': ['error', 'PascalCase'],

      // Best Practices
      'vue/no-required-prop-with-default': 'error',
      'vue/require-typed-ref': 'error',
      'vue/valid-define-props': 'error',

      // Existing rules...
      'vue/component-tags-order': [
        'warn',
        {
          order: [['script', 'template'], 'style'],
        },
      ],
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            component: 'always',
            normal: 'always',
            void: 'always',
          },
          math: 'always',
          svg: 'always',
        },
      ],
      'vue/singleline-html-element-content-newline': 'off',
      'prettier/prettier': ['warn', { parser: 'vue' }],

      // Enhanced Type Safety
      'vue/no-export-in-script-setup': 'error',

      // Script Setup
      'vue/no-undef-components': ['error', {
        ignorePatterns: ['router-view', 'router-link'],
      }],

      // Composables
      'vue/custom-event-name-casing': ['error', 'camelCase', {
        ignore: []
      }],

      // Security
      'vue/no-unescaped-html': 'error',
      'vue/no-potential-component-option-typo': 'error',
      'vue/no-restricted-component-options': ['error', {
        name: 'data',
        message: 'Use setup() instead'
      }],
      'vue/no-restricted-v-bind': ['error', '/^v-/'],
      'vue/no-restricted-html-elements': [
        'error',
        'iframe',
        'object',
        'embed'
      ],
      'vue/no-use-v-if-with-v-for': ['error', {
        allowUsingIterationVar: false
      }],

      // Optimization
      'vue/no-unused-properties': ['error', {
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
        deepData: true
      }],
      'vue/no-unused-refs': 'error',
      'vue/valid-next-tick': 'error',

      // Performance
      'vue/no-parsing-error': ['error', {
        'invalid-first-character-of-tag-name': false
      }],
      'vue/no-unused-components': ['error', {
        ignoreWhenBindingPresent: true
      }],
      'vue/valid-v-slot': ['error', {
        allowModifiers: true
      }],

      // Advanced Vue 3 Features
      'vue/prefer-true-attribute-shorthand': ['error', 'always'],
      'vue/v-on-function-call': ['error', 'never'],
      'vue/no-empty-component-block': 'error',
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', 'default']
      }],

      // Performance Optimizations
      'vue/no-deprecated-filter': 'error',
      'vue/prefer-template': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-empty-pattern': 'error',

      // Type Safety
      'vue/block-tag-newline': ['error', {
        singleline: 'always',
        multiline: 'always',
        maxEmptyLines: 1
      }],

      // Enhanced Performance
      'vue/no-child-content': ['error', {
        'ignoreSlots': ['default']
      }],

      // Better Type Safety
      'vue/define-props-declaration': ['error', {
        'type-based': true,
        'required': true
      }],
      'vue/define-emits-declaration': ['error', {
        'type-based': true
      }],

      // Component Organization
      'vue/block-order': ['error', {
        'order': [
          'script:not([setup])',
          'script[setup]',
          'template',
          'style:not([scoped])',
          'style[scoped]'
        ]
      }],

      // Vue 3.4+ Features
      'vue/next-tick-style': ['error', 'promise'],
      'vue/require-typed-object-prop': 'error',
      'vue/no-deprecated-model-definition': ['error', {
        allowVue3Compat: false
      }],

      // Memory Optimization
      'vue/no-ref-as-operand': 'error',
      'vue/prefer-import-from-vue': ['error', {
        disallowVuePath: true
      }],
      'vue/no-side-effects-in-computed-properties': ['error', {
        enforceForEventHandlers: true
      }],

      // Strict Mode Features
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: true,
        ignores: []
      }],
      'vue/define-macros-order': ['error', {
        order: [
          'defineOptions',
          'defineSlots',
          'defineEmits',
          'defineModel',
          'defineProps'
        ]
      }],

      // Performance Optimizations
      'vue/no-static-style': 'error',
      'vue/no-undef-properties': ['error', {
        ignores: ['/^\$/']
      }],

      // Script Setup Safety
      'vue/script-setup-uses-vars': ['error', {
        checkTemplate: true
      }],
      'vue/valid-define-options': ['error', {
        presetName: 'script-setup'
      }],

      // Performance Optimizations
      'vue/prefer-define-options': ['error', {
        presets: ['composition-api', 'script-setup']
      }],
      'vue/no-duplicate-attr-inheritance': ['error', {
        ignoreKeys: ['class', 'style', 'key', 'ref']
      }],

      // Type Safety
      'vue/no-setup-props-reactivity-loss': 'error',
      'vue/no-watch-after-await': 'error',
      'vue/prefer-prop-type-inference': ['error', {
        allowAny: false
      }]
    },
    settings: {
      ...baseConfig.settings,
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.*.json']
        }
      },
      'import/core-modules': ['vue', '@vue/composition-api', '@vue/runtime-core', '@vue/runtime-dom'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.vue', '.d.ts'],
      },
      'vue': {
        version: '3.4'
      }
    }
  },
];

export default vueConfig;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = vueConfig;
}
