<div width="100%" align="center">

# **Mikey Pro**

### [Style Guide](https://github.com/mikey-pro/style-guide) + [Theme](https://github.com/mikey-pro/theme)

  <a href="https://github.com/mikey-pro">
    <img src="mikey-pro-logo.png" style="width: 275px" alt="Mikey Pro Logo" />
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
      <th align="left">Compatibility</th>
      <th align="left">Rules</th>
      <th align="left">Packages</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top">
        JavaScript <br />
        React <br />
        JSX <br />
        HTML <br />
        CSS <br />
        SCSS <br />
        Less <br />
        JSON <br />
        Markdown <br />
      </td>
      <td valign="top">
        AirBnB <br />
        ESLint <br />
        Prettier <br />
        Sonar <br />
        Compat <br />
        Remark <br />
        HTML ESLint
      </td>
      <td valign="top">
        ESLint <br />
        Prettier <br />
        Stylelint
      </td>
    </tr>
  </tbody>
</table>

<br />

## Usage

### Install

```shell
npm i -D @mikey-pro/style-guide

yarn add -D @mikey-pro/style-guide
```

### Configure

Add bundled configs to `package.json`:

```json
{
  "eslintConfig": {
    "extends": "@mikey-pro/eslint-config"
  },
  "prettier": "@mikey-pro/prettier-config",
  "stylelint": {
    "extends": "@mikey-pro/stylelint-config"
  }
}
```

##### Das it :)

<br />

### Compatibility with React and JSX:

Install an [additional ESLint configuration](https://github.com/mikey-pro/eslint-config-react) which includes React rules:

```shell
npm i -D @mikey-pro/eslint-config-react

yarn add -D @mikey-pro/eslint-config-react
```

Update in `package.json`:

```json
{
  "eslintConfig": {
    "extends": "@mikey-pro/eslint-config-react"
  }
}
```

##### U did it!

### Compatibility with Vue:

Install an [additional ESLint configuration](https://github.com/mikey-pro/eslint-config-vue) which includes Vue rules:

```shell
npm i -D @mikey-pro/eslint-config-vue

yarn add -D @mikey-pro/eslint-config-vue
```

Update in `package.json`:

```json
{
  "eslintConfig": {
    "extends": "@mikey-pro/eslint-config-vue"
  }
}
```

It is recommended to also [use Vetur](https://github.com/vuejs/vetur) with your
Vue project to provide syntax highlighting and additional features in VSCode

[Install Vetur for VSCode](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

Add `vetur.config.js` to the root directory with the correct paths:

```js
module.exports = {
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
  },
  projects: [
    {
      root: './',
      package: './package.json',
      globalComponents: ['./client/src/components/**/*.vue'],
      tsconfig: './client/jsconfig.json',
    },
  ],
};
```

Add `jsconfig.json` with a glob pattern that includes all of your `.vue` files:

```json
{
  "include": [
    "./src/**/*"
  ]
}
```

##### Gud job...
