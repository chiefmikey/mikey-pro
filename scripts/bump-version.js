#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Package.json files to update
const packageFiles = [
  'package.json',
  'configs/package.json',
  'configs/eslint-config/package.json',
  'configs/eslint-config-react/package.json',
  'configs/eslint-config-vue/package.json',
  'configs/eslint-config-svelte/package.json',
  'configs/eslint-config-angular/package.json',
  'configs/prettier-config/package.json',
  'configs/stylelint-config/package.json',
];

function parseVersion(version) {
  const parts = version.split('.').map(Number);
  return { major: parts[0], minor: parts[1], patch: parts[2] };
}

function bumpVersion(version, type) {
  const { major, minor, patch } = parseVersion(version);

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      // Assume it's a specific version string
      if (/^\d+\.\d+\.\d+$/.test(type)) {
        return type;
      }
      throw new Error(`Invalid version type: ${type}`);
  }
}

function updatePackageVersion(filePath, newVersion) {
  const fullPath = join(rootDir, filePath);
  const content = readFileSync(fullPath, 'utf8');
  const packageJson = JSON.parse(content);

  const oldVersion = packageJson.version;
  packageJson.version = newVersion;

  writeFileSync(fullPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

  return oldVersion;
}

async function main() {
  const versionType = process.argv[2];

  if (!versionType) {
    console.error('Usage: node bump-version.js <major|minor|patch|version>');
    process.exit(1);
  }

  // Get current version from main package.json
  const mainPackagePath = join(rootDir, 'configs/package.json');
  const mainPackage = JSON.parse(readFileSync(mainPackagePath, 'utf8'));
  const currentVersion = mainPackage.version;

  // Calculate new version
  const newVersion = bumpVersion(currentVersion, versionType);

  console.log(`Bumping version from ${currentVersion} to ${newVersion}`);

  // Update all package.json files
  const updatedFiles = [];
  for (const file of packageFiles) {
    try {
      const oldVersion = updatePackageVersion(file, newVersion);
      updatedFiles.push({ file, oldVersion, newVersion });
      console.log(`✓ Updated ${file}: ${oldVersion} → ${newVersion}`);
    } catch (error) {
      console.error(`✗ Failed to update ${file}:`, error.message);
      process.exit(1);
    }
  }

  console.log(`\n✅ Successfully bumped version to ${newVersion}`);
  console.log(`\nUpdated ${updatedFiles.length} package.json files`);

  // Output new version for use in GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    const { appendFile } = await import('fs/promises');
    await appendFile(process.env.GITHUB_OUTPUT, `version=${newVersion}\n`);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
