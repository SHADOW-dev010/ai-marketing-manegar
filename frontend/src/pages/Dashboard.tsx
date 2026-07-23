import { useEffect, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { api } from '../services/api'
import { TrendingUp, Users, Eye, MousePointerClick, DollarSign, Activity } from 'lucide-react'

function StatCard({ icon: Icon, label, value, sub }: {
  icon: any; label: string; value: string; sub?: string
}) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: 'var(--accent-bg)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{label}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700 }}>{value}</div>
      {sub && <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{sub}</div>}
    </div>
  )
}

export default function Dashboard() {
  const campaigns = useAppStore((s) => s.campaigns)
  const [backendStatus, setBackendStatus] = useState<string>('checking...')

  useEffect(() => {
    api.health()
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('disconnected'))
  }, [])

  const totalSpent = campaigns.reduce((s, c) => s + c.spent, 0)
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0)
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0)
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0)
  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0)
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Backend: <span style={{
              color: backendStatus === 'connected' ? 'var(--success)' : 'var(--danger)',
              fontWeight: 600,
            }}>{backendStatus}</span>
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        <StatCard icon={Activity} label="Active Campaigns" value={String(activeCampaigns)} />
        <StatCard icon={DollarSign} label="Total Budget" value={`$${totalBudget.toLocaleString()}`} sub={`Spent: $${totalSpent.toLocaleString()}`} />
        <StatCard icon={Eye} label="Impressions" value={totalImpressions.toLocaleString()} />
        <StatCard icon={MousePointerClick} label="Clicks" value={totalClicks.toLocaleString()} />
        <StatCard icon={TrendingUp} label="Conversions" value={totalConversions.toLocaleString()} />
        <StatCard icon={Users} label="Avg. CTR" value={`${totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00'}%`} />
      </div>

      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Recent Campaigns</h3>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Name', 'Platform', 'Status', 'Budget', 'Spent', 'Impressions', 'Clicks', 'Conv.'].map((h) => (
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
                        c.status === 'draft' ? 'rgba(245,158,11,0.15)' :
                        c.status === 'completed' ? 'rgba(107,114,128,0.15)' : 'rgba(239,68,68,0.15)',
                      color: c.status === 'active' ? 'var(--success)' :
                        c.status === 'draft' ? 'var(--warning)' :
                        c.status === 'completed' ? 'var(--text-muted)' : 'var(--danger)',
                    }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>${c.budget.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>${c.spent.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>{c.impressions.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>{c.clicks.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>{c.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
