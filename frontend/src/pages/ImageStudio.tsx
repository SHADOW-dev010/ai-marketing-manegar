import { useState } from 'react'
import { api } from '../services/api'
import { Sparkles, Download } from 'lucide-react'

export default function ImageStudio() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setImageUrl('')
    try {
      const res = await api.generateImage({ prompt, style: style || undefined })
      setImageUrl(res.url)
    } catch {
      setImageUrl('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>AI Image Studio</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
        Generate marketing visuals with DALL-E
      </p>

      <div style={{
        background: 'var(--bg-card)', borderRadius: '12px',
        border: '1px solid var(--border)', padding: '24px', marginBottom: '24px',
      }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want... (e.g., 'A modern minimalist office with natural lighting, 3D render style')"
          rows={3}
          style={{
            width: '100%', padding: '14px', borderRadius: '10px',
            background: 'var(--bg-primary)', border: '1px solid var(--border)',
            color: 'var(--text-primary)', fontSize: '14px', resize: 'vertical',
            marginBottom: '12px',
          }}
        />

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="Style (optional): e.g., Photorealistic, Oil painting, 3D render"
            style={{
              flex: 1, padding: '10px 14px', borderRadius: '8px',
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: '14px',
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            style={{
              padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
              background: 'var(--accent)', color: '#fff',
              display: 'flex', alignItems: 'center', gap: '8px',
              opacity: loading || !prompt.trim() ? 0.6 : 1,
            }}
          >
            <Sparkles size={16} />
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {imageUrl && (
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px',
          border: '1px solid var(--border)', padding: '24px', textAlign: 'center',
        }}>
          <img src={imageUrl} alt="Generated" style={{
            maxWidth: '100%', maxHeight: '500px', borderRadius: '8px', marginBottom: '16px',
          }} />
          <a
            href={imageUrl} download
            style={{
              padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
              background: 'var(--accent)', color: '#fff',
              display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
            }}
          >
            <Download size={16} /> Download
          </a>
        </div>
      )}
    </div>
  )
}
