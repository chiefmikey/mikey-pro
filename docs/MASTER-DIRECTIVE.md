# mikey-pro master directive

**Mission (Mikl, verbatim):** Infra operator for mikey-pro, low priority: keep the shared lint and format guardrails every project uses (and mikey-pro-alerts): releases, presets, CI and dependency advisories healthy so it takes care of itself. Own its open threads, PRs, timers and any alerts, triage each to a fix or a verified close, drive each to verified completion; morning brief to Mikl. Build a small directive list from what is open, finish it, then stay mostly idle until new work appears: no speculative features.
**Operator:** use `hey-shiftop status` (the thread changes on rotation)

## Open

| ID | Ask | Source (who, when) | Owner thread | Next step | Status | Due | Accept |
|---|---|---|---|---|---|---|---|
| D-0007 | Consumer-sim gate red on TS 7: pin the simulated consumer's typescript to typescript-eslint's supported range (>=4.8.4 <6.1.0), note TS 7 limit for consumers in README, drop the 'pre-existing failures' caveat from project CLAUDE.md | operator 2026-11-05 sweep (npm: typescript latest 7.0.2, typescript-eslint 8.72.1 peers ts <6.1.0) | worker sonnet, fix/consumer-install-health | worker running; operator reviews diff + reruns serial suite | running | 2026-11-06 | serial vitest: consumer-simulation file 0 failures on clean main+branch, checked by operator |
| D-0008 | Svelte preset forces ERESOLVE on eslint 10 via @babel/eslint-parser 7 (peers eslint <=9; v8 needs Node >=22.18 + babel core 8): remove the parser if espree default keeps all svelte tests green, else leave + record why | operator 2026-11-05 sweep | same worker/branch | worker running | running | 2026-11-06 | fresh consumer `npm install` of packed svelte preset + eslint 10 succeeds with no overrides/legacy flag, svelte tests green; or a recorded no-go reason |

## Done (last 7 days; older rows move to directive-archive.md)

| ID | Ask | Evidence | Done |
|---|---|---|---|
| D-0004 | Issue #47: ci-local.sh ERESOLVE | PR 50 squash-merged (d26fa63); operator re-read diff; worker ran ci-local end to end: steps 1-9 all ran, installs pass, summary table printed; remaining step failures are known environmental (TS7 consumer-sim 3, jest/* lint on tests, prettier warnings); issue closed. Caveat: consumers on eslint 10 still need overrides until react/jsx-a11y/babel-parser widen peers | 2026-11-04 01:05 |
| D-0005 | Issue #48: tag/release 10.3.7-10.3.9 | ls-remote shows v10.3.7/8/9 on origin (checked by operator, not the worker); 3 GitHub releases, v10.3.9 latest; issue closed; 10.3.5/10.3.6 were never published so untagged | 2026-11-04 00:20 |
| D-0006 | PyPI ruff config republish (thread gd7adg5g) | PyPI mikey-pro-ruff-config = 10.3.9, npm mikey-pro = 10.3.9 (checked live); thread closed | 2026-11-02 20:40 |
| D-0001 | Land PR #46 | merged ca975dd on main; glob+bump tests 216 pass, 3 fail = known TS7 consumer-sim; checked by operator on origin | 2026-11-02 20:50 |
| D-0002 | Land Dependabot #39/#40 | merged d254037, 43c261d; diffs only uses: lines; v7 tags exist | 2026-11-02 20:50 |
| D-0003 | Settle thread 67dekxhs | close refused (awaits-user label); acked, question moot after merge | 2026-11-02 20:50 |
