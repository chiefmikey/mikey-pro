const path = require('node:path');

const baseConfig = require('@mikey-pro/eslint-config');

module.exports = {
  ...baseConfig,
  overrides: [
    ...baseConfig.overrides,
    {
      extends: ['plugin:vue/vue3-recommended'],
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        babelOptions: {
          plugins: [
            'eslint-plugin-vue',
            [
              '@babel/plugin-transform-react-jsx',
              {
                pragma: 'h',
                pragmaFrag: 'Fragment',
                runtime: 'automatic',
              },
            ],
          ],
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
      rules: {
        'prettier/prettier': 1,
        'vue/component-tags-order': [
          1,
          {
            order: [['script', 'template'], 'style'],
          },
        ],
        'vue/html-self-closing': [
          1,
          {
            html: {
              component: 'always',
              normal: 'always',
              void: 'always',
            },
            math: 'always',
            svg: 'always',
          },
        ],
      },
    },
  ],
};
