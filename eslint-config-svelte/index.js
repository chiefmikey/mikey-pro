const baseConfig = require('@mikey-pro/eslint-config');

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...baseConfig.parserOptions,
    extraFileExtensions: ['.svelte'],
  },
  extends: [...baseConfig.extends, 'plugin:svelte/all'],
  overrides: [
    ...baseConfig.overrides,
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
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
};
