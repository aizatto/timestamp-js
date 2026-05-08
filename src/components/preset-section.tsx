import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { TimestampPreset } from "@/lib/presets"
import { cn } from "@/lib/utils"

type PresetSectionProps = {
  title: string
  description: string
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
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="rounded-md border border-border bg-background">
        {presets.map((preset, index) => {
          const value = preset.copy(selectedDate)
          const isCopied = copiedPresetId === preset.id

          return (
            <div key={preset.id}>
              {index > 0 ? <Separator /> : null}
              <div className="grid gap-3 px-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {ranked ? (
                      <span className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {index + 1}
                      </span>
                    ) : null}
                    <h3 className="font-medium text-foreground">{preset.title}</h3>
                    <span className="truncate text-xs text-muted-foreground">
                      {preset.description}
                    </span>
                  </div>
                  <code className="block overflow-x-auto rounded-sm bg-muted px-2.5 py-2 font-mono text-[13px] leading-5 break-all text-foreground">
                    {value}
                  </code>
                </div>
                <Button
                  variant={isCopied ? "secondary" : "outline"}
                  className={cn(
                    "h-9 rounded-md px-3 sm:self-start",
                    isCopied && "border-transparent"
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
