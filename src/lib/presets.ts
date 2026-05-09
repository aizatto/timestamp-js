import {
  formatLegacyDateLtsWeekday,
  formatLegacyDateLtsWeekdayDayProgress,
  formatLegacyLongWeekday,
  formatLegacyLongWeekdayLts,
  formatLegacyLts,
  formatLegacyMonthDayEnd,
  formatLegacyWeekCode,
  formatLegacyWeekdayMultiline,
  normalizedDayOfYear,
  strftimeCompact,
  strftimeDate,
  strftimeDateTimeLower,
  strftimeTimeLower,
} from "@/lib/time"

export type PresetSection = "frequently-used" | "date" | "strftime"

export type TimestampPreset = {
  id: string
  expression: string | ((date: Date) => string)
  section: PresetSection
  copy: (date: Date) => string
  trackUsage?: boolean
}

function withDayProgress(formatString: string, date: Date): string {
  const dayOfYear = String(normalizedDayOfYear(date)).padStart(3, "0")

  return formatString.replaceAll("130", dayOfYear)
}

export const PRESETS: TimestampPreset[] = [
  {
    id: "moment-long-weekday",
    expression: (date) =>
      withDayProgress("YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]130/366[R]", date),
    section: "frequently-used",
    copy: formatLegacyLongWeekday,
    trackUsage: true,
  },
  {
    id: "moment-long-weekday-lts",
    expression: (date) =>
      withDayProgress("YYYY/MM/DD [W]W/[D]E dddd MMMM Do - [D]130/366[R] LTS:", date),
    section: "frequently-used",
    copy: formatLegacyLongWeekdayLts,
    trackUsage: true,
  },
  {
    id: "moment-lts",
    expression: "LTS: ",
    section: "frequently-used",
    copy: (date) => `${formatLegacyLts(date)}: `,
    trackUsage: true,
  },
  {
    id: "moment-week-code",
    expression: "YYYY[W]W: YYYY/MM/DD",
    section: "frequently-used",
    copy: formatLegacyWeekCode,
    trackUsage: true,
  },
  {
    id: "moment-date-lts-weekday-day-progress",
    expression: (date) =>
      withDayProgress("YYYY/MM/DD LTS - [W]W/[D]E dddd - [D]130/366[R]", date),
    section: "frequently-used",
    copy: formatLegacyDateLtsWeekdayDayProgress,
    trackUsage: true,
  },
  {
    id: "moment-month-day-end",
    expression: "MMMM DD, YYYY [11:59:59 PM]",
    section: "frequently-used",
    copy: formatLegacyMonthDayEnd,
    trackUsage: true,
  },
  {
    id: "moment-weekday-multiline",
    expression: (date) =>
      withDayProgress("YYYY/MM/DD [W]W/[D]E dddd - [D]130/366[R] [\\n]LTS: ", date),
    section: "frequently-used",
    copy: formatLegacyWeekdayMultiline,
    trackUsage: true,
  },
  {
    id: "moment-date-lts-weekday",
    expression: "YYYY/MM/DD LTS - [W]W/[D]E dddd",
    section: "frequently-used",
    copy: formatLegacyDateLtsWeekday,
    trackUsage: true,
  },
  {
    id: "date-unix-seconds",
    expression: "Math.floor(Date.now() / 1000)",
    section: "date",
    copy: (date) => String(Math.floor(date.getTime() / 1000)),
  },
  {
    id: "date-unix-milliseconds",
    expression: "Date.now()",
    section: "date",
    copy: (date) => String(date.getTime()),
  },
  {
    id: "date-iso-string",
    expression: "new Date().toISOString()",
    section: "date",
    copy: (date) => date.toISOString(),
  },
  {
    id: "strftime-time-lower",
    expression: 'strftime("%H:%M%P")',
    section: "strftime",
    copy: strftimeTimeLower,
  },
  {
    id: "strftime-date",
    expression: 'strftime("%Y/%m/%d")',
    section: "strftime",
    copy: strftimeDate,
  },
  {
    id: "strftime-date-time-lower",
    expression: 'strftime("%Y/%m/%d %H:%M:%S%P")',
    section: "strftime",
    copy: strftimeDateTimeLower,
  },
  {
    id: "strftime-compact",
    expression: 'strftime("%Y%m%d%H%M%S %Y %b %d")',
    section: "strftime",
    copy: strftimeCompact,
  },
]

export const TRACKED_PRESETS = PRESETS.filter((preset) => preset.trackUsage)

export const PRESET_SECTIONS: Array<{
  id: PresetSection
  title: string
  description?: string
}> = [
  {
    id: "date",
    title: "Date",
    description: "MDN: Date",
  },
  {
    id: "strftime",
    title: "strftime",
    description: "https://www.npmjs.com/package/strftime",
  },
]
