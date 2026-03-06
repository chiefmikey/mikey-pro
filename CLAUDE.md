# Project CLAUDE.md - Mikey Pro Theme

## Project Overview

Mikey Pro theme assets and color definitions — includes the main theme and an Adobe Creative Cloud sub-theme (Illustrator, Photoshop).

## Tech Stack

- **Type:** Theme/design asset package
- **Published as:** `mikey-pro-theme` on npm

## Architecture

```
img/
  mikey-pro-logo.svg    # Logo asset
theme-adobe/            # Adobe Creative Cloud theme (separate package: theme-adobe)
  creative-cloud/       # Creative Cloud theme files
  exchange/             # Adobe Exchange assets
  illustrator/          # Illustrator theme
  photoshop/            # Photoshop theme
  img/                  # Adobe theme images
  package.json          # Separate npm package (theme-adobe)
package.json            # Main theme package (mikey-pro-theme)
```

## Commands

No scripts defined. Asset/theme package only.

## Conventions

- No module type specified (asset package)
- Conventional commits

## Testing

No tests. Design asset package.
