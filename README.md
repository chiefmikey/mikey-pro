<div width="100%" align="center">
  <h1>
    <b>Mikey Pro</b>
  </h1>
  <h3>
    <a href="https://github.com/mikey-pro/style-guide">Style Guide</a>
    +
    <a href="https://github.com/mikey-pro/theme">Theme</a>
  </h3>
  <a href="https://github.com/mikey-pro">
    <img src="img/mikey-pro-logo.svg" style="height: 75px" alt="Mikey Pro Logo" />
  </a>
  <br />
</div>

## **@mikey-pro/style-guide**

### Lint and Format Code (the way Mikey likes it)

_A compilation of packages, plugins, style guides, custom configurations and
rules for maintaining bougie code_

<table>
  <thead>
    <tr>
      <th align="left">Compatibility</a></th>
      <th align="left">Rules</a></th>
      <th align="left">Configs</a></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">
        JavaScript <br />
        React <br />
        Preact <br />
        Vue <br />
        Svelte<br />
        JSX <br />
        HTML <br />
        CSS <br />
        SCSS <br />
        JSON <br />
        Markdown <br />
      </td>
      <td valign="top">
        Unicorn <br />
        Standard <br />
        AirBnB <br />
        GitHub <br />
        ESLint <br />
        Prettier <br />
        Sonar <br />
        Compat <br />
        jsx-a11y <br />
        Remark <br />
        Stylelint <br />
        @Primer <br />
        @HTML
      </td>
      <td valign="top">
        <a href="https://github.com/mikey-pro/eslint-config">ESLint</a><br />
        <a href="https://github.com/mikey-pro/prettier-config">Prettier</a><br />
        <a href="https://github.com/mikey-pro/stylelint-config">Stylelint</a>
      </td>
    </tr>
  </tbody>
</table>

## Requirements

<a href="https://code.visualstudio.com/">VSCode</a> with these extensions:
<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint</a> |
<a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">Prettier</a> |
<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">Stylelint</a> |
<a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur">Vetur</a> |
<a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode">Svelte</a>

Add <a href="https://github.com/mikey-pro/style-guide/blob/main/vscode-settings.json">these preferences</a> to `settings.json`

## Usage

### Install

```shell
npm i -D @mikey-pro/style-guide eslint prettier stylelint
```

### Configure

Add bundled configs to `package.json`:

```json
{
  "eslintConfig": {
    "extends": "@mikey-pro"
  },
  "prettier": "@mikey-pro/prettier-config",
  "stylelint": {
    "extends": "@mikey-pro/stylelint-config"
  }
}
```
