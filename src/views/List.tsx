import type { ITree } from '../utils/getRecordsTree.js'
import { Tree } from './Tree.js'

interface IListProps {
  free: string
  tree: ITree
}

export function List({ free, tree }: IListProps) {
  return (
    <html lang="en">
      <head>
        <title>Records list</title>
        <link rel="icon" type="image/svg" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@saramorillon/minicss@2.7.0/dist/minicss.css" rel="stylesheet" />
        <link href="/list.css" rel="stylesheet" />

        <script src="https://unpkg.com/lucide@latest" defer></script>
        <script src="/lucide.js" defer></script>
        <script src="/list.js" defer></script>
      </head>

      <body>
        <aside>
          <nav>
            <ul>
              <li>
                <strong>
                  Records <small>Free space: {free}</small>
                </strong>
                <button type="button" id="delete">
                  <i data-lucide="trash"></i>
                </button>
              </li>
              <Tree tree={tree} />
            </ul>
          </nav>
        </aside>
        <main>
          <video controls muted></video>
          <div role="group">
            <button type="button" id="prev" disabled>
              <i data-lucide="chevron-left"></i>
            </button>
            <button type="button" id="next" disabled>
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
