import { useAppStore } from '../store/useAppStore'
import { Plus, Pause, Archive } from 'lucide-react'

export default function CampaignManager() {
  const campaigns = useAppStore((s) => s.campaigns)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>Campaign Manager</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage your marketing campaigns</p>
        </div>
        <button style={{
          padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <Plus size={16} /> New Campaign
        </button>
      </div>

      <div style={{
        background: 'var(--bg-card)', borderRadius: '12px',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Platform', 'Status', 'Budget', 'Spent', 'Impressions', 'Clicks', 'Conv.', 'Actions'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '12px 16px',
                  color: 'var(--text-muted)', fontWeight: 500, fontSize: '12px',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{c.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{c.platform}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    background: c.status === 'active' ? 'rgba(34,197,94,0.15)' :
                      c.status === 'draft' ? 'rgba(245,158,11,0.15)' : 'rgba(107,114,128,0.15)',
                    color: c.status === 'active' ? 'var(--success)' :
                      c.status === 'draft' ? 'var(--warning)' : 'var(--text-muted)',
                  }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>${c.budget.toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>${c.spent.toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>{c.impressions.toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>{c.clicks.toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>{c.conversions}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{
                      padding: '6px', borderRadius: '6px', background: 'var(--bg-hover)',
                      border: '1px solid var(--border)', color: 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }} title="Pause">
                      <Pause size={14} />
                    </button>
                    <button style={{
                      padding: '6px', borderRadius: '6px', background: 'var(--bg-hover)',
                      border: '1px solid var(--border)', color: 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }} title="Archive">
                      <Archive size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
