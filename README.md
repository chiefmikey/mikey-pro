<div width="100%" align="center">
  <a href="https://github.com/chiefmikey/mikey-pro">
    <b>Mikey Pro</b>
  </a>
  <h2>Style Guide</h2>
  <h4>Lint and Format Code (the way Mikey likes it)</h4>

_A curated compilation of packages, plugins, style guides, custom configurations
<br> and modified rules for consistently writing top shelf code_

#### Compatibility

<table>
  <thead>
    <tr>
      <th align="left">Languages</th>
      <th align="left">Frameworks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">
        TypeScript
        <br>
        JavaScript
        <br>
        Markdown
        <br>
        HTML
        <br>
        CSS
        <br>
        SCSS
        <br>
        LESS
        <br>
        JSON
        <br>
        JSONC
        <br>
        JSON5
      </td>
      <td valign="top">
        React
        <br>
        Preact
        <br>
        Svelte
        <br>
        Vue
        <br>
        Jest
        <br>
        Cypress
      </td>
    </tr>
  </tbody>
</table>
</div>
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
