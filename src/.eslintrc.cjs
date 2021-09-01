module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:compat/recommended',
    'plugin:css-modules/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
      extends: ['plugin:md/recommended'],
      rules: {
        'md/remark': [
          'error',
          {
            plugins: [
              'preset-lint-markdown-style-guide',
              ['lint-emphasis-marker', '_'],
            ],
          },
        ],
        'prettier/prettier': ['error', { parser: 'markdown' }],
      },
    },
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended'],
      rules: {
        '@html-eslint/indent': 'off',
        '@html-eslint/no-extra-spacing-attrs': 'off',
        '@html-eslint/require-closing-tags': 'off',
        'no-autofix-2/@html-eslint/require-closing-tags': [
          'error',
          { selfClosing: 'always' },
        ],
        'prettier/prettier': ['error', { parser: 'html' }],
      },
    },
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'prettier/prettier': ['error'],
  },
  plugins: [
    'import',
    'prettier',
    'json-format',
    'css-modules',
    '@html-eslint',
    'no-autofix-2',
  ],
  parserOptions: { ecmaVersion: 2020 },
};
