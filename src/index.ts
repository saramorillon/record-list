import { Router } from '@saramorillon/http-router'
import { mkdir } from 'node:fs/promises'
import http, { type IncomingMessage, type ServerResponse } from 'node:http'
import { deleteRecord } from './controllers/deleteRecord.js'
import { deleteRecords } from './controllers/deleteRecords.js'
import { getRecord } from './controllers/getRecord.js'
import { listRecords } from './controllers/listRecords.js'
import { env } from './env.js'

const router = new Router()

router.get('/records', listRecords)
router.get('/record/:id', getRecord)
router.delete('/record/:id', deleteRecord)
router.delete('/records', deleteRecords)

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  router.listen(req, res)
})

mkdir(env.RECORDS_DIR)
  .catch(() => false)
  .finally(() => server.listen(3000, () => console.log('Listening')))
