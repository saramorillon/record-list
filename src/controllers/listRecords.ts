import handlebars from 'handlebars'
import { readFileSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { join } from 'node:path'
import prettyBytes from 'pretty-bytes'
import { env } from '../env.js'
import { getFreeSpace } from '../utils/free.js'

interface IRecord {
  name: string
  date: string
  size: string
  href: string
}

export async function listRecords(req: IncomingMessage, res: ServerResponse) {
  const files = await readdir(env.RECORD_DIR)
  const records: Record<string, { date: string; records: IRecord[] }> = {}
  for (const file of files) {
    const { size, birthtimeMs } = await stat(join(env.RECORD_DIR, file))
    const createdAt = new Date(birthtimeMs).toISOString()
    const day = createdAt.slice(0, 10)
    const time = createdAt.slice(11, -5)
    records[day] ??= { date: day, records: [] }
    records[day].records.push({
      name: file,
      date: time,
      size: prettyBytes(size),
      href: `/record/${file}`,
    })
  }
  res.setHeader('content-type', 'text/html')
  const template = handlebars.compile(readFileSync('templates/index.hbs', 'utf8'))
  res.text(template({ size: await getFreeSpace(), days: Object.values(records) }))
}
