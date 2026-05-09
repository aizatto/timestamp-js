# `v3` rewrite plan and documentation structure

## Summary

Set up `timestamp-js-v3` as a modern React 19 + TypeScript 6 + Vite 8 app using Tailwind and `shadcn/ui`, with near-feature parity to `public/v1` and a dual-output build that produces both:

- a standard app build in `dist/`
- an archival static build in `public/v3/` with base path `/v3/`

Adopt a lightweight planning/docs convention so future work is tracked in-repo under `docs/plans/`, and keep `AGENTS.md` aligned to that workflow.

## Key Changes

### App and UX

- Replace the Vite starter with a timestamp tool rebuilt from `v1` behavior.
- Preserve the useful `v1` workflow:
  - pick a date/time
  - show common timestamp outputs
  - copy each output
  - refresh to “now”
  - track frequently used presets via `localStorage`
  - keep keyboard shortcuts for refresh and ranked copy
- Modernize the interface with Tailwind and `shadcn/ui`, keeping it practical and tool-like.

### Component and code architecture

- Use `shadcn/ui` as the main component foundation for buttons, inputs, cards, separators, and feedback surfaces.
- Keep timestamp outputs data-driven through a typed preset registry.
- Separate concerns into:
  - layout/app shell
  - date/time controls
  - preset rendering
  - clipboard and feedback state
  - formatting utilities
  - usage ranking persistence

### Date handling

- Prefer native `Date` and `Intl`.
- Add one focused helper library only where native APIs are insufficient for parity features such as week/day-of-year style formatting.
- Do not carry forward old `moment`, CRA, service worker, or analytics behavior into `v3`.

### Build and archive pipeline

- Support two builds:
  - normal build with base `/`
  - archive build with base `/v3/`
- Make `build` run both outputs.
- Replace `public/v3/` completely on each archive build so it stays generated and reproducible.
- Leave `public/v1/` unchanged.

## Implementation Phases

### Phase 1: Tooling and setup

- Add Tailwind.
- Initialize `shadcn/ui`.
- Configure aliases and required `shadcn` metadata.
- Remove starter/demo assets and template app code.

### Phase 2: Design system

- Add global theme variables and Tailwind base styling.
- Establish the app shell and responsive layout.
- Install the minimal initial `shadcn/ui` components needed for the first screen.

### Phase 3: Timestamp domain logic

- Define a typed preset model with stable IDs and ranking keys.
- Implement formatters for:
  - Unix seconds
  - Unix milliseconds
  - ISO-8601
  - human-readable date/time outputs
  - parity-oriented week/day-based outputs that are still valuable from `v1`
- Add `localStorage` support for usage counts and ranked ordering.

### Phase 4: UI implementation

- Build the selected date/time control surface.
- Render grouped preset sections such as frequent/core/reference outputs.
- Add copy handling and visible success feedback.
- Implement refresh-to-now and keyboard shortcuts.
- Ensure focus and accessibility behavior are solid on desktop and mobile.

### Phase 5: Build/archive flow

- Update Vite config to support normal and archive bases.
- Add scripts for `build:app`, `build:archive`, and combined `build`.
- Add an archive sync/replacement step for `public/v3/`.
- Verify all asset URLs resolve correctly under `/v3/`.

### Phase 6: Documentation

- Replace the starter README with project-specific instructions.
- Add `AGENTS.md` with repo conventions and documentation workflow.
- Add the initial `docs/plans/.../plan.md` and `TASKS.md`.
- Add an ADR for the foundation and archive-build architecture decision.

## Test Plan

- Typecheck passes.
- Lint passes.
- Normal build produces a valid `dist/`.
- Archive build produces a valid `public/v3/`.
- Archived app works when served from `/v3/`.
- Manual checks confirm:
  - the selected date drives all outputs
  - refresh resets to current time
  - copy actions produce expected values
  - usage counts change the preset order
  - `1-9` copies the expected ranked preset
  - `A-Z` refresh works outside text-entry contexts
  - layout is usable on mobile and desktop

## Assumptions

- `shadcn/ui` is a required part of the foundation, not an optional extra.
- The first pass targets functional parity with `v1`, not a visual clone.
- The normal build and archive build should both be produced by the main build workflow.
- The initial docs convention should be lightweight and local to this repo, without introducing a larger documentation system.
