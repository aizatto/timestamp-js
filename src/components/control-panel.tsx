import { Clock3, Keyboard, RotateCcw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <Card className="border-border/70 bg-card/90 shadow-sm backdrop-blur">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            v3 rewrite
          </Badge>
          <Badge variant="outline" className="rounded-full px-3 py-1">
            near parity with v1
          </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="font-heading text-3xl tracking-tight sm:text-4xl">
            Timestamps
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 sm:text-base">
            Pick a local date and time, then copy the shape you need. The ranked
            shortcuts remember what you use most often.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          <span className="flex items-center gap-2">
            <Clock3 className="size-4 text-muted-foreground" />
            Selected local time
          </span>
          <Input
            type="datetime-local"
            step={1}
            value={selectedValue}
            onChange={(event) => onChange(event.target.value)}
            className="h-12 rounded-xl bg-background"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button onClick={onRefresh} size="lg" className="rounded-xl px-4">
            <RotateCcw className="size-4" />
            Refresh to now
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground lg:col-span-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5">
            <Keyboard className="size-3.5" />
            A-Z refreshes to now
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5">
            <Keyboard className="size-3.5" />
            1-9 copies the ranked presets
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
