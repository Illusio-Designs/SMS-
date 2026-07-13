'use client'

import { useState } from 'react'
import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Button, Glyph, fmtDate } from '@/components/ui'
import { galleryAlbums } from '@/lib/mockData'

export default function GalleryPage() {
  const { role } = useApp()
  const staff = role === 'admin' || role === 'teacher'
  const [open, setOpen] = useState(null)

  return (
    <div className="page">
      <PageHeader
        title="Gallery"
        subtitle="Photos from school events, activities and functions."
        actions={staff ? <Button variant="primary" icon="add">New album</Button> : null}
      />

      <div className="album-grid">
        {galleryAlbums.map((a) => (
          <div key={a.id} className="album" onClick={() => setOpen(a)}>
            <div className="album-cover">
              {a.colors.slice(0, 4).map((c, i) => <span key={i} style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }} />)}
              <span className="album-count"><Glyph name="image" size={13} /> {a.count}</span>
            </div>
            <div className="album-meta">
              <b>{a.title}</b>
              <span className="faint" style={{ fontSize: 12 }}>{fmtDate(a.date, { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="modal-scrim" onClick={() => setOpen(null)}>
          <div className="modal" style={{ maxWidth: 720 }} onClick={(e) => e.stopPropagation()}>
            <div className="between" style={{ marginBottom: 12 }}>
              <div>
                <b style={{ fontSize: 16 }}>{open.title}</b>
                <div className="muted" style={{ fontSize: 12.5 }}>{fmtDate(open.date, { day: '2-digit', month: 'short', year: 'numeric' })} · {open.count} photos</div>
              </div>
              <button className="btn ghost sm" onClick={() => setOpen(null)}><Glyph name="cross" size={18} /></button>
            </div>
            <div className="photo-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} style={{ background: `linear-gradient(135deg, ${open.colors[i % open.colors.length]}, ${open.colors[(i + 1) % open.colors.length]})` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .album-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; }
        .album { cursor: pointer; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border);
          background: var(--surface); box-shadow: var(--shadow); transition: transform 0.12s, box-shadow 0.12s; }
        .album:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
        .album-cover { position: relative; height: 130px; display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px; }
        .album-cover span:not(.album-count) { display: block; }
        .album-cover span:first-child { grid-row: 1 / 3; }
        .album-count { position: absolute; bottom: 8px; right: 8px; display: inline-flex; align-items: center; gap: 5px;
          background: rgba(0,0,0,0.55); color: #fff; padding: 3px 9px; border-radius: 999px; font-size: 11.5px; font-weight: 600; }
        .album-meta { padding: 12px 14px; display: flex; flex-direction: column; gap: 2px; }
        .photo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .photo-grid span { display: block; aspect-ratio: 1; border-radius: 8px; }
      `}</style>
    </div>
  )
}
