# AI Agent Guardrails Pivot — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform @mikey-pro from a style guide into AI agent code quality guardrails — consolidate configs, tighten rules for agents, add Python/Ruff support, integrate with global Claude.

**Architecture:** Monorepo with 8 published packages (7 npm + 1 PyPI). Core ESLint config consolidates all rules into `base-config.js` (single source of truth). Python config lives alongside as `configs/ruff-config/`. Global `~/.claude/CLAUDE.md` makes Claude auto-install in every project.

**Tech Stack:** ESLint 10, Ruff, Vitest, npm + PyPI publishing, GitHub Actions CI

---

## Task 1: Consolidate rules.js into base-config.js

Merge all valuable rules from `rules.js` into `base-config.js`, then delete `rules.js`.

**Files:**
- Modify: `configs/eslint-config/base-config.js`
- Delete: `configs/eslint-config/rules.js`
- Modify: `configs/eslint-config/index.js` (remove baseRules export)
- Modify: `configs/eslint-config/package.json` (remove rules.js from files/exports)

**Step 1: Add missing core ESLint rules to base-config.js**

Add these rules to the rules object in `base-config.js` (after the `...js.configs.recommended.rules` spread and before the import rules section). These exist in `rules.js` but not `base-config.js`:

```js
    // Best practices
    'accessor-pairs': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'consistent-return': 'error',
    curly: ['error', 'all'],
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-notation': 'warn',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',
    'no-alert': 'warn',
    'no-bitwise': 'error',
    'no-console': 'warn',
    'no-continue': 'error',
    'no-div-regex': 'error',
    'no-eq-null': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-restricted-syntax': [
      'warn',
      {
        message: 'for..in loops iterate over the entire prototype chain. Use Object.{keys,values,entries} instead.',
        selector: 'ForInStatement',
      },
      {
        message: 'Labels are a form of GOTO; using them makes code confusing.',
        selector: 'LabeledStatement',
      },
      {
        message: '`with` is disallowed in strict mode.',
        selector: 'WithStatement',
      },
      {
        message: 'Provide initialValue to reduce.',
        selector: "CallExpression[callee.property.name='reduce'][arguments.length<2]",
      },
    ],
    'no-script-url': 'error',
    'no-template-curly-in-string': 'error',
    'no-warning-comments': 'warn',
    'object-shorthand': 'warn',
    'one-var': ['error', 'never'],
    'require-unicode-regexp': 'error',
    'spaced-comment': ['warn', 'always'],
    'symbol-description': 'error',
```

**Step 2: Add missing import-x rules**

Add to the import section in `base-config.js`:

```js
    'import-x/export': 'error',
    'import-x/newline-after-import': 'error',
    'import-x/no-mutable-exports': 'error',
    'import-x/no-named-default': 'error',
    'import-x/no-useless-path-segments': 'error',
    'import-x/no-webpack-loader-syntax': 'error',
```

**Step 3: Add missing promise rules**

Add to the promise section in `base-config.js`:

```js
    'promise/no-callback-in-promise': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
```

**Step 4: Add missing security rules**

Add to the security section in `base-config.js`:

```js
    'security/detect-eval-with-expression': 'error',
    'security/detect-new-buffer': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-object-injection': 'warn',
    'security/detect-pseudoRandomBytes': 'error',
```

**Step 5: Add missing regexp rules**

Add to the regexp section in `base-config.js`:

```js
    'regexp/no-useless-flag': 'error',
    'regexp/prefer-d': 'error',
    'regexp/prefer-plus-quantifier': 'error',
    'regexp/prefer-question-quantifier': 'error',
    'regexp/prefer-star-quantifier': 'error',
```

**Step 6: Add missing sonarjs rules**

Add to the sonarjs section in `base-config.js`:

```js
    'sonarjs/no-all-duplicated-branches': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-collection-size-mischeck': 'warn',
    'sonarjs/no-identical-conditions': 'warn',
    'sonarjs/no-identical-expressions': 'warn',
    'sonarjs/no-inverted-boolean-check': 'warn',
    'sonarjs/no-nested-switch': 'warn',
    'sonarjs/no-nested-template-literals': 'warn',
    'sonarjs/no-one-iteration-loop': 'warn',
    'sonarjs/no-redundant-jump': 'warn',
    'sonarjs/no-unused-collection': 'warn',
    'sonarjs/no-use-of-empty-return-value': 'warn',
    'sonarjs/no-useless-catch': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'sonarjs/prefer-single-boolean-return': 'warn',
    'sonarjs/prefer-while': 'warn',
```

**Step 7: Add yml rules to YAML override in overrides.js**

Add to the `yaml` override in `configs/eslint-config/overrides.js` (these belong in the file-specific override, not base config):

```js
export const yaml = {
  files: ['**/*.yaml', '**/*.yml'],
  languageOptions: {
    parser: yamlParser,
  },
  rules: {
    'yml/block-mapping': 'error',
    'yml/block-mapping-question-indicator-newline': 'error',
    'yml/block-sequence': 'error',
    'yml/block-sequence-hyphen-indicator-newline': 'error',
    'yml/flow-mapping-curly-newline': 'error',
    'yml/flow-mapping-curly-spacing': 'error',
    'yml/flow-sequence-bracket-newline': 'error',
    'yml/flow-sequence-bracket-spacing': 'error',
    'yml/indent': ['error', 2],
    'yml/key-spacing': 'error',
    'yml/no-empty-document': 'error',
    'yml/no-empty-key': 'error',
    'yml/no-empty-mapping-value': 'error',
    'yml/no-empty-sequence-entry': 'error',
    'yml/no-irregular-whitespace': 'error',
    'yml/no-tab-indent': 'error',
    'yml/quotes': ['warn', { avoidEscape: true, prefer: 'double' }],
    'yml/require-string-key': 'error',
  },
};
```

**Step 8: Delete rules.js and remove exports**

- Delete `configs/eslint-config/rules.js`
- In `configs/eslint-config/index.js`, remove line: `export { baseRules } from './rules.js';`
- In `configs/eslint-config/package.json`:
  - Remove `"rules.js"` from `files` array
  - Remove `"./rules"` export from `exports` object

**Step 9: Run tests**

Run: `npx vitest run`
Expected: Some tests may fail due to `baseRules` export being removed. Fix `plugin-integrity.test.js` — remove the assertion for `config.baseRules`.

**Step 10: Commit**

```bash
git add configs/eslint-config/base-config.js configs/eslint-config/overrides.js configs/eslint-config/index.js configs/eslint-config/package.json tests/
git commit -m "refactor: consolidate rules.js into base-config.js (single source of truth)"
```

---

## Task 2: Remove Unused Dependencies

**Files:**
- Modify: `configs/eslint-config/package.json`
- Modify: `configs/eslint-config/base-config.js` (remove markdownlint import + plugin registration)

**Step 1: Remove unused deps from package.json**

Remove these from `configs/eslint-config/package.json` dependencies:

```
"@babel/core"
"@babel/eslint-parser"
"@babel/eslint-plugin"
"@babel/preset-env"
"@cypress/eslint-plugin-json"
"postcss"
"postcss-scss"
"eslint-config-prettier"
"@stylistic/eslint-plugin"
"eslint-plugin-markdownlint"
```

**Step 2: Remove markdownlint from base-config.js**

- Remove: `import markdownlint from 'eslint-plugin-markdownlint';` (line 15)
- Remove: `markdownlint,` from the `globalPlugins.plugins` object (line 48)

**Step 3: Run tests**

Run: `npx vitest run`
Expected: `plugin-integrity.test.js` fails because it expects `markdownlint` in the plugin list.

**Step 4: Update plugin-integrity.test.js**

Remove `'markdownlint'` from the `expectedPlugins` array in `tests/plugin-integrity.test.js`.

**Step 5: Run tests again**

Run: `npx vitest run`
Expected: All pass.

**Step 6: Commit**

```bash
git add configs/eslint-config/package.json configs/eslint-config/base-config.js tests/plugin-integrity.test.js
git commit -m "chore: remove unused dependencies (babel, postcss, markdownlint, stylistic)"
```

---

## Task 3: AI Agent Rule Tuning

Tighten limits and add rules that catch common AI agent mistakes.

**Files:**
- Modify: `configs/eslint-config/base-config.js`

**Step 1: Tighten existing limits**

In `base-config.js`, change these values:

```
complexity: 15 → 12
max-lines: 500 → 300
max-depth: 4 → 3
max-params: 4 → 3
sonarjs/cognitive-complexity: 15 → 12
```

**Step 2: Run tests**

Run: `npx vitest run`
Expected: Tests that generate long functions or deep nesting may need adjustment. The `max-lines-per-function` violation test generates 52 lines which is > 50 (unchanged), so it should still pass. The `max-depth` test generates 5 levels of nesting which is > 3 (stricter now), so it should still pass.

Check specifically: the "clean code baseline" test — `const x = 1;\nexport default x;\n` should still produce zero messages.

**Step 3: Commit**

```bash
git add configs/eslint-config/base-config.js
git commit -m "feat: tighten rule limits for AI agent code quality"
```

---

## Task 4: Add Violation Tests for New Rules

**Files:**
- Modify: `tests/violations.test.js`

**Step 1: Add new violation tests**

Add these test cases to `tests/violations.test.js`:

```js
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
    await expectRule(
      eslint,
      'console.log("debug");\n',
      'no-console',
    );
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
```

**Step 2: Run tests**

Run: `npx vitest run`
Expected: All pass (including new tests, since the rules were added in Task 1).

**Step 3: Commit**

```bash
git add tests/violations.test.js
git commit -m "test: add violation tests for AI agent quality rules"
```

---

## Task 5: Create Python Ruff Config Package

**Files:**
- Create: `configs/ruff-config/ruff.toml`
- Create: `configs/ruff-config/pyproject.toml`
- Create: `configs/ruff-config/package.json`
- Create: `configs/ruff-config/README.md`
- Create: `configs/ruff-config/LICENSE` (copy from root)

**Step 1: Create ruff.toml**

Create `configs/ruff-config/ruff.toml`:

```toml
# Mikey Pro Ruff Configuration
# AI Agent Code Quality Guardrails for Python

# Target Python 3.11+
target-version = "py311"

# Match Black's line length
line-length = 88

# Enable comprehensive rule sets
[lint]
select = [
  "E",    # pycodestyle errors
  "W",    # pycodestyle warnings
  "F",    # pyflakes
  "I",    # isort
  "N",    # pep8-naming
  "B",    # flake8-bugbear
  "C4",   # flake8-comprehensions
  "SIM",  # flake8-simplify
  "S",    # bandit (security)
  "C90",  # mccabe (complexity)
  "RUF",  # ruff-specific rules
  "PL",   # pylint
  "RET",  # flake8-return
  "PT",   # flake8-pytest-style
  "UP",   # pyupgrade
  "ARG",  # flake8-unused-arguments
  "PTH",  # flake8-use-pathlib
  "ERA",  # eradicate (commented-out code)
  "TID",  # flake8-tidy-imports
  "ICN",  # flake8-import-conventions
  "PIE",  # flake8-pie
  "T20",  # flake8-print
  "Q",    # flake8-quotes
  "RSE",  # flake8-raise
  "FLY",  # flynt (f-string conversion)
  "PERF", # perflint
  "FURB", # refurb
]

ignore = [
  "E501",    # line too long (handled by formatter)
  "PLR0913", # too many arguments (we set our own limit)
  "PLR2004", # magic value comparison (too noisy)
]

# Strict complexity matching ESLint config
[lint.mccabe]
max-complexity = 12

# Import sorting matching ESLint simple-import-sort
[lint.isort]
force-single-line = false
known-first-party = []
combine-as-imports = true
force-sort-within-sections = true

# Pylint limits matching ESLint config
[lint.pylint]
max-args = 3
max-branches = 12
max-returns = 6
max-statements = 50

# Bandit settings
[lint.flake8-bandit]
check-typed-exception = true

# Pytest style
[lint.flake8-pytest-style]
fixture-parentheses = false

# Format settings (match Black defaults)
[format]
quote-style = "double"
indent-style = "space"
skip-magic-trailing-comma = false
line-ending = "lf"
```

**Step 2: Create pyproject.toml**

Create `configs/ruff-config/pyproject.toml`:

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "mikey-pro-ruff-config"
version = "10.0.0"
description = "Mikey Pro Ruff configuration - AI agent code quality guardrails for Python"
readme = "README.md"
license = "MIT"
requires-python = ">=3.11"
authors = [
  { name = "Mikl Wolfe", email = "wolfe@mikl.io" },
]
keywords = ["ruff", "linting", "formatting", "python", "mikey-pro", "code-quality", "ai-agent"]
classifiers = [
  "Development Status :: 5 - Production/Stable",
  "Intended Audience :: Developers",
  "License :: OSI Approved :: MIT License",
  "Programming Language :: Python :: 3",
  "Programming Language :: Python :: 3.11",
  "Programming Language :: Python :: 3.12",
  "Programming Language :: Python :: 3.13",
  "Topic :: Software Development :: Quality Assurance",
]

[project.urls]
Homepage = "https://github.com/chiefmikey/mikey-pro"
Repository = "https://github.com/chiefmikey/mikey-pro"
Issues = "https://github.com/chiefmikey/mikey-pro/issues"

[tool.hatch.build.targets.wheel]
packages = ["."]
include = ["ruff.toml"]

[tool.hatch.build.targets.sdist]
include = ["ruff.toml", "pyproject.toml", "README.md", "LICENSE"]
```

**Step 3: Create package.json (npm distribution)**

Create `configs/ruff-config/package.json`:

```json
{
  "name": "@mikey-pro/ruff-config",
  "version": "10.0.0",
  "description": "Mikey Pro Ruff configuration - AI agent code quality guardrails for Python",
  "files": [
    "ruff.toml",
    "README.md",
    "LICENSE"
  ],
  "homepage": "https://github.com/chiefmikey/mikey-pro#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chiefmikey/mikey-pro.git"
  },
  "bugs": {
    "url": "https://github.com/chiefmikey/mikey-pro/issues"
  },
  "license": "MIT",
  "keywords": [
    "ruff",
    "python",
    "linting",
    "formatting",
    "mikey-pro",
    "code-quality",
    "ai-agent"
  ],
  "author": "Mikl Wolfe <wolfe@mikl.io> (https://mikl.io)"
}
```

**Step 4: Create README.md**

Create `configs/ruff-config/README.md`:

```markdown
# @mikey-pro/ruff-config

AI agent code quality guardrails for Python. Strict Ruff configuration enforcing clean, secure, maintainable Python code.

## Install

### PyPI
pip install mikey-pro-ruff-config

### npm
npm i -D @mikey-pro/ruff-config

## Usage

Extend in your `pyproject.toml`:

[tool.ruff]
extend = "./node_modules/@mikey-pro/ruff-config/ruff.toml"

Or if installed via pip, copy `ruff.toml` to your project root.

## What's Enforced

- PEP 8 style (pycodestyle)
- Import sorting (isort)
- Security checks (bandit)
- Complexity limit: 12 (mccabe)
- Max function arguments: 3
- Bug detection (bugbear)
- Modern Python idioms (pyupgrade, ruff-specific)
- No print statements (use logging)
- No commented-out code
- Pathlib over os.path
```

**Step 5: Copy LICENSE**

```bash
cp LICENSE configs/ruff-config/LICENSE
```

**Step 6: Add to bump-version.js**

In `scripts/bump-version.js`, add to the `packageFiles` array:
```js
  'configs/ruff-config/package.json',
```

Also add a function to update `pyproject.toml` version (since it's TOML, not JSON). Add after the existing `updatePackageVersion` function:

```js
function updatePyprojectVersion(filePath, newVersion) {
  const fullPath = join(rootDir, filePath);
  let content = readFileSync(fullPath, 'utf8');
  content = content.replace(
    /^version = ".*"$/m,
    `version = "${newVersion}"`,
  );
  writeFileSync(fullPath, content, 'utf8');
}
```

And in the `main()` function, after the package.json loop, add:
```js
  // Update pyproject.toml version
  try {
    updatePyprojectVersion('configs/ruff-config/pyproject.toml', newVersion);
    console.log(`✓ Updated configs/ruff-config/pyproject.toml → ${newVersion}`);
  } catch (error) {
    console.error(`✗ Failed to update pyproject.toml:`, error.message);
  }
```

**Step 7: Commit**

```bash
git add configs/ruff-config/ scripts/bump-version.js
git commit -m "feat: add Python ruff-config package with dual PyPI+npm publishing"
```

---

## Task 6: Add Python CI Step

**Files:**
- Modify: `.github/workflows/ci.yml`

**Step 1: Add Python verification step**

Add after the "Run full test suite" step in `.github/workflows/ci.yml`:

```yaml
      - name: Verify Ruff config
        if: steps.test_type.outputs.type == 'all'
        run: |
          pip install ruff
          echo "Validating ruff.toml syntax..."
          cd configs/ruff-config && ruff check --config ruff.toml --stdin-filename test.py <<'EOF'
          import os
          x = 1
          print(x)
          EOF
          echo "Ruff config validated successfully"
```

**Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add Python ruff config validation step"
```

---

## Task 7: Global Claude Integration

**Files:**
- Modify: `~/.claude/CLAUDE.md`

**Step 1: Add Mikey Pro guardrails section**

Append to `~/.claude/CLAUDE.md`:

```markdown
## Code Quality: Mikey Pro Guardrails

When working in any project, check if @mikey-pro code quality configs are installed.

### JavaScript/TypeScript Projects
- Check for `@mikey-pro/eslint-config` in package.json devDependencies
- If missing: `npm i -D @mikey-pro/eslint-config`
- Check for `eslint.config.js` — if missing or not using mikey-pro, create one:
  ```js
  import config from '@mikey-pro/eslint-config';
  export default config;
  ```
- For React projects: use `@mikey-pro/eslint-config-react` instead
- For Vue: `@mikey-pro/eslint-config-vue`
- For Svelte: `@mikey-pro/eslint-config-svelte`
- For Angular: `@mikey-pro/eslint-config-angular`
- Always run `npx eslint .` after making changes to verify compliance
- NEVER use eslint-disable comments — the config has `noInlineConfig: true`

### Python Projects
- Check for `mikey-pro-ruff-config` or a ruff.toml referencing mikey-pro
- If missing: `pip install mikey-pro-ruff-config` and add to project
- Always run `ruff check .` and `ruff format --check .` after changes

### Rules
- Never weaken or disable mikey-pro rules
- If a rule blocks valid code, refactor the code to comply
- Run linting as part of verification before claiming work is done
```

**Step 2: No commit needed** (global config, not in repo)

---

## Task 8: Update Project CLAUDE.md and Docs

**Files:**
- Modify: `CLAUDE.md` (project root)
- Modify: `docs/plans/2026-03-01-eslint-10-upgrade.md` (mark completed)

**Step 1: Update CLAUDE.md**

Rewrite the project identity section to reflect AI agent guardrails. Update the architecture section to include ruff-config. Update the package list.

Key changes:
- "ESLint 9 style guide" → "ESLint 10 AI agent code quality guardrails"
- Add `ruff-config/` to architecture diagram
- Add Python commands (`ruff check`, `ruff format`)
- Update version references to 10.0.0
- Note that `rules.js` no longer exists

**Step 2: Mark ESLint 10 upgrade plan as completed**

In `docs/plans/2026-03-01-eslint-10-upgrade.md`, change:
- `_Status: IN PROGRESS_` → `_Status: COMPLETED_`
- Add `_Completed: 2026-03-02_`

**Step 3: Commit**

```bash
git add CLAUDE.md docs/
git commit -m "docs: update project identity to AI agent guardrails"
```

---

## Task 9: Final Verification

**Step 1: Run full test suite**

Run: `npx vitest run`
Expected: All tests pass, 0 failures.

**Step 2: Verify clean code still produces zero messages**

Run: `node --input-type=module -e "import { ESLint } from 'eslint'; const e = new ESLint({ overrideConfigFile: 'configs/eslint-config/index.js' }); const r = await e.lintText('const x = 1;\nexport default x;\n', { filePath: 'test.js' }); console.log('Messages:', r[0].messages.length);"`
Expected: `Messages: 0`

**Step 3: Verify all file types lint without fatal errors**

Test: JS, TS (via lintFiles), YAML, TOML, HTML, JSON, JSONC, Markdown — all should produce 0 fatal errors.

**Step 4: Verify ruff config parses**

Run: `pip install ruff && ruff check --config configs/ruff-config/ruff.toml --stdin-filename test.py < /dev/null`
Expected: No parse errors.

**Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final verification fixes"
```

---

## Summary

| Task | Description | Estimated Size |
|------|-------------|---------------|
| 1 | Consolidate rules.js into base-config.js | Large (many rule additions) |
| 2 | Remove unused dependencies | Small |
| 3 | AI agent rule tuning (tighten limits) | Small |
| 4 | Add violation tests for new rules | Medium |
| 5 | Create Python ruff-config package | Medium |
| 6 | Add Python CI step | Small |
| 7 | Global Claude integration | Small |
| 8 | Update project CLAUDE.md and docs | Small |
| 9 | Final verification | Small |
