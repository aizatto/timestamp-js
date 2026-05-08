import { useEffect, useEffectEvent, useRef, useState } from "react"

import { ControlPanel } from "@/components/control-panel"
import { PresetSection } from "@/components/preset-section"
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
  const navLinks = [
    { href: "/v1/", label: "v1" },
    { href: "/v2/", label: "v2" },
    { href: "/v3/", label: "v3" },
    { href: "https://github.com/aizatto/timestamp-js", label: "GitHub" },
    { href: "https://www.linkedin.com/in/aizatto", label: "LinkedIn" },
  ]
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
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-4 sm:px-6">
        <header className="border-b border-border py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a href="https://www.aizatto.com/" className="font-medium text-foreground">
              aizatto.com
            </a>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <div className="flex-1 space-y-5 py-5">
          <ControlPanel
            selectedValue={inputValue}
            onChange={handleInputChange}
            onRefresh={handleRefresh}
          />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="font-mono text-foreground">
              {formatReferenceLabel(selectedDate)}
            </span>
            <span>{statusMessage}</span>
          </div>

          <PresetSection
            title="Frequently used"
            description="Ranked by your local usage count and mapped to `1-9`."
            presets={frequentPresets}
            selectedDate={selectedDate}
            onCopy={(preset) => {
              void handleCopy(preset)
            }}
            copiedPresetId={copiedPresetId}
            ranked
          />

          <section className="grid gap-5 lg:grid-cols-2">
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
        </div>
      </div>
    </main>
  )
}

export default App
