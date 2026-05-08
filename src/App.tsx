import { useEffect, useEffectEvent, useRef, useState } from "react"
import { CalendarClock, History, Layers2 } from "lucide-react"

import { ControlPanel } from "@/components/control-panel"
import { PresetSection } from "@/components/preset-section"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  PRESETS,
  PRESET_SECTIONS,
  TRACKED_PRESETS,
  type TimestampPreset,
  formatReferenceLabel,
} from "@/lib/presets"
import { loadUsageCounts, saveUsageCounts } from "@/lib/storage"
import { parseDateTimeLocalValue, toDateTimeLocalValue } from "@/lib/time"

async function copyToClipboard(value: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "")
  textarea.style.position = "absolute"
  textarea.style.left = "-9999px"
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function App() {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [inputValue, setInputValue] = useState(() => toDateTimeLocalValue(new Date()))
  const [usageCounts, setUsageCounts] = useState(loadUsageCounts)
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState("Ready to copy.")
  const copiedResetRef = useRef<number | null>(null)

  const frequentPresets = [...TRACKED_PRESETS].sort((left, right) => {
    const byUsage = (usageCounts[right.id] ?? 0) - (usageCounts[left.id] ?? 0)
    if (byUsage !== 0) {
      return byUsage
    }

    return TRACKED_PRESETS.findIndex((preset) => preset.id === left.id) -
      TRACKED_PRESETS.findIndex((preset) => preset.id === right.id)
  })

  async function handleCopy(preset: TimestampPreset) {
    const value = preset.copy(selectedDate)
    await copyToClipboard(value)

    setCopiedPresetId(preset.id)
    setStatusMessage(`Copied ${preset.title}: ${value}`)

    if (preset.trackUsage) {
      setUsageCounts((current) => {
        const next = {
          ...current,
          [preset.id]: (current[preset.id] ?? 0) + 1,
        }

        saveUsageCounts(next)
        return next
      })
    }

    if (copiedResetRef.current) {
      window.clearTimeout(copiedResetRef.current)
    }

    copiedResetRef.current = window.setTimeout(() => {
      setCopiedPresetId(null)
    }, 1600)
  }

  function handleRefresh() {
    const nextDate = new Date()
    setSelectedDate(nextDate)
    setInputValue(toDateTimeLocalValue(nextDate))
    setStatusMessage(`Refreshed to ${formatReferenceLabel(nextDate)}`)
  }

  function handleInputChange(value: string) {
    setInputValue(value)

    const parsed = parseDateTimeLocalValue(value)
    if (!parsed) {
      setStatusMessage("Enter a valid local date and time to update the formats.")
      return
    }

    setSelectedDate(parsed)
    setStatusMessage(`Selected ${formatReferenceLabel(parsed)}`)
  }

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      isTypingTarget(event.target)
    ) {
      return
    }

    if (/^[a-z]$/i.test(event.key)) {
      handleRefresh()
      return
    }

    if (/^[1-9]$/.test(event.key)) {
      const preset = frequentPresets[Number(event.key) - 1]
      if (!preset) {
        return
      }

      void handleCopy(preset)
    }
  })

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (copiedResetRef.current) {
        window.clearTimeout(copiedResetRef.current)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f3eb_0%,#fbfaf8_22%,#fff_100%)] text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex-1 space-y-6">
          <ControlPanel
            selectedValue={inputValue}
            onChange={handleInputChange}
            onRefresh={handleRefresh}
          />

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)]">
            <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CalendarClock className="size-4 text-muted-foreground" />
                Selected timestamp
              </div>
              <div className="mt-3 space-y-2">
                <div className="font-heading text-2xl tracking-tight sm:text-3xl">
                  {formatReferenceLabel(selectedDate)}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Local reference output for quick visual confirmation before you copy.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <History className="size-4 text-muted-foreground" />
                Clipboard status
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {statusMessage}
              </p>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2">
                {frequentPresets.slice(0, 3).map((preset) => (
                  <Badge
                    key={preset.id}
                    variant="outline"
                    className="rounded-full px-3 py-1"
                  >
                    {preset.title}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          <PresetSection
            title="Frequently used"
            description="These are ranked by your local usage count and mapped to the 1-9 shortcuts."
            presets={frequentPresets}
            selectedDate={selectedDate}
            onCopy={(preset) => {
              void handleCopy(preset)
            }}
            copiedPresetId={copiedPresetId}
            ranked
          />

          <section className="grid gap-6 xl:grid-cols-2">
            {PRESET_SECTIONS.map((section) => (
              <PresetSection
                key={section.id}
                title={section.title}
                description={section.description}
                presets={PRESETS.filter((preset) => preset.section === section.id)}
                selectedDate={selectedDate}
                onCopy={(preset) => {
                  void handleCopy(preset)
                }}
                copiedPresetId={copiedPresetId}
              />
            ))}
          </section>

          <section className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Layers2 className="size-4 text-muted-foreground" />
              Notes on the rewrite
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-3">
              <p>
                <code className="rounded bg-muted px-1.5 py-0.5">public/v1</code> remains the historical archive.
              </p>
              <p>
                <code className="rounded bg-muted px-1.5 py-0.5">v3</code> runs on React 19, TypeScript 6, Tailwind v4, and{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">shadcn/ui</code>.
              </p>
              <p>
                The archive build publishes a static <code className="rounded bg-muted px-1.5 py-0.5">/v3/</code> site into{" "}
                <code className="rounded bg-muted px-1.5 py-0.5">public/v3</code>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
