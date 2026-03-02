// Modern ESLint 10 configuration for Mikey Pro
// Ultimate coding style guide for excellence

import { baseConfig, globalPlugins } from './base-config.js';
import { baseOverrides } from './overrides.js';

// Global ignores — files excluded from all linting
const globalIgnores = {
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
};

// Export the modern flat configuration
export default [
  // Global ignores
  globalIgnores,

  // Global plugin registration (available to all config objects)
  globalPlugins,

  // Base configuration for JS/TS files
  baseConfig,

  // File-specific overrides
  ...baseOverrides,
];

// Export individual components for advanced usage
export { baseConfig, globalPlugins } from './base-config.js';
export { baseOverrides } from './overrides.js';
