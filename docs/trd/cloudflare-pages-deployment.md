# TRD: Cloudflare Pages Deployment

## Summary

This repo deploys to Cloudflare Pages as a static Vite application through Git integration.

Cloudflare Pages should build the project and upload the generated `dist/` directory directly. The
deployment must not run the Workers deploy flow.

## Required Pages Settings

- Framework preset: `Vite` or no custom framework override.
- Build command: `npm run build`.
- Build output directory: `dist`.
- Root directory: repository root.
- Node version: `22.13.0`, matching `.nvmrc`.
- Deploy command: blank / disabled.

## Constraints

- Do not configure `npx wrangler deploy` as a Pages deploy command.
- Do not add `wrangler.jsonc`, `@cloudflare/vite-plugin`, `nodejs_compat`, or Worker runtime
  settings for the static app.
- Add Cloudflare Worker or Pages Functions configuration only if the app introduces server-side
  runtime code.

## Verification

- Cloudflare Pages logs should run `npm run build` and should not contain
  `Executing user deploy command: npx wrangler deploy`.
- `dist/index.html`, `dist/v1/`, and `dist/v2/` must exist after the build.
- `/`, `/v1/`, `/v2/`, and `/v3/` should resolve on the deployed Pages site.
