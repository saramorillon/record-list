import { stat, unlink } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { join } from 'node:path'
import { env } from '../env.js'

export async function deleteRecord(req: IncomingMessage, res: ServerResponse) {
  const tsPath = join(env.RECORD_DIR, req.params.id)

  const exists = await stat(tsPath)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    res.statusCode = 404
    res.end()
    return
  }

  await unlink(tsPath)

  res.statusCode = 204
  res.end()
}
