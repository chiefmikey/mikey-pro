const path = require('node:path');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:unicorn/all',
    'plugin:compat/recommended',
    'plugin:css-modules/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  ignorePatterns: [
    '**/dist/**/*',
    '**/vendor/**/*',
    '*.properties',
    '*.cclibs',
    '*.svg',
    '*.png',
    '*.aco',
    '*.psd',
    '*.ai',
    '*.ase',
    '*.sh',
    '*.ico',
    'package-lock.json',
    'LICENSE',
    'CNAME',
  ],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
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
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'prettier/prettier': ['warn', { parser: 'typescript' }],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
    },
    {
      files: ['*.css'],
      rules: {
        'prettier/prettier': ['warn', { parser: 'css' }],
      },
    },
    {
      files: ['*.scss'],
      rules: {
        'prettier/prettier': ['warn', { parser: 'scss' }],
      },
    },
    {
      files: ['*.less'],
      rules: {
        'prettier/prettier': ['warn', { parser: 'less' }],
      },
    },
    {
      extends: ['plugin:yml/standard'],
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        'yml/quotes': ['warn', { prefer: 'double', avoidEscape: true }],
        'prettier/prettier': ['warn', { parser: 'yaml', singleQuote: false }],
      },
    },
    {
      extends: ['plugin:toml/standard'],
      files: ['*.toml'],
      parser: 'toml-eslint-parser',
      rules: {
        'prettier/prettier': 'off',
      },
    },
    {
      files: ['*.md'],
      parser: 'eslint-plugin-markdownlint/parser',
      extends: ['plugin:markdownlint/recommended'],
      rules: {
        'markdownlint/md033': 'off',
        'markdownlint/md041': 'off',
        'prettier/prettier': ['warn', { parser: 'markdown' }],
      },
    },
    {
      files: ['package.json'],
      rules: {
        'prettier/prettier': ['warn', { parser: 'json' }],
      },
      settings: {
        'json/json-with-comments-files': [],
        'json/package-json-sort-order': [
          'name',
          'version',
          'description',
          'private',
          'main',
          'type',
          'types',
          'typings',
          'browser',
          'engines',
          'scripts',
          'husky',
          'dependencies',
          'devDependencies',
          'peerDependencies',
          'files',
          'bin',
          'productName',
          'homepage',
          'repository',
          'bugs',
          'license',
          'keywords',
          'author',
          'contributors',
          'funding',
        ],
      },
    },
    {
      files: ['*.md.json'],
      rules: {
        'prettier/prettier': ['warn', { parser: 'json' }],
      },
    },
    {
      extends: ['plugin:@html-eslint/recommended'],
      files: ['*.html'],
      parser: '@html-eslint/parser',
      plugins: ['@html-eslint'],
      rules: {
        '@html-eslint/indent': 'off',
        '@html-eslint/no-extra-spacing-attrs': 'off',
        '@html-eslint/require-closing-tags': 'off',
        'disable-autofix/@html-eslint/require-closing-tags': [
          'warn',
          { selfClosing: 'always' },
        ],
        'spaced-comment': 'off',
        'prettier/prettier': ['warn', { parser: 'html' }],
      },
    },
    {
      extends: ['plugin:jsonc/recommended-with-jsonc'],
      files: ['*.jsonc', '*rc'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'prettier/prettier': ['warn', { parser: 'json' }],
      },
    },
    {
      extends: ['plugin:jsonc/recommended-with-json5'],
      files: ['*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'prettier/prettier': ['warn', { parser: 'json5' }],
      },
    },
    {
      files: ['*.test.js'],
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
      env: {
        jest: true,
      },
      rules: {
        'unicorn/no-array-callback-reference': 'off',
        'jest/unbound-method': 'off',
      },
    },
    {
      files: ['*.test.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jest'],
      extends: ['plugin:jest/all'],
      env: {
        jest: true,
      },
      rules: {
        'unicorn/no-array-callback-reference': 'off',
        'jest/unbound-method': 'off',
      },
    },
    {
      files: ['*.cy.*'],
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
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
  },
  plugins: [
    'prettier',
    'css-modules',
    'disable-autofix',
    '@babel',
    'unicorn',
    'only-warn',
    '@cypress/json',
    'import',
  ],
  root: true,
  rules: {
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
    'prettier/prettier': ['warn', { parser: 'babel' }],
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
  },
  settings: {
    polyfills: ['Promise'],
    jest: {
      version: 29,
    },
  },
};
