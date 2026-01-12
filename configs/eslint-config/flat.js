// Modern ESLint 9 Flat Configuration for Mikey Pro
// Ultimate coding style guide for excellence

import { baseConfig } from './base-config.js';

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

  // Base configuration
  baseConfig,
];
