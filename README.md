# Mikey Pro

AI agent code quality guardrails for JavaScript, TypeScript, React, Vue, Svelte, Angular, and Python.

[![Tests](https://github.com/chiefmikey/mikey-pro/workflows/CI/badge.svg)](https://github.com/chiefmikey/mikey-pro/actions)
[![npm version](https://img.shields.io/npm/v/mikey-pro.svg)](https://www.npmjs.com/package/mikey-pro)

## Install

```bash
npm install --save-dev mikey-pro eslint prettier stylelint
```

Framework projects — one install, base comes transitively:

```bash
npm install --save-dev @mikey-pro/eslint-config-react eslint prettier    # React / Next.js
npm install --save-dev @mikey-pro/eslint-config-vue eslint prettier      # Vue / Nuxt
npm install --save-dev @mikey-pro/eslint-config-svelte eslint prettier   # Svelte / SvelteKit
npm install --save-dev @mikey-pro/eslint-config-angular eslint prettier  # Angular
```

Python:

```bash
pip install mikey-pro-ruff-config
```

## Setup

**eslint.config.js**

```js
// Base
export { default } from 'mikey-pro';

// Or framework variant
export { default } from '@mikey-pro/eslint-config-react';
```

**package.json**

```json
{
  "prettier": "mikey-pro/prettier",
  "stylelint": { "extends": "mikey-pro/stylelint" }
}
```

Or, if you prefer standalone config files, use the same `mikey-pro` subpaths:

**prettier.config.js**

```js
export { default } from 'mikey-pro/prettier';
```

**stylelint.config.js**

```js
export { default } from 'mikey-pro/stylelint';
```

> Use the `mikey-pro/prettier` and `mikey-pro/stylelint` subpaths, not
> `@mikey-pro/prettier-config` / `@mikey-pro/stylelint-config`. The standalone
> packages exist for projects that want only that one config; the install
> commands above do not pull them in, so importing them from a shim fails with
> `ERR_MODULE_NOT_FOUND`.

## Features

- **ESLint 10** flat config with 25+ plugins
- **TypeScript** strict type checking with project-aware rules
- **Security** — unsafe regex, injection, secrets detection
- **Performance** — complexity limits, efficient patterns
- **Formatting** — Prettier integration, import sorting, key ordering
- **Accessibility** — a11y rules for React
- **Targeted escapes** — `// eslint-disable` comments are allowed
  (`noInlineConfig: false`) for genuine edge cases, and unused ones are reported

## Supported File Types

JavaScript, TypeScript, JSX, TSX, Vue, Svelte, JSON, YAML, TOML, HTML, CSS, SCSS, Markdown

## Packages

| Package                            | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| `mikey-pro`                        | Unified base — ESLint + Prettier + Stylelint                 |
| `@mikey-pro/eslint-config`         | Standalone ESLint config (same rules, no Prettier/Stylelint) |
| `@mikey-pro/eslint-config-react`   | React/Next.js rules                                          |
| `@mikey-pro/eslint-config-vue`     | Vue/Nuxt rules                                               |
| `@mikey-pro/eslint-config-svelte`  | Svelte/SvelteKit rules                                       |
| `@mikey-pro/eslint-config-angular` | Angular rules                                                |
| `@mikey-pro/prettier-config`       | Standalone Prettier config                                   |
| `@mikey-pro/stylelint-config`      | Standalone Stylelint config                                  |
| `@mikey-pro/ruff-config`           | Python guardrails (Ruff)                                     |

## Custom Configuration

```js
// eslint.config.js
import config from '@mikey-pro/eslint-config-react';

export default [...config, { ignores: ['dist/', '.next/', 'coverage/'] }];
```

## Development

```bash
npm run npm:install   # Install all sub-package dependencies
npm test              # Run test suite (209 tests)
npm run eslint        # Self-lint
npm run publish:all   # Publish all packages
```

## License

MIT
