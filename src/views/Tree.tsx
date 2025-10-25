import type { ITree } from '../utils/getRecordsTree.js'

interface ITreeProps {
  tree: ITree
  indent?: number
  collapsed?: boolean
}

export function Tree({ tree, indent = 0, collapsed = false }: ITreeProps) {
  return Object.values(tree).map((child) => (
    <>
      <li
        id={child.id}
        data-parent-id={child.parentId}
        {...(collapsed && { className: 'collapsed' })}
        style={{ paddingLeft: `calc(${indent} * 0.5rem)` }}
      >
        {child.href ? (
          <button
            type="button"
            className="play"
            data-id={child.id}
            data-prev-id={child.prevId}
            data-next-id={child.nextId}
            data-href={child.href}
          >
            <Title tree={child} />
          </button>
        ) : (
          <span>
            <Title tree={child} />
          </span>
        )}

        {child.href && (
          <>
            <a href={child.href}>
              <i data-lucide="download"></i>
            </a>
            <button type="button" className="delete" data-href={child.href}>
              <i data-lucide="trash"></i>
            </button>
          </>
        )}
        {child.hasChildren && (
          <button type="button" className={`collapse ${child.collapsed ? 'collapsed' : ''}`} data-id={child.id}>
            <i data-lucide="chevron-up"></i>
          </button>
        )}
      </li>
      <Tree tree={child.children} indent={indent + 1} collapsed={child.collapsed} />
    </>
  ))
}

interface ITitleProps {
  tree: ITree[string]
}

function Title({ tree }: ITitleProps) {
  return (
    <>
      {tree.title} {tree.subtitle && <small>{tree.subtitle}</small>}
    </>
  )
}
