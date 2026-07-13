'use client'

import { useState } from 'react'
import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, Icon, SearchInput, RowActions } from '@/components/ui'
import { studyMaterials, subjects } from '@/lib/mockData'

const TYPE_TONE = { PDF: 'red', PPT: 'amber', DOC: 'blue', Video: 'violet' }

export default function StudyMaterialPage() {
  const { role } = useApp()
  const staff = role === 'admin' || role === 'teacher'
  const [subject, setSubject] = useState('All')
  const [q, setQ] = useState('')

  const rows = studyMaterials.filter((m) =>
    (subject === 'All' || m.subject === subject) &&
    (m.title.toLowerCase().includes(q.toLowerCase()) || m.subject.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div className="page">
      <PageHeader
        title="Study Material"
        subtitle="Notes, slides, worksheets and video lessons shared by teachers."
        actions={staff ? <Button variant="primary" icon="upload">Upload material</Button> : null}
      />

      <div className="pillrow" style={{ marginBottom: 16 }}>
        {['All', ...subjects].map((s) => (
          <button key={s} className={`pill ${subject === s ? 'pill--on' : ''}`} onClick={() => setSubject(s)}>{s}</button>
        ))}
      </div>

      <Card bodyClass="tight"
        title={`${rows.length} resource${rows.length === 1 ? '' : 's'}`}
        action={<SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search material…" />}>
        <Table
          rowKey="id"
          columns={[
            { key: 'title', label: 'Title', render: (r) => (
              <span className="row" style={{ gap: 11 }}>
                <Icon name={r.type === 'Video' ? 'assignments' : 'book'} tone={TYPE_TONE[r.type] || 'gray'} size="sm" />
                <span><b>{r.title}</b><div className="faint" style={{ fontSize: 12 }}>by {r.by}</div></span>
              </span>
            ) },
            { key: 'subject', label: 'Subject', render: (r) => <Badge tone="gray">{r.subject}</Badge> },
            { key: 'type', label: 'Type', render: (r) => <Badge tone={TYPE_TONE[r.type]}>{r.type}</Badge> },
            { key: 'size', label: 'Size', render: (r) => <span className="muted">{r.size}</span> },
            { key: 'uploaded', label: 'Uploaded' },
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.title} /> },
          ]}
          rows={rows}
          empty="No study material for this filter."
        />
      </Card>
    </div>
  )
}
