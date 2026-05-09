import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], {
    cwd: rootDir,
    stdio: 'ignore',
  });
} catch {
  // Ignore environments where git isn't available or the repo metadata is missing.
}
