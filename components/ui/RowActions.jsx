'use client'

import { Glyph } from './Icon'
import { toast } from './Toast'

// Reusable View / Update / Download action set for table rows.
// Usage: <RowActions label={r.name} onView={...} onUpdate={...} onDownload={...} />
// Any handler you omit falls back to a toast so every row is interactive.
const META = {
  view: { icon: 'view', title: 'View', tone: 'blue', verb: 'Opening' },
  update: { icon: 'edit', title: 'Update', tone: 'amber', verb: 'Editing' },
  download: { icon: 'download', title: 'Download', tone: 'green', verb: 'Downloading' },
}

export function RowActions({ label = 'record', actions = ['view', 'update', 'download'], onView, onUpdate, onDownload }) {
  const handlers = { view: onView, update: onUpdate, download: onDownload }
  return (
    <div className="row-actions">
      {actions.map((a) => {
        const m = META[a]
        const run = (e) => {
          e.stopPropagation()
          if (handlers[a]) handlers[a](e)
          else toast(`${m.verb} ${label}`, m.tone)
        }
        return (
          <button key={a} type="button" className="ra-btn" title={m.title} aria-label={`${m.title} ${label}`} onClick={run}>
            <Glyph name={m.icon} size={16} />
          </button>
        )
      })}
    </div>
  )
}

export default RowActions
