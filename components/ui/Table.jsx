'use client'

// Lightweight declarative table.
//  columns: [{ key, label, align, render?, width? }]
//  rows: array of objects; rowKey: field or fn
export function Table({ columns, rows, rowKey = 'id', empty = 'No records.', onRowClick }) {
  const keyOf = typeof rowKey === 'function' ? rowKey : (r) => r[rowKey]
  return (
    <div className="table-wrap">
      <table className="tbl">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.align === 'right' ? 'num' : ''} style={c.width ? { width: c.width } : undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={keyOf(r)} onClick={onRowClick ? () => onRowClick(r) : undefined}
              style={onRowClick ? { cursor: 'pointer' } : undefined}>
              {columns.map((c) => (
                <td key={c.key} className={c.align === 'right' ? 'num' : ''}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} style={{ padding: 30, textAlign: 'center' }} className="muted">{empty}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
