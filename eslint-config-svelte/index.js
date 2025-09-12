// Modern Svelte ESLint configuration for Mikey Pro
import { baseConfig } from '@mikey-pro/eslint-config/base-config.js';
import { baseOverrides } from '@mikey-pro/eslint-config/overrides.js';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

// Svelte-specific configuration
const svelteConfig = {
  files: ['**/*.svelte'],
  languageOptions: {
    parser: svelteParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    svelte,
  },
  rules: {
    // Svelte rules - use recommended configuration
    ...svelte.configs.recommended.rules,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};

// Export the complete Svelte configuration
export default [
  // Global ignores
  {
    ignores: [
      '**/dist/**/*',
      '**/vendor/**/*',
      '**/node_modules/**/*',
      '**/coverage/**/*',
      '**/.next/**/*',
      '**/.nuxt/**/*',
      '**/.output/**/*',
      '**/.vite/**/*',
      '**/build/**/*',
      '**/out/**/*',
      '*.properties',
      '*.cclibs',
      '*.svg',
      '*.png',
      '*.jpg',
      '*.jpeg',
      '*.gif',
      '*.ico',
      '*.webp',
      '*.aco',
      '*.psd',
      '*.ai',
      '*.ase',
      '*.sh',
      '*.bat',
      '*.cmd',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      'LICENSE',
      'CNAME',
      '*.min.js',
      '*.min.css',
    ],
  },

  // Base configuration
  baseConfig,

  // Svelte-specific configuration
  svelteConfig,

  // File-specific overrides
  ...baseOverrides,
];

// Export individual components for advanced usage
export { baseConfig } from '@mikey-pro/eslint-config/base-config.js';
export { baseOverrides } from '@mikey-pro/eslint-config/overrides.js';
