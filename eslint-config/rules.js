module.exports = {
  camelcase: 'warn',
  'class-methods-use-this': 'off',
  'constructor-super': 'warn',
  'dot-notation': 'warn',
  'func-names': 'off',
  'import/extensions': ['warn', 'never', { ignorePackages: true }],
  'import/no-commonjs': 'off',
  'import/default': 'off',
  'import/named': 'off',
  'import/namespace': 'off',
  'import/no-named-as-default-member': 'off',
  'import/no-unresolved': [
    'warn',
    { amd: true, commonjs: true, ignore: ['^node:'] },
  ],
  'import/order': [
    'warn',
    {
      alphabetize: {
        order: 'asc',
      },
      'newlines-between': 'always',
    },
  ],
  'jsx-quotes': 'warn',
  'keyword-spacing': 'warn',
  'no-caller': 'warn',
  'no-confusing-arrow': 'warn',
  'no-console': 'off',
  'no-const-assign': 'warn',
  'no-delete-var': 'warn',
  'no-dupe-class-members': 'warn',
  'no-dupe-keys': 'warn',
  'no-duplicate-imports': 'warn',
  'no-else-return': 'warn',
  'no-empty': 'off',
  'no-empty-pattern': 'off',
  'no-extra-parens': 'off',
  'no-extra-bind': 'warn',
  'no-extra-semi': 'warn',
  'no-floating-decimal': 'warn',
  'no-iterator': 'warn',
  'no-lonely-if': 'warn',
  'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
  'no-multi-str': 'warn',
  'no-new-wrappers': 'warn',
  'no-process-exit': 'off',
  'no-proto': 'warn',
  'no-redeclare': 'warn',
  'no-restricted-syntax': [
    'warn',
    {
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      selector: 'ForInStatement',
    },
    {
      message:
        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      selector: 'LabeledStatement',
    },
    {
      message:
        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      selector: 'WithStatement',
    },
  ],
  'no-shadow': 'off',
  'no-shadow-restricted-names': 'warn',
  'no-spaced-func': 'warn',
  'no-this-before-super': 'warn',
  'no-undef-init': 'warn',
  'no-underscore-dangle': 'off',
  'no-unneeded-ternary': 'warn',
  'no-unused-vars': [
    'warn',
    {
      args: 'after-used',
      ignoreRestSiblings: true,
    },
  ],
  'no-useless-call': 'warn',
  'no-useless-computed-key': 'warn',
  'no-useless-concat': 'warn',
  'no-useless-constructor': 'warn',
  'no-useless-escape': 'warn',
  'no-useless-rename': 'warn',
  'no-useless-return': 'warn',
  'no-var': 'warn',
  'no-with': 'warn',
  'object-curly-spacing': ['off', 'always'],
  'object-shorthand': 'warn',
  'prefer-arrow-callback': 'warn',
  'prefer-destructuring': [
    'warn',
    {
      array: false,
      object: true,
    },
  ],
  'prefer-rest-params': 'warn',
  'prefer-spread': 'warn',
  'prefer-template': 'warn',
  'prefer-const': 'off',
  'disable-autofix/prefer-const': 'warn',
  'quote-props': ['warn', 'as-needed'],
  quotes: [
    'off',
    'single',
    {
      allowTemplateLiterals: true,
      avoidEscape: true,
    },
  ],
  radix: 'warn',
  'filenames/match-regex': 'off',
  'require-atomic-updates': 'off',
  'sort-imports': 'off',
  'rest-spread-spacing': 'off',
  semi: 'off',
  'sort-vars': 'warn',
  'space-before-function-paren': [
    'off',
    { anonymous: 'always', asyncArrow: 'always', named: 'never' },
  ],
  'space-in-parens': ['off', 'never'],
  'spaced-comment': [
    'warn',
    'always',
    {
      block: {
        balanced: true,
        exceptions: ['*'],
        markers: ['!'],
      },
      line: {
        exceptions: ['-', '+'],
        markers: ['/'],
      },
    },
  ],
  strict: ['warn', 'never'],
  'unicode-bom': 'warn',
  'unicorn/filename-case': [
    'warn',
    {
      cases: {
        camelCase: true,
        pascalCase: true,
      },
      ignore: ['.*.md'],
    },
  ],
  'unicorn/import-index': ['warn', { ignoreImports: true }],
  'prettier/prettier': ['warn', { parser: 'babel' }],
};