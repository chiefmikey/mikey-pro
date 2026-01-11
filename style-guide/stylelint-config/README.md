# @mikey-pro/stylelint-config

Stylelint configuration for the Mikey Pro style guide.

## Installation

```bash
npm install @mikey-pro/stylelint-config
```

## Usage

```javascript
// .stylelintrc.js
module.exports = {
  extends: ['@mikey-pro/stylelint-config'],
};
```

Or in package.json:

```json
{
  "stylelint": {
    "extends": "@mikey-pro/stylelint-config"
  }
}
```

## Features

- CSS/SCSS best practices
- Property ordering
- Selector specificity limits
- Color and font consistency
- Performance optimizations

See [Mikey Pro](https://github.com/chiefmikey/mikey-pro) for full documentation.
