'use client'

import { useState } from 'react'
import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, SearchInput, Tabs, RowActions } from '@/components/ui'
import { librarySummary, libraryCatalog, libraryIssued } from '@/lib/mockData'

export default function LibraryPage() {
  const { role } = useApp()
  const [tab, setTab] = useState('catalog')
  const [q, setQ] = useState('')
  const staff = role === 'admin' || role === 'teacher'

  const catalog = libraryCatalog.filter((b) =>
    b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="page">
      <PageHeader
        title="Library"
        subtitle="Catalog, circulation and member history."
        actions={staff ? <Button variant="primary" icon="add">Add title</Button> : null}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Titles" value={librarySummary.titles.toLocaleString('en-IN')} icon="book" tone="accent" />
        <Kpi label="Copies" value={librarySummary.copies.toLocaleString('en-IN')} icon="library" tone="blue" />
        <Kpi label="Issued" value={librarySummary.issued.toLocaleString('en-IN')} icon="task" tone="teal" />
        <Kpi label="Overdue" value={librarySummary.overdue} icon="alert" tone="red" />
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[{ value: 'catalog', label: 'Catalog' }, { value: 'circulation', label: 'Circulation' }]}
      />

      {tab === 'catalog' ? (
        <Card bodyClass="tight" title="Book catalog" action={<SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or author…" />}>
          <Table
            rowKey="id"
            columns={[
              { key: 'title', label: 'Title', render: (r) => (<div><b>{r.title}</b><div className="faint" style={{ fontSize: 12 }}>{r.author}</div></div>) },
              { key: 'id', label: 'Accn.', render: (r) => <span className="mono muted">{r.id}</span> },
              { key: 'category', label: 'Category', render: (r) => <Badge tone="gray">{r.category}</Badge> },
              { key: 'copies', label: 'Copies', align: 'right', render: (r) => <span className="mono">{r.available}/{r.copies}</span> },
              { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
              { key: 'issue', label: '', align: 'right', render: (r) => staff ? <Button size="sm" disabled={r.available === 0}>Issue</Button> : null },
              { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.title} /> },
            ]}
            rows={catalog}
            empty="No books match your search."
          />
        </Card>
      ) : (
        <Card bodyClass="tight" title="Issued & returned">
          <Table
            rowKey="id"
            columns={[
              { key: 'book', label: 'Book', render: (r) => <b>{r.book}</b> },
              { key: 'member', label: 'Member', render: (r) => (<div>{r.member}<div className="faint" style={{ fontSize: 12 }}>{r.class}</div></div>) },
              { key: 'issued', label: 'Issued' },
              { key: 'due', label: 'Due', render: (r) => <span style={{ color: r.status === 'Overdue' ? 'var(--red)' : 'inherit' }}>{r.due}</span> },
              { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
              { key: 'return', label: '', align: 'right', render: (r) => staff && r.status !== 'Returned' ? <Button size="sm">Return</Button> : null },
              { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.book} /> },
            ]}
            rows={libraryIssued}
          />
        </Card>
      )}
    </div>
  )
}
