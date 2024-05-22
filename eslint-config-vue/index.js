import baseConfig from '@mikey-pro/eslint-config';
import vue from 'eslint-plugin-vue';

export default [
  {
    files: ['**/*.js', '**/*.vue'],
    ...baseConfig,
    overrides: [
      ...baseConfig.overrides,
      {
        files: ['*.vue'],
        extends: ['plugin:vue/vue3-recommended'],
        parser: 'vue-eslint-parser',
        languageOptions: {
          parser: {
            js: '@babel/eslint-parser',
            ts: '@typescript-eslint/parser',
            typescript: '@typescript-eslint/parser',
          },
          parserOptions: {
            babelOptions: {
              plugins: [
                vue,
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
        plugins: {
          vue,
        },
      },
    ],
  },
];
