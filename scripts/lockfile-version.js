/**
 * Set the repo's own version in a package-lock.json, touching only the two
 * fields that mirror package.json's `version`: the top-level `version` and
 * `packages[""].version`. Workspace/link entries (`packages["configs/..."]`)
 * and third-party dependency versions are never modified.
 *
 * Pure string -> string so it can be unit-tested without touching the repo.
 *
 * Fast path: if re-serializing the parsed lockfile with 2-space indent and a
 * trailing newline reproduces the input byte-for-byte, edit the parsed object
 * and serialize it the same way. Otherwise (other indent, CRLF, no trailing
 * newline, ...) fall back to targeted regex replacements so the rest of the
 * file stays byte-identical.
 */
export function setLockfileVersion(content, newVersion) {
  const lock = JSON.parse(content);

  if (JSON.stringify(lock, null, 2) + '\n' === content) {
    if (typeof lock.version === 'string') {
      lock.version = newVersion;
    }
    if (typeof lock.packages?.['']?.version === 'string') {
      lock.packages[''].version = newVersion;
    }
    return JSON.stringify(lock, null, 2) + '\n';
  }

  // Everything before the "packages" key is scalar metadata (name, version,
  // lockfileVersion, requires), so the first "version" there is the top-level one.
  const packagesIndex = content.search(/"packages"\s*:/);
  const head = packagesIndex === -1 ? content : content.slice(0, packagesIndex);
  const tail = packagesIndex === -1 ? '' : content.slice(packagesIndex);

  return (
    head.replace(/("version"\s*:\s*")[^"]*(")/, `$1${newVersion}$2`) +
    // `[^{}]*?` keeps the match inside the root entry (name/version/license
    // precede its first nested object), never a dependency's version.
    tail.replace(
      /("packages"\s*:\s*\{\s*""\s*:\s*\{[^{}]*?"version"\s*:\s*")[^"]*(")/,
      `$1${newVersion}$2`,
    )
  );
}
