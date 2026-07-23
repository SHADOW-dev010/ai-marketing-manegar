import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Image, Megaphone, BarChart3,
  CalendarDays, Bot, Settings,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/content', label: 'Content Studio', icon: FileText },
  { to: '/images', label: 'Image Studio', icon: Image },
  { to: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/social', label: 'Social Scheduler', icon: CalendarDays },
  { to: '/assistant', label: 'AI Assistant', icon: Bot },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: 'var(--sidebar-width)',
      height: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <Bot size={24} style={{ color: 'var(--accent)' }} />
          AI Marketing
        </h1>
      </div>

      <nav style={{
        flex: 1,
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      }}>
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to
          return (
            <NavLink
              key={to}
              to={to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-bg)' : 'transparent',
                transition: 'all 0.15s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          )
        })}
      </nav>

      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border)',
        fontSize: '12px',
        color: 'var(--text-muted)',
      }}>
        v0.1.0
      </div>
    </aside>
  )
}
