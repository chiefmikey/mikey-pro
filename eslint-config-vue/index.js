// Modern Vue ESLint configuration for Mikey Pro
import { baseConfig } from '@mikey-pro/eslint-config/base-config.js';
import { baseOverrides } from '@mikey-pro/eslint-config/overrides.js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

// Vue-specific configuration
const vueConfig = {
  files: ['**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    vue,
  },
  rules: {
    // Vue rules
    ...vue.configs['vue3-recommended'].rules,

    // Basic Vue-specific overrides
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/html-button-has-type': 'error',
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': [
      'error',
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
    'vue/max-attributes-per-line': [
      'error',
      {
        multiline: { max: 1 },
        singleline: { max: 1 },
      },
    ],
    'vue/multi-word-component-names': 'error',
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-multiple-template-root': 'off', // Vue 3 allows multiple roots
    'vue/no-mutating-props': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-unused-vars': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-v-html': 'error',
    'vue/no-v-model-argument': 'off', // Vue 3 supports v-model arguments
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/require-component-is': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/require-v-for-key': 'error',
    'vue/script-indent': ['error', 2, { baseIndent: 0 }],
    'vue/this-in-template': 'error',
    'vue/use-v-on-exact': 'error',
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/v-on-function-call': 'error',
    'vue/valid-define-emits': 'error',
    'vue/valid-define-props': 'error',
    'vue/valid-next-tick': 'error',
    'vue/valid-template-root': 'off', // Vue 3 allows multiple roots
    'vue/valid-v-bind-sync': 'error',
    'vue/valid-v-cloak': 'error',
    'vue/valid-v-else': 'error',
    'vue/valid-v-else-if': 'error',
    'vue/valid-v-for': 'error',
    'vue/valid-v-html': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-is': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-slot': 'error',
    'vue/valid-v-text': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};

// Export the complete Vue configuration
export default [
  // Global ignores
  {
    ignores: [
      '**/dist/**/*',
      '**/vendor/**/*',
      '**/node_modules/**/*',
      '**/coverage/**/*',
      '**/.next/**/*',
      '**/.nuxt/**/*',
      '**/.output/**/*',
      '**/.vite/**/*',
      '**/build/**/*',
      '**/out/**/*',
      '*.properties',
      '*.cclibs',
      '*.svg',
      '*.png',
      '*.jpg',
      '*.jpeg',
      '*.gif',
      '*.ico',
      '*.webp',
      '*.aco',
      '*.psd',
      '*.ai',
      '*.ase',
      '*.sh',
      '*.bat',
      '*.cmd',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      'LICENSE',
      'CNAME',
      '*.min.js',
      '*.min.css',
    ],
  },

  // Base configuration
  baseConfig,

  // Vue-specific configuration
  vueConfig,

  // File-specific overrides
  ...baseOverrides,
];

// Export individual components for advanced usage
export { baseConfig } from '@mikey-pro/eslint-config/base-config.js';
export { baseOverrides } from '@mikey-pro/eslint-config/overrides.js';
