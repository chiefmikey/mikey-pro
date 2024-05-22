import baseConfig from '@mikey-pro/eslint-config';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    ...baseConfig,
    extends: [...baseConfig.extends, 'react-app-bump'],
    languageOptions: {
      parser: '@babel/eslint-parser',
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
    },
    rules: {
      ...baseConfig.rules,
      'react/display-name': ['warn', { ignoreTranspilerName: false }],
      'react/function-component-definition': [
        'off',
        { namedComponents: 'arrow-function' },
      ],
      'react/jsx-curly-spacing': 'warn',
      'react/jsx-key': ['warn', { checkFragmentShorthand: true }],
      'react/jsx-no-bind': [
        'warn',
        {
          allowArrowFunctions: true,
          allowFunctions: true,
          ignoreRefs: true,
        },
      ],
      'react/jsx-no-comment-textnodes': 'warn',
      'react/jsx-no-duplicate-props': 'warn',
      'react/jsx-no-target-blank': 'warn',
      'react/jsx-no-undef': 'warn',
      'react/jsx-tag-spacing': ['warn', { beforeSelfClosing: 'always' }],
      'react/jsx-uses-vars': 'warn',
      'react/no-danger': 'warn',
      'react/no-deprecated': 'warn',
      'react/no-did-mount-set-state': 'warn',
      'react/no-did-update-set-state': 'warn',
      'react/no-find-dom-node': 'warn',
      'react/no-is-mounted': 'warn',
      'react/no-string-refs': 'warn',
      'react/prefer-es6-class': 'warn',
      'react/prefer-stateless-function': 'warn',
      'react/require-render-return': 'warn',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: false,
        },
      ],
      'react/state-in-constructor': 'off',
    },
    settings: {
      ...baseConfig.settings,
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
    },
  },
];
