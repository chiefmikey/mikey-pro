const path = require('node:path');

const baseConfig = require('@mikey-pro/eslint-config');

module.exports = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'react-app-bump'],
  parserOptions: {
    ...baseConfig.parserOptions,
    babelOptions: {
      ...baseConfig.parserOptions.babelOptions,
      presets: [
        ...baseConfig.parserOptions.babelOptions.presets,
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
          },
        ],
      ],
    },
  },
  rules: {
    ...baseConfig.rules,
    'react/display-name': [1, { ignoreTranspilerName: false }],
    'react/function-component-definition': [
      0,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-curly-spacing': 1,
    'react/jsx-key': [1, { checkFragmentShorthand: true }],
    'react/jsx-no-bind': [
      1,
      {
        allowArrowFunctions: true,
        allowFunctions: true,
        ignoreRefs: true,
      },
    ],
    'react/jsx-no-comment-textnodes': 1,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-target-blank': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-tag-spacing': [1, { beforeSelfClosing: 'always' }],
    'react/jsx-uses-vars': 1,
    'react/no-danger': 1,
    'react/no-deprecated': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-find-dom-node': 1,
    'react/no-is-mounted': 1,
    'react/no-string-refs': 1,
    'react/prefer-es6-class': 1,
    'react/prefer-stateless-function': 1,
    'react/require-render-return': 1,
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: false,
      },
    ],
    'react/state-in-constructor': 0,
  },
  settings: {
    ...baseConfig.settings,
    react: {
      version: 'detect',
    },
  },
};
