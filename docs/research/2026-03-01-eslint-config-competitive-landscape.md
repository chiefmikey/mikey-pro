# ESLint Config Competitive Landscape Research - March 2026

## Executive Summary

The ESLint ecosystem is undergoing its most significant transformation since inception. ESLint 10 dropped February 7, 2026, removing eslintrc entirely. The landscape has fractured into tiers: actively maintained modern configs (antfu, xo, neostandard), stagnant legacy giants (airbnb, standard), and Rust-based challengers (Biome, Oxlint). The bar for "elite" ESLint configs has risen dramatically — flat config, ESLint 10 support, TypeScript-first, composable APIs, and multi-language linting are now table stakes.

---

## 1. Most Popular ESLint Config Packages (by weekly downloads)

### Tier 1: Legacy Giants (High Downloads, Questionable Maintenance)

| Package                   | Weekly Downloads | ESLint 10 Support | Flat Config | Status                                        |
| ------------------------- | ---------------- | ----------------- | ----------- | --------------------------------------------- |
| eslint-config-airbnb      | ~3.7M            | NO                | NO          | Effectively dead. No release in 4+ years.     |
| eslint-config-airbnb-base | ~3.5M (est.)     | NO                | NO          | Same status as airbnb.                        |
| eslint-config-standard    | ~2.8M (est.)     | NO                | NO          | Dead since July 2025 per community consensus. |

### Tier 2: Modern Leaders (Growing Fast, Actively Maintained)

| Package                       | Weekly Downloads | ESLint 10 Support | Flat Config  | Status                                               |
| ----------------------------- | ---------------- | ----------------- | ------------ | ---------------------------------------------------- |
| @antfu/eslint-config          | ~290K            | YES (v7.4.2+)     | YES (native) | Gold standard for modern configs. 6.1k stars.        |
| eslint-config-xo              | ~214K (via xo)   | YES (v0.50.0)     | YES          | Sindre Sorhus maintained, opinionated.               |
| neostandard                   | growing          | YES               | YES          | Community fork of Standard JS with ESLint Stylistic. |
| eslint-config-airbnb-extended | ~18 projects     | partial           | YES          | Community replacement for dead Airbnb config.        |

### Tier 3: Framework-Specific

| Package             | Notes                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| eslint-config-next  | Next.js official. Maintained by Vercel. ESLint 9 flat config support. |
| @nuxt/eslint-config | Nuxt official. Uses @antfu/eslint-config under the hood.              |
| eslint-config-alloy | Progressive config for React/Vue/TypeScript.                          |

### Key Takeaway

The download numbers are misleading. Airbnb still dominates downloads because of legacy projects, but it's dead software. The real competition is between @antfu/eslint-config and xo for modern projects.

---

## 2. ESLint 10 Support Status

### What Changed (Released February 7, 2026)

**Breaking Changes:**

- eslintrc config system COMPLETELY REMOVED (no .eslintrc.\*, no .eslintignore)
- Node.js requirement: ^20.19.0 || ^22.13.0 || >=24
- Config lookup now starts from each linted file's directory (not cwd) — huge for monorepos
- ESLINT_USE_FLAT_CONFIG env var removed
- CLI args removed: --no-eslintrc, --env, --resolve-plugins-relative-to, --rulesdir, --ignore-path
- Deprecated context methods removed (getFilename -> filename, getCwd -> cwd, etc.)
- Deprecated SourceCode methods removed (getTokenOrCommentBefore, getJSDocComment, etc.)
- Program AST node range now spans entire source text
- jiti >= 2.2.0 required for TypeScript config files
- eslint-env comments now generate errors
- Three new rules added to eslint:recommended: no-unassigned-vars, no-useless-assignment, preserve-caught-error

**New Features:**

- JSX references now properly tracked (fixes no-unused-vars and no-undef for JSX)
- Built-in type definitions for Espree and ESLint Scope (no more @types/ packages needed)
- Enhanced RuleTester with requireMessage, requireLocation, requireData assertions
- max-params countThis option for TypeScript
- Formatter context color property

### Plugin ESLint 10 Compatibility (as of March 2026)

| Plugin                      | ESLint 10 Support                      | Notes                                                             |
| --------------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| typescript-eslint           | YES (^8.57.0 \|\| ^9.0.0 \|\| ^10.0.0) | Full support.                                                     |
| eslint-plugin-unicorn       | YES                                    | Actively maintained by Sindre Sorhus.                             |
| eslint-plugin-import-x      | Likely YES                             | Peer deps: ^8.57.0 \|\| ^9.0.0. May need update for explicit ^10. |
| eslint-plugin-react         | PENDING                                | Compatibility issue filed. Fix in progress.                       |
| eslint-plugin-react-hooks   | PENDING                                | PR to add ^10.0.0 peer dep filed. Flat config works since v7.0.0. |
| eslint-plugin-vue           | Likely YES                             | Actively maintained.                                              |
| eslint-plugin-perfectionist | YES                                    | Actively maintained.                                              |
| @eslint/css                 | YES                                    | Official ESLint language plugin.                                  |
| @eslint/json                | YES                                    | Official ESLint language plugin.                                  |
| @eslint/markdown            | YES                                    | Official ESLint language plugin.                                  |

---

## 3. What Makes a Config "Elite" in 2026

### Must-Have Features

1. **Native Flat Config** — Arrays of config objects, not eslintrc extends chains
2. **ESLint 10 Support** — eslintrc is dead, if you don't support 10, you're dead too
3. **TypeScript-First** — Auto-detection of tsconfig, type-aware rules via typescript-eslint
4. **defineConfig() Support** — ESLint's native type-safe config helper (from `eslint/config`)
5. **Framework Composability** — Add React/Vue/Svelte/Angular via a single option toggle
6. **Import Sorting & Validation** — Using eslint-plugin-import-x (not the dead original)
7. **ESLint Stylistic or Prettier Integration** — Formatting must be handled
8. **Auto .gitignore Parsing** — Don't lint what git ignores
9. **Monorepo Support** — ESLint 10's per-file config lookup makes this easier

### Nice-to-Have (Differentiators)

1. **FlatConfigComposer / Chainable API** — antfu pioneered this; chain .prepend(), .override(), .renamePlugins()
2. **ESLint Config Inspector Integration** — Visual tool to understand config (npx eslint --inspect-config)
3. **Plugin Renaming** — Shorter prefixes (ts/ instead of @typescript-eslint/)
4. **CLI Setup Wizard** — Interactive migration from legacy configs
5. **Multi-Language Linting** — JSON, YAML, TOML, Markdown, CSS, HTML via ESLint language plugins
6. **Oxlint Integration** — eslint-plugin-oxlint to disable overlapping rules when using both
7. **globalIgnores() Helper** — Explicit global vs local ignore distinction
8. **extends in Flat Config** — ESLint's native extends support for flat config objects

---

## 4. Deep Dive: @antfu/eslint-config (The Gold Standard)

### Why It's Popular

**Anthony Fu** (core Vue/Vite/Nuxt team member) built this as a comprehensive, opinionated, one-line setup. It's popular because:

1. **Zero-Config Start** — `import antfu from '@antfu/eslint-config'; export default antfu()` gets you 50+ plugins
2. **Factory Function Pattern** — The `antfu()` factory returns a `FlatConfigComposer` (extends Promise), enabling:
   ```js
   export default antfu({
     typescript: true,
     vue: true,
     stylistic: { indent: 2, quotes: 'single' },
   })
     .prepend(/* custom configs before */)
     .override('antfu/typescript', {
       /* override specific named block */
     })
     .renamePlugins({ '@typescript-eslint': 'ts' });
   ```
3. **Replaces Prettier** — Uses ESLint Stylistic for formatting. No Prettier needed.
4. **Auto-Detection** — Detects TypeScript, Vue, React, etc. from package.json
5. **Plugin Renaming** — Shorter, consistent prefixes: `ts/` not `@typescript-eslint/`, `import/` not `import-x/`
6. **Named Config Blocks** — Every config object has a `name` property for easy targeting/overriding
7. **Built-in Multi-Language** — JSON, YAML, TOML, Markdown, XML support out of the box
8. **Config Inspector** — Built the original eslint-flat-config-viewer (now official @eslint/config-inspector)
9. **Rapid Iteration** — v7.4.3 as of Feb 2026, 1,323 commits, sustainable maintenance

### Architecture

```
antfu()  →  FlatConfigComposer (extends Promise)
  ├── javascript (base JS rules)
  ├── typescript (auto-detected)
  ├── vue / react / svelte / astro / solid (framework-specific)
  ├── stylistic (formatting via @eslint/stylistic)
  ├── imports (via eslint-plugin-import-x)
  ├── unicorn (modern JS patterns)
  ├── perfectionist (sorting)
  ├── jsdoc (documentation rules)
  ├── jsonc / yaml / toml / markdown (multi-language)
  ├── comments (comment style rules)
  ├── node (Node.js specific)
  └── ignores (.gitignore auto-parsing)
```

### Opinionated Choices That May Not Suit Everyone

- No semicolons (can be toggled)
- Single quotes (can be toggled)
- Replaces Prettier entirely (some teams want Prettier)
- Dangling commas
- Sorted imports enforced

### Stats

- ~290K weekly npm downloads (and growing)
- 6.1K GitHub stars, 577 forks
- Version 7.4.3 (Feb 2026)
- ESLint 9.5.0+ required (ESLint 10 supported via relaxed peer deps in v7.4.2)

---

## 5. How Top Configs Handle ESLint 10 Migration

### @antfu/eslint-config

- Already native flat config since v1.0 (2023)
- v7.4.2 relaxed ESLint peer dependency range to include ESLint 10
- No migration needed for existing users — was never on eslintrc

### XO (Sindre Sorhus)

- eslint-config-xo v0.50.0 supports flat config
- Maintained actively, likely ESLint 10 compatible
- XO itself wraps ESLint with additional tooling

### Neostandard

- Community-driven replacement for dead Standard JS
- Uses @eslint-stylistic for formatting
- Native flat config from the start
- Designed specifically for ESLint 9/10 era

### typescript-eslint

- Explicit ESLint 10 support: `peerDependencies: "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0"`
- v8 series shipped with full flat config support
- "project service" for monorepos: zero-config typed linting

### eslint-config-airbnb

- NO migration. Dead project.
- Community alternatives: eslint-config-airbnb-extended (small adoption), airbnb-eslint9 (temporary)
- FlatCompat from @eslint/eslintrc can translate legacy configs but is a band-aid

### eslint-config-standard

- Dead since ~July 2025
- Neostandard is the recommended migration path

---

## 6. eslint-plugin-import vs eslint-plugin-import-x

### eslint-plugin-import (LEGACY - Avoid)

- 117 dependencies
- Uses `resolve` package (no `exports` field support in package.json)
- Uses `tsconfig-paths` + `typescript` for TS config loading (slow, heavy)
- Targets Node >=4 and ESLint ^2 through ^9
- No ESLint 10 peer dep
- Maintenance is sporadic at best

### eslint-plugin-import-x (MODERN - Use This)

- 16 dependencies (87% reduction)
- Built-in Rust-based resolver: `unrs-resolver` (supports `exports` field in package.json)
- Uses `get-tsconfig` instead of tsconfig-paths (faster, cleaner)
- Targets Node ^18.18.0 || ^20.9.0 || >=21.1.0 and ESLint ^8.57.0 || ^9.0.0
- Native flat config support with `import-x/flat/recommended`
- New resolver interface: `import-x/resolver-next` for flat config
- First-party `exports` field support (the killer feature the original refuses to implement)
- ~635K weekly downloads for eslint-plugin-perfectionist shows momentum for modern alternatives

### Migration Path

```js
// Old (eslint-plugin-import)
import importPlugin from 'eslint-plugin-import';

// New (eslint-plugin-import-x)
import importX from 'eslint-plugin-import-x';
// Rules use same names, just change the plugin reference
```

### Verdict

eslint-plugin-import is dead weight. eslint-plugin-import-x is the clear successor — faster, lighter, modern resolver, exports support. Every elite config uses it now.

---

## 7. Trending Plugins & Features in 2026

### Official ESLint Language Plugins (NEW - Big Deal)

ESLint is now language-agnostic. Official plugins for non-JS languages:

- **@eslint/css** — CSS linting via CSSTree parser (released Feb 2025)
- **@eslint/json** — JSON linting (released Oct 2024)
- **@eslint/markdown** — Markdown linting (released Oct 2024)
- **html-eslint** — HTML linting as ESLint language plugin (released May 2025)

This is ESLint's answer to Biome — one tool for all web languages.

### ESLint Core Features

- **defineConfig()** — Type-safe config helper from `eslint/config`
- **globalIgnores()** — Explicit global ignore helper from `eslint/config`
- **extends in flat config** — Native extends support for composing shared configs
- **Multithreaded linting** — Performance improvement landed in 2025
- **Config Inspector** — `npx eslint --inspect-config` for visual config debugging
- **Cross-file linting** — Planned for 2026, will follow import dependencies

### Hot Plugins

| Plugin                      | Weekly Downloads | What It Does                                                                     |
| --------------------------- | ---------------- | -------------------------------------------------------------------------------- |
| eslint-plugin-perfectionist | ~636K            | Sorting everything: imports, objects, types, enums, JSX props. All auto-fixable. |
| eslint-plugin-unicorn       | ~4.8M            | 100+ modern JS best practice rules.                                              |
| @eslint-stylistic           | growing          | Formatting rules extracted from ESLint core. Replaces Prettier for some teams.   |
| eslint-plugin-oxlint        | growing          | Disables ESLint rules that Oxlint already covers, for hybrid setups.             |
| eslint-plugin-regexp        | steady           | Regex mistake detection and style enforcement.                                   |

### Rust-Based Challengers

**Biome v2.3+**

- 423+ lint rules, 10-25x faster than ESLint
- Type-aware linting since v2 (scans .d.ts files)
- 97% Prettier-compatible formatter built in
- Single binary, no npm dependency hell
- BUT: smaller rule ecosystem, less community plugins, no custom rule ecosystem like ESLint

**Oxlint v1.0+ (Stable since Aug 2025)**

- 520+ rules, 50-100x faster than ESLint, 2x faster than Biome
- Now supports JavaScript plugins with ESLint-compatible API
- eslint-plugin-oxlint for gradual migration (run both tools)
- @oxlint/migrate for config translation
- Part of VoidZero (Evan You's company)

**Impact on ESLint Configs:**

- Elite configs now offer Oxlint integration (disable overlapping rules)
- ESLint responds with multithreaded linting, language plugins, cross-file analysis
- The ecosystem is NOT replacing ESLint — it's layering. Oxlint for speed + ESLint for depth/plugins.

### ESLint's Strategic Response

- Language-agnostic core rewrite (in progress for 2026)
- Official CSS, JSON, Markdown, HTML plugins
- Async core planned
- Cross-file linting planned
- AI integration (Copilot code review surfaces ESLint violations)
- 70.7M weekly npm downloads (65% growth in 2025)

---

## 8. Competitive Positioning for @mikey-pro/eslint-config

### What Mikey Pro Already Does Well

- ESLint 9 flat config (native)
- Framework coverage (React, Vue, Svelte, Angular)
- 50+ plugins integrated
- Prettier config companion package
- Stylelint config companion package

### Gaps vs Elite Configs (Opportunities)

| Feature                            | antfu               | xo      | Mikey Pro          | Priority |
| ---------------------------------- | ------------------- | ------- | ------------------ | -------- |
| ESLint 10 support                  | YES                 | YES     | NOT YET            | CRITICAL |
| defineConfig()                     | N/A (own factory)   | N/A     | Could adopt        | HIGH     |
| FlatConfigComposer / chainable API | YES                 | NO      | NO                 | MEDIUM   |
| eslint-plugin-import-x             | YES                 | likely  | CHECK              | HIGH     |
| ESLint Stylistic option            | YES (default)       | NO      | NO (uses Prettier) | LOW      |
| CLI setup wizard                   | YES                 | YES     | NO                 | LOW      |
| Config Inspector support           | YES                 | NO      | FREE               | LOW      |
| Multi-language (JSON/YAML/MD/CSS)  | YES                 | partial | CHECK              | MEDIUM   |
| Plugin renaming (ts/ etc)          | YES                 | NO      | CHECK              | LOW      |
| Oxlint integration                 | planned             | NO      | NO                 | FUTURE   |
| Monorepo per-file config           | YES (via ESLint 10) | N/A     | NOT YET            | MEDIUM   |

### Recommended Next Steps

1. **ESLint 10 support** — The single most critical upgrade. Update peer deps, test all 50+ plugins.
2. **Switch to eslint-plugin-import-x** — If still on eslint-plugin-import, migrate immediately.
3. **Add defineConfig() and globalIgnores() examples** — Show modern usage patterns.
4. **Test with ESLint 10 config-lookup-from-file** — Ensure monorepo compat.
5. **Consider Oxlint companion mode** — eslint-plugin-oxlint for teams that want speed.
6. **Evaluate @eslint/css** — Could complement or replace Stylelint config.

---

## Sources

- [ESLint v10.0.0 Release](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/)
- [ESLint v10 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-10.0.0)
- [ESLint 10 Migration - DEV Community](https://dev.to/pockit_tools/eslint-10-migration-guide-everything-you-need-to-know-about-the-biggest-update-yet-55hk)
- [What's Coming in ESLint v10](https://eslint.org/blog/2025/10/whats-coming-in-eslint-10.0.0/)
- [ESLint 2025 Year in Review](https://eslint.org/blog/2026/01/eslint-2025-year-review/)
- [Evolving Flat Config: extends, defineConfig, globalIgnores](https://eslint.org/blog/2025/03/flat-config-extends-define-config-global-ignores/)
- [ESLint CSS Support](https://eslint.org/blog/2025/02/eslint-css-support/)
- [ESLint HTML Plugin](https://eslint.org/blog/2025/05/eslint-html-plugin/)
- [ESLint JSON & Markdown Support](https://eslint.org/blog/2024/10/eslint-json-markdown-support/)
- [@antfu/eslint-config GitHub](https://github.com/antfu/eslint-config)
- [ESLint Config Inspector](https://eslint-config.antfu.me/)
- [eslint-flat-config-utils](https://github.com/antfu/eslint-flat-config-utils)
- [eslint-plugin-import-x GitHub](https://github.com/un-ts/eslint-plugin-import-x)
- [eslint-plugin-perfectionist](https://perfectionist.dev/)
- [eslint-plugin-unicorn GitHub](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [typescript-eslint ESLint 10 Issue](https://github.com/typescript-eslint/typescript-eslint/issues/11952)
- [typescript-eslint Dependency Versions](https://typescript-eslint.io/users/dependency-versions/)
- [eslint-plugin-react-hooks ESLint 10 PR](https://github.com/facebook/react/pull/35720)
- [eslint-plugin-react ESLint 10 Issue](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977)
- [Airbnb ESLint 9 Issue](https://github.com/airbnb/javascript/issues/2961)
- [Neostandard / ESLint Standards](https://pragmate.dev/js/eslint-standards/)
- [Biome Migration Guide 2026](https://dev.to/pockit_tools/biome-the-eslint-and-prettier-killer-complete-migration-guide-for-2026-27m)
- [Oxlint v1.0 Announcement](https://www.infoq.com/news/2025/08/oxlint-v1-released/)
- [Oxlint JS Plugin Support](https://voidzero.dev/posts/announcing-oxlint-js-plugins)
- [eslint-plugin-oxlint GitHub](https://github.com/oxc-project/eslint-plugin-oxlint)
- [npm trends: airbnb vs standard vs xo](https://npmtrends.com/eslint-config-airbnb-vs-standard-vs-xo)
- [ESLint Stylistic: Why?](https://eslint.style/guide/why)
- [Awesome ESLint](https://github.com/dustinspecker/awesome-eslint)
