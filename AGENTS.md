# AGENTS.md

## Purpose
- `v3` is the modern rewrite of the archived `v1` timestamp tool.
- The app should stay fast, practical, keyboard-friendly, and easy to archive as a static build.

## Primary Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- `shadcn/ui`

## Source of Truth
- Editable application code lives in `src/`.
- `public/v1/` is a historical artifact and must not be modified.
- `public/v3/` is generated output and must not be edited by hand.

## Documentation Layout
- Implementation plans live in `docs/plans/`.
- ADRs live in `docs/adr/`.
- Product requirements and UX references live in `docs/prd/`.
- Use plan folders shaped like `docs/plans/YYYY-MM-DD HH-MM <title>/`.
- Each plan folder must contain:
  - `plan.md`
  - `TASKS.md`
- `plan.md` is the snapshot of proposed work when implementation starts.
- `TASKS.md` is the working checklist updated as the work progresses.
- Living docs and the codebase are the canonical current state; plans are historical snapshots.
- Add or update an ADR when a change materially alters architecture.

Examples of ADR-worthy changes:
- choosing the build/archive strategy
- choosing the date/time utility approach
- choosing a client-side persistence strategy
- choosing or replacing the UI component system

## UI and Code Conventions
- Prefer `shadcn/ui` primitives before creating bespoke base controls.
- Keep preset definitions data-driven.
- Keep formatting logic separate from presentation components.
- Avoid oversized components.
- Avoid heavy date dependencies unless native APIs plus a focused helper are not enough.

## Product Constraints
- Preserve the tool-first workflow from `v1`.
- Keep mobile usability and keyboard friendliness intact.
- Do not add analytics, service workers, or PWA behavior unless explicitly requested.

## Release Verification
- Any change touching output paths or asset URLs must be verified in both `dist/` and `public/v3/`.
- The main build flow should continue to produce both the normal app build and the archive build.
