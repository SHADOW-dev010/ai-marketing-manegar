import { Send, CalendarDays } from 'lucide-react'

const scheduledPosts = [
  { id: 1, platform: 'Twitter', content: 'Excited to launch our new product line!', date: '2026-07-08', time: '10:00', status: 'scheduled' },
  { id: 2, platform: 'LinkedIn', content: 'How AI is transforming digital marketing strategies in 2026', date: '2026-07-09', time: '09:30', status: 'scheduled' },
  { id: 3, platform: 'Instagram', content: 'Behind the scenes of our latest photoshoot', date: '2026-07-10', time: '14:00', status: 'draft' },
]

export default function SocialScheduler() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>Social Scheduler</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Plan and schedule social media content</p>
        </div>
        <button style={{
          padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <CalendarDays size={16} /> Schedule Post
        </button>
      </div>

      <div style={{
        background: 'var(--bg-card)', borderRadius: '12px',
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Platform', 'Content', 'Date', 'Time', 'Status', 'Actions'].map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '12px 16px',
                  color: 'var(--text-muted)', fontWeight: 500, fontSize: '12px',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduledPosts.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{post.platform}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {post.content}
                </td>
                <td style={{ padding: '12px 16px' }}>{post.date}</td>
                <td style={{ padding: '12px 16px' }}>{post.time}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    background: post.status === 'scheduled' ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.15)',
                    color: post.status === 'scheduled' ? 'var(--accent)' : 'var(--warning)',
                  }}>
                    {post.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button style={{
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px',
                    background: 'var(--accent)', color: '#fff',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    <Send size={12} /> Post Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
