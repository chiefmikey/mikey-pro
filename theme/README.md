<div width="100%" align="center">
  <h1>
    <b>Mikey Pro</b>
  </h1>
  <h2>Theme</h2>
  <h4>Look good, feel good</h4>
</div>

Mikey Pro is a Monokai-Pro-derived color palette named "Mikey Pro". It is the
single source of truth for the terminal themes in this package. Blue
intentionally folds to a neutral gray, and several slots deliberately share
the same hex value -- this is a design choice, not a bug.

## Palette

| Slot         | Hex       |
| ------------ | --------- |
| background   | `#1d1b1d` |
| foreground   | `#fcfcfa` |
| cursor       | `#7e6fb2` |
| selection bg | `#7e6fb2` |
| selection fg | `#1d1b1d` |

| ANSI index | Name           | Hex       |
| ---------- | -------------- | --------- |
| 0          | black          | `#4f4e4f` |
| 1          | red            | `#9e475e` |
| 2          | green          | `#96c766` |
| 3          | yellow         | `#ddbd53` |
| 4          | blue           | `#4f4e4f` |
| 5          | magenta        | `#7e6fb2` |
| 6          | cyan           | `#5dacb7` |
| 7          | white          | `#727072` |
| 8          | bright black   | `#727072` |
| 9          | bright red     | `#ff6188` |
| 10         | bright green   | `#a9dc76` |
| 11         | bright yellow  | `#ffd866` |
| 12         | bright blue    | `#727072` |
| 13         | bright magenta | `#ab9df2` |
| 14         | bright cyan    | `#78dce8` |
| 15         | bright white   | `#727072` |

## Usage

### As a JavaScript module

```js
import palette, { ansi, named } from 'mikey-pro-theme';

console.log(palette.background); // '#1d1b1d'
console.log(ansi[9]); // '#ff6188'
console.log(named.brightMagenta); // '#ab9df2'
```

Or read `palette.json` directly if you just need the raw data in a
non-JavaScript tool.

### iTerm2

1. Open iTerm2 Preferences > Profiles > Colors.
2. Click "Color Presets..." > Import...
3. Select `terminal/mikey-pro.itermcolors` from this package.
4. Select "Mikey Pro" from the Color Presets list to apply it.

### Ghostty

1. Copy `terminal/ghostty/mikey-pro` into your Ghostty themes directory
   (typically `~/.config/ghostty/themes/`).
2. Add `theme = mikey-pro` to your Ghostty config.

## Regenerating the terminal themes

Both terminal theme files are generated from `palette.json` by `build.js`.
If you edit the palette, regenerate the derived files with:

```sh
npm run build
```

The generator is idempotent -- running it multiple times against an
unchanged palette produces byte-identical output.
