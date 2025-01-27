import baseConfig from '@mikey-pro/eslint-config';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteAll from 'eslint-plugin-svelte/configs/all';
import typescriptParser from '@typescript-eslint/parser';
import path from 'path';

const svelteConfig = [
  ...baseConfig,
  {
    files: ['*.svelte'],
    languageOptions: {
      parser: 'svelte-eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: path.join(__dirname, '../../..'),
        extraFileExtensions: ['.svelte'],
        parser: {
          js: '@babel/eslint-parser',
          ts: typescriptParser,
        },
      },
    },
    plugins: {
      svelte: sveltePlugin,
      // ...other plugins if necessary...
    },
    rules: {
      ...svelteAll.rules,
      // ...existing Svelte rules...
    },
  },
];

export default svelteConfig;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = svelteConfig;
}
