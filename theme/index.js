import { readFileSync } from 'node:fs';
import path from 'node:path';

const directoryName = import.meta.dirname;

/** @type {{
 *   name: string,
 *   description: string,
 *   background: string,
 *   foreground: string,
 *   cursor: string,
 *   selection: { background: string, foreground: string },
 *   ansi: string[],
 *   named: Record<string, string>,
 * }}
 */
const palette = JSON.parse(
  readFileSync(path.join(directoryName, 'palette.json'), 'utf8'),
);

const {
  ansi,
  background,
  cursor,
  description,
  foreground,
  name,
  named,
  selection,
} = palette;

export default palette;
export {
  ansi,
  background,
  cursor,
  description,
  foreground,
  name,
  named,
  selection,
};
