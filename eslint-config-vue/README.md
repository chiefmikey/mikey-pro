<div width="100%" align="center">
  <h1>
    <a href="https://github.com/chiefmikey/mikey-pro">
      <b>Mikey Pro</b>
    </a>
  </h1>
</div>

## **@mikey-pro/eslint-config-vue**

A preset ESLint Vue configuration

## Usage

### Install

```shell
npm i -D mikey-pro @mikey-pro/eslint-config-vue
```

### Configure (Flat ESLint v9+ Default)

```js
// eslint.config.js
import vueConfig from '@mikey-pro/eslint-config-vue';

export default vueConfig;
```

### Legacy (eslintrc) Configuration (still supported)

Legacy consumers should explicitly import the legacy entry:

```json
{
  "eslintConfig": {
    "extends": ["@mikey-pro/eslint-config-vue/legacy"]
  }
}
```

Or via direct require:

```js
module.exports = require('@mikey-pro/eslint-config-vue/legacy');
```
