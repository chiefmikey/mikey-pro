#!/usr/bin/env node
/*
 * Compare diagnostics between legacy and flat configs over test-files directory.
 * Run with: node scripts/compare-configs.js
 */
const { ESLint } = require('eslint');
const path = require('node:path');

(async () => {
  const target = path.join(__dirname, '..', 'test-files');
  const patterns = [path.join(target, '**/*.{js,jsx,ts,tsx,css,scss,less,md,md.json,json,jsonc,json5,yaml,yml,html,vue,svelte}')];

  // Legacy style: require the legacy CJS object (index.js) and feed through overrideConfig
  const legacyConfig = require('../style-guide/eslint-config');
  const eslintLegacy = new ESLint({
    useEslintrc: false,
    overrideConfig: legacyConfig,
  });

  // Flat style: import flat array
  const flatConfig = require('../style-guide/eslint-config/flat');
  const eslintFlat = new ESLint({
    useEslintrc: false,
    overrideConfigFile: null,
    // @eslint/eslintrc compatibility layer picks up 'overrideConfig' but for flat we pass 'overrideConfigFile' via config array.
    // Instead we instantiate one ESLint per file set using the flat config manually per file.
    // Simpler: run ESLint twice with different instances by writing a temp config file would require FS; instead, collect programmatic lint results.
    // We'll just lint manually by feeding the flat config as overrideConfig (works due to internal translation) for parity check.
    overrideConfig: flatConfig[1], // Base rules only for quick smoke; deep parity would iterate all objects.
  });

  const legacyResults = await eslintLegacy.lintFiles(patterns);
  const flatResults = await eslintFlat.lintFiles(patterns);

  function summarize(results) {
    const summary = {};
    for (const r of results) {
      for (const m of r.messages) {
        const key = `${m.ruleId || 'non-rule'}:${m.severity}`;
        summary[key] = (summary[key] || 0) + 1;
      }
    }
    return summary;
  }

  const legacySummary = summarize(legacyResults);
  const flatSummary = summarize(flatResults);

  const allKeys = new Set([...Object.keys(legacySummary), ...Object.keys(flatSummary)]);
  const diffs = [];
  for (const k of allKeys) {
    const a = legacySummary[k] || 0;
    const b = flatSummary[k] || 0;
    if (a !== b) diffs.push({ rule: k, legacy: a, flat: b });
  }

  console.log('Legacy summary:', legacySummary);
  console.log('Flat summary (base only quick check):', flatSummary);
  if (diffs.length === 0) {
    console.log('No summary differences detected in quick parity check.');
  } else {
    console.log('Differences found:', diffs);
  }
})();
