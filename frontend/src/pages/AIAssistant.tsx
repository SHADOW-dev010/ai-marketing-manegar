import { useState, useRef, useEffect } from 'react'
import { api } from '../services/api'
import { Bot, Send, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'What marketing strategy works best for SaaS?',
  'How can I improve my email open rates?',
  'What is a good CPC for Facebook ads?',
  'How do I calculate ROI for a campaign?',
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your AI Marketing Assistant. Ask me anything about marketing strategy, campaigns, or best practices." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await api.chat({
        message: input,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      })
      setMessages((prev) => [...prev, { role: 'assistant', content: res.reply }])
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Make sure the backend is running.',
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>AI Marketing Assistant</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Ask me anything about marketing
        </p>
      </div>

      <div style={{
        flex: 1, background: 'var(--bg-card)', borderRadius: '12px',
        border: '1px solid var(--border)', display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          flex: 1, overflowY: 'auto', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex', gap: '12px',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {msg.role === 'user' ? <User size={16} color="#fff" /> : <Bot size={16} style={{ color: 'var(--accent)' }} />}
              </div>
              <div style={{
                maxWidth: '70%', padding: '12px 16px', borderRadius: '12px',
                background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-primary)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                fontSize: '14px', lineHeight: '1.6',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div style={{ marginTop: '12px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>Try asking:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    style={{
                      padding: '8px 14px', borderRadius: '8px', fontSize: '13px',
                      background: 'var(--bg-hover)', color: 'var(--text-secondary)',
                      border: '1px solid var(--border)', cursor: 'pointer',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
              <Bot size={16} style={{ color: 'var(--accent)' }} />
              Thinking...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={{
          padding: '16px 20px', borderTop: '1px solid var(--border)',
          display: 'flex', gap: '12px',
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Type your marketing question..."
            style={{
              flex: 1, padding: '12px 16px', borderRadius: '10px',
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: '14px',
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
              background: 'var(--accent)', color: '#fff',
              display: 'flex', alignItems: 'center', gap: '8px',
              opacity: loading || !input.trim() ? 0.6 : 1,
            }}
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
