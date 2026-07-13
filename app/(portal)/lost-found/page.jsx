'use client'

import { useState } from 'react'
import { PageHeader, Card, Badge, Kpi, Button, Table, Icon } from '@/components/ui'
import { lostFound } from '@/lib/mockData'

const CAT_ICON = { Personal: 'backpack', Books: 'book', Clothing: 'backpack', Valuables: 'award' }

export default function LostFoundPage() {
  const [rows, setRows] = useState(lostFound)
  const claim = (id) => setRows((xs) => xs.map((x) => x.id === id ? { ...x, status: 'Claimed' } : x))
  const unclaimed = rows.filter((r) => r.status === 'Unclaimed').length

  return (
    <div className="page">
      <PageHeader
        title="Lost & Found"
        subtitle="Items found around campus — claim yours at the front office."
        actions={<Button variant="primary" icon="add">Report item</Button>}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Unclaimed items" value={unclaimed} icon="lostFound" tone="amber" />
        <Kpi label="Claimed" value={rows.filter(r => r.status === 'Claimed').length} icon="badge" tone="green" />
        <Kpi label="This week" value={rows.length} icon="calendar" tone="blue" />
      </div>

      <Card bodyClass="tight" title="Found items">
        <Table
          rowKey="id"
          columns={[
            { key: 'item', label: 'Item', render: (r) => (
              <span className="row" style={{ gap: 11 }}>
                <Icon name={CAT_ICON[r.category] || 'lostFound'} tone="gray" size="sm" />
                <b>{r.item}</b>
              </span>
            ) },
            { key: 'category', label: 'Category', render: (r) => <Badge tone="gray">{r.category}</Badge> },
            { key: 'foundAt', label: 'Found at' },
            { key: 'date', label: 'Date' },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Claimed' ? 'green' : 'amber'}>{r.status}</Badge> },
            { key: 'act', label: '', align: 'right', render: (r) => r.status === 'Unclaimed' ? <Button size="sm" onClick={() => claim(r.id)}>Claim</Button> : <span className="faint">—</span> },
          ]}
          rows={rows}
        />
      </Card>
    </div>
  )
}
