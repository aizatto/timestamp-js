# PRD: Actual `v1` Expression Set

## Summary

This document defines the formatter surface that `v3` should preserve from the archived `v1` timestamp tool.

It exists to prevent drift between:
- the visible formatter sections in the UI
- the copyable output values
- the displayed reference expressions

For formatter parity work, this document is the product reference. The code implementation may use native `Date`, `Intl`, `date-fns`, or other helpers internally, but the user-facing sections and outputs should map back to this shape.

The UI should not imply that Moment is the active runtime formatter. These are legacy `v1` reference formats, not evidence that `v3` uses `moment()`.

## Product Goal

`v3` should keep the compact utility feel of `v1` while preserving the recognizable expression groups that existing users rely on:
- `Frequently Used`
- `Date`
- `strftime`

The first section is intentionally modeled after the old moment-based output set, even if `v3` no longer uses moment internally.

`v3` should also preserve direct access to the archived `v1` and `v2` tools from the main navigation when the primary site is deployed.

## Requirements

- The UI must present the formatter sections in this order:
  - `Frequently Used`
  - `Date`
  - `strftime`
- The main navigation must include working links to `v1`, `v2`, and `v3`.
- In the primary deployed site, the `v1` and `v2` links must resolve to the archived tools rather than 404.
- The `Frequently Used` section must support ranked copy shortcuts `1-9`.
- Expression lines shown in the UI must match the `v1`-style reference strings closely enough to remain recognizable.
- The `Frequently Used` reference labels should be shown as plain format references, not literal `moment().format(...)` implementation statements.
- Output values must follow the semantic shape of the original `v1` set for the selected local date/time.
- The multiline formatter must preserve its line break in both display and copy output.
- The `Dxxx/366R` token uses normalized `Date of Year` semantics, where the same month/day maps to the same DOY in leap and non-leap years.

## Actual `v1` Expression Set

### Frequently Used

Display convention in `v3`:
- show these as plain format references
- do not present them as live `moment().format(...)` calls in the UI

1. `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]130/366[R]`
Example output:
`2026/05/09 W19/D6 Saturday May 9th - D130/366R`

2. `YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]130/366[R] LTS:`
Example output:
`2026/05/09 W19/D6 Saturday May 9th - D130/366R 6:38:27 AM:`

3. `LTS: `
Example output:
`6:38:27 AM: `

4. `YYYY[W]W: YYYY/MM/DD`
Example output:
`2026W19: 2026/05/09`

5. `YYYY/MM/DD LTS - [W]W/[D]E dddd - [D]130/366[R]`
Example output:
`2026/05/09 6:38:27 AM - W19/D6 Saturday - D130/366R`

6. `MMMM DD, YYYY [11:59:59 PM]`
Example output:
`May 09, 2026 11:59:59 PM`

7. `YYYY/MM/DD [W]W/[D]E dddd - [D]130/366[R] [\n]LTS: `
Example output:
```text
2026/05/09 W19/D6 Saturday - D130/366R
6:38:27 AM: 
```

8. `YYYY/MM/DD LTS - [W]W/[D]E dddd`
Example output:
`2026/05/09 6:38:27 AM - W19/D6 Saturday`

### Date

Reference label:
- `MDN: Date`

Entries:

1. `Math.floor(Date.now() / 1000)`
Example output:
`1778279907`

2. `Date.now()`
Example output:
`1778279907290`

3. `new Date().toISOString()`
Example output:
`2026-05-08T22:38:27.290Z`

### strftime

Reference label:
- `https://www.npmjs.com/package/strftime`

Entries:

1. `strftime("%H:%M%P")`
Example output:
`06:38am`

2. `strftime("%Y/%m/%d")`
Example output:
`2026/05/09`

3. `strftime("%Y/%m/%d %H:%M:%S%P")`
Example output:
`2026/05/09 06:38:27am`

4. `strftime("%Y%m%d%H%M%S %Y %b %d")`
Example output:
`20260509063827 2026 May 09`

## Acceptance Criteria

- `v3` exposes these three sections with this ordering.
- The deployed main site exposes working navigation links for `v1`, `v2`, and `v3`.
- The `Frequently Used` entries map to these eight recognizable moment-style expressions.
- The `Date` section exposes the three JavaScript `Date` references above.
- The `strftime` section exposes the four reference expressions above.
- Copy output matches the displayed value exactly.
- `DOY` is normalized across leap and non-leap years for the same month/day.
- Changes to the formatter list should update both this document and the implementation together.
