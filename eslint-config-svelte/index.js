import baseConfig from '@mikey-pro/eslint-config';
import svelte from 'eslint-plugin-svelte';

export default [
  {
    files: ['**/*.js', '**/*.svelte'],
    ...baseConfig,
    languageOptions: {
      parser: '@babel/eslint-parser',
      parserOptions: {
        ...baseConfig.parserOptions,
        extraFileExtensions: ['.svelte'],
      },
    },
    extends: [...baseConfig.extends, 'plugin:svelte/all'],
    overrides: [
      ...baseConfig.overrides,
      {
        files: ['*.svelte'],
        parser: 'svelte-eslint-parser',
        languageOptions: {
          parser: {
            js: '@babel/eslint-parser',
            ts: '@typescript-eslint/parser',
            typescript: '@typescript-eslint/parser',
          },
        },
        rules: {
          'import/first': 'off',
          'import/no-duplicates': 'off',
          'import/no-mutable-exports': 'off',
          'import/no-unresolved': 'off',
          'prettier/prettier': 'off',
        },
      },
    ],
    plugins: {
      svelte,
    },
  },
];
