'use client'

import { useState } from 'react'
import { useApp } from '@/components/AppContext'
import { Card, Badge, Glyph } from '@/components/ui'
import { announcements, messages, events } from '@/lib/mockData'

export default function CommunicationPage() {
  const { role } = useApp()
  const canPost = role === 'admin' || role === 'teacher'
  const [list, setList] = useState(announcements)
  const [draft, setDraft] = useState('')
  const [title, setTitle] = useState('')

  const post = () => {
    if (!title.trim()) return
    setList((xs) => [
      { id: 'AN-' + (xs.length + 1), title, body: draft, audience: role === 'teacher' ? 'Class VIII-A' : 'School-wide', channel: 'App · WhatsApp', by: role === 'teacher' ? 'Rahul Deshmukh' : 'Principal', at: 'Just now', pinned: false },
      ...xs,
    ])
    setTitle(''); setDraft('')
  }

  return (
    <div className="page">
      <div className="page-head">
        <h2>Communication & Notifications</h2>
        <p className="muted">Announcements, messages and the school calendar — WhatsApp is the primary parent channel.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="stack">
          {canPost && (
            <Card title="New announcement">
              <div className="field">
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="field">
                <textarea placeholder="Write your message…" value={draft} onChange={(e) => setDraft(e.target.value)}
                  rows={3} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 9, fontFamily: 'inherit', fontSize: 14, resize: 'vertical' }} />
              </div>
              <div className="between">
                <div className="pillrow">
                  <span className="pill row" style={{ gap: 6 }}><Glyph name="whatsapp" size={14} /> WhatsApp</span>
                  <span className="pill row" style={{ gap: 6 }}><Glyph name="mail" size={14} /> Email</span>
                  <span className="pill row" style={{ gap: 6 }}><Glyph name="sms" size={14} /> SMS</span>
                </div>
                <button className="btn primary" onClick={post}>Publish</button>
              </div>
            </Card>
          )}

          <Card title="Announcements" bodyClass="tight">
            <div className="stack" style={{ padding: 6 }}>
              {list.map((a) => (
                <div key={a.id} className="ann">
                  <div className="between">
                    <b className="row" style={{ gap: 6 }}>{a.pinned && <Glyph name="pin" size={15} color="var(--accent)" />}{a.title}</b>
                    <span className="faint" style={{ fontSize: 12 }}>{a.at}</span>
                  </div>
                  <p className="muted" style={{ fontSize: 13, margin: '4px 0 8px' }}>{a.body}</p>
                  <div className="row">
                    <Badge tone="gray">{a.audience}</Badge>
                    <span className="faint" style={{ fontSize: 12 }}>{a.channel} · by {a.by}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="stack">
          <Card title="Messages">
            <div className="stack">
              {messages.map((m) => (
                <div key={m.id} className="between">
                  <div>
                    <b style={{ fontSize: 13 }}>{m.with}</b>
                    <div className="muted" style={{ fontSize: 12.5 }}>{m.preview}</div>
                  </div>
                  <div className="right">
                    <div className="faint" style={{ fontSize: 11.5 }}>{m.at}</div>
                    {m.unread && <span className="badge blue" style={{ marginTop: 4 }}><span className="dot" />New</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="School calendar">
            <div className="stack">
              {events.map((e) => (
                <div key={e.id} className="between">
                  <div className="row">
                    <span className="cal-chip">
                      <b>{new Date(e.date).getDate()}</b>
                      <span>{new Date(e.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                    </span>
                    {e.title}
                  </div>
                  <Badge tone={e.tag === 'Exam' ? 'red' : e.tag === 'Holiday' ? 'green' : 'blue'}>{e.tag}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .ann { padding: 12px; border-radius: 11px; background: var(--surface-2); border: 1px solid var(--border); }
        .cal-chip {
          display: inline-flex; flex-direction: column; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: 10px; background: var(--accent-soft); color: var(--accent); line-height: 1.1;
        }
        .cal-chip b { font-size: 15px; }
        .cal-chip span { font-size: 10px; text-transform: uppercase; }
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
