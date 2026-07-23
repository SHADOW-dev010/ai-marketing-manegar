import { useAppStore } from '../store/useAppStore'
import { BarChart3, TrendingUp, PieChart } from 'lucide-react'

function MetricCard({ label, value, change }: { label: string; value: string; change?: string }) {
  return (
    <div style={{
      background: 'var(--bg-card)', borderRadius: '12px',
      border: '1px solid var(--border)', padding: '20px',
    }}>
      <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 700 }}>{value}</div>
      {change && (
        <div style={{
          fontSize: '13px', marginTop: '6px',
          color: change.startsWith('+') ? 'var(--success)' : 'var(--danger)',
        }}>{change}</div>
      )}
    </div>
  )
}

export default function Analytics() {
  const campaigns = useAppStore((s) => s.campaigns)

  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0)
  const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0)
  const totalSpent = campaigns.reduce((s, c) => s + c.spent, 0)
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0)
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00'
  const cpc = totalClicks > 0 ? (totalSpent / totalClicks).toFixed(2) : '0.00'
  const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0.00'

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>Analytics</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
        Campaign performance and insights
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        <MetricCard label="Total Impressions" value={totalImpressions.toLocaleString()} change="+12.5%" />
        <MetricCard label="Total Clicks" value={totalClicks.toLocaleString()} change="+8.3%" />
        <MetricCard label="CTR" value={`${ctr}%`} change="+1.2%" />
        <MetricCard label="CPC" value={`$${cpc}`} change="-0.15" />
        <MetricCard label="Conversions" value={totalConversions.toLocaleString()} change="+15.7%" />
        <MetricCard label="Conv. Rate" value={`${conversionRate}%`} change="+2.1%" />
      </div>

      <div style={{
        background: 'var(--bg-card)', borderRadius: '12px',
        border: '1px solid var(--border)', padding: '24px', marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={18} style={{ color: 'var(--accent)' }} /> Campaign Performance
        </h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {campaigns.map((c) => {
            const pct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0
            return (
              <div key={c.id} style={{ flex: '1 1 200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{c.name}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{
                  height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${pct}%`, height: '100%',
                    background: c.status === 'active' ? 'var(--success)' : 'var(--accent)',
                    borderRadius: '4px', transition: 'width 0.3s',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
      }}>
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px',
          border: '1px solid var(--border)', padding: '24px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={18} style={{ color: 'var(--accent)' }} /> Platform Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...new Set(campaigns.map((c) => c.platform))].map((platform) => {
              const platformCampaigns = campaigns.filter((c) => c.platform === platform)
              const platformSpent = platformCampaigns.reduce((s, c) => s + c.spent, 0)
              const pct = totalSpent > 0 ? Math.round((platformSpent / totalSpent) * 100) : 0
              return (
                <div key={platform}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px' }}>{platform}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{pct}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`, height: '100%', background: 'var(--accent)',
                      borderRadius: '3px',
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px',
          border: '1px solid var(--border)', padding: '24px',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} style={{ color: 'var(--accent)' }} /> AI Insights
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Increase Facebook ad budget by 20% — highest ROI channel this quarter',
              'Best posting time for email campaigns: Tuesday 10 AM',
              'Ad copy with emotional triggers converts 34% better',
              'Video content outperforms static images by 2.3x',
            ].map((insight, i) => (
              <li key={i} style={{
                padding: '12px 16px', background: 'var(--bg-primary)',
                borderRadius: '8px', fontSize: '13px', lineHeight: '1.5',
                borderLeft: '3px solid var(--accent)',
              }}>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
