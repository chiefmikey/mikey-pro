<div width="100%" align="center">
  <h1>
    <a href="https://github.com/chiefmikey/mikey-pro">
      <b>Mikey Pro</b>
    </a>
  </h1>
</div>

## **@mikey-pro/eslint-config**

A preset ESLint configuration

## Usage

### Install

```shell
npm i -D mikey-pro
```

### Configure (Flat ESLint v9+ Recommended)

Create / update `eslint.config.js`:

```js
import mikeyPro from '@mikey-pro/eslint-config/flat';

export default mikeyPro;
```

### Legacy Configuration (still supported)

Extend in `package.json` (deprecated style):

```json
{
  "eslintConfig": {
    "extends": ["@mikey-pro/eslint-config"]
  }
}
```

Both configurations are kept semantically equivalent; the legacy form will be removed in a future major release.
