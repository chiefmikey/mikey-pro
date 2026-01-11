// Legacy (eslintrc-style) config preserved under /legacy entry point.
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
        'vue/component-tags-order': [
          'warn',
          {
            order: [['script', 'template'], 'style'],
          },
        ],
        'vue/html-self-closing': [
          'warn',
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
        'vue/singleline-html-element-content-newline': 'off',
        'prettier/prettier': ['warn', { parser: 'vue' }],
      },
    },
  ],
};
