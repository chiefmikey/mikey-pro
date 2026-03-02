/**
 * Violation Detection Tests
 *
 * Verifies that each rule category ACTUALLY catches violations.
 * Uses ESLint's lintText API to test code snippets against the config
 * without needing fixture files or filesystem interaction.
 *
 * This is the critical test that proves rules aren't just configured
 * but actively enforcing code quality for millions of users.
 */

import { join } from 'node:path';

import { ESLint } from 'eslint';
import { beforeAll, describe, expect, it } from 'vitest';

const rootDir = import.meta.dirname
  ? join(import.meta.dirname, '..')
  : process.cwd();

const configPath = join(rootDir, 'configs', 'eslint-config', 'index.js');

/**
 * Lint a code string and return detected rule IDs
 */
async function getRuleIds(eslint, code, filePath = 'test.js') {
  const results = await eslint.lintText(code, { filePath });
  return results[0].messages.map((m) => m.ruleId).filter(Boolean);
}

/**
 * Assert that a specific rule fires on the given code
 */
async function expectRule(eslint, code, ruleId, filePath = 'test.js') {
  const ruleIds = await getRuleIds(eslint, code, filePath);
  expect(ruleIds, `Expected rule "${ruleId}" to fire`).toContain(ruleId);
}

describe('Violation Detection', () => {
  let eslint;

  beforeAll(() => {
    eslint = new ESLint({ overrideConfigFile: configPath });
  });

  describe('Core JavaScript Rules', () => {
    it('should detect var declarations (no-var)', async () => {
      await expectRule(eslint, 'var x = 1;\nexport default x;\n', 'no-var');
    });

    it('should detect eval usage (no-eval)', async () => {
      await expectRule(
        eslint,
        "const x = eval('code');\nexport default x;\n",
        'no-eval',
      );
    });

    it('should detect void operator (no-void)', async () => {
      await expectRule(eslint, 'export default void 0;\n', 'no-void');
    });

    it('should detect yoda conditions (yoda)', async () => {
      await expectRule(
        eslint,
        'const x = 1;\nif (1 === x) {}\nexport default x;\n',
        'yoda',
      );
    });

    it('should detect throwing literals (no-throw-literal)', async () => {
      await expectRule(
        eslint,
        "function fail() {\n  throw 'error';\n}\nexport default fail;\n",
        'no-throw-literal',
      );
    });

    it('should detect self comparison (no-self-compare)', async () => {
      await expectRule(
        eslint,
        'const x = 1;\nconst y = x === x;\nexport { x, y };\n',
        'no-self-compare',
      );
    });

    it('should detect assignment in return (no-return-assign)', async () => {
      await expectRule(
        eslint,
        'let x = 0;\nfunction f() {\n  return x = 1;\n}\nexport { f, x };\n',
        'no-return-assign',
      );
    });

    it('should detect useless constructors (no-useless-constructor)', async () => {
      await expectRule(
        eslint,
        'class Foo {\n  constructor() {}\n}\nexport default Foo;\n',
        'no-useless-constructor',
      );
    });

    it('should detect unused expressions (no-unused-expressions)', async () => {
      await expectRule(
        eslint,
        'const x = 1;\nx;\nexport default x;\n',
        'no-unused-expressions',
      );
    });

    it('should prefer const over let (prefer-const)', async () => {
      await expectRule(
        eslint,
        'let x = 1;\nexport default x;\n',
        'prefer-const',
      );
    });

    it('should detect constant conditions (no-constant-condition)', async () => {
      await expectRule(eslint, 'if (true) {}\n', 'no-constant-condition');
    });

    it('should detect unreachable loops (no-unreachable-loop)', async () => {
      await expectRule(
        eslint,
        'for (const x of [1, 2, 3]) {\n  break;\n}\n',
        'no-unreachable-loop',
      );
    });

    it('should detect useless string concatenation (no-useless-concat)', async () => {
      await expectRule(
        eslint,
        "const x = 'a' + 'b';\nexport default x;\n",
        'no-useless-concat',
      );
    });

    it('should detect extending native prototypes (no-extend-native)', async () => {
      await expectRule(
        eslint,
        'Array.prototype.myMethod = function() {};\n',
        'no-extend-native',
      );
    });

    it('should detect duplicate imports (no-duplicate-imports)', async () => {
      await expectRule(
        eslint,
        "import { readFileSync } from 'node:fs';\nimport { writeFileSync } from 'node:fs';\nexport { readFileSync, writeFileSync };\n",
        'no-duplicate-imports',
      );
    });
  });

  describe('Complexity Rules', () => {
    it('should detect excessive function length (max-lines-per-function)', async () => {
      let lines = 'function long() {\n';
      for (let index = 0; index < 52; index++) {
        lines += `  const v${index} = ${index};\n`;
      }
      lines += '  return v0;\n}\nexport default long;\n';
      await expectRule(eslint, lines, 'max-lines-per-function');
    });

    it('should detect excessive nesting depth (max-depth)', async () => {
      const code = [
        'function deep() {',
        '  if (true) {',
        '    if (true) {',
        '      if (true) {',
        '        if (true) {',
        '          if (true) {',
        '            return 1;',
        '          }',
        '        }',
        '      }',
        '    }',
        '  }',
        '}',
        'export default deep;',
        '',
      ].join('\n');
      await expectRule(eslint, code, 'max-depth');
    });

    it('should detect too many parameters (max-params)', async () => {
      await expectRule(
        eslint,
        'function f(a, b, c, d, e) {\n  return a + b + c + d + e;\n}\nexport default f;\n',
        'max-params',
      );
    });
  });

  describe('Security Rules', () => {
    it('should detect unsafe regex (security/detect-unsafe-regex)', async () => {
      await expectRule(
        eslint,
        'const re = /^(a+)+$/;\nexport default re;\n',
        'security/detect-unsafe-regex',
      );
    });

    it('should detect non-literal RegExp (security/detect-non-literal-regexp)', async () => {
      await expectRule(
        eslint,
        'const pattern = process.argv[2];\nconst re = new RegExp(pattern);\nexport { pattern, re };\n',
        'security/detect-non-literal-regexp',
      );
    });

    it('should detect non-literal fs filename (security/detect-non-literal-fs-filename)', async () => {
      await expectRule(
        eslint,
        "import { readFileSync } from 'node:fs';\nconst f = process.argv[2];\nreadFileSync(f);\n",
        'security/detect-non-literal-fs-filename',
      );
    });

    it('should detect possible timing attacks (security/detect-possible-timing-attacks)', async () => {
      await expectRule(
        eslint,
        "function verify(input) {\n  const secret = 'abc123';\n  if (input === secret) {\n    return true;\n  }\n  return false;\n}\nexport default verify;\n",
        'security/detect-possible-timing-attacks',
      );
    });

    it('should detect buffer noassert (security/detect-buffer-noassert)', async () => {
      await expectRule(
        eslint,
        'const buf = Buffer.alloc(10);\nbuf.readUInt8(0, true);\nexport default buf;\n',
        'security/detect-buffer-noassert',
      );
    });
  });

  describe('Promise Rules', () => {
    it('should detect unhandled promise (promise/catch-or-return)', async () => {
      await expectRule(
        eslint,
        'function f() {\n  Promise.resolve(1).then((x) => x);\n}\nexport default f;\n',
        'promise/catch-or-return',
      );
    });

    it('should prefer await over then (promise/prefer-await-to-then)', async () => {
      await expectRule(
        eslint,
        'async function f() {\n  return Promise.resolve(1).then((x) => x);\n}\nexport default f;\n',
        'promise/prefer-await-to-then',
      );
    });
  });

  describe('Unicorn Rules', () => {
    it('should prefer Number.isNaN (unicorn/prefer-number-properties)', async () => {
      await expectRule(
        eslint,
        'const x = isNaN(1);\nexport default x;\n',
        'unicorn/prefer-number-properties',
      );
    });

    it('should prefer node: protocol (unicorn/prefer-node-protocol)', async () => {
      await expectRule(
        eslint,
        "import fs from 'fs';\nexport default fs;\n",
        'unicorn/prefer-node-protocol',
      );
    });

    it('should enforce error variable name (unicorn/catch-error-name)', async () => {
      await expectRule(
        eslint,
        'try {\n  throw new Error("test");\n} catch (e) {\n  throw e;\n}\n',
        'unicorn/catch-error-name',
      );
    });

    it('should prefer type error for type checks (unicorn/prefer-type-error)', async () => {
      await expectRule(
        eslint,
        'function f(x) {\n  if (typeof x !== "string") {\n    throw new Error("expected string");\n  }\n  return x;\n}\nexport default f;\n',
        'unicorn/prefer-type-error',
      );
    });

    it('should detect abbreviations (unicorn/prevent-abbreviations)', async () => {
      await expectRule(
        eslint,
        'const btn = document.querySelector("button");\nexport default btn;\n',
        'unicorn/prevent-abbreviations',
      );
    });

    it('should prefer for-of over traditional for loops (unicorn/no-for-loop)', async () => {
      await expectRule(
        eslint,
        'const arr = [1, 2, 3];\nfor (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}\nexport default arr;\n',
        'unicorn/no-for-loop',
      );
    });

    it('should prefer string.slice over substr (unicorn/prefer-string-slice)', async () => {
      await expectRule(
        eslint,
        'const x = "hello".substr(1);\nexport default x;\n',
        'unicorn/prefer-string-slice',
      );
    });
  });

  describe('SonarJS Rules', () => {
    it('should detect duplicate strings (sonarjs/no-duplicate-string)', async () => {
      const lines = [];
      for (let index = 0; index < 6; index++) {
        lines.push(`const v${index} = 'duplicated-string-value';`);
      }
      lines.push(
        `export { ${Array.from({ length: 6 }, (_, index) => `v${index}`).join(', ')} };`,
      );
      lines.push('');
      await expectRule(eslint, lines.join('\n'), 'sonarjs/no-duplicate-string');
    });
  });

  describe('Import Rules', () => {
    it('should detect absolute path imports (import-x/no-absolute-path)', async () => {
      await expectRule(
        eslint,
        "import x from '/absolute/path.js';\nexport default x;\n",
        'import-x/no-absolute-path',
      );
    });
  });

  describe('Regexp Rules', () => {
    it('should detect missing g flag on matchAll (regexp/no-missing-g-flag)', async () => {
      await expectRule(
        eslint,
        "const results = 'abc'.matchAll(/a/);\nexport default results;\n",
        'regexp/no-missing-g-flag',
      );
    });
  });

  describe('Perfectionist Rules', () => {
    it('should detect unsorted object keys (perfectionist/sort-objects)', async () => {
      await expectRule(
        eslint,
        'const obj = { z: 1, a: 2 };\nexport default obj;\n',
        'perfectionist/sort-objects',
      );
    });
  });

  describe('Prettier Integration', () => {
    it('should detect formatting violations (prettier/prettier)', async () => {
      await expectRule(
        eslint,
        'const x = "double-quotes"\nexport default x\n',
        'prettier/prettier',
      );
    });
  });

  describe('Clean Code Baseline', () => {
    it('should produce zero messages on properly written code', async () => {
      const cleanCode = 'const x = 1;\nexport default x;\n';
      const results = await eslint.lintText(cleanCode, {
        filePath: 'clean.js',
      });
      expect(results[0].messages).toHaveLength(0);
    });

    it('should produce zero fatal errors on complex valid code', async () => {
      const validCode = [
        "import { join } from 'node:path';",
        '',
        'const values = [1, 2, 3];',
        'const doubled = values.map((value) => value * 2);',
        'const result = join(...doubled.map(String));',
        '',
        'export default result;',
        '',
      ].join('\n');
      const results = await eslint.lintText(validCode, {
        filePath: 'valid.js',
      });
      const fatalErrors = results[0].messages.filter((m) => m.fatal);
      expect(fatalErrors).toHaveLength(0);
    });
  });

  describe('File Type Handling', () => {
    it('should lint YAML without fatal errors', async () => {
      const results = await eslint.lintText('key: value\n', {
        filePath: 'test.yaml',
      });
      const fatalErrors = results[0].messages.filter((m) => m.fatal);
      expect(fatalErrors).toHaveLength(0);
    });

    it('should lint HTML without fatal errors', async () => {
      const results = await eslint.lintText(
        '<html><body><p>test</p></body></html>\n',
        { filePath: 'test.html' },
      );
      const fatalErrors = results[0].messages.filter((m) => m.fatal);
      expect(fatalErrors).toHaveLength(0);
    });

    it('should lint JSON without fatal errors', async () => {
      const results = await eslint.lintText('{"key": "value"}\n', {
        filePath: 'package.json',
      });
      const fatalErrors = results[0].messages.filter((m) => m.fatal);
      expect(fatalErrors).toHaveLength(0);
    });

    it('should lint TOML without fatal errors', async () => {
      const results = await eslint.lintText('[section]\nkey = "value"\n', {
        filePath: 'test.toml',
      });
      const fatalErrors = results[0].messages.filter((m) => m.fatal);
      expect(fatalErrors).toHaveLength(0);
    });
  });

  describe('AI Agent Quality Rules', () => {
    it('should detect missing curly braces (curly)', async () => {
      await expectRule(
        eslint,
        'const x = true;\nif (x) console.log(x);\nexport default x;\n',
        'curly',
      );
    });

    it('should detect loose equality (eqeqeq)', async () => {
      await expectRule(
        eslint,
        'const x = 1;\nconst y = x == 1;\nexport { x, y };\n',
        'eqeqeq',
      );
    });

    it('should detect console.log (no-console)', async () => {
      await expectRule(eslint, 'console.log("debug");\n', 'no-console');
    });

    it('should detect TODO comments (no-warning-comments)', async () => {
      await expectRule(
        eslint,
        '// TODO: fix this\nconst x = 1;\nexport default x;\n',
        'no-warning-comments',
      );
    });

    it('should detect missing default case in switch (default-case)', async () => {
      await expectRule(
        eslint,
        'function f(x) {\n  switch (x) {\n    case 1:\n      return 1;\n  }\n}\nexport default f;\n',
        'default-case',
      );
    });

    it('should detect inconsistent returns (consistent-return)', async () => {
      await expectRule(
        eslint,
        'function f(x) {\n  if (x) {\n    return 1;\n  }\n}\nexport default f;\n',
        'consistent-return',
      );
    });

    it('should detect missing object shorthand (object-shorthand)', async () => {
      await expectRule(
        eslint,
        'const x = 1;\nconst obj = { x: x };\nexport default obj;\n',
        'object-shorthand',
      );
    });
  });
});
