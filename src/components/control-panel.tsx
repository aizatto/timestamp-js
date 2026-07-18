import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ControlPanelProps = {
  selectedValue: string
  onChange: (value: string) => void
  onRefresh: () => void
  isRefreshHighlighted: boolean
}

export function ControlPanel({
  selectedValue,
  onChange,
  onRefresh,
  isRefreshHighlighted,
}: ControlPanelProps) {
  return (
    <section className="space-y-2">
      <div>
        <h1 className="font-heading text-2xl tracking-tight text-foreground sm:text-3xl">
          Timestamps
        </h1>
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <label className="block">
          <Input
            type="datetime-local"
            step={1}
            value={selectedValue}
            onChange={(event) => onChange(event.target.value)}
            onClick={(event) => event.currentTarget.showPicker?.()}
            className="h-10 rounded-md border-border bg-background shadow-none"
          />
        </label>
        <div className="flex items-end sm:justify-end">
          <Button
            onClick={onRefresh}
            variant={isRefreshHighlighted ? "secondary" : "outline"}
            className={cn(
              "h-10 rounded-md px-3 transition-colors",
              isRefreshHighlighted &&
                "border-emerald-500/30 bg-emerald-100 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-500/14 dark:text-emerald-100 dark:hover:bg-emerald-500/20"
            )}
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
