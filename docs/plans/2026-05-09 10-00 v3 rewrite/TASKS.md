# `v3` rewrite tasks

## Tooling and setup

- [x] Add Tailwind CSS v4 to the Vite app.
- [x] Initialize `shadcn/ui` and configure aliases.
- [x] Remove starter assets and template application code.

## Design system

- [x] Add global theme variables and base styling.
- [x] Establish the responsive app shell and first-screen layout.
- [x] Install and use the initial `shadcn/ui` component set.

## Timestamp domain logic

- [x] Define the typed preset model and preset registry.
- [x] Implement epoch, ISO, human-readable, and parity-friendly reference outputs.
- [x] Persist usage counts in `localStorage` and rank frequently used presets.

## UI implementation

- [x] Build the selected date/time control surface.
- [x] Render frequent, core, and reference preset sections.
- [x] Add copy handling and visible feedback.
- [x] Implement refresh-to-now and keyboard shortcuts.
- [x] Verify the layout remains usable on mobile and desktop.

## Build/archive pipeline

- [x] Update Vite config for `/` and `/v3/` base paths.
- [x] Add `build:app`, `build:archive`, and combined `build` scripts.
- [x] Replace `public/v3/` from a generated temporary archive build.

## Documentation and verification

- [x] Replace the starter README.
- [x] Add `AGENTS.md`.
- [x] Add the initial plan and tasks docs under `docs/plans/`.
- [x] Add an ADR for the architecture decisions behind the rewrite.
- [x] Run lint, typecheck, and the dual build successfully.
