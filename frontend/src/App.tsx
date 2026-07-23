import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ContentStudio from './pages/ContentStudio'
import ImageStudio from './pages/ImageStudio'
import CampaignManager from './pages/CampaignManager'
import Analytics from './pages/Analytics'
import SocialScheduler from './pages/SocialScheduler'
import AIAssistant from './pages/AIAssistant'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<ContentStudio />} />
          <Route path="/images" element={<ImageStudio />} />
          <Route path="/campaigns" element={<CampaignManager />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/social" element={<SocialScheduler />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
