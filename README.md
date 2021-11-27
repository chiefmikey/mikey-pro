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

_A curated compilation of packages, plugins, style guides, custom
configurations and modified rules for consistently writing top shelf code_

<div align="center">
  <table>
    <thead>
      <tr>
        <th align="left">Compatibility</a></th>
        <th align="left">Rules</a></th>
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
          LESS <br />
          JSON <br />
          JSONC <br />
          JSON5 <br />
          Markdown <br />
          Properties <br />
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
          Import <br />
          JSX-A11y <br />
          Hooks <br />
          Remark <br />
          Stylelint <br />
          @Primer <br />
          @HTML
        </td>
      </tr>
    </tbody>
  </table>
</div>

## Requirements

<a href="https://code.visualstudio.com/">VSCode</a> with these extensions:
<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">Prettier</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">Stylelint</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur">Vetur</a>
|
<a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode">Svelte</a>

Add
<a href="https://github.com/mikey-pro/style-guide/blob/main/vscode-settings.json">these
preferences</a> to `settings.json`

## Usage

### Install

```shell
npm i -D @mikey-pro/style-guide eslint prettier stylelint
```

### Configure

Add bundled configs to `package.json` then restart the ESLint server

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

## Resources

[Mikey Pro ESLint Config](https://github.com/mikey-pro/eslint-config)

[Mikey Pro Prettier Config](https://github.com/mikey-pro/prettier-config)

[Mikey Pro Stylelint Config](https://github.com/mikey-pro/stylelint-config)
