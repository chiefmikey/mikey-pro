# mikey-pro master directive

**Mission (Mikl, verbatim):** Infra operator for mikey-pro, low priority: keep the shared lint and format guardrails every project uses (and mikey-pro-alerts): releases, presets, CI and dependency advisories healthy so it takes care of itself. Own its open threads, PRs, timers and any alerts, triage each to a fix or a verified close, drive each to verified completion; morning brief to Mikl. Build a small directive list from what is open, finish it, then stay mostly idle until new work appears: no speculative features.
**Operator:** use `hey-shiftop status` (the thread changes on rotation)

## Open

| ID | Ask | Source (who, when) | Owner thread | Next step | Status | Due | Accept |
|---|---|---|---|---|---|---|---|

## Done (last 7 days; older rows move to directive-archive.md)

| ID | Ask | Evidence | Done |
|---|---|---|---|
| D-0011 | Consumer installs hang/warn on stylelint drift | PR 55 merged (17e0436): peer stylelint ^17, recommended 18 + html v1 + postcss-html v1 pinned, docs stylelint@^17; serial suite 17 files/443 passed; configs PR 601 merged (skill/rule/reference say stylelint@^17). Published 10.3.11 fresh installs, operator-run: base, svelte, svelte-only+eslint10, vue, react, stylelint-only all rc 0 in 6-52s with 0 ERESOLVE (was svelte 240s+ timeout, hundreds of ERESOLVE); single stylelint 17.16.0; svelte consumer lints .js + .svelte rc 0 |
| D-0010 | Release 10.3.10 (superseded by 10.3.11) | 10.3.10 live on npm x9 + PyPI with tag/release; its svelte consumer check failed (hang), so 10.3.11 shipped the fix: PR 56 merged (3198446), npm view shows 10.3.11 for all 9 packages, PyPI 10.3.11, tag + release v10.3.11; published svelte preset + eslint@^10 installs with no flags, 0 ERESOLVE |
| D-0007 | Consumer-sim gate red on TS 7 | PR 53 merged (94f4a1e); operator read diff; serial full suite on branch rerun by operator: 17 files, 443/443 pass incl. consumer-simulation 0 failures | 2026-11-05 12:50 |
| D-0008 | Svelte preset ERESOLVE on eslint 10 | PR 53 removed unused babel parser + its override; operator packed both packages, fresh consumer `npm install eslint@^10 <tgz>` no flags: rc 0, eslint 10.14.0; linted a .svelte file clean | 2026-11-05 12:50 |
| D-0009 | Repo bypassed shared commit gate | local hook path unset; verify probe in scratch worktree (deps installed): COMMIT OK, file reformatted to `const z = 3;`, ledger line total 4; probe branch + worktree removed | 2026-11-05 12:55 |
| D-0004 | Issue #47: ci-local.sh ERESOLVE | PR 50 squash-merged (d26fa63); operator re-read diff; worker ran ci-local end to end: steps 1-9 all ran, installs pass, summary table printed; remaining step failures are known environmental (TS7 consumer-sim 3, jest/* lint on tests, prettier warnings); issue closed. Caveat: consumers on eslint 10 still need overrides until react/jsx-a11y/babel-parser widen peers | 2026-11-04 01:05 |
| D-0005 | Issue #48: tag/release 10.3.7-10.3.9 | ls-remote shows v10.3.7/8/9 on origin (checked by operator, not the worker); 3 GitHub releases, v10.3.9 latest; issue closed; 10.3.5/10.3.6 were never published so untagged | 2026-11-04 00:20 |
| D-0006 | PyPI ruff config republish (thread gd7adg5g) | PyPI mikey-pro-ruff-config = 10.3.9, npm mikey-pro = 10.3.9 (checked live); thread closed | 2026-11-02 20:40 |
| D-0001 | Land PR #46 | merged ca975dd on main; glob+bump tests 216 pass, 3 fail = known TS7 consumer-sim; checked by operator on origin | 2026-11-02 20:50 |
| D-0002 | Land Dependabot #39/#40 | merged d254037, 43c261d; diffs only uses: lines; v7 tags exist | 2026-11-02 20:50 |
| D-0003 | Settle thread 67dekxhs | close refused (awaits-user label); acked, question moot after merge | 2026-11-02 20:50 |
