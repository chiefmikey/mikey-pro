# mikey-pro

AI agent code quality guardrails — ESLint 10, Prettier, and Stylelint in one install.

[![npm version](https://img.shields.io/npm/v/mikey-pro.svg)](https://www.npmjs.com/package/mikey-pro)

## Install

```bash
npm install --save-dev mikey-pro
```

For framework projects, install the framework variant instead (mikey-pro comes transitively):

```bash
npm install --save-dev @mikey-pro/eslint-config-react    # React / Next.js
npm install --save-dev @mikey-pro/eslint-config-vue      # Vue / Nuxt
npm install --save-dev @mikey-pro/eslint-config-svelte   # Svelte / SvelteKit
npm install --save-dev @mikey-pro/eslint-config-angular  # Angular
```

## Setup

**eslint.config.js**

```js
export { default } from 'mikey-pro';
```

**package.json**

```json
{
  "prettier": "mikey-pro/prettier",
  "stylelint": { "extends": "mikey-pro/stylelint" }
}
```

## What's Included

- **ESLint 10** flat config with 25+ plugins — code quality, security, imports, TypeScript, formatting
- **Prettier** config — consistent formatting across JS, TS, JSON, CSS, HTML, Markdown, YAML
- **Stylelint** config — CSS/SCSS best practices, property ordering, selector limits
- **noInlineConfig** enabled — `// eslint-disable` comments are blocked

## Subpath Exports

```js
import config from 'mikey-pro';                              // ESLint flat config array
import { baseConfig } from 'mikey-pro/eslint/base-config.js'; // Base config object
import { baseOverrides } from 'mikey-pro/eslint/overrides.js'; // File-specific overrides
```

## Packages

| Package | Description |
|---|---|
| `mikey-pro` | Unified base — ESLint + Prettier + Stylelint |
| `@mikey-pro/eslint-config-react` | React/Next.js rules |
| `@mikey-pro/eslint-config-vue` | Vue/Nuxt rules |
| `@mikey-pro/eslint-config-svelte` | Svelte/SvelteKit rules |
| `@mikey-pro/eslint-config-angular` | Angular rules |
| `@mikey-pro/ruff-config` | Python guardrails (Ruff) |

## License

MIT
