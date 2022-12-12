<div width="100%" align="center">
  <h1>
    <b>Mikey Pro</b>
  </h1>
</div>

### Lint and Format Code (the way Mikey likes it)

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
        Vue -
        Svelte-
        JSX -
        HTML -
        CSS -
        SCSS -
        LESS -
        JSON -
        JSONC -
        JSON5 -
        Markdown
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

## Usage

### Install

```shell
npm i -D mikey-pro eslint prettier stylelint
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
