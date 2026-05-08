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
  return `${date.getFullYear()}/W${String(getISOWeek(date)).padStart(2, "0")}`
}

export function formatReferenceLabel(date: Date): string {
  return format(date, "yyyy/MM/dd HH:mm:ss '·' 'W'w '·' 'D'DDD")
}
