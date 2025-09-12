<div width="100%" align="center">
  <h1>
    <a href="https://github.com/chiefmikey/mikey-pro">
      <b>Mikey Pro</b>
    </a>
  </h1>
</div>

## **@mikey-pro/eslint-config-react**

A preset ESLint React configuration

## Usage

### Install

```shell
npm i -D mikey-pro @mikey-pro/eslint-config-react
```

### Configure (Flat ESLint v9+ Recommended)

```js
// eslint.config.js
import reactConfig from '@mikey-pro/eslint-config-react/flat';

export default reactConfig;
```

### Legacy Configuration (still supported)

```json
{
  "eslintConfig": {
    "extends": ["@mikey-pro/eslint-config-react"]
  }
}
```
