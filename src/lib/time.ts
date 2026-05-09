import { format, getISOWeek } from "date-fns"

const MS_IN_DAY = 24 * 60 * 60 * 1000
const MARCH = 2

export function toDateTimeLocalValue(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

export function parseDateTimeLocalValue(value: string): Date | null {
  if (!value) {
    return null
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed
}

export function normalizedDayOfYear(date: Date): number {
  const year = date.getFullYear()
  const isLeapYear = year % 4 === 0

  const startOfYear = new Date(date.toString())
  startOfYear.setFullYear(year, 0, 0)
  startOfYear.setHours(0, 0, 0, 0)

  const ms = date.getTime() - startOfYear.getTime()
  const days = Math.floor(ms / MS_IN_DAY)

  if (isLeapYear) {
    return days
  }

  return date.getMonth() >= MARCH ? days + 1 : days
}

export function formatDayProgress(date: Date): string {
  return `${String(normalizedDayOfYear(date)).padStart(3, "0")}/366`
}

export function formatWeekStamp(date: Date): string {
  return `W${getISOWeek(date)}/D${date.getDay() === 0 ? 7 : date.getDay()}`
}

export function formatReferenceLabel(date: Date): string {
  return `${format(date, "yyyy/MM/dd")} ${formatLegacyWeekdayCore(date)}`
}

export function formatLegacyLts(date: Date): string {
  return format(date, "h:mm:ss a")
}

export function formatLegacyDayProgress(date: Date): string {
  return `D${formatDayProgress(date)}R`
}

export function formatLegacyWeekdayCore(date: Date): string {
  return `${formatWeekStamp(date)} ${format(date, "EEEE")}`
}

export function formatLegacyWeekday(date: Date): string {
  return `${format(date, "yyyy/MM/dd")} ${formatLegacyWeekdayCore(date)}`
}

export function formatLegacyLongWeekday(date: Date): string {
  return `${formatLegacyWeekday(date)} ${format(date, "MMMM do")} - ${formatLegacyDayProgress(date)}`
}

export function formatLegacyLongWeekdayLts(date: Date): string {
  return `${formatLegacyLongWeekday(date)} ${formatLegacyLts(date)}:`
}

export function formatLegacyDateLtsWeekday(date: Date): string {
  return `${format(date, "yyyy/MM/dd")} ${formatLegacyLts(date)} - ${formatLegacyWeekdayCore(date)}`
}

export function formatLegacyDateLtsWeekdayDayProgress(date: Date): string {
  return `${formatLegacyDateLtsWeekday(date)} - ${formatLegacyDayProgress(date)}`
}

export function formatLegacyWeekCode(date: Date): string {
  return `${date.getFullYear()}W${getISOWeek(date)}: ${format(date, "yyyy/MM/dd")}`
}

export function formatLegacyMonthDayEnd(date: Date): string {
  return `${format(date, "MMMM dd, yyyy")} 11:59:59 PM`
}

export function formatLegacyWeekdayMultiline(date: Date): string {
  return `${formatLegacyWeekday(date)} - ${formatLegacyDayProgress(date)}\n${formatLegacyLts(date)}: `
}

export function strftimeTimeLower(date: Date): string {
  return `${format(date, "HH:mm")}${format(date, "a").toLowerCase()}`
}

export function strftimeDate(date: Date): string {
  return format(date, "yyyy/MM/dd")
}

export function strftimeDateTimeLower(date: Date): string {
  return `${format(date, "yyyy/MM/dd HH:mm:ss")}${format(date, "a").toLowerCase()}`
}

export function strftimeCompact(date: Date): string {
  return format(date, "yyyyMMddHHmmss yyyy MMM dd")
}
