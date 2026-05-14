import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { TimestampPreset } from "@/lib/presets"
import { cn } from "@/lib/utils"

type PresetSectionProps = {
  title: string
  description?: string
  presets: TimestampPreset[]
  selectedDate: Date
  onCopy: (preset: TimestampPreset) => void
  copiedPresetId: string | null
  ranked?: boolean
}

export function PresetSection({
  title,
  description,
  presets,
  selectedDate,
  onCopy,
  copiedPresetId,
  ranked = false,
}: PresetSectionProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="rounded-md border border-border bg-background">
        {presets.map((preset, index) => {
          const value = preset.copy(selectedDate)
          const isCopied = copiedPresetId === preset.id
          const expression =
            typeof preset.expression === "function"
              ? preset.expression(selectedDate)
              : preset.expression

          return (
            <div key={preset.id}>
              {index > 0 ? <Separator /> : null}
              <div
                className={cn(
                  "grid gap-3 px-3 py-3 transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
                  isCopied && "bg-emerald-500/8"
                )}
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {ranked ? (
                      <span
                        className={cn(
                          "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors",
                          isCopied && "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/18 dark:text-emerald-200"
                        )}
                      >
                        {index + 1}
                      </span>
                    ) : null}
                    <code className="min-w-0 truncate font-mono text-[12px] text-foreground">
                      {expression}
                    </code>
                  </div>
                  <code
                    className={cn(
                      "block overflow-x-auto rounded-sm bg-muted px-2.5 py-2 font-mono text-[13px] leading-5 break-all whitespace-pre-wrap text-foreground transition-colors",
                      isCopied &&
                        "bg-emerald-100 text-emerald-950 ring-1 ring-emerald-500/30 dark:bg-emerald-500/14 dark:text-emerald-100 dark:ring-emerald-400/30"
                    )}
                  >
                    {value}
                  </code>
                </div>
                <Button
                  variant={isCopied ? "secondary" : "outline"}
                  className={cn(
                    "h-9 rounded-md px-3 transition-colors sm:self-start",
                    isCopied &&
                      "border-emerald-500/30 bg-emerald-100 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-500/14 dark:text-emerald-100 dark:hover:bg-emerald-500/20"
                  )}
                  onClick={() => onCopy(preset)}
                >
                  {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
