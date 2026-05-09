const STORAGE_KEY = "timestamp-v3:preset-usage"

export type UsageMap = Record<string, number>

export function loadUsageCounts(): UsageMap {
  if (typeof window === "undefined") {
    return {}
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {}
    }

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") {
      return {}
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, number] => typeof entry[1] === "number"
      )
    )
  } catch {
    return {}
  }
}

export function saveUsageCounts(usageCounts: UsageMap): void {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(usageCounts))
}
