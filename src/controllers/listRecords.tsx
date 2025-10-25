import type { IncomingMessage, ServerResponse } from 'node:http'
import { renderSSR } from 'nano-jsx'
import { getFreeSpace } from '../utils/getFreeSpace.js'
import { getRecordsTree } from '../utils/getRecordsTree.js'
import { TimeZone } from '../views/Config.js'
import { List } from '../views/List.js'

export async function listRecords(req: IncomingMessage, res: ServerResponse) {
  const timezone = req.query.get('timezone')
  const locale = req.query.get('locale')
  res.setHeader('content-type', 'text/html')
  res.text(
    renderSSR(
      timezone && locale ? (
        <List free={await getFreeSpace()} tree={await getRecordsTree(timezone, locale)} />
      ) : (
        <TimeZone />
      ),
    ),
  )
}
