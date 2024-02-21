const path = require('node:path');

module.exports = {
  extends: ['@mikey-pro/eslint-config'],
  overrides: [
    {
      files: ['*.svelte'],
      extends: ['plugin:svelte/all'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'import/first': 0,
        'import/no-duplicates': 0,
        'import/no-mutable-exports': 0,
        'import/no-unresolved': 0,
        'prettier/prettier': 0,
      },
    },
  ],
};
