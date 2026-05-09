# PRD: Theme Modes and Contrast

## Summary

`timestamp-js-v3` supports three appearance modes:

- `light`
- `dark`
- `system`

The UI should remain minimal and utility-focused, but the default light presentation should have more contrast than a near-white canvas.

## Product Goals

- Keep the tool visually quiet and fast to scan.
- Avoid a washed-out all-white appearance in light mode.
- Provide explicit theme control without adding visual clutter.
- Respect system theme preference when the user chooses `system`.

## Requirements

- The app must expose a theme control with three options:
  - `Light`
  - `Dark`
  - `System`
- The selected theme mode must persist in `localStorage`.
- On page load, the app must restore the saved theme choice from `localStorage` before applying the effective theme.
- `System` mode must follow the OS/browser `prefers-color-scheme` setting.
- If the system theme changes while the app is open and the user is in `system` mode, the app should update automatically.

## Visual Direction

- The layout should stay minimal, compact, and tool-like.
- Light mode should use a slightly darker neutral background and clearer borders than a pure white canvas.
- Dark mode should remain restrained and readable rather than high-saturation or glossy.
- Theme controls should feel secondary to the tool itself and fit inside the top bar cleanly.

## UX Constraints

- Theme switching must not change the content structure or formatter behavior.
- The UI should remain readable in all three modes.
- Contrast changes should improve separation between:
  - page background
  - content surfaces
  - borders
  - muted text
  - primary text

## Acceptance Criteria

- Users can switch between `light`, `dark`, and `system` from the top bar.
- The selected mode persists across reloads via `localStorage`.
- `System` mode updates when the OS theme changes.
- Light mode has visibly more contrast than the earlier mostly-white treatment.
- The app remains minimal and does not become visually heavy after the contrast update.
