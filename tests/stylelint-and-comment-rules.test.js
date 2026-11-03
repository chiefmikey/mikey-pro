/**
 * Regression guards for shared-config bugs found while cleaning lint debt in a
 * consumer repo (stylelint config rule names/patterns, triple-slash directives).
 */

import { randomBytes } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import stylelintConfig from '../configs/stylelint-config/index.js';

const rootDir = join(import.meta.dirname, '..');

const lintCss = async (code) => {
  const { results } = await stylelint.lint({
    code,
    codeFilename: 'probe.css',
    config: stylelintConfig,
    configBasedir: rootDir,
  });
  return results[0];
};

const rulesFired = (result) => result.warnings.map((w) => w.rule);

describe('stylelint-config rule validity', () => {
  it('has no invalid options or unknown rules', async () => {
    const result = await lintCss(':root {\n  --color-bg: #fff;\n}\n');
    expect(result.invalidOptionWarnings).toStrictEqual([]);
    expect(result.warnings.map((w) => w.text).join('\n')).not.toMatch(
      /Unknown rule/,
    );
  });

  it('accepts kebab-case custom properties', async () => {
    const result = await lintCss(
      ':root {\n  --color-bg: #fff;\n  --space-2: 8px;\n}\n',
    );
    expect(rulesFired(result)).not.toContain('custom-property-pattern');
  });

  it('rejects camelCase custom properties', async () => {
    const result = await lintCss(':root {\n  --colorBg: #fff;\n}\n');
    expect(rulesFired(result)).toContain('custom-property-pattern');
  });

  it.each([
    'transition: 150ms ease border-color;',
    'transition: border-color 0.15s ease;',
    'transition: opacity .2s ease, transform 0.3s ease;',
    'transition: none;',
    'transition: var(--transition-base);',
    'animation: spin 1s linear infinite;',
  ])('allows duration value: %s', async (declaration) => {
    const result = await lintCss(`.a {\n  ${declaration}\n}\n`);
    expect(rulesFired(result)).not.toContain(
      'declaration-property-value-allowed-list',
    );
  });

  it('rejects transitions with no explicit time unit', async () => {
    const result = await lintCss('.a {\n  transition: border-color ease;\n}\n');
    expect(rulesFired(result)).toContain(
      'declaration-property-value-allowed-list',
    );
  });

  it('enforces declaration-strict-value (plugin rule is registered)', async () => {
    const result = await lintCss('.a {\n  color: #f8fafc;\n}\n');
    expect(rulesFired(result)).toContain(
      'scale-unlimited/declaration-strict-value',
    );
  });
});

describe('spaced-comment and triple-slash directives', () => {
  const directive = '/// <reference types="vite/client" />\n';
  const temporaryDirectory = join(
    rootDir,
    `comment-rules-tmp-${randomBytes(6).toString('hex')}`,
  );
  const configPath = join(rootDir, 'configs', 'eslint-config', 'index.js');

  // Real files: type-aware TS parsing only works for files on disk inside the
  // repo tsconfig, so lintText on a virtual path yields a fatal parse error.
  const lintOnDisk = async (name, content, fix) => {
    const filePath = join(temporaryDirectory, name);
    writeFileSync(filePath, content, 'utf8');
    try {
      const eslint = new ESLint({
        cwd: rootDir,
        fix,
        overrideConfigFile: configPath,
      });
      const [result] = await eslint.lintFiles([filePath]);
      return result;
    } finally {
      rmSync(filePath, { force: true });
    }
  };

  beforeAll(() => {
    mkdirSync(temporaryDirectory, { recursive: true });
  });

  afterAll(() => {
    rmSync(temporaryDirectory, { force: true, recursive: true });
  });

  it('does not flag or autofix a triple-slash directive in a d.ts', async () => {
    const result = await lintOnDisk('env.d.ts', directive, true);
    expect(result.messages.filter((m) => m.fatal)).toStrictEqual([]);
    expect(result.output ?? directive).toBe(directive);
    expect(result.messages.map((m) => m.ruleId)).not.toContain(
      'spaced-comment',
    );
  }, 240_000);

  it('still flags a normal comment missing a space', async () => {
    const result = await lintOnDisk(
      'plain.ts',
      '//no space\nexport const plain = 1;\n',
      false,
    );
    expect(result.messages.map((m) => m.ruleId)).toContain('spaced-comment');
  }, 240_000);
});
