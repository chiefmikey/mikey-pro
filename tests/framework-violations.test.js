/**
 * Framework-Specific Violation Detection Tests
 *
 * Verifies that framework-specific ESLint rules ACTUALLY fire on bad code.
 * The existing linting.test.js only asserts "no fatal errors" — these tests
 * prove the plugin rules are actively enforcing code quality, not silently
 * passing everything through.
 *
 * Architecture note on Svelte/Angular:
 * - Framework plugins are hoisted to root node_modules via file: devDependencies.
 * - For Svelte/Angular tests, we build a minimal inline config because the main
 *   Angular config requires project: './tsconfig.json' for type-aware rules,
 *   which breaks lintText without a real project on disk.
 */

import { join } from 'node:path';

import { ESLint } from 'eslint';
import { beforeAll, describe, expect, it } from 'vitest';

const rootDir = import.meta.dirname
  ? join(import.meta.dirname, '..')
  : process.cwd();

const reactConfigPath = join(
  rootDir,
  'configs',
  'eslint-config-react',
  'index.js',
);
const vueConfigPath = join(
  rootDir,
  'configs',
  'eslint-config-vue',
  'index.js',
);

// Framework plugins are available in root node_modules via file: devDependencies

/**
 * Assert that a specific rule fires on the given code
 */
async function expectRule(eslint, code, ruleId, filePath) {
  const results = await eslint.lintText(code, { filePath });
  const ruleIds = results[0].messages.map((m) => m.ruleId).filter(Boolean);
  expect(ruleIds, `Expected rule "${ruleId}" to fire but got: ${JSON.stringify(ruleIds)}`).toContain(ruleId);
}

// ─────────────────────────────────────────────────────────────────────────────
// React
// ─────────────────────────────────────────────────────────────────────────────

describe('React Framework Violations', () => {
  let eslint;

  beforeAll(() => {
    eslint = new ESLint({ overrideConfigFile: reactConfigPath });
  });

  it('should detect conditional hook call (react-hooks/rules-of-hooks)', async () => {
    // Calling useState() inside an if block violates the rules of hooks.
    const badCode = [
      "import { useState } from 'react';",
      'const Component = ({ isLoggedIn }) => {',
      '  if (isLoggedIn) {',
      '    const [name] = useState(\u0027guest\u0027);',
      '    return <div>{name}</div>;',
      '  }',
      '  return <div />;',
      '};',
      'export default Component;',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      'react-hooks/rules-of-hooks',
      'Component.jsx',
    );
  });

  it('should detect missing key prop in map (react/jsx-key)', async () => {
    // Array.map() returning JSX without a key= prop on the root element.
    const badCode = [
      "const items = ['a', 'b', 'c'];",
      'const List = () => (',
      '  <ul>',
      '    {items.map((item) => (',
      '      <li>{item}</li>',
      '    ))}',
      '  </ul>',
      ');',
      'export default List;',
      '',
    ].join('\n');

    await expectRule(eslint, badCode, 'react/jsx-key', 'List.jsx');
  });

  it('should detect non-self-closing empty element (react/self-closing-comp)', async () => {
    // <div></div> with no children should be written as <div />.
    const badCode = [
      'const Empty = () => <div></div>;',
      'export default Empty;',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      'react/self-closing-comp',
      'Empty.jsx',
    );
  });

  it('should detect button missing type attribute (react/button-has-type)', async () => {
    // <button> without an explicit type= causes unpredictable form submission.
    const badCode = [
      'const SubmitButton = () => <button>Submit</button>;',
      'export default SubmitButton;',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      'react/button-has-type',
      'SubmitButton.jsx',
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Vue
// ─────────────────────────────────────────────────────────────────────────────

describe('Vue Framework Violations', () => {
  let eslint;

  beforeAll(() => {
    eslint = new ESLint({ overrideConfigFile: vueConfigPath });
  });

  it('should detect single-word component name (vue/multi-word-component-names)', async () => {
    // Vue requires component names to be at least two words to avoid conflicts
    // with native HTML elements.
    const badCode = [
      '<template>',
      '  <div>hello</div>',
      '</template>',
      '<script>',
      "export default { name: 'Button' };",
      '</script>',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      'vue/multi-word-component-names',
      'Button.vue',
    );
  });

  it('should detect unused v-for variable (vue/no-unused-vars)', async () => {
    // The loop variable "item" is declared by v-for but never referenced in
    // the template body or bindings — only static text is rendered.
    const badCode = [
      '<template>',
      '  <ul>',
      '    <li v-for="item in items">static text only</li>',
      '  </ul>',
      '</template>',
      '<script>',
      "export default { name: 'MyList', data() { return { items: [1, 2, 3] }; } };",
      '</script>',
      '',
    ].join('\n');

    await expectRule(eslint, badCode, 'vue/no-unused-vars', 'MyList.vue');
  });

  it('should detect non-self-closing empty HTML element (vue/html-self-closing)', async () => {
    // An empty <div></div> in a Vue template should be written as <div />.
    const badCode = [
      '<template>',
      '  <div></div>',
      '</template>',
      '<script>',
      "export default { name: 'MyApp' };",
      '</script>',
      '',
    ].join('\n');

    await expectRule(eslint, badCode, 'vue/html-self-closing', 'MyApp.vue');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Svelte
// ─────────────────────────────────────────────────────────────────────────────

describe('Svelte Framework Violations', () => {
  let eslint;

  beforeAll(async () => {
    const sveltePlugin = (await import('eslint-plugin-svelte')).default;
    const svelteParser = (await import('svelte-eslint-parser')).default;

    eslint = new ESLint({
      overrideConfig: [
        {
          files: ['**/*.svelte'],
          languageOptions: {
            parser: svelteParser,
            parserOptions: {
              ecmaVersion: 'latest',
              sourceType: 'module',
            },
          },
          plugins: { svelte: sveltePlugin },
          rules: {
            'svelte/no-at-html-tags': 'error',
            'svelte/require-each-key': 'error',
            'svelte/no-useless-mustaches': 'error',
          },
        },
      ],
      overrideConfigFile: true,
    });
  });

  it('should detect unsafe {@html} usage (svelte/no-at-html-tags)', async () => {
    // {@html ...} renders raw HTML and is a common XSS vector.
    const badCode = [
      '<script>',
      "  let content = '<b>bold</b>';",
      '</script>',
      '{@html content}',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      'svelte/no-at-html-tags',
      'Test.svelte',
    );
  });

  it('should detect #each block missing key expression (svelte/require-each-key)', async () => {
    // {#each items as item} without a key expression ({#each items as item (item.id)})
    // causes inefficient DOM diffing.
    const badCode = [
      '<script>',
      '  let items = [1, 2, 3];',
      '</script>',
      '{#each items as item}',
      '  <div>{item}</div>',
      '{/each}',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      'svelte/require-each-key',
      'Test.svelte',
    );
  });

  it('should detect useless mustache wrapping a literal (svelte/no-useless-mustaches)', async () => {
    // {'hello'} wraps a string literal in mustaches needlessly; write it as
    // plain text instead.
    const badCode = [
      '<script>',
      '</script>',
      "<p>{'hello world'}</p>",
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      'svelte/no-useless-mustaches',
      'Test.svelte',
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Angular
// ─────────────────────────────────────────────────────────────────────────────

describe('Angular Framework Violations', () => {
  let eslint;

  beforeAll(async () => {
    // Build a minimal inline config without type-aware rules so the parser works with lintText.
    const angularPlugin = (await import('@angular-eslint/eslint-plugin')).default;
    const tsParser = (await import('@typescript-eslint/parser'));

    eslint = new ESLint({
      overrideConfig: [
        {
          files: ['**/*.ts'],
          languageOptions: {
            // tsParser exports as a namespace; the parser object is the module itself
            parser: tsParser,
            parserOptions: {
              ecmaVersion: 'latest',
              sourceType: 'module',
              // No 'project' here — avoids requiring tsconfig on disk for lintText
            },
          },
          plugins: { '@angular-eslint': angularPlugin },
          rules: {
            '@angular-eslint/component-class-suffix': [
              'error',
              { suffixes: ['Component', 'Page', 'View'] },
            ],
            '@angular-eslint/component-selector': [
              'error',
              { prefix: 'app', style: 'kebab-case', type: 'element' },
            ],
            '@angular-eslint/no-empty-lifecycle-method': 'error',
            '@angular-eslint/no-output-on-prefix': 'error',
          },
        },
      ],
      overrideConfigFile: true,
    });
  });

  it('should detect wrong component class suffix (@angular-eslint/component-class-suffix)', async () => {
    // A class decorated with @Component must end in Component, Page, or View.
    const badCode = [
      "import { Component } from '@angular/core';",
      '',
      '@Component({',
      "  selector: 'app-my-widget',",
      "  template: '<div></div>',",
      '})',
      'export class MyWidget {}',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      '@angular-eslint/component-class-suffix',
      'my-widget.component.ts',
    );
  });

  it('should detect wrong component selector format (@angular-eslint/component-selector)', async () => {
    // Component selectors must be kebab-case and start with the "app" prefix.
    const badCode = [
      "import { Component } from '@angular/core';",
      '',
      '@Component({',
      "  selector: 'myWidget',",
      "  template: '<div></div>',",
      '})',
      'export class MyWidgetComponent {}',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      '@angular-eslint/component-selector',
      'my-widget.component.ts',
    );
  });

  it('should detect empty lifecycle method (@angular-eslint/no-empty-lifecycle-method)', async () => {
    // Implementing a lifecycle hook with an empty body is dead code.
    const badCode = [
      "import { Component, OnInit } from '@angular/core';",
      '',
      '@Component({',
      "  selector: 'app-test',",
      "  template: '<div></div>',",
      '})',
      'export class TestComponent implements OnInit {',
      '  ngOnInit(): void {}',
      '}',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      '@angular-eslint/no-empty-lifecycle-method',
      'test.component.ts',
    );
  });

  it('should detect output property prefixed with "on" (@angular-eslint/no-output-on-prefix)', async () => {
    // @Output() properties named onX conflict with native DOM event conventions.
    // Angular uses (onClicked)="handler()" in templates, which looks like a native event.
    const badCode = [
      "import { Component, Output, EventEmitter } from '@angular/core';",
      '',
      '@Component({',
      "  selector: 'app-test',",
      "  template: '<div></div>',",
      '})',
      'export class TestComponent {',
      '  @Output() onClicked = new EventEmitter();',
      '}',
      '',
    ].join('\n');

    await expectRule(
      eslint,
      badCode,
      '@angular-eslint/no-output-on-prefix',
      'test.component.ts',
    );
  });
});
