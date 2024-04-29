const overrides = require('./overrides');
const rules = require('./rules');

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
    'plugin:import/recommended',
    'plugin:prettier/recommended',
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
  overrides: [...overrides],
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
  rules,
  settings: {
    'json/json-with-comments-files': [],
    polyfills: ['Promise'],
    jest: {
      version: 29,
    },
  },
};
