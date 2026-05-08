import { format, getDayOfYear, getISOWeek } from "date-fns"

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

export function formatDayProgress(date: Date): string {
  return `${String(getDayOfYear(date)).padStart(3, "0")}/366`
}

export function formatWeekStamp(date: Date): string {
  return `W${getISOWeek(date)}/D${date.getDay() === 0 ? 7 : date.getDay()}`
}

export function formatReferenceLabel(date: Date): string {
  return `${format(date, "yyyy/MM/dd")} ${formatMomentWeekdayCore(date)}`
}

export function formatMomentLts(date: Date): string {
  return format(date, "h:mm:ss a")
}

export function formatMomentDayProgress(date: Date): string {
  return `D${formatDayProgress(date)}R`
}

export function formatMomentWeekdayCore(date: Date): string {
  return `${formatWeekStamp(date)} ${format(date, "EEEE")}`
}

export function formatMomentWeekday(date: Date): string {
  return `${format(date, "yyyy/MM/dd")} ${formatMomentWeekdayCore(date)}`
}

export function formatMomentLongWeekday(date: Date): string {
  return `${formatMomentWeekday(date)} ${format(date, "MMMM do")} - ${formatMomentDayProgress(date)}`
}

export function formatMomentLongWeekdayLts(date: Date): string {
  return `${formatMomentLongWeekday(date)} ${formatMomentLts(date)}:`
}

export function formatMomentDateLtsWeekday(date: Date): string {
  return `${format(date, "yyyy/MM/dd")} ${formatMomentLts(date)} - ${formatMomentWeekdayCore(date)}`
}

export function formatMomentDateLtsWeekdayDayProgress(date: Date): string {
  return `${formatMomentDateLtsWeekday(date)} - ${formatMomentDayProgress(date)}`
}

export function formatMomentWeekCode(date: Date): string {
  return `${date.getFullYear()}W${getISOWeek(date)}: ${format(date, "yyyy/MM/dd")}`
}

export function formatMomentMonthDayEnd(date: Date): string {
  return `${format(date, "MMMM dd, yyyy")} 11:59:59 PM`
}

export function formatMomentWeekdayMultiline(date: Date): string {
  return `${formatMomentWeekday(date)} - ${formatMomentDayProgress(date)}\n${formatMomentLts(date)}: `
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
