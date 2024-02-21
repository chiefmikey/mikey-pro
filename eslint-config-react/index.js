const path = require('node:path');

module.exports = {
  extends: ['@mikey-pro/eslint-config', 'react-app-bump'],
  parserOptions: {
    babelOptions: {
      presets: [
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
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue', '.svelte'],
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: path.join(__dirname, '../../..'),
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/naming-convention': 0,
        'import/default': 0,
        'import/named': 0,
        'import/namespace': 0,
        'import/no-named-as-default-member': 0,
        'import/no-unresolved': 0,
        'prettier/prettier': [1, { parser: 'typescript' }],
      },
    },
  ],
};
