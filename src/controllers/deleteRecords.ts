import { readdir, unlink } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { join } from 'node:path'
import { env } from '../env.js'

export async function deleteRecords(req: IncomingMessage, res: ServerResponse) {
  const files = await readdir(env.RECORD_DIR)

  for (const file of files) {
    const tsPath = join(env.RECORD_DIR, file)
    await unlink(tsPath)
  }

  res.statusCode = 204
  res.end()
}
