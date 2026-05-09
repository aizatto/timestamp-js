import { rm } from "node:fs/promises"
import path from "node:path"

const outputDir = process.argv[2]

if (!outputDir) {
  throw new Error("Expected an output directory argument.")
}

const resolvedOutputDir = path.resolve(outputDir)
const isArchiveBuild = resolvedOutputDir.endsWith(path.join(".tmp", "archive"))

if (isArchiveBuild) {
  await rm(path.join(outputDir, "v1"), { force: true, recursive: true })
  await rm(path.join(outputDir, "v2"), { force: true, recursive: true })
}

await rm(path.join(outputDir, "v3"), { force: true, recursive: true })
