#!/usr/bin/env node
/*
 * Validate that ESLint configuration files can be imported and are properly structured.
 * This script verifies the configuration modules are valid ES modules for ESLint 9.
 * Note: Full validation with plugins requires running ESLint directly (e.g., `npm run eslint`).
 * Run with: node scripts/compare-configs.js
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    console.log('Validating ESLint configuration files...\n');

    // Check main config
    const mainConfigPath = join(__dirname, '..', 'eslint.config.js');
    if (!existsSync(mainConfigPath)) {
      throw new Error(`Main config not found: ${mainConfigPath}`);
    }
    const mainConfig = await import(mainConfigPath);
    if (!mainConfig.default || !Array.isArray(mainConfig.default)) {
      throw new Error('Main config must export a default array (flat config)');
    }
    console.log('✅ Main config (eslint.config.js) is valid');

    // Check full config
    const fullConfigPath = join(__dirname, '..', 'style-guide', 'eslint-config', 'index.js');
    if (existsSync(fullConfigPath)) {
      const fullConfig = await import(fullConfigPath);
      if (!fullConfig.default || !Array.isArray(fullConfig.default)) {
        throw new Error('Full config must export a default array (flat config)');
      }
      console.log('✅ Full config (style-guide/eslint-config/index.js) is valid');
    }

    // Check base config
    const baseConfigPath = join(__dirname, '..', 'style-guide', 'eslint-config', 'flat.js');
    if (existsSync(baseConfigPath)) {
      const baseConfig = await import(baseConfigPath);
      if (!baseConfig.default || !Array.isArray(baseConfig.default)) {
        throw new Error('Base config must export a default array (flat config)');
      }
      console.log('✅ Base config (style-guide/eslint-config/flat.js) is valid');
    }

    console.log('\n✅ All configuration files are valid ES modules!');
    console.log('Note: For full validation with plugins, run: npm run eslint');
  } catch (error) {
    console.error('❌ Error validating configurations:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
