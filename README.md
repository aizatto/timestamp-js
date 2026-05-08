# timestamp-js-v3

`timestamp-js-v3` is the modern rewrite of the archived timestamps tool found in [public/v1](/Users/aizat/src/timestamp-js-v3/public/v1).

It targets near-feature parity with `v1` while moving the app onto:
- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS v4
- `shadcn/ui`

## Commands

```bash
npm install --cache .npm-cache
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Build Outputs

- `npm run build:app` creates the standard Vite output in `dist/`.
- `npm run build:archive` creates the archive build in `public/v3/` with a `/v3/` base path.
- `npm run build` runs typecheck plus both build targets.

`public/v3/` is generated output and should not be edited by hand.

## Documentation Layout

- `docs/plans/` contains implementation plans.
- `docs/adr/` contains architecture decision records.

Plan folders use:

- `docs/plans/YYYY-MM-DD HH-MM <title>/plan.md`
- `docs/plans/YYYY-MM-DD HH-MM <title>/TASKS.md`

Plans are snapshots of proposed work. The current codebase and living docs are the canonical current state.
