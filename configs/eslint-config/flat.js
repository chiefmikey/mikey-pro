// Modern ESLint 10 Flat Configuration for Mikey Pro
// Simplified flat config entry point

import { baseConfig, globalPlugins } from './base-config.js';
import { baseOverrides } from './overrides.js';

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
      '**/*.npmrc',
    ],
  },

  // Global plugin registration (available to all config objects)
  globalPlugins,

  // Base configuration for JS/TS files
  baseConfig,

  // File-specific overrides
  ...baseOverrides,
];
