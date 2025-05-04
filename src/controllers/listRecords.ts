import handlebars from 'handlebars'
import { exec } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { join } from 'node:path'
import prettyBytes from 'pretty-bytes'
import { env } from '../env.js'

export async function listRecords(req: IncomingMessage, res: ServerResponse) {
  const size = await new Promise((resolve) =>
    exec(`df -h ${env.RECORD_DIR}`, (err, stdout) => {
      if (err) {
        resolve('- B')
      } else {
        try {
          resolve(stdout.split(/\s+/)[10])
        } catch {
          resolve('- B')
        }
      }
    }),
  )
  const files = await readdir(env.RECORD_DIR)
  const records = []
  for (const file of files) {
    const { size } = await stat(join(env.RECORD_DIR, file))
    records.push({
      id: file,
      name: file.slice(10, -8),
      size: prettyBytes(size),
      href: `/record/${file}`,
    })
  }
  res.setHeader('content-type', 'text/html')
  const template = handlebars.compile(readFileSync('templates/index.hbs', 'utf8'))
  res.text(template({ size, records }))
}
