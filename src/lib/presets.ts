import { format } from "date-fns"

import {
  formatDayProgress,
  formatReferenceLabel,
  formatWeekStamp,
} from "@/lib/time"

export type PresetSection = "core" | "reference"

export type TimestampPreset = {
  id: string
  title: string
  description: string
  expression: string
  section: PresetSection
  copy: (date: Date) => string
  trackUsage?: boolean
}

export const PRESETS: TimestampPreset[] = [
  {
    id: "unix-seconds",
    title: "Unix seconds",
    description: "The classic epoch value for APIs and logs.",
    expression: "Math.floor(date.getTime() / 1000)",
    section: "core",
    copy: (date) => String(Math.floor(date.getTime() / 1000)),
    trackUsage: true,
  },
  {
    id: "unix-milliseconds",
    title: "Unix milliseconds",
    description: "High-resolution epoch output for JavaScript systems.",
    expression: "date.getTime()",
    section: "core",
    copy: (date) => String(date.getTime()),
    trackUsage: true,
  },
  {
    id: "iso-8601",
    title: "ISO 8601",
    description: "UTC-safe string for transport, storage, and APIs.",
    expression: "date.toISOString()",
    section: "core",
    copy: (date) => date.toISOString(),
    trackUsage: true,
  },
  {
    id: "local-ymd",
    title: "Local date",
    description: "Human-readable local date for notes and tickets.",
    expression: "format(date, 'yyyy/MM/dd')",
    section: "core",
    copy: (date) => format(date, "yyyy/MM/dd"),
    trackUsage: true,
  },
  {
    id: "local-24h",
    title: "Local date + 24h time",
    description: "Practical local timestamp with seconds.",
    expression: "format(date, 'yyyy/MM/dd HH:mm:ss')",
    section: "core",
    copy: (date) => format(date, "yyyy/MM/dd HH:mm:ss"),
    trackUsage: true,
  },
  {
    id: "local-12h",
    title: "Local date + 12h time",
    description: "Readable local timestamp with AM/PM.",
    expression: "format(date, 'MMMM d, yyyy h:mm:ss a')",
    section: "core",
    copy: (date) => format(date, "MMMM d, yyyy h:mm:ss a"),
    trackUsage: true,
  },
  {
    id: "weekday-stamp",
    title: "Weekday stamp",
    description: "Readable timestamp with weekday context.",
    expression: "format(date, \"yyyy/MM/dd 'W'w '·' EEEE\")",
    section: "reference",
    copy: (date) => format(date, "yyyy/MM/dd 'W'w '·' EEEE"),
    trackUsage: true,
  },
  {
    id: "compact-stamp",
    title: "Compact sortable stamp",
    description: "Filename-friendly compact local timestamp.",
    expression: "format(date, 'yyyyMMdd-HHmmss')",
    section: "reference",
    copy: (date) => format(date, "yyyyMMdd-HHmmss"),
    trackUsage: true,
  },
  {
    id: "week-progress",
    title: "Week + day progress",
    description: "A parity-oriented nod to the richer v1 reference formats.",
    expression: "formatReferenceLabel(date)",
    section: "reference",
    copy: (date) =>
      `${format(date, "yyyy/MM/dd HH:mm:ss")} · ${formatWeekStamp(date)} · D${formatDayProgress(date)}`,
    trackUsage: true,
  },
  {
    id: "rfc-2822",
    title: "Email / RFC 2822 style",
    description: "Good for logs and message headers.",
    expression: "format(date, 'EEE, dd MMM yyyy HH:mm:ss xx')",
    section: "reference",
    copy: (date) => format(date, "EEE, dd MMM yyyy HH:mm:ss xx"),
  },
  {
    id: "javascript-source",
    title: "JavaScript Date constructor",
    description: "Drop-in constructor call for debugging snippets.",
    expression: "new Date('2026-05-09T02:00:00.000Z')",
    section: "reference",
    copy: (date) => `new Date(${JSON.stringify(date.toISOString())})`,
  },
  {
    id: "timezone-offset",
    title: "Timezone offset",
    description: "Local UTC offset for the selected moment.",
    expression: "format(date, 'xxx')",
    section: "reference",
    copy: (date) => format(date, "xxx"),
  },
]

export const TRACKED_PRESETS = PRESETS.filter((preset) => preset.trackUsage)

export const PRESET_SECTIONS: Array<{
  id: PresetSection
  title: string
  description: string
}> = [
  {
    id: "core",
    title: "Core formats",
    description: "The formats you’re most likely to paste into code, APIs, and tickets.",
  },
  {
    id: "reference",
    title: "Reference formats",
    description: "Helpful alternates for filenames, comms, and parity-friendly date context.",
  },
]

export { formatReferenceLabel }
