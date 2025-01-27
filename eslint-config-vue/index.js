import baseConfig from '@mikey-pro/eslint-config';
import vuePlugin from 'eslint-plugin-vue';
import vueRecommended from 'eslint-plugin-vue/lib/configs/vue3-recommended.js';

const vueConfig = [
  ...baseConfig,
  {
    files: ['*.vue'],
    languageOptions: {
      parser: 'vue-eslint-parser',
      parserOptions: {
        babelOptions: {
          plugins: [
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
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      ...vueRecommended.rules,
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
];

export default vueConfig;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = vueConfig;
}
