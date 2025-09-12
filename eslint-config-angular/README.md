<div width="100%" align="center">
  <h1>
    <a href="https://github.com/chiefmikey/mikey-pro">
      <b>Mikey Pro</b>
    </a>
  </h1>
</div>

## **@mikey-pro/eslint-config-angular**

A preset ESLint Angular configuration

## Usage

### Install

```shell
npm i -D mikey-pro @mikey-pro/eslint-config-angular
```

### Configure (Flat ESLint v9+ Recommended)

```js
// eslint.config.js
import angularConfig from '@mikey-pro/eslint-config-angular/flat';

export default angularConfig;
```

### Legacy Configuration (still supported)

```json
{
  "eslintConfig": {
    "extends": ["@mikey-pro/eslint-config-angular"]
  }
}
```
