import { useState } from 'react'
import { api } from '../services/api'
import { useAppStore } from '../store/useAppStore'
import { Sparkles, Copy, Check } from 'lucide-react'

const contentTypes = [
  { value: 'ad', label: 'Ad Copy' },
  { value: 'email', label: 'Email' },
  { value: 'social', label: 'Social Media Post' },
  { value: 'blog', label: 'Blog Post' },
]

export default function ContentStudio() {
  const [prompt, setPrompt] = useState('')
  const [type, setType] = useState('ad')
  const [tone, setTone] = useState('')
  const [generated, setGenerated] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const addContentItem = useAppStore((s) => s.addContentItem)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setGenerated('')
    try {
      const res = await api.generateContent({ prompt, type, tone: tone || undefined })
      setGenerated(res.content)
      addContentItem({
        id: Date.now().toString(),
        title: prompt.slice(0, 50),
        type: type as any,
        content: res.content,
        createdAt: new Date().toISOString(),
      })
    } catch (err) {
      setGenerated('Error generating content. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>AI Content Studio</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
        Generate marketing copy with AI
      </p>

      <div style={{
        background: 'var(--bg-card)', borderRadius: '12px',
        border: '1px solid var(--border)', padding: '24px', marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {contentTypes.map((ct) => (
            <button
              key={ct.value}
              onClick={() => setType(ct.value)}
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                background: type === ct.value ? 'var(--accent)' : 'var(--bg-hover)',
                color: type === ct.value ? '#fff' : 'var(--text-secondary)',
                border: type === ct.value ? 'none' : '1px solid var(--border)',
              }}
            >
              {ct.label}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to write... (e.g., 'A summer sale email for our premium sneaker collection')"
          rows={4}
          style={{
            width: '100%', padding: '14px', borderRadius: '10px',
            background: 'var(--bg-primary)', border: '1px solid var(--border)',
            color: 'var(--text-primary)', fontSize: '14px', resize: 'vertical',
            marginBottom: '12px',
          }}
        />

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="Tone (optional): e.g., Professional, Humorous, Urgent"
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

      {generated && (
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px',
          border: '1px solid var(--border)', padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Generated Content</h3>
            <button
              onClick={handleCopy}
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
                background: 'var(--bg-hover)', color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', gap: '6px',
                border: '1px solid var(--border)',
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div style={{
            whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '14px',
            color: 'var(--text-primary)',
          }}>
            {generated}
          </div>
        </div>
      )}
    </div>
  )
}
