import { cp, mkdir, rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, "..")
const sourceDir = path.join(rootDir, ".tmp", "archive")
const targetDir = path.join(rootDir, "public", "v3")

await rm(targetDir, { force: true, recursive: true })
await mkdir(path.dirname(targetDir), { recursive: true })
await cp(sourceDir, targetDir, { recursive: true })
