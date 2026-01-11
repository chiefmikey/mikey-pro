// Modern React ESLint configuration for Mikey Pro
import { baseConfig } from '../eslint-config/base-config.js';
import { baseOverrides } from '../eslint-config/overrides.js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPerf from 'eslint-plugin-react-perf';
import reactRefresh from 'eslint-plugin-react-refresh';

// React-specific configuration
const reactConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    sourceType: 'module',
  },
  plugins: {
    'jsx-a11y': jsxA11y,
    react,
    'react-hooks': reactHooks,
    'react-perf': reactPerf,
    'react-refresh': reactRefresh,
  },
  rules: {
    // React rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...reactHooks.configs.recommended.rules,
    ...jsxA11y.configs.recommended.rules,

    // JSX A11y rules
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/control-has-associated-label': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
    'jsx-a11y/no-noninteractive-tabindex': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    // React Hooks rules
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    // React Performance rules
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',
    'react-perf/jsx-no-new-object-as-prop': 'warn',
    // React Refresh rules
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
        allowExportNames: ['default'],
      },
    ],
    // React-specific overrides
    'react/boolean-prop-naming': [
      'error',
      {
        message:
          'Boolean prop names should start with "is", "has", "should", "can", "will", or "did"',
        propTypeNames: ['bool'],
        rule: '^(is|has|should|can|will|did)[A-Z]([A-Za-z0-9]?)+',
      },
    ],
    'react/button-has-type': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/hook-use-state': 'error',
    'react/iframe-missing-sandbox': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        children: 'never',
        props: 'never',
      },
    ],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-handler-names': [
      'error',
      {
        checkInlineFunction: true,
        checkLocalVariables: true,
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowBind: false,
        allowFunctions: false,
        ignoreDOMComponents: true,
        ignoreRefs: true,
      },
    ],

    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-leaked-render': 'error',

    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        allowNamespace: true,
        ignore: [],
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'warn',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-is-mounted': 'error',
    'react/no-namespace': 'error',
    'react/no-object-type-as-default-prop': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'error',
    'react/no-unstable-nested-components': 'error',
    'react/no-unused-class-component-methods': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'off', // Handled by TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    'react/require-default-props': 'off', // Handled by TypeScript
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'instance-variables',
          'lifecycle',
          '/^on.+$/',
          'everything-else',
          'render',
        ],
      },
    ],
    'react/sort-default-props': 'error',
    'react/sort-prop-types': 'error',

    'react/state-in-constructor': 'error',

    'react/static-property-placement': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
};

// Export the complete React configuration
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

  // React-specific configuration
  reactConfig,

  // File-specific overrides
  ...baseOverrides,
];

// Export individual components for advanced usage
export { baseConfig } from '../eslint-config/base-config.js';
export { baseOverrides } from '../eslint-config/overrides.js';
