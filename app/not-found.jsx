import Link from 'next/link'
import { Icon } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="login-wrap">
      <div className="card login-card" style={{ padding: 32, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Icon name="search" tone="gray" size="xl" />
        <h2 style={{ margin: '14px 0 4px' }}>Page not found</h2>
        <p className="muted" style={{ marginBottom: 18 }}>The record or page you’re looking for doesn’t exist.</p>
        <Link className="btn primary" href="/dashboard">Back to dashboard</Link>
      </div>
    </div>
  )
}
