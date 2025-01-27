import babelParser from '@babel/eslint-parser';
import cypressJson from '@cypress/json';
import eslintJs from '@eslint/js';
import compatPlugin from 'eslint-plugin-compat';
import cssModules from 'eslint-plugin-css-modules';
import disableAutofix from 'eslint-plugin-disable-autofix';
import importPlugin from 'eslint-plugin-import';
import importRecommended from 'eslint-plugin-import/config/recommended';
import onlyWarn from 'eslint-plugin-only-warn';
import prettier from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/config/recommended';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

import { baseOverrides } from './overrides';
import { baseRules } from './rules';

const config = [
  {
    ignores: [
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
  },
  eslintJs.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
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
      globals: {
        ...globals.browser: true,
        ...globals.commonjs: true,
        ...globals.es2022: true,
        ...globals.es6: true,
        ...globals.node: true,
      },
    },
    plugins: {
      prettier,
      unicorn,
      'css-modules': cssModules,
      'disable-autofix': disableAutofix,
      'only-warn': onlyWarn,
      '@cypress/json': cypressJson,
      import: importPlugin,
    },
    rules: {
      ...baseRules,
      ...unicorn.configs.all.rules,
      ...compatPlugin.configs.recommended.rules,
      ...cssModules.configs.recommended.rules,
      ...importRecommended.rules,
      ...prettierRecommended.rules,
    },
    settings: {
      'json/json-with-comments-files': [],
      polyfills: ['Promise'],
      jest: {
        version: 29,
      },
    },
  },
  ...baseOverrides,
];

export default config;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}
