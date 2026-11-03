import { join } from 'node:path';

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const rootDir = join(import.meta.dirname, '..');
const ORDER_RULES = new Set(['import-x/order', 'simple-import-sort/imports']);

const createLinter = (fix = false) =>
  new ESLint({
    cwd: rootDir,
    fix,
    overrideConfigFile: join(
      rootDir,
      'configs',
      'eslint-config-react',
      'index.js',
    ),
  });

const lintOrder = async (code, fix = false) => {
  const [result] = await createLinter(fix).lintText(code, {
    filePath: join(rootDir, 'test-files', 'import-order.jsx'),
  });

  return {
    messages: result.messages.filter((m) => ORDER_RULES.has(m.ruleId)),
    output: result.output ?? code,
  };
};

// import-x/order and simple-import-sort/imports are both on in the preset, so
// a layout must satisfy both at once and --fix must converge (not ping-pong).
describe('import-x/order agrees with simple-import-sort/imports', () => {
  it('accepts react, then @/ alias, then ./ sibling', async () => {
    const { messages } = await lintOrder(
      "import { useState } from 'react';\n\nimport { x } from '@/x';\n\nimport { y } from './y';\n\nexport const z = [useState, x, y];\n",
    );

    expect(messages).toStrictEqual([]);
  });

  it('accepts node:, scoped + unscoped packages, aliases, then merged relative group', async () => {
    const { messages } = await lintOrder(
      [
        "import fs from 'node:fs';",
        '',
        "import { Button } from '@mui/material';",
        "import { useState } from 'react';",
        '',
        "import { x } from '@/x';",
        "import { t } from '~/t';",
        '',
        "import { w } from '../w';",
        "import { y } from './y';",
        '',
        'export const z = [fs, useState, Button, x, t, w, y];',
        '',
      ].join('\n'),
    );

    expect(messages).toStrictEqual([]);
  });

  it('rejects an alias placed after a sibling import', async () => {
    const { messages } = await lintOrder(
      "import { useState } from 'react';\n\nimport { y } from './y';\n\nimport { x } from '@/x';\n\nexport const z = [useState, x, y];\n",
    );

    expect(messages.length).toBeGreaterThan(0);
  });

  it('autofix converges to a layout both rules accept', async () => {
    const { output } = await lintOrder(
      [
        "import './side.css';",
        "import { y } from './y';",
        "import { x } from '@/x';",
        "import { w } from '../w';",
        "import { i } from '.';",
        "import { useState } from 'react';",
        "import { Button } from '@mui/material';",
        "import fs from 'node:fs';",
        'export const z = [fs, useState, Button, x, w, y, i];',
        '',
      ].join('\n'),
      true,
    );
    const { messages } = await lintOrder(output);

    expect(messages).toStrictEqual([]);
  });
});
