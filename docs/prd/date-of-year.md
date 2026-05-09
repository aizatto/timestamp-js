# PRD: Normalized Date of Year

## Summary

`Date of Year` (`DOY`) in `timestamp-js-v3` is a normalized product concept, not the literal Gregorian day-of-year for a specific calendar year.

The goal is that the same month/day maps to the same `DOY` value regardless of whether the selected year is a leap year.

## Product Rule

- `DOY` means normalized `Date of Year`.
- The same month/day should produce the same `DOY` in leap and non-leap years.
- February 29 only exists in leap years and keeps its leap-year position.
- Dates on or after March 1 in non-leap years shift forward by one so they line up with leap-year numbering.

Examples:

- March 1, 2020 -> `DOY 60`
- March 1, 2021 -> `DOY 60`
- May 9, 2026 -> `DOY 130`

## Why

This matches the behavior used in the earlier tool and preserves the mental model behind the `Dxxx/366R` outputs.

Users rely on `DOY` as a stable date label tied to month/day, not as a strict year-specific ordinal that changes after February in non-leap years.

## Scope

This rule applies anywhere `DOY` or `Dxxx/366R` appears in the app, including:

- displayed formatter outputs
- copied formatter values
- displayed reference expressions that interpolate the numeric day value

## Reference Implementation

```ts
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MARCH = 2;

export function dayOfYear(date: Date): number {
  const year = date.getFullYear();
  const isLeapYear = year % 4 === 0;

  const startOfYear = new Date(date.toString());
  startOfYear.setFullYear(year, 0, 0);
  startOfYear.setHours(0, 0, 0, 0);

  const ms = date.getTime() - startOfYear.getTime();
  const days = Math.floor(ms / MS_IN_DAY);

  if (isLeapYear) {
    return days;
  }

  return date.getMonth() >= MARCH ? days + 1 : days;
}
```

## Acceptance Criteria

- March 1 returns `60` in both leap and non-leap years.
- Formatter outputs using `Dxxx/366R` use normalized `DOY`.
- The displayed interpolated moment-style expression lines use the same normalized `DOY` value as the copied output.
