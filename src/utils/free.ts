import { exec } from 'node:child_process'
import { env } from '../env.js'

export function getFreeSpace() {
  return new Promise((resolve) =>
    exec(`df -h ${env.RECORD_DIR}`, (err, stdout) => {
      console.log(stdout)
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
}
