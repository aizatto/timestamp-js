# ADR 0001: V3 foundation and archive build

## Status

Accepted

## Context

`timestamp-js-v1` is kept as a static archived build under `public/v1/`.
`v3` needs to modernize the implementation while preserving the ability to publish a self-contained static archive under `public/`.

The rewrite also needs a practical component foundation and a date handling approach that avoids carrying forward large legacy dependencies.

## Decision

- Build `v3` with React, TypeScript, and Vite.
- Style the app with Tailwind CSS v4 and compose the UI from `shadcn/ui` primitives.
- Prefer native `Date` and `Intl`, with `date-fns` for focused formatting and calendar helpers.
- Produce two outputs from the main build workflow:
  - a standard build in `dist/`
  - an archive build copied into `public/v3/` and served with base path `/v3/`

## Consequences

- The archive build is reproducible and can be committed as a static artifact.
- `public/v3/` must be treated as generated output, not as source.
- The app stays lighter than a moment-style rewrite while still supporting parity-friendly date formatting.
- Future contributors should default to `shadcn/ui` patterns for shared controls.
