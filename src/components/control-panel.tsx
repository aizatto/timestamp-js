import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ControlPanelProps = {
  selectedValue: string
  onChange: (value: string) => void
  onRefresh: () => void
}

export function ControlPanel({
  selectedValue,
  onChange,
  onRefresh,
}: ControlPanelProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
          Timestamps
        </h1>
        <p className="text-sm text-muted-foreground">
          Fast local timestamp formats with ranked copy shortcuts.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <label className="grid gap-1.5 text-sm">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Selected local time
          </span>
          <Input
            type="datetime-local"
            step={1}
            value={selectedValue}
            onChange={(event) => onChange(event.target.value)}
            className="h-10 rounded-md border-border bg-background shadow-none"
          />
        </label>
        <div className="flex items-end sm:justify-end">
          <Button
            onClick={onRefresh}
            variant="outline"
            className="h-10 rounded-md px-3"
          >
            <RotateCcw className="size-4" />
            Refresh
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>`A-Z` refreshes to now</span>
        <span>`1-9` copies ranked presets</span>
      </div>
    </section>
  )
}
