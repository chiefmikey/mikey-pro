// Modern ESLint 9 configuration for Mikey Pro
// This is the main entry point that exports the flat config

import { baseConfig } from './base-config.js';
import { baseOverrides } from './overrides.js';

// Export the modern flat configuration
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
      '**/*.md', // Markdown files require special processor configuration
    ],
  },

  // Base configuration
  baseConfig,

  // File-specific overrides
  ...baseOverrides,
];

// Export individual components for advanced usage
export { baseConfig } from './base-config.js';
export { baseOverrides } from './overrides.js';
export { baseRules } from './rules.js';
