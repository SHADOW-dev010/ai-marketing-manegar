import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{
        flex: 1,
        marginLeft: 'var(--sidebar-width)',
        padding: '32px',
        overflowY: 'auto',
        background: 'var(--bg-primary)',
      }}>
        <Outlet />
      </main>
    </div>
  )
}
