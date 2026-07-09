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
- Node version: `24.18.0`, matching `.nvmrc`.
- Deploy command: blank / disabled.

## Constraints

- Do not configure `npx wrangler deploy` as a Pages deploy command.
- Do not add `wrangler.jsonc`, `@cloudflare/vite-plugin`, `nodejs_compat`, or Worker runtime
  settings for the static app.
- Add Cloudflare Worker or Pages Functions configuration only if the app introduces server-side
  runtime code.
- Do not use Node `22.13.0` for Cloudflare builds. Cloudflare's Vite integration imports
  `node:module.registerHooks`, which is available in Node `22.15.0` and newer 22.x releases, or
  Node `24+`. This repo pins Node `24.18.0`, the current Node 24 LTS release.

## Verification

- Cloudflare Pages logs should run `npm run build` and should not contain
  `Executing user deploy command: npx wrangler deploy`.
- `dist/index.html`, `dist/v1/`, and `dist/v2/` must exist after the build.
- `/`, `/v1/`, `/v2/`, and `/v3/` should resolve on the deployed Pages site.
