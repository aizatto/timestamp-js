# timestamp-js-v3

`timestamp-js-v3` is the modern rewrite of the archived timestamps tool found in [public/v1](/Users/aizat/src/timestamp-js-v3/public/v1).

Historical archives are kept in:
- [public/v1](/Users/aizat/src/timestamp-js-v3/public/v1)
- [public/v2](/Users/aizat/src/timestamp-js-v3/public/v2)

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

`npm install` also runs `prepare`, which configures the repo-local Git hooks path to `.githooks`.

## Build Outputs

- `npm run build:app` creates the standard Vite output in `dist/`.
- `npm run build:archive` creates the archive build in `public/v3/` with a `/v3/` base path.
- `npm run build` runs typecheck plus both build targets.

`public/v3/` is generated output and should not be edited by hand.
`public/v1/` and `public/v2/` are historical archives and should not be copied into build outputs.

## Cloudflare Pages

Deploy this repo to Cloudflare Pages as a static Vite site through Git integration:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root
- Node version: `22.13.0`
- Deploy command: leave blank / disabled

Do not use `npx wrangler deploy`, `@cloudflare/vite-plugin`, `wrangler.jsonc`, or Worker
runtime settings for this app unless it grows Pages Functions or Worker code. Pages should upload
the `dist/` directory produced by the build command directly.

## Git Hooks

The repo includes a pre-commit hook in `.githooks/pre-commit` that runs:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Because `build` regenerates tracked archive assets in `public/v3/`, the hook fails if that archive changes so you can stage the regenerated files and retry the commit.

## Documentation Layout

- `docs/plans/` contains implementation plans.
- `docs/adr/` contains architecture decision records.

Plan folders use:

- `docs/plans/YYYY-MM-DD HH-MM <title>/plan.md`
- `docs/plans/YYYY-MM-DD HH-MM <title>/TASKS.md`

Plans are snapshots of proposed work. The current codebase and living docs are the canonical current state.
