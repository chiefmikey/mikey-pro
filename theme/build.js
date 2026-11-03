// Generates ready-to-use terminal theme files from palette.json.
// Pure Node built-ins only (fs, path, url) -- no runtime dependencies.
// Idempotent: running this script repeatedly produces byte-identical output.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const directoryName = import.meta.dirname;
const palette = JSON.parse(
  readFileSync(path.join(directoryName, 'palette.json'), 'utf8'),
);

const terminalDirectory = path.join(directoryName, 'terminal');
const ghosttyDirectory = path.join(terminalDirectory, 'ghostty');
const itermFile = path.join(terminalDirectory, 'mikey-pro.itermcolors');
const ghosttyFile = path.join(ghosttyDirectory, 'mikey-pro');

function hexToUnitComponents(hex) {
  const clean = hex.replace('#', '');
  const red = Number.parseInt(clean.slice(0, 2), 16) / 255;
  const green = Number.parseInt(clean.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(clean.slice(4, 6), 16) / 255;
  return { blue, green, red };
}

function plistColorDict(hex, indent) {
  const { blue, green, red } = hexToUnitComponents(hex);
  const inner = `${indent}\t`;
  return [
    `${indent}<dict>`,
    `${inner}<key>Color Space</key>`,
    `${inner}<string>sRGB</string>`,
    `${inner}<key>Red Component</key>`,
    `${inner}<real>${red}</real>`,
    `${inner}<key>Green Component</key>`,
    `${inner}<real>${green}</real>`,
    `${inner}<key>Blue Component</key>`,
    `${inner}<real>${blue}</real>`,
    `${indent}</dict>`,
  ].join('\n');
}

function buildItermColors() {
  const indent = '\t';
  const entries = [];

  for (const [index, hex] of palette.ansi.entries()) {
    entries.push([`Ansi ${index} Color`, hex]);
  }

  entries.push(
    ['Background Color', palette.background],
    ['Foreground Color', palette.foreground],
    ['Bold Color', palette.foreground],
    ['Cursor Color', palette.cursor],
    ['Cursor Text Color', palette.selection.foreground],
    ['Selection Color', palette.selection.background],
    ['Selected Text Color', palette.selection.foreground],
  );

  const body = entries
    .map(
      ([key, hex]) =>
        `${indent}<key>${key}</key>\n${plistColorDict(hex, indent)}`,
    )
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    '<dict>',
    body,
    '</dict>',
    '</plist>',
    '',
  ].join('\n');
}

function buildGhosttyTheme() {
  const lines = palette.ansi.map((hex, index) => `palette = ${index}=${hex}`);
  lines.push(
    `background = ${palette.background}`,
    `foreground = ${palette.foreground}`,
    `cursor-color = ${palette.cursor}`,
    `selection-background = ${palette.selection.background}`,
    `selection-foreground = ${palette.selection.foreground}`,
  );
  return `${lines.join('\n')}\n`;
}

function writeIfChanged(filePath, contents) {
  if (existsSync(filePath) && readFileSync(filePath, 'utf8') === contents) {
    return false;
  }
  writeFileSync(filePath, contents);
  return true;
}

function main() {
  mkdirSync(ghosttyDirectory, { recursive: true });

  const itermChanged = writeIfChanged(itermFile, buildItermColors());
  const ghosttyChanged = writeIfChanged(ghosttyFile, buildGhosttyTheme());

  console.log(
    `iTerm theme:   ${itermChanged ? 'written' : 'unchanged'} -> ${itermFile}`,
  );
  console.log(
    `Ghostty theme: ${ghosttyChanged ? 'written' : 'unchanged'} -> ${ghosttyFile}`,
  );
}

main();
