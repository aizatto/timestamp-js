# PRD: Copy Feedback Highlight

## Summary

`v3` should provide a stronger visual confirmation when a timestamp row is copied, especially when the user triggers copy via the ranked keyboard shortcuts `1-9`.

The legacy `v1` tool made the copied row feel obviously active by shifting the row into a success-highlighted state. `v3` should preserve that quick-glance confidence while keeping the current cleaner visual system.

## Problem

Today the copy interaction in `v3` mainly changes the button label from `Copy` to `Copied`.

That works when the user is watching the button, but it is too subtle when:
- the copy action is triggered from the keyboard
- the user is scanning the value cell rather than the button
- several rows look visually similar at a glance

Users need a clearer “this exact row was copied” signal.

## Product Goal

After any successful copy action, the copied preset row should briefly enter a stronger success state that is easy to spot without needing to track the pointer or read the button text.

## Requirements

- A successful copy must visibly highlight the copied preset row, not just the button.
- The copied value cell must receive the strongest emphasis within the row.
- The feedback must work the same for mouse/touch copy and keyboard shortcut copy.
- The highlight must appear immediately after copy succeeds.
- The copied state must stay visible until another preset is copied.
- The success styling must remain legible in both light and dark themes.
- The interaction must preserve the current keyboard-friendly workflow and must not require focus to move.

## UX Notes

- Prefer success-tinted background and value-cell emphasis over motion-heavy effects.
- The row-level cue should be obvious enough to replicate the confidence of the old tool without looking noisy.
- The copied button label can remain, but it should be secondary to the row/value highlight.
- The copied button should align visually with the highlighted row rather than feeling detached from it.

## Acceptance Criteria

- Copying a preset causes the entire row to shift into a success-highlighted state.
- The copied value cell is more visually prominent than the surrounding rows.
- Triggering copy with shortcuts `1-9` makes it immediately clear which row was copied.
- The most recently copied preset stays highlighted until a different preset is copied.
- The copied button feels visually aligned with the highlighted row in both light and dark themes.
- Light and dark theme contrast remain readable during the highlighted state.
