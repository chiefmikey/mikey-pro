import { rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const rootDir = join(import.meta.dirname, '..');
const coreConfigFile = join(
  rootDir,
  'configs',
  'eslint-config',
  'index.js',
);
const reactConfigFile = join(
  rootDir,
  'configs',
  'eslint-config-react',
  'index.js',
);

/**
 * Helper: run ESLint with fix: true on a code snippet and assert no crash.
 * Returns the first LintResult.
 */
async function autofixText(code, filePath, configFile) {
  const eslint = new ESLint({
    fix: true,
    overrideConfigFile: configFile,
  });
  const results = await eslint.lintText(code, { filePath });

  return results[0];
}

describe('ESLint Auto-Fix — unicorn plugin', () => {
  it(
    'should auto-fix unicorn/prefer-string-slice without crashing',
    async () => {
      // This is the exact rule that crashed in eslint-plugin-unicorn v62 with
      // "TypeError: 'text' must be a string" when the fixer ran.
      const code = `const x = 'hello'.substring(1);\nexport default x;\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      // If a fix was applied, output must be a non-empty string
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix unicorn/prefer-node-protocol without crashing',
    async () => {
      // unicorn/prefer-node-protocol rewrites `require('path')` → `require('node:path')`
      // (and import statements equivalently).
      const code = `import { join } from 'path';\nexport const x = join('a', 'b');\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix unicorn/prefer-includes without crashing',
    async () => {
      const code = `const arr = [1, 2, 3];\nconst has = arr.indexOf(2) !== -1;\nexport default has;\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix unicorn/prefer-string-replace-all without crashing',
    async () => {
      const code = `const s = 'hello world';\nconst r = s.replace(/o/g, '0');\nexport default r;\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});

describe('ESLint Auto-Fix — simple-import-sort plugin', () => {
  it(
    'should auto-fix simple-import-sort/imports without crashing',
    async () => {
      // Imports deliberately out of order; simple-import-sort should reorder them.
      const code = [
        `import { z } from 'zod';`,
        `import { join } from 'node:path';`,
        `import { readFileSync } from 'node:fs';`,
        ``,
        `export const x = join(z.string().parse('a'), readFileSync('b', 'utf8'));`,
        ``,
      ].join('\n');
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix simple-import-sort/exports without crashing',
    async () => {
      const code = `export { z } from 'zod';\nexport { join } from 'node:path';\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});

describe('ESLint Auto-Fix — prettier plugin', () => {
  it(
    'should auto-fix prettier/prettier formatting without crashing',
    async () => {
      // Intentionally bad formatting: no trailing newline, inconsistent quotes.
      const code = `const x = "hello";\nexport default x;`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});

describe('ESLint Auto-Fix — perfectionist plugin', () => {
  it(
    'should auto-fix perfectionist/sort-imports without crashing',
    async () => {
      // perfectionist/sort-imports is a fixable rule that re-orders imports.
      const code = [
        `import { z } from 'zod';`,
        `import { join } from 'node:path';`,
        ``,
        `export const x = join(z.string().parse('a'));`,
        ``,
      ].join('\n');
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix perfectionist/sort-named-exports without crashing',
    async () => {
      const code = `export { z, a, m } from 'some-module';\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});

describe('ESLint Auto-Fix — import-x plugin', () => {
  it(
    'should auto-fix import-x/first without crashing',
    async () => {
      // import-x/first: imports must come before other statements.
      const code = [
        `const x = 1;`,
        `import { join } from 'node:path';`,
        `export default join(String(x));`,
        ``,
      ].join('\n');
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix import-x/newline-after-import without crashing',
    async () => {
      // Missing blank line between last import and first statement.
      const code = `import { join } from 'node:path';\nconst x = join('a', 'b');\nexport default x;\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});

describe('ESLint Auto-Fix — @typescript-eslint plugin', () => {
  /**
   * Write a temporary .ts file under the project root so that:
   *   1. tsconfig.json's `include: ["**\/*.ts"]` picks it up, and
   *   2. typescript-eslint's `project: true` can resolve it.
   * Returns the absolute file path; caller is responsible for cleanup.
   */
  function writeTempTsFile(code) {
    const filename = `autofix-tmp-${randomBytes(6).toString('hex')}.ts`;
    const filePath = join(rootDir, filename);
    writeFileSync(filePath, code, 'utf8');
    return filePath;
  }

  it(
    'should auto-fix @typescript-eslint/prefer-as-const in .ts files without crashing',
    async () => {
      // prefer-as-const: `const x = 'hello' as 'hello'` → `const x = 'hello' as const`
      // This is a fixable, non-type-aware rule — but we still use a real on-disk
      // file so typescript-eslint's `project: true` parser resolves cleanly.
      const code = `const x = 'hello' as 'hello';\nexport default x;\n`;
      const filePath = writeTempTsFile(code);
      let result;
      try {
        const eslint = new ESLint({
          fix: true,
          overrideConfigFile: coreConfigFile,
        });
        const results = await eslint.lintFiles([filePath]);
        result = results[0];
      } finally {
        rmSync(filePath, { force: true });
      }

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix @typescript-eslint/no-useless-constructor without crashing',
    async () => {
      // no-useless-constructor is fixable (removes empty constructors).
      const code = [
        `export class Foo {`,
        `  public constructor() {}`,
        `}`,
        ``,
      ].join('\n');
      const filePath = writeTempTsFile(code);
      let result;
      try {
        const eslint = new ESLint({
          fix: true,
          overrideConfigFile: coreConfigFile,
        });
        const results = await eslint.lintFiles([filePath]);
        result = results[0];
      } finally {
        rmSync(filePath, { force: true });
      }

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});

describe('ESLint Auto-Fix — React config', () => {
  it(
    'should auto-fix unicorn/prefer-string-slice in React files without crashing',
    async () => {
      const code = [
        `import React from 'react';`,
        ``,
        `export default function Foo() {`,
        `  const x = 'hello'.substring(1);`,
        `  return React.createElement('div', null, x);`,
        `}`,
        ``,
      ].join('\n');
      const result = await autofixText(code, 'test-fix.jsx', reactConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix prettier formatting in React files without crashing',
    async () => {
      const code = [
        `import React from 'react'`,
        ``,
        `export default function Bar()   {`,
        `return React.createElement("div", null, "hello")`,
        `}`,
        ``,
      ].join('\n');
      const result = await autofixText(code, 'test-fix.jsx', reactConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );

  it(
    'should auto-fix simple-import-sort in React files without crashing',
    async () => {
      const code = [
        `import { useState } from 'react';`,
        `import React from 'react';`,
        ``,
        `export default function Baz() {`,
        `  const [n, setN] = useState(0);`,
        `  return React.createElement('button', { onClick: () => setN(n + 1) }, n);`,
        `}`,
        ``,
      ].join('\n');
      const result = await autofixText(code, 'test-fix.jsx', reactConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});

describe('ESLint Auto-Fix — fixer output integrity', () => {
  it(
    'should produce parseable JS output after fixing prefer-string-slice',
    async () => {
      const code = `const x = 'hello world'.substring(0, 5);\nexport default x;\n`;
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);

      // If a fix was produced, the output should still be valid JS (re-lintable
      // without fatal errors). This is the core regression check: a broken fixer
      // produces non-string output, which causes a crash on the second lint pass.
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');

        const eslint2 = new ESLint({
          fix: false,
          overrideConfigFile: coreConfigFile,
        });
        const results2 = await eslint2.lintText(result.output, {
          filePath: 'test-fix.js',
        });

        expect(results2[0].fatalErrorCount).toBe(0);
      }
    },
    10_000,
  );

  it(
    'should not crash when applying multiple fixable rules simultaneously',
    async () => {
      // Mix of violations from different plugins in one snippet.
      const code = [
        `import { z } from 'zod';`,
        `import { join } from 'path';`,
        ``,
        `const s = 'hello'.substring(1);`,
        `const arr = [1, 2, 3];`,
        `const has = arr.indexOf(2) !== -1;`,
        ``,
        `export default join(z.string().parse(s), String(has));`,
        ``,
      ].join('\n');
      const result = await autofixText(code, 'test-fix.js', coreConfigFile);

      expect(result).toBeDefined();
      expect(result.fatalErrorCount).toBe(0);
      if (result.output !== undefined) {
        expect(typeof result.output).toBe('string');
        expect(result.output.length).toBeGreaterThan(0);
      }
    },
    10_000,
  );
});
