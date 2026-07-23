import { useAppStore } from '../store/useAppStore'
import { Save } from 'lucide-react'

export default function Settings() {
  const apiKey = useAppStore((s) => s.apiKey)
  const brandVoice = useAppStore((s) => s.brandVoice)
  const setApiKey = useAppStore((s) => s.setApiKey)
  const setBrandVoice = useAppStore((s) => s.setBrandVoice)

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>Settings</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
        Configure API keys and brand preferences
      </p>

      <div style={{
        background: 'var(--bg-card)', borderRadius: '12px',
        border: '1px solid var(--border)', padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '24px',
      }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            OpenAI / Anthropic API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            style={{
              width: '100%', padding: '12px 14px', borderRadius: '8px',
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: '14px',
            }}
          />
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '6px' }}>
            Your API key is stored locally and never sent anywhere except to the AI provider.
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            Brand Voice Description
          </label>
          <textarea
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            placeholder="Describe your brand voice..."
            rows={3}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: '8px',
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: '14px', resize: 'vertical',
            }}
          />
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '6px' }}>
            This helps the AI generate content that matches your brand tone.
          </p>
        </div>

        <button style={{
          padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start',
        }}>
          <Save size={16} /> Save Settings
        </button>
      </div>
    </div>
  )
}
