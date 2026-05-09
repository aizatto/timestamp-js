# TRD: Tooling and Quality Gates

## Summary

This document defines the repository-level technical requirements for formatting and pre-commit verification in `timestamp-js-v3`.

These requirements exist to keep the archived outputs reproducible, the codebase consistently formatted, and commits blocked when linting, type-checking, or builds fail.

## Prettier Requirements

The repo must include a checked-in Prettier configuration.

Required settings:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

Additional requirements:

- The config must live in the repo root as `.prettierrc`.
- The repo must include a `.prettierignore`.
- Generated and archived outputs should be excluded from formatting passes, including:
  - `public/v1`
  - `public/v2`
  - `public/v3`
  - `dist`
  - `.tmp`

## Git Hook Requirements

The repo must use a checked-in pre-commit hook to enforce core quality gates before a commit is accepted.

Implementation requirements:

- The hook must live in `.githooks/pre-commit`.
- The repo must configure `core.hooksPath` to `.githooks`.
- The repo should provide a scriptable install/setup step so contributors can enable the hook path automatically.

## Required Pre-commit Checks

The pre-commit hook must run these commands from the repo root:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`

Behavioral requirements:

- The hook must fail the commit if any step fails.
- The hook output should clearly identify which step failed.
- Because `build` regenerates tracked archive output in `public/v3`, the hook must detect archive changes and stop the commit until the regenerated files are staged.

## Acceptance Criteria

- `.prettierrc` exists with the required settings.
- `.prettierignore` exists and excludes generated/archive outputs.
- `.githooks/pre-commit` exists and is executable.
- The repo can register `.githooks` as `core.hooksPath`.
- A commit is blocked when lint, typecheck, or build fails.
- A commit is blocked when `build` changes tracked `public/v3` files that are not yet staged.
