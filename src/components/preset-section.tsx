import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <Card className="border-border/70 bg-card/90 shadow-sm backdrop-blur">
      <CardHeader>
        <CardTitle className="font-heading text-xl tracking-tight">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {presets.map((preset, index) => {
          const value = preset.copy(selectedDate)
          const isCopied = copiedPresetId === preset.id

          return (
            <div key={preset.id} className="space-y-4">
              {index > 0 ? <Separator /> : null}
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {ranked ? (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        {index + 1}
                      </span>
                    ) : null}
                    <h3 className="text-sm font-semibold text-foreground sm:text-base">
                      {preset.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {preset.description}
                  </p>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-xs">
                    <code className="block overflow-x-auto text-sm leading-6 break-all text-foreground">
                      {value}
                    </code>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    <span className="font-medium text-foreground">Reference:</span>{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">
                      {preset.expression}
                    </code>
                  </p>
                </div>
                <Button
                  variant={isCopied ? "secondary" : "outline"}
                  size="lg"
                  className={cn(
                    "rounded-xl px-4 lg:mt-1",
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
      </CardContent>
    </Card>
  )
}
