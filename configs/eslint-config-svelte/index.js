// Modern Svelte ESLint configuration for Mikey Pro
import { baseConfig, globalPlugins } from 'mikey-pro/eslint/base-config.js';
import { baseOverrides } from 'mikey-pro/eslint/overrides.js';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

// Extract rules from the flat config array (recommended is an array, not a legacy object)
const svelteRecommendedRules = svelte.configs['flat/recommended'].reduce(
  (rules, item) => ({ ...rules, ...(item.rules || {}) }),
  {},
);

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
    ...svelteRecommendedRules,
  },
  settings: {
    'import-x/resolver': {
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

  // Global plugin registration
  globalPlugins,

  // Base configuration
  baseConfig,

  // Svelte-specific configuration
  svelteConfig,

  // File-specific overrides
  ...baseOverrides,
];

// Export individual components for advanced usage
export { baseConfig, globalPlugins } from 'mikey-pro/eslint/base-config.js';
export { baseOverrides } from 'mikey-pro/eslint/overrides.js';
