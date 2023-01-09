<div width="100%" align="center">
  <a href="https://github.com/chiefmikey/mikey-pro">
    <b>Mikey Pro</b>
  </a>
  <h2>Style Guide</h2>
  <h4>Lint and Format Code (the way Mikey likes it)</h4>
</div>

_A curated compilation of packages, plugins, style guides, custom configurations
and modified rules for consistently writing top shelf code_

<table>
  <thead>
    <tr>
      <th align="left">Compatibility</a></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">
        TypeScript -
        JavaScript -
        React -
        Preact -
        Jest -
        Cypress -
        Vue -
        Svelte-
        Markdown -
        HTML -
        CSS -
        SCSS -
        LESS -
        JSON -
        JSONC -
        JSON5
      </td>
    </tr>
  </tbody>
</table>

## Requirements

Install extensions:
<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">Prettier</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">Stylelint</a>

Additional support:
<a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur">Vetur</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode">Svelte</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck">ShellCheck</a>

## Usage

### Install

```shell
npm i -D mikey-pro
```

### Configure

Add bundled configs to `package.json` and then reload

```json
{
  "prettier": "@mikey-pro/prettier-config",
  "eslintConfig": {
    "extends": "@mikey-pro/eslint-config"
  },
  "stylelint": {
    "extends": "@mikey-pro/stylelint-config"
  }
}
```
