import babelParser from '@babel/eslint-parser';
import babel from '@babel/eslint-plugin';
import cypressJson from '@cypress/eslint-plugin-json';
import cssModules from 'eslint-plugin-css-modules';
import disableAutofix from 'eslint-plugin-disable-autofix';
import importPlugin from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import prettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';

import overrides from './overrides';
import rules from './rules';

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      global: {
        browser: true,
        commonjs: true,
        es2022: true,
        es6: true,
        node: true,
      },
    },
    settings: {
      'json/json-with-comments-files': [],
      polyfills: ['Promise'],
      jest: {
        version: 29,
      },
    },
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
    extends: [
      'eslint:recommended',
      'plugin:unicorn/all',
      'plugin:compat/recommended',
      'plugin:css-modules/recommended',
      'plugin:import/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: {
      prettier,
      'css-modules': cssModules,
      'disable-autofix': disableAutofix,
      '@babel': babel,
      unicorn,
      'only-warn': onlyWarn,
      '@cypress/json': cypressJson,
      import: importPlugin,
    },
    rules,
    overrides: [...overrides.base],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
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
        requireConfigFile: false,
      },
    },
  },
];
