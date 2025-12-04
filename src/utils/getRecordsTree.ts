import { readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import prettyBytes from 'pretty-bytes'
import { env } from '../env.js'

export type ITree = Record<
  string,
  {
    id: string
    parentId?: string
    prevId?: string
    nextId?: string
    collapsed?: boolean
    title: string | number
    subtitle?: string
    href?: string
    hasChildren: boolean
    children: ITree
  }
>

export async function getRecordsTree(timezone: string, locale: string) {
  const today = new Date()

  const tree: ITree = {}
  const files = await readdir(env.RECORD_DIR)

  for (const [index, file] of files.reverse().entries()) {
    const { size, birthtimeMs } = await stat(resolve(env.RECORD_DIR, file))

    const date = new Date(birthtimeMs)

    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: timezone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    const dateParts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]))
    const todayParts = Object.fromEntries(formatter.formatToParts(today).map((part) => [part.type, part.value]))

    const collapsed =
      dateParts.year !== todayParts.year || dateParts.month !== todayParts.month || dateParts.day !== todayParts.day
    const parentId = `y${dateParts.year}m${dateParts.month}d${dateParts.day}`

    tree[parentId] ??= {
      id: parentId,
      title: new Intl.DateTimeFormat(locale, { timeZone: timezone, dateStyle: 'long' }).format(date),
      collapsed,
      hasChildren: true,
      children: {},
    }
    tree[parentId].children[file] = {
      id: file,
      parentId,
      prevId: files[index - 1],
      nextId: files[index + 1],
      title: new Intl.DateTimeFormat(locale, { timeZone: timezone, timeStyle: 'short' }).format(date),
      subtitle: prettyBytes(size),
      collapsed,
      href: `/record/${file}`,
      hasChildren: false,
      children: {},
    }
    tree[parentId].subtitle = `${Object.keys(tree[parentId].children).length} videos`
  }

  return tree
}
